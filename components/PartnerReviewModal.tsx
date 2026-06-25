"use client"
import React from 'react';
import { X, User, Briefcase, ShieldAlert, FileSignature } from 'lucide-react';

interface PartnerReviewModalProps {
    partner: any; // You can replace 'any' with your precise Supabase generated type if using TypeScript strictly
    onClose: () => void;
}

export default function PartnerReviewModal({ partner, onClose }: PartnerReviewModalProps) {
    if (!partner) return null;

    // Helper for boolean formatting
    const formatBool = (val: boolean | null | undefined) => val ? "Yes" : "No";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Partner Application Review</h2>
                        <p className="text-sm text-slate-500">ID: {partner.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-8">

                    {/* Personal Information */}
                    <section>
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <User size={16} /> Applicant Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DataField label="Full Legal Name" value={`${partner.first_name} ${partner.last_name}`} />
                            <DataField label="Email Address" value={partner.email} />
                            <DataField label="Phone Number" value={partner.phone} />
                            <DataField label="Date of Birth" value={partner.dob} />
                            <DataField label="SSN (Last 4)" value={partner.ssn_last_4} />
                            <DataField label="Home Address" value={partner.home_address} className="md:col-span-3" />
                        </div>
                    </section>

                    {/* Professional Background */}
                    <section>
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Briefcase size={16} /> Professional Background
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DataField label="Business Name" value={partner.business_name} />
                            <DataField label="Current Occupation" value={partner.current_occupation} />
                            <DataField label="Company Name" value={partner.company_name} />
                            <DataField label="Years of Experience" value={partner.years_experience} />
                            <DataField label="Relevant Experience" value={partner.relevant_experience} />
                        </div>
                    </section>

                    {/* Compliance & History */}
                    <section>
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <ShieldAlert size={16} /> Compliance Checks
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <section>
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <FileSignature size={16} /> Agreement & Signatures
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DataField label="Electronic Signature" value={partner.signature_name} className="font-mono text-[#0a6c50] font-bold" />
                            <DataField label="Referred By (Partner Code)" value={partner.referring_partner_code} />
                            <DataField label="Assigned Partner Code" value={partner.partner_code} />
                            <DataField label="Current Status" value={partner.status} />
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                        Close
                    </button>
                    {/* Note: You can wire your Approve/Reject logic directly into this footer later */}
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
            <span className={`text-sm font-medium ${isAlert ? 'text-red-600 bg-red-50 p-1.5 rounded border border-red-100 w-fit' : 'text-slate-900'}`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}