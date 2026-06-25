"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Building2, ArrowRight, Loader2, User, ShieldAlert, Briefcase, FileSignature, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { generateReferralCode } from '@/lib/utils';

export default function BecomePartnerPage() {
    const router = useRouter();
    const supabase = createClient();

    // Application Status State
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Comprehensive Form State mapped to Stratmire Application Requirements
    const [formData, setFormData] = useState({
        // Account Setup
        password: '',

        // Applicant Information
        fullLegalName: '', businessName: '', phone: '', email: '',
        dob: '', ssnLast4: '', homeAddress: '', referredBy: '',

        // Compliance & Disclosures
        felonyHistory: 'no', bankruptcyHistory: 'no',

        // Professional Background
        currentOccupation: '', companyName: '', yearsExperience: '', relevantExperience: '',

        // Agreement & Acknowledgment
        acknowledgment: false, signature: '', printName: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePartnerSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend Validation
        if (!formData.acknowledgment) {
            setError("You must acknowledge the terms to proceed.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Create the Authentication Account (This auto-logs them in)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            // 2. Insert the partner row into the database
            if (authData.user) {

                // Split the full name to satisfy database structure
                const nameParts = formData.fullLegalName.trim().split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'N/A';

                const { error: dbError } = await supabase
                    .from('loan_partners')
                    .insert([{
                        id: authData.user.id,
                        email: formData.email,
                        first_name: firstName,
                        last_name: lastName,
                        phone: formData.phone,
                        business_name: formData.businessName,
                        signature_name: formData.signature,
                        referring_partner_code: formData.referredBy,
                        dob: formData.dob,
                        ssn_last_4: formData.ssnLast4,
                        home_address: formData.homeAddress,
                        felony_history: formData.felonyHistory === 'yes',
                        bankruptcy_history: formData.bankruptcyHistory === 'yes',
                        current_occupation: formData.currentOccupation,
                        company_name: formData.companyName,
                        years_experience: formData.yearsExperience,
                        relevant_experience: formData.relevantExperience,
                        partner_code: generateReferralCode(formData.email),
                        status: 'PENDING'
                    }]);

                if (dbError) throw dbError;

                // 3. SECURE THE GATE: Instantly sign the user out so they cannot access the dashboard yet
                await supabase.auth.signOut();

                // 4. Trigger the Success Screen instead of routing
                setIsSubmitted(true);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // If the application was successfully submitted, show the Pending Approval screen
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans py-12">
                <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                        <CheckCircle2 size={40} className="text-[#0a6c50]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#042f24] tracking-tight">Application Received</h2>

                    <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                        <p>
                            Thank you for applying to become a Stratmire Capital Partner. Your application has been secured and is currently under review by our administration team.
                        </p>
                        <p className="font-bold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            Your account status is currently: PENDING
                        </p>
                        <p>
                            You will receive an email notification granting you portal access once your profile has been fully vetted and approved.
                        </p>
                    </div>

                    <Link href="/" className="inline-block mt-4 bg-[#042f24] text-white font-bold py-3.5 px-8 rounded-xl hover:bg-[#0a6c50] transition-colors shadow-lg">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    // Default Form View
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans py-12">

            <div className="max-w-3xl w-full mb-8 text-center space-y-2">
                <h1 className="text-4xl font-black text-[#042f24] uppercase tracking-tight">Stratmire Capital Partners LLC</h1>
                <p className="text-lg font-medium text-slate-500">Capital without limits. Solutions without compromise. </p>
            </div>

            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                <div className="bg-[#0a6c50] p-8 text-white text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 backdrop-blur-sm">
                        <Building2 size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">LOAN PARTNER APPLICATION FORM </h2>
                </div>

                {error && (
                    <div className="m-8 mb-0 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
                        <ShieldAlert size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handlePartnerSignup} className="p-8 space-y-10">

                    {/* APPLICANT INFORMATION */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><User size={20} className="text-[#0a6c50]" /> Applicant Information </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Legal Name *</label>
                                <input type="text" name="fullLegalName" required value={formData.fullLegalName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Name (If applicable)</label>
                                <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number *</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address *</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date of Birth *</label>
                                <input type="date" name="dob" required value={formData.dob} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">SSN (Last 4) *</label>
                                <input type="text" name="ssnLast4" required maxLength={4} value={formData.ssnLast4} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" placeholder="XXXX" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Home Address *</label>
                                <input type="text" name="homeAddress" required value={formData.homeAddress} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Referred by (Can only be referred by existing approved partner)</label>
                                <input type="text" name="referredBy" value={formData.referredBy} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                        </div>
                    </section>

                    {/* COMPLIANCE & DISCLOSURES */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><ShieldAlert size={20} className="text-[#0a6c50]" /> Compliance & Disclosures </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <label className="block text-sm font-bold text-slate-700 mb-3">Felony or Financial Crime History? *</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="felonyHistory" value="yes" checked={formData.felonyHistory === 'yes'} onChange={handleInputChange} className="text-[#0a6c50] focus:ring-[#0a6c50]" /> Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="felonyHistory" value="no" checked={formData.felonyHistory === 'no'} onChange={handleInputChange} className="text-[#0a6c50] focus:ring-[#0a6c50]" /> No</label>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <label className="block text-sm font-bold text-slate-700 mb-3">Bankruptcy / Foreclosure History? *</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="bankruptcyHistory" value="yes" checked={formData.bankruptcyHistory === 'yes'} onChange={handleInputChange} className="text-[#0a6c50] focus:ring-[#0a6c50]" /> Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="bankruptcyHistory" value="no" checked={formData.bankruptcyHistory === 'no'} onChange={handleInputChange} className="text-[#0a6c50] focus:ring-[#0a6c50]" /> No</label>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PROFESSIONAL BACKGROUND */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><Briefcase size={20} className="text-[#0a6c50]" /> Professional Background </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Occupation *</label>
                                <input type="text" name="currentOccupation" required value={formData.currentOccupation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name *</label>
                                <input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Years of Experience *</label>
                                <input type="number" name="yearsExperience" required value={formData.yearsExperience} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Relevant Experience *</label>
                                <select name="relevantExperience" required value={formData.relevantExperience} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all">
                                    <option value="">Select Domain...</option>
                                    <option value="Mortgage / Lending">Mortgage / Lending</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Business Consulting">Business Consulting</option>
                                    <option value="Financial Services">Financial Services</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Sales / Marketing">Sales / Marketing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* AGREEMENT & ACKNOWLEDGMENT */}
                    <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2"><FileSignature size={20} className="text-[#0a6c50]" /> Agreement & Acknowledgment </h3>

                        <label className="flex items-start gap-4 cursor-pointer mb-6 group">
                            <input type="checkbox" name="acknowledgment" checked={formData.acknowledgment} onChange={handleInputChange} className="mt-1 w-5 h-5 text-[#0a6c50] border-slate-300 rounded focus:ring-[#0a6c50] cursor-pointer" />
                            <span className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900 transition-colors">
                                I acknowledge that I am applying as an independent loan partner. Stratmire Capital Partners LLC handles all funding and processing. Compensation is based on funded deals and subject to agreement terms.
                            </span>
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Applicant Signature (Type Full Name) *</label>
                                <input type="text" name="signature" required value={formData.signature} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-white font-medium text-slate-900" placeholder="Sign here..." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                <div className="px-4 py-3 border border-slate-200 bg-white text-slate-500 rounded-xl font-medium">
                                    {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ACCOUNT SECURITY */}
                    <section className="pt-4 border-t border-slate-100">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Create Account Password *</label>
                        <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleInputChange} className="w-full max-w-md px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" placeholder="Secure password for portal access" />
                    </section>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0a6c50] text-white font-black text-lg py-4 rounded-xl hover:bg-[#085a42] transition-colors flex items-center justify-center gap-2 shadow-xl shadow-[#0a6c50]/20 disabled:opacity-70 mt-6"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : "Submit Partner Application"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div className="bg-slate-50 text-center py-6 border-t border-slate-100">
                    <p className="text-sm font-medium text-slate-500">
                        Already have an approved account?{' '}
                        <Link href="/become-partner/login" className="font-bold text-[#0a6c50] hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}