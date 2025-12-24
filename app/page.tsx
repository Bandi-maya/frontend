"use client"
import { ArrowRight, Sparkles, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductsContext";
import Link from "next/link";
import Image from "next/image";

const Index = () => {
  const products = useProducts();
  const featuredProducts = products.filter((p: any) => p.isFeatured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${'/assets/hero-bg.jpg'})` }}
        />
        <div className="absolute inset-0 gradient-hero" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-primary-foreground">Inspiring Future Innovators</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight animate-slide-up">
              Build. Learn. <br />
              <span className="text-warning">Create Amazing Things.</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Premium STEM kits, 3D printer rentals, and hands-on programs designed to spark curiosity and build real-world skills.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/shop">
                <Button variant="hero" size="xl" className="gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Explore Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute right-10 top-1/4 w-20 h-20 bg-accent/30 rounded-full blur-xl animate-float" />
        <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Trust Badges */}
      <section className="bg-secondary py-6 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: "Free Shipping $50+" },
              { icon: Shield, text: "Quality Guaranteed" },
              { icon: Clock, text: "Same Day Dispatch" },
              { icon: Sparkles, text: "1000+ Happy Learners" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center justify-center gap-3 py-2">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">Top picks for young innovators</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="hidden md:flex gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="gap-2">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3D Printer Rental CTA */}
      {/* <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-accent font-semibold mb-3">3D PRINTER RENTAL</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Bring Your Ideas to Life
              </h2>
              <p className="text-background/70 mb-6 text-lg">
                Access professional 3D printing at affordable rates. Perfect for prototypes, school projects, or creative designs. Our team provides full support.
              </p>
              <ul className="space-y-3 mb-8">
                {["Starting at $15/hour", "Multiple materials available", "Expert technical support", "Quick turnaround time"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/3d-printing">
                <Button variant="cta" size="lg" className="gap-2">
                  Book Printer Time
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={products?.[1]?.image}
                alt="3D Printer"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-lg">
                <p className="text-2xl font-bold">$15</p>
                <p className="text-sm opacity-80">per hour</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Programs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              STEM Programs
            </h2>
            <p className="text-muted-foreground text-lg">
              Beyond products, we offer hands-on learning experiences to nurture the next generation of innovators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* STEM Clubs */}
            <div className="group relative rounded-2xl overflow-hidden">
              <img
                src={'/assets/stem-club.jpg'}
                alt="STEM Club"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-accent font-semibold text-sm">WEEKLY SESSIONS</span>
                <h3 className="font-display text-2xl font-bold text-background mb-2">STEM Clubs</h3>
                <p className="text-background/80 mb-4">
                  Hands-on robotics, coding, and engineering projects in a collaborative environment.
                </p>
                <Link href="/programs">
                  <Button variant="cta" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>

            {/* Academic Support */}
            <div className="group relative rounded-2xl overflow-hidden">
              <img
                src={'/assets/academic-support.jpg'}
                alt="Academic Support"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-accent font-semibold text-sm">1-ON-1 TUTORING</span>
                <h3 className="font-display text-2xl font-bold text-background mb-2">Academic Support</h3>
                <p className="text-background/80 mb-4">
                  Personalized tutoring in math, science, and technology subjects.
                </p>
                <Link href="/programs">
                  <Button variant="cta" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Join the STEM Park Community
            </h2>
            <p className="text-muted-foreground mb-6">
              Get exclusive deals, new product alerts, and STEM learning resources straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="cta" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;