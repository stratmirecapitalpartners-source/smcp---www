"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from "@/lib/supabase";
import { UploadCloud, FileText, CheckCircle, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';

const REQUIRED_DOCUMENTS = [
    { id: 'drivers_license', label: "Driver's Licence" },
    { id: 'bank_statements', label: "Bank statement for last 2 months" },
    { id: 'pay_stubs', label: "Most recent two (2) pay stubs" },
    { id: 'w2_forms', label: "W2s for 2 most recent years" },
    { id: 'mortgage_statement', label: "Most recent mortgage statement (for refinance)" },
    { id: 'purchase_agreement', label: "Fully executed purchase agreement" },
    { id: 'tax_return_personal', label: "Personal tax return for 2 most recent years" },
    { id: 'tax_return_business', label: "Business Tax return for most recent 2 years (If self employed)" },
    { id: 'ssn_card', label: "Social Security Card" },
    { id: 'ssn_awards', label: "Social Security Awards or Benefit statement" },
    { id: 'va_certificate', label: "VA certificate of Eligibility (For VA loans)" },
    { id: 'homeowners_insurance', label: "Homeowners insurance policy Declaration page" },
    { id: 'hoa_policy', label: "HOA policy (If Applicable)" },
    { id: 'retirement_income', label: "Supporting Documents for other Retirement Income (If Needed)" },
    { id: 'hud_certificate', label: "HUD Certified Counseling Certificate" },
    { id: 'other_documents', label: "Other documents" }
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// 1. MAIN LOGIC REFACTORED AS A CHILD COMPONENT
function DocumentUploadForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    const [borrowerId, setBorrowerId] = useState<string | null>(null);
    const [files, setFiles] = useState<Record<string, File>>({});
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'idle' | 'uploading' | 'success' | 'error'>>({});
    const [isFinalizing, setIsFinalizing] = useState(false);

    // Retrieve the application ID from local storage or URL parameters safely
    useEffect(() => {
        const sessionId = sessionStorage.getItem('activeBorrowerId');
        const localId = localStorage.getItem('currentApplicationId');
        const urlId = searchParams.get('id');

        if (urlId) {
            setBorrowerId(urlId);
        } else if (sessionId) {
            setBorrowerId(sessionId);
        } else if (localId) {
            setBorrowerId(localId);
        }
    }, [searchParams]);

    const handleFileChange = (docId: string, selectedFile: File | null) => {
        if (!selectedFile) return;

        // 10MB Size Validation
        if (selectedFile.size > MAX_FILE_SIZE) {
            alert(`File too large. Maximum size is 10MB. Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB.`);
            return;
        }

        setFiles(prev => ({ ...prev, [docId]: selectedFile }));
        setUploadStatus(prev => ({ ...prev, [docId]: 'idle' }));
    };

    const handleUpload = async (docId: string) => {
        const file = files[docId];
        if (!file || !borrowerId) return;

        setUploadStatus(prev => ({ ...prev, [docId]: 'uploading' }));

        // Create a unique file path: borrower_id / document_type / filename
        const fileExt = file.name.split('.').pop();
        const filePath = `${borrowerId}/${docId}_${Date.now()}.${fileExt}`;

        try {
            // 1. Upload to Storage Bucket
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('vault_documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Save the reference to the borrower's database profile
            // First, get existing documents
            const { data: borrowerData, error: fetchError } = await supabase
                .from('borrowers')
                .select('uploaded_documents')
                .eq('id', borrowerId)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

            const existingDocs = borrowerData?.uploaded_documents || {};
            const updatedDocs = { ...existingDocs, [docId]: uploadData.path };

            // Update the row
            const { error: updateError } = await supabase
                .from('borrowers')
                .update({ uploaded_documents: updatedDocs })
                .eq('id', borrowerId);

            if (updateError) throw updateError;

            setUploadStatus(prev => ({ ...prev, [docId]: 'success' }));
        } catch (error: any) {
            console.error("Upload failed:", error);
            setUploadStatus(prev => ({ ...prev, [docId]: 'error' }));
            alert(`Failed to upload ${file.name}: ${error.message}`);
        }
    };

    const handleCompleteJourney = () => {
        setIsFinalizing(true);
        // Route to the new Dashboard!
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    };

    if (!borrowerId) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                <div>
                    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Expired</h2>
                    <p className="text-slate-500">We couldn't locate your application session. Please restart the process.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">

                <header className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-slate-800 text-xs font-bold tracking-widest uppercase">Secure Digital Vault</span>
                    </div>
                    <h1 className="text-4xl font-black text-brand-dark tracking-tight mb-4">Required Documents</h1>
                    <p className="text-lg text-slate-600">
                        Please upload the necessary files to complete your application. <br />
                        <span className="font-bold text-red-500">Maximum file size: 10MB per document.</span>
                    </p>
                </header>

                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {REQUIRED_DOCUMENTS.map((doc) => {
                            const file = files[doc.id];
                            const status = uploadStatus[doc.id] || 'idle';

                            return (
                                <div key={doc.id} className="border border-slate-200 rounded-xl p-5 flex flex-col justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm mb-1">{doc.label}</h3>
                                        {file && <p className="text-xs font-mono text-slate-500 truncate mb-3">{file.name}</p>}
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            id={`file-${doc.id}`}
                                            className="hidden"
                                            onChange={(e) => handleFileChange(doc.id, e.target.files ? e.target.files[0] : null)}
                                            disabled={status === 'uploading' || status === 'success'}
                                        />

                                        {status === 'success' ? (
                                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-lg w-full justify-center">
                                                <CheckCircle size={16} /> Uploaded Securely
                                            </div>
                                        ) : (
                                            <>
                                                <label
                                                    htmlFor={`file-${doc.id}`}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors"
                                                >
                                                    <FileText size={16} /> {file ? "Change File" : "Select File"}
                                                </label>

                                                {file && (
                                                    <button
                                                        onClick={() => handleUpload(doc.id)}
                                                        disabled={status === 'uploading'}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#2a62a3] transition-colors disabled:opacity-50"
                                                    >
                                                        <UploadCloud size={16} /> {status === 'uploading' ? "Uploading..." : "Upload"}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
                        <button
                            onClick={handleCompleteJourney}
                            disabled={isFinalizing}
                            className="w-full md:w-auto bg-brand-dark hover:bg-slate-800 text-white px-12 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                        >
                            {isFinalizing ? "Finalizing Application..." : "Complete Application"} <ArrowRight size={20} />
                        </button>
                        <p className="text-xs text-slate-400 mt-4">You can return to your dashboard later to upload missing documents.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

// 2. PARENT COMPONENT THAT WRAPS IN SUSPENSE
export default function DocumentUploadPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <div className="text-center">
                    <p className="text-primary font-bold text-lg animate-pulse mb-2">Connecting to Secure Vault...</p>
                    <p className="text-sm text-slate-500">Preparing document upload portal</p>
                </div>
            </div>
        }>
            <DocumentUploadForm />
        </Suspense>
    );
}