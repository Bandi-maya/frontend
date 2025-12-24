"use client"
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: any) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return <Providers>
        {isAdmin ? <>{children}</> :
            <>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatBot />
            </>
        }
    </Providers>
}