"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  LogOut,
  Settings,
  Package,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the props interface
interface NavbarProps {
  onLanguageToggle?: (language: string) => void;
  currentLanguage?: string;
}

const Navbar = ({ onLanguageToggle, currentLanguage = "en" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, logout } = useUser();
  
  const [isArabic, setIsArabic] = useState(currentLanguage === "ar");

  // Sync with parent component's language state
  useEffect(() => {
    setIsArabic(currentLanguage === "ar");
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage = isArabic ? "en" : "ar";
    setIsArabic(!isArabic);
    
    // Call the parent's translation function
    if (onLanguageToggle) {
      onLanguageToggle(newLanguage);
    }
    
    // For mobile, close the menu
    setIsOpen(false);
  };

  const navLinks = [
    { name: isArabic ? "الرئيسية" : "Home", path: "/" },
    { name: isArabic ? "المتجر" : "Shop", path: "/shop" },
    { name: isArabic ? "البرامج" : "Programs", path: "/programs" },
    { name: isArabic ? "اتصل بنا" : "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav 
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm transition-colors"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-primary group-hover:text-primary transition-colors duration-200">STEM</span>
              <span className="text-accent group-hover:text-accent transition-colors duration-200">PARK</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-active"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle Button - Text Only */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full px-3 py-1"
              aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
            >
              <span className="font-bold text-sm">
                {isArabic ? "English" : "عربي"}
              </span>
            </Button>

            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-active">
              <Search className="w-5 h-5 text-muted-foreground" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-active">
                <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Section */}
            <div className="flex items-center gap-2 border-l border-border pl-3 ml-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full bg-secondary">
                      <User className="w-5 h-5 text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {isArabic ? "حسابي" : "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      {isArabic ? "الإعدادات" : "Settings"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="w-4 h-4 mr-2" />
                      {isArabic ? "طلباتي" : "My Orders"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      {isArabic ? "تسجيل الخروج" : "Logout"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="hidden md:block">
                  <Button size="sm" className="rounded-full px-6 bg-primary">
                    {isArabic ? "تسجيل الدخول" : "Login"}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium ${isActive(link.path) ? "bg-primary text-white" : "text-foreground"}`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Login Link */}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg bg-secondary text-primary font-medium text-center"
                >
                  {isArabic ? "تسجيل الدخول" : "Login"}
                </Link>
              )}

              {/* Mobile Language Toggle Button - Text Only */}
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-primary-foreground font-bold gap-2"
              >
                <Languages className="w-5 h-5" />
                <span>
                  {isArabic ? "Switch to English" : "التبديل إلى العربية"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;