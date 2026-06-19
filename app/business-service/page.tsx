"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight, Building2, Landmark, LineChart,
    Briefcase, Handshake, Zap, ShieldCheck, Target, ChevronRight
} from 'lucide-react';
import { NewButton } from '@/components/ui/new-button';
// Ensure this path matches where your MeetingSelectionModal is located
import MeetingSelectionModal from '@/components/MeetingSelectionModal';

export default function BusinessServicesPage() {
    // 1. State to control the Meeting Modal
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

    const services = [
        {
            title: "Business Formation & Registration",
            description: "Start your business with confidence. We assist entrepreneurs with business entity formation, state registration, EIN acquisition guidance, and foundational business setup services.",
            icon: <Handshake size={28} className="text-[#042f24]" strokeWidth={2} />,
            color: "bg-emerald-100"
        },
        {
            title: "Merchant Services & Credit Card Processing",
            description: "Access reliable payment processing solutions designed to help businesses accept credit cards, debit cards, mobile payments, and online transactions while improving cash flow and customer convenience.",
            icon: <Zap size={28} className="text-white" strokeWidth={2} />,
            color: "bg-[#2f74c0]"
        },
        {
            title: "Business Tax Preparation",
            description: "Stay compliant and organized with professional business tax preparation services for corporations, partnerships, LLCs, and sole proprietorships.",
            icon: <Handshake size={28} className="text-[#042f24]" strokeWidth={2} />,
            color: "bg-emerald-100"
        },
        {
            title: "Tax Planning Strategies",
            description: "Reduce tax liabilities and maximize profitability through proactive tax planning. Our network of tax professionals can help identify strategies that support your business and financial goals.",
            icon: <Landmark size={28} className="text-white" strokeWidth={2} />,
            color: "bg-[#2f74c0]"
        },
        {
            title: "Business Brokerage Services",
            description: "Whether you're buying, selling, or valuing a business, our business brokerage partners provide guidance throughout the transaction process, helping business owners achieve successful outcomes.",
            icon: <LineChart size={28} className="text-[#042f24]" strokeWidth={2} />,
            color: "bg-emerald-100"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#042f24] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#0a6c50]/20 blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[100px]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 font-headline">
                        Empowering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                            Enterprise Growth.
                        </span>
                    </h1>

                    <p className="mt-4 text-xl text-slate-300 max-w-6xl mx-auto leading-relaxed">
                        At Stratmire Capital Partners LLC, we do more than help businesses secure capital. Through our network of trusted professionals and strategic partners, we provide essential business services designed to support growth, profitability, and long-term success.
                    </p>
                </div>
            </section>

            {/* 2. CORE SERVICES GRID */}
            <section className="py-24 bg-white relative z-20 -mt-8 rounded-t-[3rem] border-t border-slate-200 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a6c50] tracking-tight mb-4 uppercase">
                            Our Business Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md ${service.color} group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#042f24] mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm mb-8 flex-grow">
                                    {service.description}
                                </p>

                                {/* Properly styled card button triggering the modal */}
                                <button
                                    onClick={() => setIsMeetingModalOpen(true)}
                                    className="w-full mt-auto bg-[#2f74c0] hover:bg-[#205b99] text-white font-bold py-3.5 px-4 rounded-lg transition-colors text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.98]"
                                >
                                    Schedule Meet with an expert
                                </button>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-[#042f24] tracking-tight font-headline mb-6">
                                Not Just a Lender.<br />A Strategic <span className="text-[#0a6c50]">Financial Partner.</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We understand that commercial success requires more than just capital—it requires speed, flexibility, and intelligent structuring. Our dedicated corporate finance team evaluates the unique mechanics of your business to deploy funds efficiently.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0 bg-[#0a6c50]/10 p-2 rounded-lg">
                                        <Target className="text-[#0a6c50]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Custom-Tailored Terms</h4>
                                        <p className="text-slate-600 text-sm mt-1">We don't use cookie-cutter formulas. Every loan is customized to your cash flow, collateral, and timeline.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0 bg-emerald-100 p-2 rounded-lg">
                                        <Zap className="text-[#042f24]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Rapid Deployment</h4>
                                        <p className="text-slate-600 text-sm mt-1">Opportunities don't wait. Our streamlined underwriting process ensures you have liquidity when it matters most.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0 bg-[#0a6c50]/10 p-2 rounded-lg">
                                        <ShieldCheck className="text-[#0a6c50]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Absolute Confidentiality</h4>
                                        <p className="text-slate-600 text-sm mt-1">Your corporate data is secured in our encrypted digital vault, ensuring total privacy during mergers or sensitive transactions.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[3rem] bg-[#042f24] p-8 relative overflow-hidden shadow-2xl border border-slate-200">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#042f24] to-[#0a6c50] opacity-20"></div>
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
            <section className="py-24 bg-white relative">
                <div className="absolute left-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-slate-200 fill-current transform -scale-x-100">
                        <polygon points="100,0 0,100 100,100" />
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-headline mb-6">
                        Take the Next Step Today
                    </h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                        Schedule a Consultation to speak with one of our experts.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <span onClick={() => setIsMeetingModalOpen(true)}>
                            <NewButton variant='primary'>Schedule Meet with an expert</NewButton>
                        </span>
                    </div>
                </div>
            </section>

            {/* 5. THE MEETING MODAL COMPONENT */}
            <MeetingSelectionModal
                isOpen={isMeetingModalOpen}
                onClose={() => setIsMeetingModalOpen(false)}
            />

        </div>
    );
}