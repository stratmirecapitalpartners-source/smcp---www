"use client"
import React from 'react';
import Link from 'next/link';
import {
    MapPin, Phone, Mail, ArrowRight,
    Clock, Percent, Users, ShieldCheck,
    Handshake, Lightbulb, Heart, Shield,
    Target, TrendingUp, Globe, Briefcase,
    ChevronRight, CheckCircle2
} from 'lucide-react';
import { NewButton } from '@/components/ui/new-button';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans antialiased overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-dark overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]"></div>
                    <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="text-white text-xs font-bold tracking-widest uppercase">About Us</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 font-headline">
                        Capital Without Limits.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-fixed">
                            Solutions Without Compromise.
                        </span>
                    </h1>

                    <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We bridge the gap between ambition and execution, delivering institutional-grade capital with the speed and precision of a private partner.
                    </p>
                </div>
            </section>

            {/* 2. STATS BANNER (OVERLAPPING HERO) */}
            <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-6 lg:px-8 ">
                <div className="bg-white rounded-2xl shadow-2xl shadow-brand-dark/10  border border-slate-100 p-8 md:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100">
                        {/* <div className="text-center px-4 mb-6 md:mb-0">
                            <h4 className="text-4xl font-black text-primary mb-2">$4.2B+</h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capital Deployed</p>
                        </div> */}
                        <div className="text-center px-4 mb-6 md:mb-0">
                            <h4 className="text-4xl font-black text-primary mb-2">500+</h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institutional Partners</p>
                        </div>
                        <div className="text-center px-4 mb-6 md:mb-0">
                            <h4 className="text-4xl font-black text-primary mb-2">15+</h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Years Experience</p>
                        </div>
                        <div className="text-center px-4">
                            <h4 className="text-4xl font-black text-primary mb-2">40</h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">States Covered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHY CHOOSE STRATMIRE SECTION */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight mb-4 font-headline">
                        Why Choose Stratmire Capital Partners LLC?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-16">
                        We combine industry expertise with personalized service to deliver exceptional loan solutions tailored to your unique needs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow bg-white">
                            <div className="w-16 h-16 bg-secondary/90 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                <Clock size={28} className="text-brand-dark" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Processing</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Quick loan approvals with our streamlined process. Fast turnaround times to get you your new property.
                            </p>
                        </div>
                        <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow bg-white">
                            <div className="w-16 h-16 bg-secondary/90 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                <Percent size={28} className="text-brand-dark" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Competitive Rates</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Access to some of the most competitive interest rates in the market, saving you thousands over the life of your loan.
                            </p>
                        </div>
                        <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow bg-white">
                            <div className="w-16 h-16 bg-secondary/90 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                <Users size={28} className="text-brand-dark" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Guidance</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Our specialists provide personalized guidance throughout your entire investing journey.
                            </p>
                        </div>
                        <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow bg-white">
                            <div className="w-16 h-16 bg-secondary/90 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                <ShieldCheck size={28} className="text-brand-dark" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Trusted Service</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Licensed and regulated with a proven track record of helping people achieve their goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. BENTO GRID: OUR MISSION & VALUES */}
            <section className="py-24 bg-secondary rouded-xl">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-headline">
                            Engineered for <span className="text-primary">Growth.</span>
                        </h2>
                        <p className="mt-4 text-lg text-white max-w-2xl">
                            Traditional financing moves too slowly and imposes rigid constraints. We were founded on a simple premise: capital should empower your business, not restrict it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-brand-dark rounded-3xl p-10 lg:p-12 relative overflow-hidden group hover:shadow-xl transition-all">
                            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                                <Target size={240} />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mb-8">
                                    <Target className="text-secondary" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Precision Execution</h3>
                                    <p className="text-slate-300 leading-relaxed max-w-md">
                                        We execute with exactness. Every term sheet, underwriting model, and funding schedule is meticulously crafted to eliminate friction and accelerate your closing timeline.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Shield className="text-primary" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Uncompromising Integrity</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Absolute transparency from day one. We do not sugarcoat terms or hide fees. We communicate reality so you can make informed decisions.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Users className="text-secondary" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">True Partnership</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                We view our borrowers and brokers as long-term partners. Your operational and financial success is directly tied to our institutional success.
                            </p>
                        </div>

                        <div className="md:col-span-2 bg-gradient-to-br from-primary to-[#1a4a8c] rounded-3xl p-10 lg:p-12 relative overflow-hidden group hover:shadow-xl transition-all text-white">
                            <div className="absolute right-0 top-0 opacity-10 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                                <Globe size={240} />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                                    <TrendingUp className="text-white" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Scalable, Forward-Looking Capital</h3>
                                    <p className="text-white/80 leading-relaxed max-w-md">
                                        We do not just look at past performance; we underwrite the future potential of your projects. From initial bridge loans to massive commercial acquisitions, our funding scales with you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. OUR VALUES SECTION */}
            <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-headline mb-4">
                                Our Values
                            </h2>
                            <p className="text-lg text-slate-600 mb-10">
                                We're built on a foundation of integrity, transparency, and genuine care for our clients' financial well-being.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-14 h-14 bg-secondary/90 rounded-2xl flex items-center justify-center shrink-0">
                                        <Handshake size={24} className="text-brand-dark" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">Integrity First</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            We believe in honest, transparent communication and always put our clients' best interests first.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-14 h-14 bg-secondary/90 rounded-2xl flex items-center justify-center shrink-0">
                                        <Lightbulb size={24} className="text-brand-dark" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">Innovation</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            We continuously improve our processes and technology to provide the best possible experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-14 h-14 bg-secondary/90 rounded-2xl flex items-center justify-center shrink-0">
                                        <Heart size={24} className="text-brand-dark" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">Customer-Centric</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Every decision we make is guided by how it will benefit our clients.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-full min-h-[400px] relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                                alt="Business meeting signing contracts with architectural models"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. THE STRATMIRE ADVANTAGE (Checklist) */}
            <section className="py-24 bg-secondary rounded-xl">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative hidden md:block">
                            <div className="aspect-square rounded-[3rem] bg-white border border-slate-200 p-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-primary opacity-5"></div>
                                <div className="h-full w-full rounded-[2rem] bg-brand-dark flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <Briefcase size={64} className="text-secondary mb-6 relative z-10" />
                                    <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Built for Brokers & Borrowers</h3>
                                    <p className="text-slate-300 text-sm relative z-10">Streamlined onboarding, rapid underwriting, and guaranteed payouts.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-headline mb-8">
                                The Stratmire Advantage
                            </h2>
                            <div className="space-y-6 text-white">
                                {[
                                    "No upfront fees or hidden underwriting costs.",
                                    "Direct access to decision-makers and senior underwriters.",
                                    "Custom-tailored structures for complex commercial scenarios.",
                                    "Industry-leading turnaround times for term sheets.",
                                    "Secure, encrypted digital vault for all document handling."
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0">
                                            <CheckCircle2 className="text-secondary" size={24} />
                                        </div>
                                        <p className="text-lg text-white font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-10 border-t border-slate-200">
                                <Link href="/userjourney" className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-primary/80 transition-colors">
                                    Submit your scenario today <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CONTACT / CTA SECTION */}
            <section className="py-24">
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-gray-900 fill-current">
                        <polygon points="100,0 0,100 100,100" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-headline mb-6">
                                Ready to accelerate <br /><span className="text-secondary">your timeline?</span>
                            </h2>
                            <p className="text-lg text-gray-900 mb-10 max-w-md">
                                Speak directly with an underwriter or submit your scenario securely through our vault to get started.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <NewButton variant="primary">
                                    <Link
                                        href="/userjourney"
                                    >
                                        Apply Now
                                    </Link>
                                </NewButton>
                                <NewButton variant="secondary">
                                    <Link
                                        href="/become-partner/team"
                                    >
                                        Become a Partner
                                    </Link>
                                </NewButton>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-headline">Corporate Headquarters</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                        <MapPin className="text-secondary" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">Stratmire Capital Partners LLC</p>
                                        <p className="mt-2 text-gray-900 leading-relaxed">3020 West New Haven Avenue<br />Suite 133<br />Melbourne, FL 32904</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                        <Phone className="text-secondary" size={24} />
                                    </div>
                                    <a href="tel:855-202-1312" className="text-lg text-gray-900 hover:text-gray-900 transition-colors">855-202-1312</a>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                        <Mail className="text-secondary" size={24} />
                                    </div>
                                    <a href="mailto:info@stratmirecapitalpartners.com" className="text-lg text-gray-900 break-all sm:break-normal hover:text-gray-900 transition-colors">info@stratmirecapitalpartners.com</a>
                                </div>
                            </div>
                        </div>
                    </div>``
                </div>
            </section>

        </div>
    );
}