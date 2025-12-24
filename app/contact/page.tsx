"use client"
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";
import { apiFetch } from "@/lib/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { contact } = useSettings();


  // Inside Contact.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiFetch(`/contacts/submit`, {
        method: "POST",
        data: formData,
      });

      toast({
        title: "Message sent!",
        description: "We've received your inquiry and will respond shortly.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-secondary py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our products or programs? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href={`mailto:${contact?.email || ""}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contact?.email || ""}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href={`tel:${contact?.phone || ""}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contact?.phone || ""}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      {contact?.address || ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      {contact?.hours || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="products">Product Inquiry</option>
                      <option value="3d-printing">3D Printing Rental</option>
                      <option value="programs">STEM Programs</option>
                      <option value="support">Customer Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
