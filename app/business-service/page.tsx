"use client"
import React from 'react';
import Link from 'next/link';
import {
    ArrowRight, Building2, Landmark, LineChart,
    Briefcase, Handshake, Zap, ShieldCheck, Target, ChevronRight
} from 'lucide-react';
import { NewButton } from '@/components/ui/new-button';

export default function BusinessServicesPage() {
    const services = [
        {
            title: "Commercial Real Estate Financing",
            description: "From acquisition and development to refinancing existing properties, we provide tailored capital stacks for multi-family, retail, office, and industrial assets.",
            icon: <Building2 size={28} className="text-brand-dark" strokeWidth={2} />,
            color: "bg-secondary/90"
        },
        {
            title: "Business Expansion Capital",
            description: "Access high-leverage working capital and bridge loans designed to fund your next phase of growth, scale operations, or cover immediate cash-flow gaps.",
            icon: <Zap size={28} className="text-white" strokeWidth={2} />,
            color: "bg-primary"
        },
        {
            title: "Mergers & Acquisitions (M&A)",
            description: "Secure the necessary liquidity to execute strategic buyouts, partner buy-ins, or competitor acquisitions with our specialized corporate funding structures.",
            icon: <Handshake size={28} className="text-brand-dark" strokeWidth={2} />,
            color: "bg-secondary/90"
        },
        {
            title: "Asset-Based Lending",
            description: "Leverage your existing company assets—including accounts receivable, inventory, and heavy equipment—to unlock immediate, non-dilutive liquidity.",
            icon: <Landmark size={28} className="text-white" strokeWidth={2} />,
            color: "bg-primary"
        },
        {
            title: "Strategic Financial Advisory",
            description: "Beyond capital, our senior partners provide expert debt structuring, risk assessment, and long-term financial planning to optimize your balance sheet.",
            icon: <LineChart size={28} className="text-brand-dark" strokeWidth={2} />,
            color: "bg-secondary/90"
        },
        {
            title: "Franchise & Equipment Funding",
            description: "Rapidly scale your franchise footprint or upgrade critical operational technology and heavy machinery with specialized, fast-closing equipment finance.",
            icon: <Briefcase size={28} className="text-white" strokeWidth={2} />,
            color: "bg-primary"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-dark overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="text-white text-xs font-bold tracking-widest uppercase">Corporate Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 font-headline">
                        Empowering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-fixed">
                            Enterprise Growth.
                        </span>
                    </h1>

                    <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive capital solutions and strategic advisory services designed to scale your business without constraints.
                    </p>
                </div>
            </section>

            {/* 2. CORE SERVICES GRID */}
            <section className="py-24 bg-white relative z-20 -mt-8 rounded-t-[3rem] border-t border-slate-200 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-dark tracking-tight mb-4 font-headline">
                            Our <span className="text-primary">Business Services</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Stratmire Capital Partners provides a robust suite of financial products engineered to meet the complex demands of modern enterprises.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md ${service.color} group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. THE STRATMIRE APPROACH */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight font-headline mb-6">
                                Not Just a Lender.<br />A Strategic <span className="text-primary">Financial Partner.</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We understand that commercial success requires more than just capital—it requires speed, flexibility, and intelligent structuring. Our dedicated corporate finance team evaluates the unique mechanics of your business to deploy funds efficiently.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0 bg-primary/10 p-2 rounded-lg">
                                        <Target className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Custom-Tailored Terms</h4>
                                        <p className="text-slate-600 text-sm mt-1">We don't use cookie-cutter formulas. Every loan is customized to your cash flow, collateral, and timeline.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0 bg-secondary/20 p-2 rounded-lg">
                                        <Zap className="text-brand-dark" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Rapid Deployment</h4>
                                        <p className="text-slate-600 text-sm mt-1">Opportunities don't wait. Our streamlined underwriting process ensures you have liquidity when it matters most.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0 bg-primary/10 p-2 rounded-lg">
                                        <ShieldCheck className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Absolute Confidentiality</h4>
                                        <p className="text-slate-600 text-sm mt-1">Your corporate data is secured in our encrypted digital vault, ensuring total privacy during mergers or sensitive transactions.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[3rem] bg-brand-dark p-8 relative overflow-hidden shadow-2xl border border-slate-200">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-primary opacity-20"></div>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Corporate Business Discussion"
                                    className="w-full h-full object-cover rounded-[2rem] relative z-10 opacity-90"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CALL TO ACTION SECTION */}
            <section className="py-24 ">
                <div className="absolute left-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white fill-current transform -scale-x-100">
                        <polygon points="100,0 0,100 100,100" />
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-headline mb-6">
                        Fuel Your Next Big Move
                    </h2>
                    <p className="text-lg text-gray-900 mb-10 max-w-2xl mx-auto">
                        Whether you are expanding operations or acquiring new assets, our commercial underwriters are ready to structure your capital solution.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NewButton variant="primary">
                            <Link
                                href="/business-loan"
                            >
                                Apply for Business Funding
                            </Link>
                        </NewButton>
                        <NewButton variant='secondary'>
                            <Link
                                href="/about"
                            >
                                Learn More About Us
                            </Link>
                        </NewButton>
                    </div>
                </div>
            </section >

        </div >
    );
}