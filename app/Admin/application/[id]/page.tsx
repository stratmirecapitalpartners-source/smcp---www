"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import {
    ArrowLeft, User, MapPin, Briefcase, DollarSign,
    ShieldCheck, Calendar, GraduationCap, CheckCircle2,
    FileCode2 // <-- Added missing icon import
} from 'lucide-react';

// Import the Document Viewer we built earlier
import AdminDocumentViewer from '@/components/AdminDocumentViewer';

export default function BorrowerApplicationDetail() {
    const params = useParams();
    const router = useRouter();
    const supabase = createClient();
    const borrowerId = params.id as string;

    const [borrower, setBorrower] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBorrowerData() {
            if (!borrowerId) return;

            const { data, error } = await supabase
                .from('borrowers')
                .select('*')
                .eq('id', borrowerId)
                .single();

            if (!error && data) {
                setBorrower(data);
            }
            setIsLoading(false);
        }

        fetchBorrowerData();
    }, [borrowerId, supabase]);

    // 1. Recursive function to convert JSON to XML
    const jsonToXml = (obj: any): string => {
        let xml = '';
        const isArray = Array.isArray(obj);

        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                let value = obj[key];

                // Sanitize tag names to prevent XML parsing errors
                let tagName = isArray ? 'item' : key.replace(/[^a-zA-Z0-9_]/g, '_');
                if (/^[0-9]/.test(tagName)) tagName = `_${tagName}`;
                if (tagName === '') tagName = 'item';

                if (value === null || value === undefined) {
                    xml += `<${tagName}></${tagName}>\n`;
                } else if (typeof value === 'object') {
                    xml += `<${tagName}>\n${jsonToXml(value)}</${tagName}>\n`;
                } else {
                    // Escape special XML characters in values
                    const safeValue = String(value)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&apos;');
                    xml += `<${tagName}>${safeValue}</${tagName}>\n`;
                }
            }
        }
        return xml;
    };

    // 2. Click Handler to trigger the download
    const handleDownloadXML = () => {
        if (!borrower) return;

        // Wrap the converted data in a root element
        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<BorrowerApplication>\n${jsonToXml(borrower)}</BorrowerApplication>`;

        // Create a Blob from the XML string
        const blob = new Blob([xmlString], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);

        // Create a hidden link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `Application_${borrower.id || 'Data'}.xml`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Decrypting Applicant File...</div>;
    }

    if (!borrower) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-red-500">Applicant not found.</div>;
    }

    // Security masking for SSN
    const maskSSN = (ssn: string) => {
        if (!ssn) return "N/A";
        if (ssn.length <= 4) return ssn;
        return `***-**-${ssn.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased pb-20">

            {/* HEADER */}
            <div className="bg-[#042f24] text-white pt-8 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => router.push('/admin')}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-sm mb-8"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center font-black text-2xl border border-white/20">
                                {borrower.first_name?.charAt(0)}{borrower.last_name?.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">{borrower.first_name} {borrower.middle_name} {borrower.last_name} {borrower.suffix}</h1>
                                <p className="text-emerald-400/80 font-mono text-sm mt-1">Application ID: {borrower.id}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                                <p className="text-xs text-emerald-400/70 uppercase tracking-wider font-bold">Applied On</p>
                                <p className="font-medium">{new Date(borrower.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                                <p className="text-xs text-emerald-400/70 uppercase tracking-wider font-bold">Status</p>
                                <p className="font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 size={14} /> ACTIVE</p>
                            </div>

                            {/* --- NEW EXPORT XML BUTTON --- */}
                            <button
                                onClick={handleDownloadXML}
                                className="flex items-center gap-2 bg-white text-[#042f24] hover:bg-slate-100 px-5 py-3 rounded-lg font-bold text-sm shadow-md transition-colors ml-2"
                            >
                                <FileCode2 size={18} />
                                Export XML
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 space-y-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* PERSONAL IDENTITY CARD */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <User className="text-[#0a6c50]" /> Personal Identity
                        </h2>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                                <p className="font-medium text-slate-900">{borrower.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                                <p className="font-medium text-slate-900">{borrower.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date of Birth</p>
                                <p className="font-medium text-slate-900">{borrower.birth_date}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Social Security</p>
                                <p className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded inline-block">{maskSSN(borrower.ssn)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Citizenship</p>
                                <p className="font-medium text-slate-900 capitalize">{borrower.citizenship_status?.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Marital Status</p>
                                <p className="font-medium text-slate-900 capitalize">{borrower.marital_status}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dependents</p>
                                {borrower.has_dependents ? (
                                    <div className="flex gap-2">
                                        {borrower.dependents_ages?.map((age: number, idx: number) => (
                                            <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-bold">Age {age}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="font-medium text-slate-500">No dependents reported.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ADDRESS HISTORY CARD */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <MapPin className="text-[#0a6c50]" /> Address History
                        </h2>
                        <div className="space-y-6">
                            {borrower.address_history && borrower.address_history.length > 0 ? (
                                borrower.address_history.map((addr: any, idx: number) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-slate-900">{addr.street} {addr.unit && `Apt ${addr.unit}`}</p>
                                            {addr.isCurrent && <span className="bg-[#0a6c50]/10 text-[#0a6c50] text-xs font-bold px-2 py-1 rounded">CURRENT</span>}
                                        </div>
                                        <p className="text-slate-600 text-sm mb-3">{addr.city}, {addr.state} {addr.zip}</p>
                                        <div className="flex justify-between text-xs text-slate-500 font-medium">
                                            <span>Status: {addr.housingStatus} {addr.monthlyPayment && `($${addr.monthlyPayment}/mo)`}</span>
                                            <span>{addr.dateMovedIn} to {addr.isCurrent ? 'Present' : addr.dateMovedOut}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic">No address history recorded.</p>
                            )}
                        </div>

                        {borrower.has_different_mailing_address && (
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Separate Mailing Address</p>
                                <p className="font-medium text-slate-900">{borrower.mailing_street} {borrower.mailing_unit}</p>
                                <p className="text-slate-600 text-sm">{borrower.mailing_city}, {borrower.mailing_state} {borrower.mailing_zip}</p>
                            </div>
                        )}
                    </div>

                    {/* EMPLOYMENT & INCOME CARD */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Briefcase className="text-[#0a6c50]" /> Employment & Income
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Employment History (Last 2 Years)</p>
                                {borrower.employment_history && borrower.employment_history.length > 0 ? (
                                    <div className="space-y-3">
                                        {borrower.employment_history.map((job: any, idx: number) => (
                                            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-3 gap-4">
                                                <div className="col-span-3 sm:col-span-1">
                                                    <span className="text-[10px] text-slate-400 uppercase block">Employer</span>
                                                    <span className="font-bold text-slate-900">{job.employerName}</span>
                                                </div>
                                                <div className="col-span-3 sm:col-span-1">
                                                    <span className="text-[10px] text-slate-400 uppercase block">Self Employed</span>
                                                    <span className="font-medium text-slate-700 capitalize">{job.isSelfEmployed}</span>
                                                </div>
                                                <div className="col-span-3 sm:col-span-1">
                                                    <span className="text-[10px] text-slate-400 uppercase block">Ownership 25%</span>
                                                    <span className="font-medium text-slate-700 capitalize">{job.hasOwnership}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic text-sm">No employment history reported.</p>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Additional Income Sources</p>
                                {borrower.additional_income_sources && borrower.additional_income_sources.length > 0 ? (
                                    <div className="space-y-3">
                                        {borrower.additional_income_sources.map((income: any, idx: number) => (
                                            <div key={idx} className="flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                                <span className="font-bold text-slate-900">{income.source}</span>
                                                <span className="font-mono font-bold text-emerald-700">${income.monthlyIncome}/mo</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic text-sm">No additional income reported.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* DISCLOSURES & EDUCATION CARD */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <ShieldCheck className="text-[#0a6c50]" /> Disclosures & Background
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">

                            <div className="sm:col-span-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><ShieldCheck size={14} /> Military Service</p>
                                {borrower.has_military_service ? (
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="font-bold text-slate-900 capitalize">{borrower.military_status?.replace('_', ' ')}</p>
                                        {borrower.military_expiration_date && (
                                            <p className="text-sm text-slate-600 mt-1">Tour Expires: {borrower.military_expiration_date}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium text-slate-500 text-sm">No military service reported.</p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><GraduationCap size={14} /> Homeownership Education</p>
                                {borrower.has_homeownership_education ? (
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-[10px] text-slate-400 uppercase block">Format</span>
                                            <span className="font-bold text-slate-900 capitalize">{borrower.education_format?.replace('_', ' ')}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 uppercase block">Completed On</span>
                                            <span className="font-bold text-slate-900">{borrower.education_completion_date}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-[10px] text-slate-400 uppercase block">Agency / Program</span>
                                            <span className="font-medium text-slate-700">
                                                {borrower.is_hud_approved ? `HUD ID: ${borrower.hud_agency_id}` : borrower.education_program_name}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="font-medium text-slate-500 text-sm">No education programs completed recently.</p>
                                )}
                            </div>

                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Credit Check Consent</p>
                                <p className={`font-bold mt-1 ${borrower.credit_check_consent ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {borrower.credit_check_consent ? 'AUTHORIZED' : 'DENIED'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Language Preference</p>
                                <p className="font-bold text-slate-900 mt-1">{borrower.language_preference || 'English'}</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- THE SECURE DOCUMENT VAULT --- */}
                <div className="mt-8 pt-8">
                    <AdminDocumentViewer borrowerId={borrowerId} />
                </div>

            </div>
        </div>
    );
}