"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/contexts/CartContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { CategoriesProvider } from "@/contexts/CategoriesContext";
import { UserProvider } from "@/contexts/UserContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <UserProvider>
          <CategoriesProvider>
            <ProductsProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                {children}
              </CartProvider>
            </ProductsProvider>
          </CategoriesProvider>
        </UserProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}
