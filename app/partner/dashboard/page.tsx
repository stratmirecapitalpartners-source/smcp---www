"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutGrid, Users, DollarSign, FolderOpen, Settings,
    Bell, Copy, CheckCircle2, TrendingUp, ArrowRight,
    Activity, Target, UserPlus
} from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function PartnerDashboard() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [partnerCode, setPartnerCode] = useState('Loading...');
    const [partnerName, setPartnerName] = useState('Loading...');

    // Data States
    const [referrals, setReferrals] = useState<any[]>([]);
    const [referredPartners, setReferredPartners] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Initialize Supabase Client
    const supabase = createClient();

    useEffect(() => {
        async function fetchDashboardData() {
            // 1. Get the currently logged-in user
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // 2. Query the database for this specific user's partner code and name
                const { data: partnerData } = await supabase
                    .from('loan_partners')
                    .select('partner_code, first_name, last_name')
                    .eq('email', user.email)
                    .single();

                if (partnerData) {
                    if (partnerData.partner_code) {
                        setPartnerCode(partnerData.partner_code);
                    } else {
                        setPartnerCode('CODE-NOT-FOUND');
                    }

                    // Set the dynamic partner name
                    const fullName = `${partnerData.first_name || ''} ${partnerData.last_name || ''}`.trim();
                    setPartnerName(fullName || 'Partner');

                    // 3. Fetch all borrowers who used this partner's code
                    if (partnerData.partner_code) {
                        const { data: borrowersData, error: borrowersError } = await supabase
                            .from('borrowers')
                            .select('*')
                            .eq('referring_partner_code', partnerData.partner_code)
                            .order('created_at', { ascending: false });

                        if (!borrowersError && borrowersData) {
                            setReferrals(borrowersData);
                        }

                        // 4. Fetch all PARTNERS who signed up using this partner's code
                        const { data: partnersData, error: partnersError } = await supabase
                            .from('loan_partners')
                            .select('*')
                            .eq('referring_partner_code', partnerData.partner_code)
                            .order('created_at', { ascending: false });

                        if (!partnersError && partnersData) {
                            setReferredPartners(partnersData);
                        }
                    }

                } else {
                    setPartnerCode('CODE-NOT-FOUND');
                    setPartnerName('Partner');
                }
            }
            setIsLoadingData(false);
        }

        fetchDashboardData();
    }, [supabase]);

    // Construct the final URL dynamically
    const referralLink = partnerCode === 'Loading...' || partnerCode === 'CODE-NOT-FOUND'
        ? partnerCode
        : `stratmire.cap/p/${partnerCode}`;

    const handleCopy = () => {
        if (referralLink === 'Loading...' || referralLink === 'CODE-NOT-FOUND') return;
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper function to format the dates cleanly
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Calculate dynamic team progress (Capped at 100%)
    const teamProgressPercentage = Math.min((referredPartners.length / 5) * 100, 100);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">

            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col hidden lg:flex">
                <div className="p-6">
                    <h1 className="text-xl font-black text-slate-900">Stratmire Capital</h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Partner Dashboard</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <a href="#" className="flex items-center gap-3 bg-slate-200 text-slate-900 px-4 py-3 rounded-xl font-bold transition-colors">
                        <LayoutGrid size={20} /> Overview
                    </a>
                    <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 py-3 rounded-xl font-medium transition-colors">
                        <Users size={20} /> Referrals
                    </a>
                    <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 py-3 rounded-xl font-medium transition-colors">
                        <DollarSign size={20} /> Earnings
                    </a>
                    <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 py-3 rounded-xl font-medium transition-colors">
                        <FolderOpen size={20} /> Resources
                    </a>
                    <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 py-3 rounded-xl font-medium transition-colors">
                        <Settings size={20} /> Settings
                    </a>
                </nav>

                {/* UPDATED: Main Sidebar Submit Action */}
                <div className="p-6">
                    <button
                        onClick={() => router.push('/partner/dealform')}
                        className="w-full flex items-center justify-center gap-2 bg-[#0a6c50] text-white font-bold py-3.5 rounded-xl hover:bg-[#085a42] transition-colors shadow-lg shadow-[#0a6c50]/20"
                    >
                        Submit a Deal <ArrowRight size={18} />
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">

                {/* HEADER */}
                <header className="bg-slate-50 px-8 py-6 flex items-center justify-between sticky top-0 z-10 border-b border-slate-200/50 backdrop-blur-md">
                    <div className="flex items-center gap-8">
                        <h2 className="text-2xl font-bold text-slate-900">Partner Portal</h2>
                        <div className="hidden md:flex gap-6 text-sm font-medium">
                            <a href="#" className="text-slate-900 border-b-2 border-slate-900 pb-1">Overview</a>
                            <a href="#" className="text-slate-500 hover:text-slate-900 pb-1 transition-colors">Reports</a>
                            <a href="#" className="text-slate-500 hover:text-slate-900 pb-1 transition-colors">Marketing</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* NEW: Quick Action Header Button */}
                        <button
                            onClick={() => router.push('/partner/dealform')}
                            className="hidden sm:flex items-center gap-2 bg-[#042f24] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#0a6c50] transition-colors shadow-sm"
                        >
                            Submit Deal
                        </button>

                        <button className="text-slate-400 hover:text-slate-800 transition-colors">
                            <Bell size={24} />
                        </button>
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                            <div className="text-right hidden sm:block">
                                {/* DYNAMIC NAME ADDED HERE */}
                                <p className="text-sm font-bold text-slate-900">{partnerName}</p>
                                <p className="text-xs font-medium text-slate-500">Level 1 Starter</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden border-2 border-white shadow-sm">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD BODY */}
                <div className="p-8 max-w-7xl mx-auto w-full space-y-6">

                    {/* TOP METRICS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* EARNINGS - DARK CARD */}
                        <div className="md:col-span-6 lg:col-span-6 bg-[#042f24] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                            <p className="text-sm font-bold text-emerald-400/80 tracking-wider uppercase mb-2">Total Earnings</p>
                            <h3 className="text-5xl font-black mb-4">$0.00</h3>
                            <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                                <TrendingUp size={16} /> Pending first closed deal
                            </p>
                        </div>

                        {/* TOTAL REFERRALS (CLIENTS) */}
                        <div className="md:col-span-3 lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                                <Users size={20} className="text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Referrals</p>
                                <h3 className="text-3xl font-black text-slate-900">
                                    {isLoadingData ? '...' : referrals.length}
                                </h3>
                            </div>
                            <p className="text-xs font-bold text-[#0a6c50] mt-4">Linked to your code</p>
                        </div>

                        {/* REFERRED PARTNERS METRIC */}
                        <div className="md:col-span-3 lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                                <UserPlus size={20} className="text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Partner Team</p>
                                <h3 className="text-3xl font-black text-slate-900">
                                    {isLoadingData ? '...' : referredPartners.length}
                                </h3>
                            </div>
                            <p className="text-xs font-medium text-slate-400 mt-4">Active recruited members</p>
                        </div>
                    </div>

                    {/* SECONDARY METRICS & LINK */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* CLOSED LOANS */}
                        <div className="md:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                                <CheckCircle2 size={20} className="text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Closed Loans</p>
                                <h3 className="text-3xl font-black text-slate-900">0</h3>
                            </div>
                        </div>

                        {/* PARTNER REFERRAL LINK */}
                        <div className="md:col-span-9 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Partner Referral Link</h3>
                                <p className="text-sm text-slate-500 mt-1">Share this unique URL or code <strong>({partnerCode})</strong> with your network to track tier commissions automatically.</p>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 max-w-md w-full sm:w-auto">
                                <code className="text-sm text-slate-700 px-3 truncate font-mono">{referralLink}</code>
                                <button
                                    onClick={handleCopy}
                                    className={`p-2.5 rounded-lg transition-colors shrink-0 flex items-center justify-center ${copied ? 'bg-emerald-100' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                                    title="Copy link"
                                    disabled={referralLink === 'Loading...' || referralLink === 'CODE-NOT-FOUND'}
                                >
                                    {copied ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC TABLE 1: REFERRED CLIENTS */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Your Referred Clients</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Borrower Name</th>
                                        <th className="px-6 py-4">Submitted Date</th>
                                        <th className="px-6 py-4">Contact Details</th>
                                        <th className="px-6 py-4">Current Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {isLoadingData ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">
                                                Loading referrals...
                                            </td>
                                        </tr>
                                    ) : referrals.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
                                                    <Users size={24} />
                                                </div>
                                                <p className="font-bold text-slate-900 text-lg">No client referrals yet</p>
                                                <p className="text-slate-500 mt-1">Share your link to get started.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        referrals.map((ref) => {
                                            const initials = `${ref.first_name?.[0] || ''}${ref.last_name?.[0] || ''}`.toUpperCase();
                                            return (
                                                <tr key={ref.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-[#0a6c50]/10 text-[#0a6c50] font-bold flex items-center justify-center text-xs shrink-0">
                                                            {initials || '?'}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{ref.first_name} {ref.last_name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">Application Received</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">{formatDate(ref.created_at)}</td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-slate-900">{ref.email}</p>
                                                        <p className="text-xs text-slate-500">{ref.phone}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-100 text-emerald-700">
                                                            RECEIVED
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* DYNAMIC TABLE 2: REFERRED PARTNERS (TEAM) */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Your Referred Partners (Team)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Partner Name</th>
                                        <th className="px-6 py-4">Business Name</th>
                                        <th className="px-6 py-4">Joined Date</th>
                                        <th className="px-6 py-4">Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {isLoadingData ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">
                                                Loading partners...
                                            </td>
                                        </tr>
                                    ) : referredPartners.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
                                                    <UserPlus size={24} />
                                                </div>
                                                <p className="font-bold text-slate-900 text-lg">No partners recruited yet</p>
                                                <p className="text-slate-500 mt-1">Invite industry professionals to build your team and reach Level 2.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        referredPartners.map((partner) => {
                                            const initials = `${partner.first_name?.[0] || ''}${partner.last_name?.[0] || ''}`.toUpperCase();
                                            const isApproved = partner.status === 'APPROVED';
                                            return (
                                                <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0">
                                                            {initials || '?'}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{partner.first_name} {partner.last_name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">{partner.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-slate-900">{partner.business_name || 'N/A'}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                                        {formatDate(partner.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {partner.status || 'PENDING'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* BOTTOM CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">

                        {/* MARKETING ASSETS */}
                        <div
                            className="rounded-2xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-end min-h-[240px] bg-cover bg-center"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop")' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#042f24]/90 via-[#042f24]/50 to-transparent"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-2">New Marketing Assets</h3>
                                <p className="text-slate-200 mb-6 font-medium max-w-sm text-sm">
                                    Download our updated Q4 pitch decks and updated rate sheets to share with your clients.
                                </p>
                                <button className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-lg hover:bg-slate-100 transition-colors text-sm">
                                    Browse Library
                                </button>
                            </div>
                        </div>

                        {/* STRATMIRE TIER PROGRESS TRACKER (Level 1 -> Level 2) */}
                        <div className="rounded-2xl p-8 shadow-lg relative overflow-hidden bg-gradient-to-br from-[#41310A] to-[#1F1705] border border-[#6B5215]/50">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                                    <Target size={20} />
                                    <h3 className="text-xl font-black tracking-wide">Level 2 Producer Update</h3>
                                </div>

                                <p className="text-[#A48F53] text-sm mb-6 leading-relaxed">
                                    You are currently earning <strong className="text-white">50% commission</strong>. Hit these targets to unlock the <strong>60% Producer Tier</strong> plus a 5% lifetime trail on team production.
                                </p>

                                <div className="space-y-4">
                                    {/* Goal 1: Team Members - NOW DYNAMICALLY DRIVEN */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                                            <span>Team Built (Current: {isLoadingData ? '...' : referredPartners.length})</span>
                                            <span>Target: 5 Members</span>
                                        </div>
                                        <div className="w-full bg-black/40 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-[#BFA054] to-[#F1DE8B] h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${teamProgressPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Goal 2: Closed Deals */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                                            <span>Funded Deals (Current: 0)</span>
                                            <span>Target: 4 Deals / Yr</span>
                                        </div>
                                        <div className="w-full bg-black/40 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-[#BFA054] to-[#F1DE8B] h-2 rounded-full" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-medium text-[#A48F53]">
                                    <span>* 10% referral closing bonus active</span>
                                    <span>No min. production required for current tier</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* FOOTER TEXT */}
                    <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-slate-400 pb-8 px-2 uppercase tracking-wider">
                        <p>© 2026 STRATMIRE CAPITAL. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-6 mt-4 sm:mt-0">
                            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-slate-600 transition-colors">Compliance</a>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}