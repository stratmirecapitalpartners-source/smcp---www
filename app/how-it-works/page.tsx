import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { Target, Search, Building, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
    const steps = [
        {
            step: "01",
            title: "Strategic Discovery",
            description: "We initiate with a high-level consultation to understand your specific capital requirements, timeline, and the underlying asset. We don't just take applications; we architect financial solutions tailored to your enterprise goals.",
            icon: <Target className="w-8 h-8 text-[#D4AF37]" />
        },
        {
            step: "02",
            title: "Underwriting & Structuring",
            description: "Our team conducts an accelerated, institutional-grade analysis of your financials and property data. We identify the strongest positioning for your file to ensure maximum leverage and optimal terms before it ever hits the market.",
            icon: <Search className="w-8 h-8 text-[#D4AF37]" />
        },
        {
            step: "03",
            title: "Capital Placement",
            description: "Leveraging our expansive network of private investors, family offices, and institutional lenders, we deploy your structured request. We force lenders to compete, driving down your cost of capital and securing the most aggressive terms available.",
            icon: <Building className="w-8 h-8 text-[#D4AF37]" />
        },
        {
            step: "04",
            title: "Execution & Funding",
            description: "Once terms are accepted, we drive the deal through processing, appraisal, and title with relentless velocity. We clear stipulations proactively, ensuring a seamless transition from commitment to a successful, on-time closing.",
            icon: <Zap className="w-8 h-8 text-[#D4AF37]" />
        }
    ];

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">

            {/* Premium Hero Section */}
            <section className="bg-[#042f24] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#042f24] via-[#042f24]/80 to-transparent"></div>
                {/* Subtle background abstract glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/4"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
                    <span className="text-teal-400 font-bold tracking-[0.2em] text-xs uppercase block mb-4">
                        The Process
                    </span>
                    <h1 className="text-white font-black text-4xl md:text-6xl tracking-tight mb-6 leading-tight">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Velocity.</span>
                    </h1>
                    <p className="text-emerald-50/80 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Securing commercial capital shouldn't be a black box. We provide a transparent,
                        high-performance framework that accelerates your path from application to funding.
                    </p>
                </div>
            </section>

            {/* The Timeline Section */}
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-24 w-full relative">
                {/* Vertical Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent -translate-x-1/2"></div>

                <div className="space-y-16 md:space-y-24 relative z-10">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                            {/* Content Box */}
                            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <div className={`bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl hover:border-emerald-500/20 transition-all duration-300 group`}>
                                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                        {/* Render icon differently based on side for visual balance */}
                                        {index % 2 !== 0 && (
                                            <div className="bg-[#042f24] p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                                                {step.icon}
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{step.title}</h3>
                                        {index % 2 === 0 && (
                                            <div className="bg-[#042f24] p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                                                {step.icon}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center Node */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-[#042f24] rounded-full items-center justify-center shadow-xl z-20">
                                <span className="text-[#042f24] font-black text-sm">{step.step}</span>
                            </div>

                            {/* Empty Space for Grid Alignment */}
                            <div className="hidden md:block w-1/2"></div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Action CTA Section using the brand gradient */}
            <section className="w-full bg-gradient-to-br from-[#042f24] via-[#064c3a] to-[#0a6c50] py-20 px-4 sm:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/stratmire-waves.svg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Ready to structure your next deal?
                    </h2>
                    <p className="text-emerald-50 text-lg md:text-xl font-medium max-w-xl mx-auto">
                        Bypass the red tape. Partner with a brokerage that moves at the speed of your ambition.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/apply"
                            className="bg-white text-[#042f24] px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
                        >
                            Get Pre-Qualified Now <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                            Speak with an Advisor
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}