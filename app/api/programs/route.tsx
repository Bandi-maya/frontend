// app/api/programs/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import Program from "@/models/Program";
import { connectDB } from "@/lib/db";

// Helper for saving files manually
const saveFile = async (file: File, folder: string) => {
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  if (!existsSync(uploadDir)) await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  
  return `/uploads/${folder}/${filename}`;
};

// ----------------- GET ALL PROGRAMS -----------------
export const GET = async (req: NextRequest) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const query = (type === "main" || type === "additional") ? { type } : {};
  const programs = await Program.find(query);

  return NextResponse.json(programs);
};

// ----------------- CREATE PROGRAM -----------------
export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const formData = await req.formData();
    
    const file = formData.get("file") as File || formData.get("image") as File;
    if (!file) return NextResponse.json({ message: "Program image is required" }, { status: 400 });

    const logoUrl = await saveFile(file, "programs");

    const program = await Program.create({
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      description: formData.get("description"),
      features: formData.get("features") ? JSON.parse(formData.get("features") as string) : [],
      type: formData.get("type"),
      icon: formData.get("icon"),
      color: formData.get("color"),
      image: {
        url: logoUrl,
        alt: formData.get("title") || "program image",
        position: 1,
      },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

// ----------------- UPDATE PROGRAM -----------------
export const PUT = async (req: NextRequest) => {
  await connectDB();
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    if (!id) return NextResponse.json({ message: "Program ID required" }, { status: 400 });

    const program = await Program.findById(id);
    if (!program) return NextResponse.json({ message: "Program not found" }, { status: 404 });

    const file = formData.get("file") as File || formData.get("image") as File;

    if (file && file.size > 0) {
      // Delete old file
      if (program.image?.url) {
        const oldPath = path.join(process.cwd(), "public", program.image.url);
        try { await fs.unlink(oldPath); } catch (e) { /* ignore if not found */ }
      }
      // Save new file
      program.image.url = await saveFile(file, "programs");
    }

    // Update other fields
    program.title = formData.get("title") ?? program.title;
    program.subtitle = formData.get("subtitle") ?? program.subtitle;
    program.description = formData.get("description") ?? program.description;
    program.type = formData.get("type") ?? program.type;
    program.icon = formData.get("icon") ?? program.icon;
    program.color = formData.get("color") ?? program.color;
    
    if (formData.get("features")) {
        program.features = JSON.parse(formData.get("features") as string);
    }

    await program.save();
    return NextResponse.json(program);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

// ----------------- DELETE PROGRAM -----------------
export const DELETE = async (req: NextRequest) => {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "Program ID required" }, { status: 400 });

    const program = await Program.findByIdAndDelete(id);
    if (!program) return NextResponse.json({ message: "Program not found" }, { status: 404 });

    if (program.image?.url) {
      const imgPath = path.join(process.cwd(), "public", program.image.url);
      try { await fs.unlink(imgPath); } catch (e) { /* ignore */ }
    }

    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};