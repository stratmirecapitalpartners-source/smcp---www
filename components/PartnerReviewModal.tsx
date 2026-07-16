"use client"
import React, { useEffect, useState } from 'react';
import { X, User, Briefcase, ShieldAlert, FileSignature, Users, UserPlus, Activity, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase'; // Make sure this path matches your setup

interface PartnerReviewModalProps {
    partner: any;
    onClose: () => void;
}

export default function PartnerReviewModal({ partner, onClose }: PartnerReviewModalProps) {
    const supabase = createClient();

    // States for the mini-dashboard
    const [referrals, setReferrals] = useState<any[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [isLoadingStats, setIsLoadingStats] = useState(false);

    // Fetch the partner's referral data if they are approved and have a code
    useEffect(() => {
        async function fetchPartnerStats() {
            if (partner?.status !== 'APPROVED' || !partner?.partner_code) return;

            setIsLoadingStats(true);

            // 1. Fetch Clients referred by this partner
            const { data: clients } = await supabase
                .from('borrowers')
                .select('id, first_name, last_name, created_at, email')
                .eq('referring_partner_code', partner.partner_code);

            if (clients) setReferrals(clients);

            // 2. Fetch sub-partners (team) recruited by this partner
            const { data: team } = await supabase
                .from('loan_partners')
                .select('id, first_name, last_name, created_at, status')
                .eq('referring_partner_code', partner.partner_code);

            if (team) setTeamMembers(team);

            setIsLoadingStats(false);
        }

        fetchPartnerStats();
    }, [partner, supabase]);

    if (!partner) return null;

    const formatBool = (val: boolean | null | undefined) => val ? "Yes" : "No";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#042f24] text-white">
                    <div>
                        <h2 className="text-xl font-bold">Partner File: {partner.first_name} {partner.last_name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-emerald-400 font-mono">ID: {partner.id}</p>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${partner.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {partner.status}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-8 bg-slate-50">

                    {/* --- NEW: ADMIN VIEW OF PARTNER DASHBOARD (Only shows if approved) --- */}
                    {partner.status === 'APPROVED' && (
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Activity className="text-[#0a6c50]" size={20} /> Production Dashboard
                            </h3>

                            {/* Top Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Client Referrals</p>
                                        <h4 className="text-2xl font-black text-slate-900">{isLoadingStats ? '...' : referrals.length}</h4>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                                        <UserPlus size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Team Members</p>
                                        <h4 className="text-2xl font-black text-slate-900">{isLoadingStats ? '...' : teamMembers.length}</h4>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Partner Referral Code</p>
                                    <code className="text-lg font-mono font-bold text-[#0a6c50] bg-[#0a6c50]/10 px-3 py-1 rounded w-fit">
                                        {partner.partner_code || 'N/A'}
                                    </code>
                                </div>
                            </div>

                            {/* Referrals List */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Referred Clients Log</h4>
                                <div className="border border-slate-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Client Name</th>
                                                <th className="px-4 py-3">Email</th>
                                                <th className="px-4 py-3">Date Submitted</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {isLoadingStats ? (
                                                <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500"><Loader2 className="animate-spin mx-auto" size={20} /></td></tr>
                                            ) : referrals.length === 0 ? (
                                                <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500 italic">No clients referred yet.</td></tr>
                                            ) : (
                                                referrals.map(ref => (
                                                    <tr key={ref.id} className="hover:bg-slate-50">
                                                        <td className="px-4 py-3 font-bold text-slate-900">{ref.first_name} {ref.last_name}</td>
                                                        <td className="px-4 py-3 text-slate-600">{ref.email}</td>
                                                        <td className="px-4 py-3 text-slate-500">{new Date(ref.created_at).toLocaleDateString()}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* --- ORIGINAL APPLICATION DETAILS BELOW --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                                <User size={16} /> Applicant Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DataField label="Full Legal Name" value={`${partner.first_name} ${partner.last_name}`} />
                                <DataField label="Partnership Tier" value={partner.partner_tier || 'Starter'} />
                                <DataField label="Date of Birth" value={partner.dob} />
                                <DataField label="Email Address" value={partner.email} />
                                <DataField label="Phone Number" value={partner.phone} />
                                <DataField label="SSN (Last 4)" value={partner.ssn_last_4} />
                                <DataField label="Home Address" value={partner.home_address} className="md:col-span-2" />
                            </div>
                        </section>

                        {/* Professional Background */}
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                                <Briefcase size={16} /> Professional Background
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DataField label="Business Name" value={partner.business_name} className="md:col-span-2" />
                                <DataField label="Current Occupation" value={partner.current_occupation} />
                                <DataField label="Company Name" value={partner.company_name} />
                                <DataField label="Years of Experience" value={partner.years_experience} />
                                <DataField label="Relevant Experience" value={partner.relevant_experience} />
                            </div>
                        </section>

                        {/* Compliance & History */}
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                                <ShieldAlert size={16} /> Compliance Checks
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <DataField
                                    label="Felony / Financial Crime History?"
                                    value={formatBool(partner.felony_history)}
                                    alertIf="Yes"
                                />
                                <DataField
                                    label="Bankruptcy / Foreclosure History?"
                                    value={formatBool(partner.bankruptcy_history)}
                                    alertIf="Yes"
                                />
                            </div>
                        </section>

                        {/* Agreement & Meta */}
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                                <FileSignature size={16} /> Agreement & Signatures
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <DataField
                                    label="Electronic Signature"
                                    value={partner.signature_name}
                                    className="font-mono text-[#0a6c50] font-bold lg:col-span-2"
                                />

                                {/* NEW: Displays the Referred Partner Name captured in the form */}
                                <DataField
                                    label="Referred Partner Name"
                                    value={partner.referring_partner_name || 'N/A'}
                                />

                                <DataField
                                    label="Referred Partner Code"
                                    value={partner.referring_partner_code || 'N/A'}
                                />
                            </div>
                        </section>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                        Close Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

// Reusable micro-component for consistent data rendering
function DataField({ label, value, className = "", alertIf = null }: { label: string, value: string | undefined, className?: string, alertIf?: string | null }) {
    const isAlert = alertIf && value === alertIf;
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
            <span className={`text-sm font-medium ${isAlert ? 'text-red-600 bg-red-50 p-2 rounded border border-red-100 w-fit' : 'text-slate-900'}`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}