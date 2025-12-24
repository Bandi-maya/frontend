"use client"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { title } from "process";
import { useSettings } from "@/contexts/SettingsContext";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { apiFetch } from "@/lib/axios";
import Link from "next/link";
import { apiUrl } from "@/lib/constants";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const { isIndia } = useSettings()
    const { user }: any = useUser();
    const [isCheckingOut, setIsCheckingOut] = useState(false); // Toggle state

    const [address, setAddress] = useState({
        firstName: user?.name,
        lastName: "",
        phone: user?.phone || "",
        email: user?.email || "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        country: isIndia ? "India" : "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
        // Basic Validation
        if (!address.addressLine || !address.phone || !address.city) {
            return toast({ title: "Missing Details", description: "Please fill in all shipping fields.", variant: "destructive" });
        }

        setLoading(true);
        try {
            const res = await apiFetch(`/orders`, {
                method: "POST",
                data: {
                    isIndia: isIndia, // Tell backend which price set to use
                    shippingAddress: address, // Send the full address object
                },
            });

            toast({ title: "Order placed successfully!" });
            clearCart();
            // Redirect to Order Success or My Orders
        } catch (err: any) {
            toast({
                title: "Order Failed",
                description: err.response?.data?.message || "Check your details",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">Looks like you haven't added any items yet.</p>
                    <Link href="/shop">
                        <Button variant="cta" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                </Link>

                <h1 className="font-display text-3xl font-bold mb-8">
                    {isCheckingOut ? "Shipping Details" : "Your Cart"}
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {!isCheckingOut ? (
                            // STEP 1: CART LIST
                            cartItems.map((item: any) => {
                                // Determine the currency symbol based on the isIndia flag from your context/backend
                                const currencySymbol = isIndia ? "₹" : "$";

                                return (
                                    <div
                                        key={item?._id}
                                        className="flex gap-4 bg-card rounded-xl p-4 border border-border"
                                    >
                                        <img
                                            src={apiUrl.replace('api', '') + item.productId?.media?.[0]?.url || item.image}
                                            alt={item.productId?.name}
                                            className="w-24 h-24 object-cover rounded-lg bg-muted"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                                                        {item.productId?.category?.name || "STEM Kit"}
                                                    </p>
                                                    <h3 className="font-bold text-slate-800">
                                                        {item.productId?.name}
                                                    </h3>
                                                    {/* Show variant details if they exist */}
                                                    {item.variantId?.attributes && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {Object.values(item.variantId.attributes).join(" / ")}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-border rounded-lg bg-background">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="px-3 py-1.5 hover:bg-muted disabled:opacity-30 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-4 font-bold text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="px-3 py-1.5 hover:bg-muted transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    {/* Using livePrice injected by your new getCart controller */}
                                                    <p className="font-black text-lg text-slate-900">
                                                        {currencySymbol}
                                                        {(item.livePrice * item.quantity).toLocaleString(isIndia ? "en-IN" : "en-US", {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground font-medium">
                                                        {currencySymbol}{item.livePrice} each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="firstName" value={address?.firstName} placeholder="First Name" onChange={handleInputChange} />
                                    <Input name="lastName" value={address?.lastName} placeholder="Last Name" onChange={handleInputChange} />
                                </div>
                                <Input name="email" value={address?.email} placeholder="Email Address" onChange={handleInputChange} />
                                <Input name="phone" value={address?.phone} placeholder="Phone Number" onChange={handleInputChange} />
                                <Input name="addressLine" value={address?.addressLine} placeholder="Street Address / House No." onChange={handleInputChange} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input value={address?.city} name="city" placeholder="City" onChange={handleInputChange} />
                                    <Input name="pincode" value={address?.pincode} placeholder="Pincode / Zip" onChange={handleInputChange} />
                                </div>
                                <Input name="state" placeholder="State" value={address?.state} onChange={handleInputChange} />
                                {!isIndia && <Input name="country" placeholder="Country" value={address?.country} onChange={handleInputChange} />}

                                <Button variant="ghost" onClick={() => setIsCheckingOut(false)} className="w-full">
                                    Back to Cart
                                </Button>
                            </div>)
                        }

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                                <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-success font-medium">
                                            {total >= 50 ? "FREE" : "$5.99"}
                                        </span>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>${(total >= 50 ? total : total + 5.99).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {total < 50 && (
                                    <p className="text-sm text-muted-foreground bg-secondary rounded-lg p-3 mb-6">
                                        Add ${(50 - total).toFixed(2)} more for free shipping!
                                    </p>
                                )}

                                <Button
                                    variant="cta"
                                    size="lg"
                                    className="w-full"
                                    onClick={isCheckingOut ? handleCheckout : () => setIsCheckingOut(true)}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : isCheckingOut ? "Place Order" : "Proceed to Checkout"}
                                </Button>


                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Secure checkout powered by Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
