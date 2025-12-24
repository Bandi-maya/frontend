"use client"
import { Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useSettings } from "@/contexts/SettingsContext";
import { apiUrl, CURRENCY_OPTIONS } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();
  const navigate = useRouter();
  const { currencyCode } = useSettings(); // Use currencyCode from context (e.g., "INR", "QAR")
  const hasVariants = product.variants && product.variants.length > 0;

  // 1. Determine Display Media
  const displayMedia = (product.media && product.media.length > 0)
    ? product.media[0]
    : (product.images && product.images.length > 0) ? product.images[0] : null;

  const isVideo = displayMedia?.type === 'video';
  const mediaUrl = displayMedia?.url
    ? `${new URL(apiUrl).origin}/${displayMedia.url}`
    : '/placeholder.png';

    console.log(currencyCode)

  // 2. NEW Price Logic for Unified Array
  // Helper to find the correct price object from the pricing array
  const getPriceData = (pricingArray: any[]) => {
    if (!pricingArray) return null;
    return pricingArray.find((p: any) => p.currency === currencyCode) || pricingArray[0];
  };

  let currentPriceData;
  if (hasVariants) {
    // For variants, we find the minimum price available in the user's currency
    const variantPrices = product.variants.map((v: any) => getPriceData(v.pricing));
    currentPriceData = variantPrices.reduce((min: any, curr: any) => {
      const currVal = curr?.salePrice || curr?.originalPrice;
      const minVal = min?.salePrice || min?.originalPrice;
      return currVal < minVal ? curr : min;
    }, variantPrices[0]);
  } else {
    // For single products, get the price directly from the product's pricing array
    currentPriceData = getPriceData(product.pricing);
  }

  const price = currentPriceData?.salePrice || currentPriceData?.originalPrice || 0;
  const originalPrice = currentPriceData?.originalPrice || 0;
  const currencySymbol = CURRENCY_OPTIONS.find(c => c.code === currencyCode)?.symbol || "$";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasVariants) {
      navigate.push(`/product/${product._id}`);
      return;
    }

    addToCart({
      productId: product._id,
      variantId: null,
      name: product.name,
      price: price,
      image: displayMedia?.url,
      sku: product.productData?.sku,
      currency: currencyCode, // Pass currency to cart
    }, 1);

    toast({ title: "Added to cart!", description: `${product.name} added.` });
  };

  const discount = originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-card rounded-[2rem] overflow-hidden border border-border hover:shadow-2xl transition-all duration-500">
        
        {/* Media Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {isVideo ? (
            <video
              src={mediaUrl}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              muted loop
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <img
              src={mediaUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount > 0 && (
              <span className="bg-destructive text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                -{discount}% OFF
              </span>
            )}
            {hasVariants && (
              <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                Multi-Option
              </span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <Button
              onClick={handleAddToCart}
              size="icon"
              className="rounded-2xl w-12 h-12 shadow-xl bg-primary text-primary-foreground"
            >
              {hasVariants ? <Plus className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {product.categories?.[0]?.title || "STEM Kit"}
          </p>
          <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900">
                {hasVariants && <span className="text-xs font-medium text-slate-400 mr-1 uppercase">From</span>}
                <span className="mr-0.5">{currencySymbol}</span>
                {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {discount > 0 && (
                <span className="text-sm text-slate-400 line-through decoration-destructive/50">
                  {currencySymbol}{originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="text-right">
              <p className="text-[8px] font-black text-slate-400 uppercase">Shipping to</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{currencyCode}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}