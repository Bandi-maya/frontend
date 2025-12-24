"use client"
import { ArrowRight, Calendar, Users, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/axios";
import { apiUrl } from "@/lib/constants";
import Link from "next/link";

const iconMap: any = {
    Users,
    BookOpen,
    Trophy,
    Calendar,
};

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [additionalPrograms, setAdditionalPrograms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const main = await apiFetch("/programs/main");
            const additional = await apiFetch("/programs/additional");
            setPrograms(main);
            setAdditionalPrograms(additional);
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="bg-secondary py-16 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        STEM Programs
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Transformative learning experiences that inspire creativity and innovation.
                    </p>
                </div>
            </section>

            {/* Main Programs */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 space-y-20">
                    {programs.map((program: any, index) => {
                        const Icon = iconMap[program.icon];
                        return (
                            <div
                                key={program._id}
                                className="grid lg:grid-cols-2 gap-12 items-center"
                            >
                                <img
                                    src={apiUrl.replace('/api', '') + program?.image?.url}
                                    alt={program.title}
                                    className="rounded-2xl shadow-xl h-80 lg:h-96 w-full object-cover"
                                />

                                <div>
                                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 bg-primary/10 text-primary`}>
                                        {Icon && <Icon className="w-4 h-4" />}
                                        <span className="text-sm font-semibold">{program.subtitle}</span>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                        {program.title}
                                    </h2>

                                    <p className="text-muted-foreground text-lg mb-6">
                                        {program.description}
                                    </p>

                                    <ul className="grid grid-cols-2 gap-3 mb-8">
                                        {program.features.map((feature: any) => (
                                            <li key={feature} className="flex gap-2 items-center">
                                                <span className="text-sm font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/contact">
                                        <Button size="lg" className="gap-2">
                                            Enroll Now <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Additional Programs */}
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {additionalPrograms.map((program: any) => {
                        const Icon = iconMap[program.icon];
                        return (
                            <div key={program._id} className="bg-card p-8 rounded-2xl border">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    {Icon && <Icon className="w-7 h-7 text-primary" />}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                                <p className="text-muted-foreground mb-4">
                                    {program.description}
                                </p>
                                <Link href="/contact" className="text-primary font-semibold">
                                    Learn More →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Programs;
