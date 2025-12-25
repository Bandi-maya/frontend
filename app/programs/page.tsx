"use client"
import { ArrowRight, Calendar, Users, BookOpen, Trophy, Sparkles, Target, Zap, Shield, TrendingUp, Clock, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/axios";
import { apiUrl } from "@/lib/constants";
import Link from "next/link";
import { cubicBezier, motion } from "framer-motion";

const iconMap: any = { 
    Users, BookOpen, Trophy, Calendar, Target, Zap, Shield, TrendingUp 
};

const STEM_IMAGES = [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
];

const tempMainPrograms = [
    {
        _id: "1",
        title: "Robotics & Automation Engineering",
        subtitle: "Advanced Robotics",
        description: "Master the fundamentals of robotics, automation, and AI systems with hands-on projects using cutting-edge technology. Designed for future engineers and innovators.",
        features: ["Arduino Projects", "Python Programming", "AI Integration", "3D Modeling", "Team Competitions", "Industry Certifications"],
        icon: "Target",
        image: { url: STEM_IMAGES[0] }
    },
    {
        _id: "2",
        title: "3D Design & Digital Fabrication",
        subtitle: "Digital Fabrication",
        description: "From concept to creation. Learn 3D modeling, printing, and prototyping with professional-grade equipment. Perfect for designers and makers.",
        features: ["Fusion 360", "CAD Design", "Prototyping", "Material Science", "Product Development", "Portfolio Building"],
        icon: "Zap",
        image: { url: STEM_IMAGES[1] }
    }
];

const tempAdditionalPrograms = [
    { 
        _id: "a1", 
        title: "AI & Machine Learning", 
        description: "Introduction to artificial intelligence and machine learning concepts with practical applications.", 
        icon: "TrendingUp" 
    },
    { 
        _id: "a2", 
        title: "Cybersecurity Fundamentals", 
        description: "Learn essential cybersecurity principles and ethical hacking techniques.", 
        icon: "Shield" 
    },
    { 
        _id: "a3", 
        title: "Drone Technology", 
        description: "Design, build, and program autonomous drones for various applications.", 
        icon: "Target" 
    },
    { 
        _id: "a4", 
        title: "IoT Development", 
        description: "Create connected devices and smart systems using Internet of Things technology.", 
        icon: "Zap" 
    }
];

const Programs = () => {
    const [programs, setPrograms] = useState<any[]>([]);
    const [additionalPrograms, setAdditionalPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [useTempData, setUseTempData] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [main, additional] = await Promise.all([
                    apiFetch("/programs/main"),
                    apiFetch("/programs/additional")
                ]);
                
                setPrograms(main || []);
                setAdditionalPrograms(additional || []);
                
                if ((!main || main.length === 0) && (!additional || additional.length === 0)) {
                    setUseTempData(true);
                    setPrograms(tempMainPrograms);
                    setAdditionalPrograms(tempAdditionalPrograms);
                }
            } catch (error) {
                setUseTempData(true);
                setPrograms(tempMainPrograms);
                setAdditionalPrograms(tempAdditionalPrograms);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
                
                {/* Animated Orbs */}
                <motion.div 
                    className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Pioneering STEM Education</span>
                        </motion.div>
                        
                        <motion.h1 
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                        >
                            Transform Your Future with <span className="text-primary">Cutting-Edge</span> STEM Programs
                        </motion.h1>
                        
                        <motion.p 
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
                        >
                            Industry-designed programs that bridge the gap between education and real-world application. 
                            Develop skills that matter in today's technology-driven world.
                        </motion.p>
                        
                        <motion.div 
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                        >
                            <Button size="lg" className="rounded-lg px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                                Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-lg px-8 py-6 text-base font-semibold border-2">
                                Schedule Tour
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div 
                            variants={staggerContainer}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
                        >
                            {[
                                { icon: Users, value: "500+", label: "Students Trained" },
                                { icon: Trophy, value: "50+", label: "Industry Projects" },
                                { icon: Star, value: "4.9/5", label: "Student Rating" },
                                { icon: Calendar, value: "100%", label: "Placement Support" }
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    variants={scaleIn}
                                    className="bg-card rounded-xl p-6 border hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <stat.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-2xl font-bold">{stat.value}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Programs */}
            <section className="py-20 md:py-28 bg-card/50">
                <div className="container px-4 md:px-6 mx-auto">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary mb-6">
                            <span className="text-sm font-semibold text-primary">FEATURED PROGRAMS</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Comprehensive Learning Paths
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Deep dive into specialized fields with our flagship programs designed by industry experts
                        </motion.p>
                    </motion.div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading programs...</p>
                        </div>
                    ) : (
                        <div className="space-y-24">
                            {programs.map((program: any, index) => {
                                const Icon = iconMap[program.icon];
                                const isEven = index % 2 === 0;
                                
                                return (
                                    <motion.div 
                                        key={program._id} 
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        variants={isEven ? slideInLeft : slideInRight}
                                        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full lg:w-1/2">
                                            <div className="relative group">
                                                <motion.div 
                                                    className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                                                    whileHover={{ scale: 1.02 }}
                                                />
                                                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
                                                    <img
                                                        src={program.image?.url || STEM_IMAGES[index % STEM_IMAGES.length]}
                                                        alt={program.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                    <div className="absolute bottom-6 left-6">
                                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                                            <Clock className="w-4 h-4 text-white" />
                                                            <span className="text-sm font-medium text-white">12-Week Program</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="w-full lg:w-1/2">
                                            <div className="space-y-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                            {Icon && <Icon className="w-6 h-6 text-primary" />}
                                                        </div>
                                                        <div className="text-left">
                                                            <span className="text-sm font-semibold text-primary block">{program.subtitle}</span>
                                                            <span className="text-xs text-muted-foreground">Advanced Certification</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                                                        {program.title}
                                                    </h3>
                                                    
                                                    <p className="text-muted-foreground leading-relaxed mb-8">
                                                        {program.description}
                                                    </p>
                                                </div>

                                                <div className="space-y-4 mb-8">
                                                    <h4 className="font-semibold text-lg">Key Learning Outcomes:</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {program.features?.slice(0, 6).map((feature: any, idx: number) => (
                                                            <motion.div 
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                whileInView={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                                viewport={{ once: true }}
                                                                className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-secondary/50 transition-colors"
                                                            >
                                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                                <span className="text-sm font-medium">{feature}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-4">
                                                    <Button size="lg" className="rounded-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                                                        Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                                                    </Button>
                                                    <Button variant="outline" size="lg" className="rounded-lg px-8 py-6 font-semibold border-2">
                                                        Download Syllabus
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Additional Programs */}
            <section className="py-20 md:py-28">
                <div className="container px-4 md:px-6 mx-auto">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary mb-6">
                            <span className="text-sm font-semibold text-primary">SPECIALIZED TRACKS</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Focused Learning Paths
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Master specific technologies with our intensive focused programs
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {additionalPrograms.map((program: any, index) => {
                            const Icon = iconMap[program.icon];
                            
                            return (
                                <motion.div
                                    key={program._id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={scaleIn}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className="group"
                                >
                                    <div className="bg-card rounded-xl border p-8 h-full hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {Icon && <Icon className="w-7 h-7 text-primary" />}
                                        </div>
                                        
                                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                                            {program.title}
                                        </h3>
                                        
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {program.description}
                                        </p>
                                        
                                        <div className="pt-6 border-t border-border">
                                            <Button 
                                                variant="ghost" 
                                                className="w-full justify-between px-0 hover:bg-transparent group-hover:text-primary"
                                            >
                                                <span className="font-medium">Explore Program</span>
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <div className="container px-4 md:px-6 mx-auto">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div 
                            variants={scaleIn}
                            className="bg-gradient-to-br from-card to-card/80 rounded-3xl p-8 md:p-12 border shadow-2xl overflow-hidden relative"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent rounded-full translate-y-1/2 -translate-x-1/2" />
                            </div>
                            
                            <div className="relative z-10 text-center">
                                <motion.div variants={fadeInUp}>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Ready to Launch Your STEM Career?
                                    </h2>
                                    
                                    <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                                        Join our community of innovators and take the first step toward a future in technology. 
                                        Our advisors are ready to help you choose the perfect program.
                                    </p>
                                </motion.div>
                                
                                <motion.div 
                                    variants={fadeInUp}
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                >
                                    <Button size="lg" className="rounded-lg px-10 py-7 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                                        Schedule Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                    <Button variant="outline" size="lg" className="rounded-lg px-10 py-7 text-base font-semibold border-2">
                                        View All Programs
                                    </Button>
                                </motion.div>
                                
                                <motion.div 
                                    variants={fadeInUp}
                                    className="mt-10 pt-8 border-t border-border"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        Limited spots available • Next cohort starts in 2 weeks
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Programs;