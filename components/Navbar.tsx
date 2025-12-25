"use client";

import { useState, useEffect, useRef } from "react";
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
  Home,
  Store,
  Layers,
  Phone,
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
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  onLanguageToggle?: (language: string) => void;
  currentLanguage?: string;
}

const Navbar = ({ onLanguageToggle, currentLanguage = "en" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, logout } = useUser();
  const navRef = useRef<HTMLDivElement>(null);
  
  const [isArabic, setIsArabic] = useState(currentLanguage === "ar");

  // Sync language state with props
  useEffect(() => {
    setIsArabic(currentLanguage === "ar");
  }, [currentLanguage]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking outside the entire nav component
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = isArabic ? "en" : "ar";
    setIsArabic(!isArabic);
    if (onLanguageToggle) {
      onLanguageToggle(newLanguage);
    }
    // Don't close menu immediately to show feedback, or close if preferred:
    // setIsOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const navLinks = [
    { name: isArabic ? "الرئيسية" : "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: isArabic ? "المتجر" : "Shop", path: "/shop", icon: <Store className="w-5 h-5" /> },
    { name: isArabic ? "البرامج" : "Programs", path: "/programs", icon: <Layers className="w-5 h-5" /> },
    { name: isArabic ? "اتصل بنا" : "Contact", path: "/contact", icon: <Phone className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => pathname === path;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md" 
            : "bg-white border-b border-gray-100"
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-1 group relative z-[70]"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <span className="text-primary transition-colors duration-300 group-hover:text-primary/90">STEM</span>
                <span className="text-accent transition-colors duration-300 group-hover:text-accent/90">PARK</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 relative z-[70]">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={toggleSearch}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </Button>
                
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-2 animate-fade-in">
                    <form onSubmit={handleSearch} className="flex gap-2">
                      <input
                        id="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isArabic ? "ابحث هنا..." : "Search here..."}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        autoFocus
                      />
                      <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
                        <Search className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                )}
              </div>

              {/* Desktop Language Toggle */}
              <div 
                onClick={toggleLanguage}
                className="relative hidden sm:flex items-center bg-gray-100 border border-gray-300 h-9 w-24 rounded-full p-1 cursor-pointer hover:border-primary/50 transition-all overflow-hidden select-none"
                role="button"
                aria-label="Toggle Language"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleLanguage()}
              >
                <div 
                  className={`absolute top-1 bottom-1 w-[46px] bg-primary rounded-full transition-all duration-300 ease-in-out shadow-sm ${
                    isArabic ? 'right-1' : 'left-1'
                  }`}
                />
                <span className={`relative z-10 flex-1 text-center text-[10px] font-bold transition-colors duration-300 ${!isArabic ? 'text-white' : 'text-gray-600'}`}>EN</span>
                <span className={`relative z-10 flex-1 text-center text-[10px] font-bold transition-colors duration-300 ${isArabic ? 'text-white' : 'text-gray-600'}`}>عربي</span>
              </div>

              {/* Cart Button */}
              <Link href="/cart">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  aria-label={`${isArabic ? "عربة التسوق" : "Shopping Cart"}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Actions */}
              <div className="flex items-center gap-2 border-l border-gray-300 pl-3 ml-1">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
                        <User className="w-5 h-5 text-primary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                      <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link href="/account/settings" className="w-full flex items-center"><Settings className="w-4 h-4 mr-2" />{isArabic ? "الإعدادات" : "Settings"}</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/account/orders" className="w-full flex items-center"><Package className="w-4 h-4 mr-2" />{isArabic ? "طلباتي" : "My Orders"}</Link></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />{isArabic ? "تسجيل الخروج" : "Logout"}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login" className="hidden md:block">
                    <Button size="sm" className="rounded-full px-6 font-medium bg-primary text-white">
                      {isArabic ? "تسجيل الدخول" : "Login"}
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`md:hidden fixed inset-0 top-16 bg-white z-50 transition-all duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0 opacity-100 visible" : (isArabic ? "-translate-x-full" : "translate-x-full") + " opacity-0 invisible"
          }`}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <div className="h-full overflow-y-auto bg-white px-4 py-6 flex flex-col">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isArabic ? "ابحث هنا..." : "Search here..."}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              />
              <Button type="submit" className="bg-primary rounded-xl px-4">
                <Search className="w-5 h-5" />
              </Button>
            </form>

            {/* Links */}
            <div className="space-y-2 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.icon}
                  <span className="text-lg">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
              {user ? (
                <div className="grid gap-2">
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500">{isArabic ? "مرحباً" : "Welcome"}</p>
                    <p className="font-bold text-gray-900">{user.name || user.email}</p>
                  </div>
                  <Link href="/account/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700"><Settings className="w-5 h-5" /> {isArabic ? "الإعدادات" : "Settings"}</Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600"><LogOut className="w-5 h-5" /> {isArabic ? "تسجيل الخروج" : "Logout"}</button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 rounded-xl bg-primary text-white font-bold text-center shadow-lg"
                >
                  {isArabic ? "تسجيل الدخول" : "Login"}
                </Link>
              )}

              {/* Mobile Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-100 font-bold"
              >
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <span>{isArabic ? "English" : "العربية"}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className={`text-xs ${!isArabic ? 'text-primary' : 'text-gray-400'}`}>EN</span>
                   <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-primary transition-all ${isArabic ? 'right-1' : 'left-1'}`} />
                   </div>
                   <span className={`text-xs ${isArabic ? 'text-primary' : 'text-gray-400'}`}>AR</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;