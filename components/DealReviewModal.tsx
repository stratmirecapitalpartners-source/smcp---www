"use client"
import React from 'react';
import { X, User, Briefcase, Building2, DollarSign, FileText, CheckSquare } from 'lucide-react';

interface DealReviewModalProps {
    deal: any;
    onClose: () => void;
}

export default function DealReviewModal({ deal, onClose }: DealReviewModalProps) {
    if (!deal || !deal.payload) return null;

    // The raw JSON data submitted from your form
    const payload = deal.payload;

    const formatDoc = (val: boolean) => val ? "Provided" : "Not Provided";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#042f24] text-white">
                    <div>
                        <h2 className="text-xl font-bold">Deal Scenario Review</h2>
                        <p className="text-xs text-emerald-400 font-mono mt-1">Submission ID: {deal.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-8 bg-slate-50">

                    {/* Partner Info (Only displays if submitted by a Partner) */}
                    {deal.submitted_by_type === 'PARTNER' && (
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                                <Building2 size={16} /> Submitting Partner
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <DataField label="Partner Name" value={payload.partnerName} />
                                <DataField label="Company Name" value={payload.companyName} />
                                <DataField label="Email" value={payload.partnerEmail} />
                                <DataField label="Phone" value={payload.partnerPhone} />
                            </div>
                        </section>
                    )}

                    {/* Borrower Info */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <User size={16} /> Borrower Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <DataField label="Borrower Name" value={payload.borrowerName} />
                            <DataField label="Business Name" value={payload.businessName} />
                            <DataField label="Email" value={payload.borrowerEmail} />
                            <DataField label="Phone" value={payload.borrowerPhone} />
                        </div>
                    </section>

                    {/* Loan Request */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <Briefcase size={16} /> Loan Request Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <DataField label="Loan Type" value={payload.loanType} />
                            <DataField label="Requested Amount" value={`$${Number(payload.requestedAmount).toLocaleString()}`} />
                            <DataField label="Loan Term" value={payload.loanTerm} />
                            <DataField label="Loan Purpose" value={payload.loanPurpose} />
                            <DataField label="Purchase Price" value={payload.purchasePrice ? `$${Number(payload.purchasePrice).toLocaleString()}` : 'N/A'} />
                            <DataField label="Est. Property Value" value={payload.estPropertyValue ? `$${Number(payload.estPropertyValue).toLocaleString()}` : 'N/A'} />
                            <DataField label="Property Address" value={payload.propertyAddress} className="md:col-span-3" />
                        </div>
                        <div className="border-t border-slate-100 pt-4 mt-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Deal Description</span>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">
                                {payload.dealDescription}
                            </p>
                        </div>
                    </section>

                    {/* Financial Snapshot */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <DollarSign size={16} /> Financial Snapshot
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <DataField label="Credit Score" value={payload.creditScore} />
                            <DataField label="Annual Revenue" value={payload.annualRevenue ? `$${Number(payload.annualRevenue).toLocaleString()}` : 'N/A'} />
                            <DataField label="Monthly Income" value={payload.monthlyIncome ? `$${Number(payload.monthlyIncome).toLocaleString()}` : 'N/A'} />
                            <DataField label="Existing Debt" value={payload.existingDebt ? `$${Number(payload.existingDebt).toLocaleString()}` : 'N/A'} />
                        </div>
                    </section>

                    {/* Documents */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0a6c50] uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                            <CheckSquare size={16} /> Supporting Documents Promised
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <DataField label="Bank Statements" value={formatDoc(payload.docsBankStatements)} alertIf="Not Provided" />
                            <DataField label="Tax Returns" value={formatDoc(payload.docsTaxReturns)} alertIf="Not Provided" />
                            <DataField label="Rent Roll" value={formatDoc(payload.docsRentRoll)} alertIf="Not Provided" />
                            <DataField label="Purchase Contract" value={formatDoc(payload.docsPurchaseContract)} alertIf="Not Provided" />
                            <DataField label="Business Financials" value={formatDoc(payload.docsBusinessFinancials)} alertIf="Not Provided" />
                            <DataField label="Other Documents" value={payload.docsOther || 'None specified'} />
                        </div>
                    </section>

                    {/* Signatures */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DataField label="Electronic Signature" value={payload.signature} className="font-mono text-[#0a6c50] font-bold" />
                        </div>
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                        Close View
                    </button>
                </div>
            </div>
        </div>
    );
}

// Reusable micro-component for rendering data fields
function DataField({ label, value, className = "", alertIf = null }: { label: string, value: string | undefined, className?: string, alertIf?: string | null }) {
    const isAlert = alertIf && value === alertIf;
    const isPositive = value === "Provided";
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
            <span className={`text-sm font-medium ${isAlert ? 'text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 w-fit' : isPositive ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 w-fit' : 'text-slate-900'}`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}