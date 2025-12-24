"use client"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import Link from "next/link";

const Footer = () => {
  const { contact } = useSettings();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-display font-extrabold text-2xl">
                <span className="text-primary">STEM</span>
                <span className="text-accent">PARK</span>
              </span>
            </Link>
            <p className="text-background/70 mb-4">
              Inspiring the next generation of innovators through hands-on STEM education and quality products.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-background/70 hover:text-primary transition-colors">Shop All</Link></li>
              {/* <li><Link href="/3d-printing" className="text-background/70 hover:text-primary transition-colors">3D Printer Rental</Link></li> */}
              <li><Link href="/programs" className="text-background/70 hover:text-primary transition-colors">STEM Programs</Link></li>
              <li><Link href="/contact" className="text-background/70 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><Link href="/programs" className="text-background/70 hover:text-primary transition-colors">STEM Clubs</Link></li>
              <li><Link href="/programs" className="text-background/70 hover:text-primary transition-colors">Academic Support</Link></li>
              <li><Link href="/programs" className="text-background/70 hover:text-primary transition-colors">Certifications</Link></li>
              <li><Link href="/programs" className="text-background/70 hover:text-primary transition-colors">Competitions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary" />
                <span>{contact?.email || ""}</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary" />
                <span>{contact?.phone || ""}</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>{contact?.address || ""}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} The STEM Park. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/60 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-background/60 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-background/60 hover:text-primary transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
