"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import {
    CheckCircle2, Clock, UploadCloud, Building2, User,
    Briefcase, DollarSign, FileText, Send
} from 'lucide-react';

export default function PartnerDashboard() {
    // const router = useRouter();
    // const supabase = createClient();
    // const [partner, setPartner] = useState<any>(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    // // Form State
    // const [formData, setFormData] = useState({
    //     // Partner Info
    //     partnerName: '', companyName: '', partnerPhone: '', partnerEmail: '', partnerId: '',
    //     // Client Info
    //     borrowerName: '', businessName: '', borrowerPhone: '', borrowerEmail: '',
    //     // Loan Request Details
    //     loanType: '', loanPurpose: '', requestedAmount: '', estPropertyValue: '', purchasePrice: '', loanTerm: '', propertyAddress: '',
    //     // Deal Overview
    //     dealDescription: '',
    //     // Financial Snapshot
    //     creditScore: '', annualRevenue: '', monthlyIncome: '', existingDebt: '',
    //     // Supporting Documents
    //     docsBankStatements: false, docsTaxReturns: false, docsRentRoll: false,
    //     docsPurchaseContract: false, docsBusinessFinancials: false, docsOther: '',
    //     // Signature
    //     partnerSignature: '',
    // });

    // useEffect(() => {
    //     async function fetchPartnerStatus() {
    //         const { data: { user } } = await supabase.auth.getUser();
    //         if (!user) {
    //             router.push('/partner/login');
    //             return;
    //         }

    //         const { data } = await supabase
    //             .from('loan_partners')
    //             .select('*')
    //             .eq('email', user.email)
    //             .single();

    //         if (data) {
    //             setPartner(data);
    //             // Pre-fill partner info from database combining first and last name
    //             setFormData(prev => ({
    //                 ...prev,
    //                 partnerName: `${data.first_name || ''} ${data.last_name !== 'N/A' && data.last_name ? data.last_name : ''}`.trim(),
    //                 companyName: data.business_name || '',
    //                 partnerPhone: data.phone || '',
    //                 partnerEmail: data.email || '',
    //                 partnerId: data.id || ''
    //             }));
    //         }
    //         setIsLoading(false);
    //     }
    //     fetchPartnerStatus();
    // }, [router, supabase]);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value, type } = e.target;
    //     if (type === 'checkbox') {
    //         const checked = (e.target as HTMLInputElement).checked;
    //         setFormData(prev => ({ ...prev, [name]: checked }));
    //     } else {
    //         setFormData(prev => ({ ...prev, [name]: value }));
    //     }
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);

    //     // NOTE: Make sure your 'deal_submissions' table exists in Supabase to accept this payload
    //     const { error } = await supabase.from('deal_submissions').insert([{
    //         partner_id: partner.id,
    //         payload: formData, // Storing as JSON for flexibility
    //         status: 'SUBMITTED',
    //         submitted_at: new Date().toISOString()
    //     }]);

    //     if (!error) {
    //         alert("Deal Scenario successfully submitted for review!");
    //         // Optionally reset form here
    //     } else {
    //         alert("Error submitting deal: " + error.message);
    //     }
    //     setIsSubmitting(false);
    // };

    // if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Authenticating...</div>;

    // // GUARD: PENDING APPROVAL
    // if (!partner || partner.status !== 'APPROVED') {
    //     return (
    //         <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
    //             <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
    //                 <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
    //                     <Clock size={40} className="text-amber-500" />
    //                 </div>
    //                 <h1 className="text-2xl font-black text-slate-900 mb-3">Account Pending Approval</h1>
    //                 <p className="text-slate-500 mb-8 leading-relaxed">
    //                     Your partner application has been received and is currently under review by the Stratmire Capital administration team.
    //                 </p>
    //                 <button onClick={async () => { await supabase.auth.signOut(); router.push('/'); }} className="text-sm font-bold text-[#0a6c50] hover:underline">
    //                     Sign Out
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    // APPROVED STATE: DEAL SUBMISSION FORM
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans pb-24">
            <div className="max-w-4xl mx-auto">

                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            Partner Portal <CheckCircle2 className="text-emerald-500" size={28} />
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">STRATMIRE CAPITAL PARTNERS LLC</p>
                    </div>
                    {/* <button onClick={async () => { await supabase.auth.signOut(); router.push('/'); }} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                        Sign Out
                    </button> */}
                </header>

                <form
                    // onSubmit={handleSubmit} 
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="bg-[#042f24] p-8 text-white">
                        <h2 className="text-2xl font-black flex items-center gap-2"><UploadCloud /> Deal Submission Form</h2>
                        <p className="text-emerald-400/80 mt-2 text-sm">Please fill out all known details regarding the loan scenario.</p>
                    </div>

                    <div className="p-8 space-y-12">

                        {/* PARTNER INFORMATION */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><Building2 size={20} className="text-[#0a6c50]" /> Partner Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Partner Name</label>
                                    <input type="text" name="partnerName"
                                        // value={formData.partnerName} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50" readOnly />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                                    <input type="text" name="companyName"
                                        // value={formData.companyName} onChange={handleInputChange} 
                                        className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50" readOnly />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                                    <input type="tel" name="partnerPhone"
                                        // value={formData.partnerPhone} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                                    <input type="email" name="partnerEmail"
                                        // value={formData.partnerEmail} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50" readOnly />
                                </div>
                            </div>
                        </section>

                        {/* CLIENT / BORROWER INFORMATION */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><User size={20} className="text-[#0a6c50]" /> Client / Borrower Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Borrower Name</label>
                                    <input type="text" name="borrowerName"
                                        // value={formData.borrowerName} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Name (if applicable)</label>
                                    <input type="text" name="businessName"
                                        // value={formData.businessName} onChange={handleInputChange} 
                                        className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                                    <input type="tel" name="borrowerPhone"
                                        // value={formData.borrowerPhone} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                                    <input type="email" name="borrowerEmail"
                                        // value={formData.borrowerEmail} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                            </div>
                        </section>

                        {/* LOAN REQUEST DETAILS */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><Briefcase size={20} className="text-[#0a6c50]" /> Loan Request Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loan Type</label>
                                    <select name="loanType"
                                        // value={formData.loanType} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-white">
                                        <option value="">Select Type...</option>
                                        <option value="DSCR">DSCR</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Business">Business</option>
                                        <option value="Fix & Flip">Fix & Flip</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loan Purpose</label>
                                    <input type="text" name="loanPurpose"
                                        // value={formData.loanPurpose} onChange={handleInputChange} 
                                        required className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Requested Loan Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input type="number" name="requestedAmount"
                                            //value={formData.requestedAmount} onChange={handleInputChange} 
                                            required className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estimated Property Value</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input type="number" name="estPropertyValue"
                                            //value={formData.estPropertyValue} onChange={handleInputChange} 
                                            className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Purchase Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input type="number" name="purchasePrice"
                                            //value={formData.purchasePrice} onChange={handleInputChange} 
                                            className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loan Term Requested</label>
                                    <input type="text" name="loanTerm"
                                        //value={formData.loanTerm} onChange={handleInputChange} 
                                        placeholder="e.g. 30 Years" className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Property Address (if applicable)</label>
                                    <input type="text" name="propertyAddress"
                                        //value={formData.propertyAddress} onChange={handleInputChange} 
                                        className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                            </div>
                        </section>

                        {/* DEAL OVERVIEW */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><FileText size={20} className="text-[#0a6c50]" /> Deal Overview</h3>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Brief Description of Deal</label>
                                <textarea name="dealDescription"
                                    //value={formData.dealDescription} onChange={handleInputChange}
                                    rows={4} required className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none resize-none"></textarea>
                            </div>
                        </section>

                        {/* FINANCIAL SNAPSHOT */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><DollarSign size={20} className="text-[#0a6c50]" /> Financial Snapshot</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Borrower Credit Score (Estimate)</label>
                                    <input type="number" name="creditScore"
                                        // value={formData.creditScore} onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Annual Revenue (if business)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input type="number" name="annualRevenue"
                                            //value={formData.annualRevenue} onChange={handleInputChange} 
                                            className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Monthly Income</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input type="number" name="monthlyIncome"
                                            //value={formData.monthlyIncome} onChange={handleInputChange} 
                                            className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Existing Debt Obligations</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input type="number" name="existingDebt"
                                            //value={formData.existingDebt} onChange={handleInputChange}
                                            className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SUPPORTING DOCUMENTS SUBMITTED */}
                        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Supporting Documents to Submit</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="docsBankStatements"
                                        // checked={formData.docsBankStatements} onChange={handleInputChange} 
                                        className="w-4 h-4 text-[#0a6c50] border-slate-300 rounded focus:ring-[#0a6c50]" />
                                    <span className="text-slate-700 font-medium text-sm">Bank Statements</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="docsTaxReturns"
                                        // checked={formData.docsTaxReturns} onChange={handleInputChange} 
                                        className="w-4 h-4 text-[#0a6c50] border-slate-300 rounded focus:ring-[#0a6c50]" />
                                    <span className="text-slate-700 font-medium text-sm">Tax Returns</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="docsRentRoll"
                                        // checked={formData.docsRentRoll} onChange={handleInputChange} 
                                        className="w-4 h-4 text-[#0a6c50] border-slate-300 rounded focus:ring-[#0a6c50]" />
                                    <span className="text-slate-700 font-medium text-sm">Rent Roll</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="docsPurchaseContract"
                                        // checked={formData.docsPurchaseContract} onChange={handleInputChange} 
                                        className="w-4 h-4 text-[#0a6c50] border-slate-300 rounded focus:ring-[#0a6c50]" />
                                    <span className="text-slate-700 font-medium text-sm">Purchase Contract</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="docsBusinessFinancials"
                                        // checked={formData.docsBusinessFinancials} onChange={handleInputChange} 
                                        className="w-4 h-4 text-[#0a6c50] border-slate-300 rounded focus:ring-[#0a6c50]" />
                                    <span className="text-slate-700 font-medium text-sm">Business Financials</span>
                                </label>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-700 font-medium text-sm shrink-0">Other:</span>
                                    <input type="text" name="docsOther"
                                        // value={formData.docsOther} onChange={handleInputChange} 
                                        className="w-full border-b border-slate-300 bg-transparent focus:border-[#0a6c50] outline-none text-sm py-1" />
                                </div>
                            </div>
                        </section>

                        {/* CONFIRMATION / SIGNATURE */}
                        <section className="pt-6 border-t border-slate-200">
                            <p className="text-sm text-slate-700 mb-6 font-medium italic">
                                I confirm that the information submitted is accurate to the best of my knowledge.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Partner Signature (Type Full Name)</label>
                                    <input type="text" name="partnerSignature"
                                        // value={formData.partnerSignature} onChange={handleInputChange} 
                                        required className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#0a6c50] outline-none font-medium text-slate-900 bg-slate-50" placeholder="Sign here..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                    <div className="px-4 py-3 border border-slate-200 bg-slate-100 text-slate-500 rounded-md font-medium text-sm">
                                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end">
                        <button type="submit"
                            // disabled={isSubmitting} 
                            className="bg-[#0a6c50] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#085a42] transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50">
                            {/* {isSubmitting ? "Submitting..." : "Submit Scenario for Review"} */}
                            <Send size={18} />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}