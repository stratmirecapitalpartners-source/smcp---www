"use client"
import React from 'react';
import { X, User, Briefcase, Building2, ShieldCheck, MapPin, Lightbulb } from 'lucide-react';

interface BusinessLoanReviewModalProps {
    loan: any;
    onClose: () => void;
}

export default function BusinessLoanReviewModal({ loan, onClose }: BusinessLoanReviewModalProps) {
    if (!loan) return null;

    const formatDoc = (val: boolean) => val ? "Yes" : "No";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#042f24] text-white">
                    <div>
                        <h2 className="text-xl font-bold">Direct Business Funding Application</h2>
                        <p className="text-xs text-emerald-400 font-mono mt-1">Application ID: {loan.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-8 bg-slate-50">

                    {/* Basic Needs & Identity */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Briefcase size={16} /> Request & Applicant Info
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <DataField label="Funding Needed" value={`$${Number(loan.funding_amount).toLocaleString()}`} className="text-emerald-700 font-bold font-mono" />
                            <DataField label="Monthly Sales" value={`$${Number(loan.monthly_sales).toLocaleString()}`} className="font-mono text-slate-700 font-bold" />
                            <DataField label="First Name" value={loan.first_name} />
                            <DataField label="Last Name" value={loan.last_name} />
                            <DataField label="Email Address" value={loan.email} />
                            <DataField label="Phone Number" value={loan.phone} />
                        </div>
                    </section>

                    {/* Business Entity details */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Building2 size={16} /> Business Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DataField label="Legal Business Name" value={loan.legal_business_name} className="md:col-span-2" />
                            <DataField label="Years in Business" value={loan.years_in_business} />
                            <DataField label="Entity Type" value={loan.business_classification} />
                            <DataField label="Industry" value={loan.industry} />
                            <DataField label="Tax ID / EIN" value={loan.tax_id} className="font-mono text-slate-600" />
                            <DataField label="Home Based Business?" value={formatDoc(loan.is_home_based)} />
                            <DataField label="Physical Address" value={loan.business_address} className="md:col-span-2" />
                        </div>
                    </section>

                    {/* Ownership & Sensitive Data */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <ShieldCheck size={16} /> Ownership & Identity Verification
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <DataField label="Ownership Stake" value={`${loan.ownership_percentage}%`} />
                            <DataField label="Date of Birth" value={loan.dob} />
                            <DataField label="SSN" value={loan.ssn} className="font-mono text-red-700 tracking-widest bg-red-50 p-1 rounded w-fit" />
                            <DataField label="SSN (Last 4)" value={loan.last_4_ssn} className="font-mono text-slate-600" />
                            <DataField label="Home Address" value={loan.home_address} className="md:col-span-2" />
                            <DataField label="City" value={loan.home_city} />
                            <DataField label="State & Zip" value={`${loan.home_state} ${loan.home_zip_code}`} />
                        </div>
                    </section>

                    {/* Funding Preferences */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Lightbulb size={16} /> Funding Preferences & Insights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DataField label="Funds Needed By" value={loan.funds_timing} />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stated Interests</span>
                                <div className="flex flex-wrap gap-2">
                                    {(loan.interests || []).map((interest: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 rounded-md">
                                            {interest}
                                        </span>
                                    ))}
                                    {(!loan.interests || loan.interests.length === 0) && <span className="text-sm font-medium text-slate-900">None Specified</span>}
                                </div>
                            </div>
                            <DataField label="Primary Decision Factor" value={loan.important_factor} />
                            <DataField label="Lead Source" value={loan.source} className="md:col-span-3" />
                        </div>
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                        Close Viewer
                    </button>
                </div>
            </div>
        </div>
    );
}

function DataField({ label, value, className = "" }: { label: string, value: string | undefined, className?: string }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
            <span className={`text-sm font-medium text-slate-900`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}