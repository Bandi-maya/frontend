import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/NewProduct";
import Variant from "@/models/NewVariant";
import slugify from "slugify";
import fs from "fs/promises";
import path from "path";

// Helper to save files to public/uploads
const saveMedia = async (file: File) => {
  const uploadDir = path.join(process.cwd(), "public/uploads/products");
  await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  
  return `/uploads/products/${filename}`;
};

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find()
      .populate("categories")
      .populate("brand")
      .lean();

    const productsWithVariants = await Promise.all(
      products.map(async (product: any) => {
        let variants = [];
        if (product.isOnlyProduct && product.productData?.variants?.length > 0) {
          variants = product.productData.variants;
        } else {
          variants = await Variant.find({ productId: product._id }).lean();
        }
        return { ...product, variants };
      })
    );

    return NextResponse.json(productsWithVariants);
  } catch (err: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const formData = await req.formData();
    
    // Parse JSON strings from formData
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const pricing = JSON.parse(formData.get("pricing") as string || "[]");
    const variants = JSON.parse(formData.get("variants") as string || "[]");
    const categories = JSON.parse(formData.get("categories") as string || "[]");
    const dimensions = JSON.parse(formData.get("dimensions") as string || "{}");
    
    // Handle Media Uploads
    const media: any[] = [];
    const allEntries = Array.from(formData.entries());
    
    for (const [key, value] of allEntries) {
      if (value instanceof File && !key.startsWith("variantMedia_")) {
        const url = await saveMedia(value);
        media.push({
          url,
          alt: value.name,
          type: value.type.startsWith("video/") ? "video" : "image",
          position: 1
        });
      }
    }

    const productData = {
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description,
      categories,
      brand: formData.get("brand") || null,
      media,
      isFeatured: formData.get("isFeatured") === "true",
      isActive: formData.get("isActive") === "true",
      isOnlyProduct: formData.get("isOnlyProduct") === "true",
      pricing: pricing.map((p: any) => ({ ...p, originalPrice: Number(p.originalPrice) })),
    };

    if (productData.isOnlyProduct) {
      (productData as any).productData = {
        sku: formData.get("sku"),
        inventory: {
          stock: Number(formData.get("stock") || 0),
          lowStockThreshold: Number(formData.get("lowStockThreshold") || 5)
        },
        dimensions,
        media
      };
    }

    const newProduct = await Product.create(productData);

    // Multi-variant Logic
    if (!productData.isOnlyProduct && variants.length > 0) {
      const variantDocs = await Promise.all(variants.map(async (v: any, idx: number) => {
        const variantMedia = [];
        for (const [key, value] of allEntries) {
          if (value instanceof File && key === `variantMedia_${idx}`) {
            const url = await saveMedia(value);
            variantMedia.push({ url, type: value.type.startsWith("video/") ? "video" : "image" });
          }
        }
        return { ...v, media: variantMedia, productId: newProduct._id };
      }));
      await Variant.insertMany(variantDocs);
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}