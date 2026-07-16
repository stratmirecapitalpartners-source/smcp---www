"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Building2, ArrowRight, Loader2, User, ShieldAlert, Briefcase, FileSignature, CheckCircle2, Star } from 'lucide-react';
import Link from 'next/link';
import { generateReferralCode } from '@/lib/utils';

export default function BecomePartnerPage() {
    const router = useRouter();
    const supabase = createClient();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        password: '',
        partnerTier: 'Starter', // Default value
        fullLegalName: '', businessName: '', phone: '', email: '',
        dob: '', ssnLast4: '', homeAddress: '',
        referredPartnerName: '', referredPartnerCode: '',
        felonyHistory: 'no', bankruptcyHistory: 'no',
        currentOccupation: '', companyName: '', yearsExperience: '', relevantExperience: '',
        acknowledgment: false, signature: ''
    });

    // Unified handler that correctly processes radio buttons, checkboxes, and text inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePartnerSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.acknowledgment) {
            setError("You must acknowledge the terms to proceed.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            if (authData.user) {
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
                        referring_partner_name: formData.referredPartnerName,
                        referring_partner_code: formData.referredPartnerCode,
                        partner_tier: formData.partnerTier,
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
                await supabase.auth.signOut();
                setIsSubmitted(true);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
                <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
                    <CheckCircle2 size={60} className="text-[#0a6c50] mx-auto" />
                    <h2 className="text-3xl font-black text-[#042f24]">Application Received</h2>
                    <p>Thank you for applying for the <strong>{formData.partnerTier}</strong> tier. Your application is under review.</p>
                    <Link href="/" className="inline-block bg-[#042f24] text-white font-bold py-3 px-8 rounded-xl">Return to Homepage</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans py-12">
            <form onSubmit={handlePartnerSignup} className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">

                {/* TIER SELECTION */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Star size={20} className="text-[#0a6c50]" /> Partnership Tier</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Starter', 'Producer'].map((tier) => (
                            <label key={tier} className={`cursor-pointer p-5 rounded-xl border-2 transition-all ${formData.partnerTier === tier ? 'border-[#0a6c50] bg-emerald-50' : 'border-slate-200'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-lg">{tier}</span>
                                    <input type="radio" name="partnerTier" value={tier} checked={formData.partnerTier === tier} onChange={handleInputChange} className="w-4 h-4 text-[#0a6c50]" />
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

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

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Referred Partner Name (Optional)</label>
                            <input type="text" name="referredPartnerName" value={formData.referredPartnerName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Partner Code (Optional)</label>
                            <input type="text" name="referredPartnerCode" value={formData.referredPartnerCode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0a6c50] outline-none bg-slate-50 focus:bg-white transition-all" placeholder="CODE123" />
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

                <button type="submit" disabled={loading} className="w-full bg-[#0a6c50] text-white font-black py-4 rounded-xl">
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Submit Application"}
                </button>
            </form>

            <div className="bg-slate-50 text-center py-6 border-t border-slate-100 mt-8 w-full max-w-3xl">
                <p className="text-sm font-medium text-slate-500">
                    Already have an approved account?{' '}
                    <Link href="/become-partner/login" className="font-bold text-[#0a6c50] hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
}