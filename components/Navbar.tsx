"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  LogOut,
  Settings,
  Package,
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, logout } = useUser();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Programs", path: "/programs" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav 
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm transition-colors"
      style={{
        '--nav-bg': 'var(--card)',
        '--nav-border': 'var(--border)',
        '--nav-shadow': 'var(--shadow-sm)',
        '--nav-text': 'var(--foreground)',
        '--nav-text-secondary': 'var(--foreground-secondary)',
        '--nav-primary': 'var(--primary)',
        '--nav-primary-hover': 'var(--primary-hover)',
        '--nav-primary-active': 'var(--primary-active)',
        '--nav-primary-foreground': 'var(--primary-foreground)',
        '--nav-accent': 'var(--accent)',
        '--nav-accent-hover': 'var(--accent-hover)',
        '--nav-accent-foreground': 'var(--accent-foreground)',
        '--nav-secondary': 'var(--secondary)',
        '--nav-secondary-hover': 'var(--secondary-hover)',
        '--nav-hover': 'var(--hover)',
        '--nav-active': 'var(--active)',
        '--nav-muted': 'var(--muted)',
        '--nav-muted-foreground': 'var(--muted-foreground)',
        '--nav-destructive': 'var(--destructive)',
        '--nav-destructive-foreground': 'var(--destructive-foreground)',
      } as React.CSSProperties}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-primary group-hover:text-[var(--nav-primary-hover)] transition-colors duration-200">
                STEM
              </span>
              <span className="text-accent group-hover:text-[var(--nav-accent-hover)] transition-colors duration-200">
                PARK
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(link.path)
                      ? "bg-[var(--nav-primary)] text-[var(--nav-primary-foreground)] hover:bg-[var(--nav-primary-hover)] active:bg-[var(--nav-primary-active)]"
                      : "text-[var(--nav-text)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)] active:bg-[var(--nav-active)]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex hover:bg-[var(--nav-hover)] active:bg-[var(--nav-active)] transition-colors duration-200"
            >
              <Search className="w-5 h-5 text-[var(--nav-text-secondary)] hover:text-[var(--nav-text)] transition-colors duration-200" />
            </Button>

            {/* Cart Button */}
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-[var(--nav-hover)] active:bg-[var(--nav-active)] group transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5 text-[var(--nav-text-secondary)] group-hover:text-[var(--nav-text)] transition-colors duration-200" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--nav-accent)] text-[var(--nav-accent-foreground)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center hover:bg-[var(--nav-accent-hover)] active:bg-[var(--nav-accent)] transition-colors duration-200">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Section */}
            <div className="flex items-center gap-2 border-l border-[var(--nav-border)] pl-3 ml-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-[var(--nav-secondary)] hover:bg-[var(--nav-secondary-hover)] active:bg-[var(--nav-secondary-hover)] transition-colors duration-200"
                    >
                      <User className="w-5 h-5 text-[var(--nav-primary)] hover:text-[var(--nav-primary-hover)] transition-colors duration-200" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-[var(--card)] border-[var(--border)] shadow-lg"
                  >
                    <DropdownMenuLabel className="bg-transparent text-[var(--foreground)]">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-[var(--border)]" />

                    <DropdownMenuItem 
                      asChild
                      className="focus:bg-[var(--hover)] focus:text-[var(--foreground)] cursor-pointer text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors duration-200"
                    >
                      <Link href="/orders" className="flex items-center w-full">
                        <Package className="mr-2 h-4 w-4 text-[var(--muted-foreground)]" />
                        <span>My Orders</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem 
                      asChild
                      className="focus:bg-[var(--hover)] focus:text-[var(--foreground)] cursor-pointer text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors duration-200"
                    >
                      <Link href="/profile" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4 text-[var(--muted-foreground)]" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-[var(--border)]" />

                    <DropdownMenuItem
                      onClick={logout}
                      className="text-[var(--destructive)] focus:bg-[var(--destructive)]/10 focus:text-[var(--destructive)] cursor-pointer hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)] transition-colors duration-200"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button 
                    size="sm" 
                    className="hidden md:flex rounded-full px-6 font-semibold bg-[var(--nav-primary)] text-[var(--nav-primary-foreground)] hover:bg-[var(--nav-primary-hover)] active:bg-[var(--nav-primary-active)] transition-colors duration-200"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden hover:bg-[var(--nav-hover)] active:bg-[var(--nav-active)] transition-colors duration-200"
                  >
                    <User className="w-5 h-5 text-[var(--nav-text-secondary)] hover:text-[var(--nav-text)] transition-colors duration-200" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-[var(--nav-hover)] active:bg-[var(--nav-active)] transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[var(--nav-text-secondary)] hover:text-[var(--nav-text)] transition-colors duration-200" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--nav-text-secondary)] hover:text-[var(--nav-text)] transition-colors duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden border-t border-[var(--nav-border)] py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${
                      isActive(link.path)
                        ? "bg-[var(--nav-primary)] text-[var(--nav-primary-foreground)] hover:bg-[var(--nav-primary-hover)] active:bg-[var(--nav-primary-active)]"
                        : "text-[var(--nav-text)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)] active:bg-[var(--nav-active)]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Search in Mobile */}
              <div className="px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--nav-muted-foreground)]" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {!user && (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg font-semibold bg-[var(--nav-primary)] text-[var(--nav-primary-foreground)] hover:bg-[var(--nav-primary-hover)] active:bg-[var(--nav-primary-active)] transition-colors duration-200 text-center"
                >
                  Login to Account
                </Link>
              )}
            </div>

            {/* User Info in Mobile Menu */}
            {user && (
              <div className="mt-4 pt-4 border-t border-[var(--nav-border)] px-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--nav-secondary)] flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--nav-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--nav-text)]">{user.name}</p>
                    <p className="text-xs text-[var(--nav-muted-foreground)]">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/orders"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-lg bg-[var(--nav-secondary)] text-[var(--nav-text-secondary)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)] text-center text-sm transition-colors duration-200"
                  >
                    <Package className="w-4 h-4 mx-auto mb-1" />
                    Orders
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-lg bg-[var(--nav-secondary)] text-[var(--nav-text-secondary)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)] text-center text-sm transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 mx-auto mb-1" />
                    Settings
                  </Link>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full mt-3 px-4 py-3 rounded-lg text-[var(--nav-destructive)] hover:bg-[var(--nav-destructive)]/10 active:bg-[var(--nav-destructive)]/20 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;