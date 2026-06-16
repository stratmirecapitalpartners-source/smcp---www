"use client"
import { ChevronDown, Zap, Star } from 'lucide-react'
import React, { useState } from 'react'
import LoanSelectionModal from '@/components/LoanPopup'
import MeetingSelectionModal from '@/components/MeetingSelectionModal' // <-- Import the new modal
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const Team = () => {
    // Setup separate states for both modals
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isMeetModalOpen, setIsMeetModalOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const [isRouting, setIsRouting] = useState(false);

    const handleScenarioClick = async () => {
        setIsRouting(true);

        // 1. Check if they are logged in at all
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // Not logged in -> Send to partner login
            router.push('/become-partner/login');
            return;
        }

        // 2. If logged in, check their partner approval status
        const { data: partner } = await supabase
            .from('loan_partners')
            .select('status')
            .eq('email', user.email)
            .single();

        // 3. Execute final routing based on database status
        if (partner?.status === 'APPROVED') {
            router.push('/partner/dealform'); // Where the scenario form lives
        } else {
            router.push('/become-partner'); // Not approved or doesn't exist
        }

        setIsRouting(false);
    };
    return (
        <section className="bg-slate-50 py-32 px-4 sm:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-secondary">
                        Become a Partner
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-6xl mx-auto">
                        Build predictable revenue by helping business owners and real estate investors access
                        the capital they need to grow. Whether you&apos;re looking to generate additional income
                        through referrals or build a scalable business with a team, Stratmire Capital Partners
                        provides the platform, support, and lending network to help you succeed.
                        <br />
                        <span className='mt-4 block'>Choose the partnership level that aligns with your goals and income objectives.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* --- LEVEL 1: STARTER CARD --- */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-xl space-y-10 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0a6c50]"></div>

                        <div className="border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[#0a6c50]/10 p-2 rounded-lg">
                                    <Zap size={24} className="text-[#0a6c50]" />
                                </div>
                                <h2 className="font-black text-3xl md:text-4xl text-slate-900 tracking-tight">
                                    Level 1 <span className="text-[#0a6c50] font-bold text-2xl md:text-3xl ml-1">(Starter)</span>
                                </h2>
                            </div>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                Designed for professionals who want to focus on their own production and
                                referral activity.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* 01 Upfront Investment */}
                            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 border border-slate-100 hover:border-[#0a6c50]/30">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-slate-900">Upfront Investment</h3>
                                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6">
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                        Designed for individuals who want to generate personal production while
                                        building and leading a team of Loan Partners.
                                    </p>
                                </div>
                            </details>

                            {/* 02 Commission split */}
                            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 border border-slate-100 hover:border-[#0a6c50]/30">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-slate-900">Commission split</h3>
                                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6">
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                        50% Commission on funded deals.
                                    </p>
                                </div>
                            </details>

                            {/* 03 Referral Comission */}
                            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 border border-slate-100 hover:border-[#0a6c50]/30">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-slate-900">Referral Commission</h3>
                                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6">
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                        10% Commission on referral first closed business.
                                    </p>
                                </div>
                            </details>

                            {/* 04 Comission Restrictions */}
                            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 border border-slate-100 hover:border-[#0a6c50]/30">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-slate-900">Commission Restrictions</h3>
                                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6 space-y-3">
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                        Referral commissions are only activated after the referring consultant closes their first funded transaction.
                                    </p>
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                        Commission received from referral expires 60 days after loan was closed if the referring party has not closed a deal.
                                    </p>
                                </div>
                            </details>

                            {/* 05 Production Requirements */}
                            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 border border-slate-100 hover:border-[#0a6c50]/30">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-slate-900">Production Requirements</h3>
                                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6">
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                        No Minimum production requirement.
                                    </p>
                                </div>
                            </details>

                            <button onClick={() => router.push("/become-partner")}
                                className="w-full mt-4 bg-[#0a6c50] text-white px-6 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-[#085a42] transition-colors shadow-lg shadow-[#0a6c50]/20 uppercase">
                                Apply as Starter
                            </button>
                        </div>
                    </div>

                    {/* --- LEVEL 2: PRODUCER CARD (PREMIUM) --- */}
                    <div className="bg-[#042f24] rounded-2xl border border-[#0a6c50]/50 p-8 lg:p-10 shadow-2xl space-y-10 relative overflow-hidden flex flex-col">
                        {/* Premium Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#F1DE8B]"></div>

                        <div className="border-b border-[#0a6c50]/30 pb-8 relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[#D4AF37]/20 p-2 rounded-lg border border-[#D4AF37]/30">
                                    <Star size={24} className="text-[#D4AF37] fill-[#D4AF37]/20" />
                                </div>
                                <h2 className="font-black text-3xl md:text-4xl text-white tracking-tight">
                                    Level 2 <span className="text-[#D4AF37] font-bold text-2xl md:text-3xl ml-1">(Producer)</span>
                                </h2>
                            </div>
                            <p className="text-emerald-50/80 font-medium text-lg leading-relaxed">
                                Designed for individuals who want to generate personal production while
                                building and leading a team of Loan Partners.
                            </p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {/* 01 Upfront Investment */}
                            <details className="group bg-[#074233] rounded-xl overflow-hidden transition-all duration-300 border border-emerald-900 hover:border-[#D4AF37]/50">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-white">Upfront Investment</h3>
                                    <ChevronDown size={20} className="text-[#D4AF37] group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6">
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        No upfront investment required.
                                    </p>
                                </div>
                            </details>

                            {/* 02 Commission split */}
                            <details className="group bg-[#074233] rounded-xl overflow-hidden transition-all duration-300 border border-emerald-900 hover:border-[#D4AF37]/50">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-white">Commission split</h3>
                                    <ChevronDown size={20} className="text-[#D4AF37] group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6">
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        <strong className="text-[#D4AF37]">60% Commission</strong> on funded deals.
                                    </p>
                                </div>
                            </details>

                            {/* 03 Referral Comission */}
                            <details className="group bg-[#074233] rounded-xl overflow-hidden transition-all duration-300 border border-emerald-900 hover:border-[#D4AF37]/50">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-white">Referral Commission</h3>
                                    <ChevronDown size={20} className="text-[#D4AF37] group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6 space-y-3">
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        <strong className="text-white">15% Commission</strong> on referral first closed business.
                                    </p>
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed bg-[#042f24] p-3 rounded-lg border border-[#0a6c50]/50">
                                        <strong className="text-[#D4AF37]">Bonus:</strong> 5% Lifetime trail on team production.
                                    </p>
                                </div>
                            </details>

                            {/* 04 Comission Restrictions */}
                            <details className="group bg-[#074233] rounded-xl overflow-hidden transition-all duration-300 border border-emerald-900 hover:border-[#D4AF37]/50">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-white">Commission Restrictions</h3>
                                    <ChevronDown size={20} className="text-[#D4AF37] group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6 space-y-3">
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        Referral commissions are only activated after the referring consultant closes their first funded transaction.
                                    </p>
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        Commission received from referral expires 60 days after loan was closed if the referring party has not closed a deal.
                                    </p>
                                </div>
                            </details>

                            {/* 05 Production Requirements */}
                            <details className="group bg-[#074233] rounded-xl overflow-hidden transition-all duration-300 border border-emerald-900 hover:border-[#D4AF37]/50">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                                    <h3 className="font-bold text-base text-white">Production Requirements</h3>
                                    <ChevronDown size={20} className="text-[#D4AF37] group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-5 pb-6 space-y-3">
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        Each team must have at least <strong className="text-white">5 members</strong>, not including the team lead.
                                    </p>
                                    <p className="text-emerald-100/80 font-medium text-sm leading-relaxed">
                                        Team lead must close <strong className="text-white">4 deals each year</strong> to maintain team lead status.
                                    </p>
                                </div>
                            </details>

                            <button onClick={() => router.push("/become-partner")}
                                className="w-full mt-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA054] text-[#042f24] px-6 py-4 rounded-xl font-bold text-sm tracking-wide hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 uppercase">
                                Apply as Producer
                            </button>
                        </div>
                    </div>

                </div>
                <div className="text-center mt-16">
                    <span className="text-slate-500 font-medium">Questions? Reach out to <a href="mailto:info@startmirecapitalpartners.com" className="text-[#0a6c50] hover:underline">info@startmirecapitalpartners.com</a>.</span>
                </div>
            </div>
        </section>
    )
}

export default Team