"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, ShieldCheck, Lightbulb, Briefcase, Building } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BusinessLoanPage() {
    const router = useRouter()
    const supabase = createClient()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        // Step 1: Eligibility
        fundingAmount: "",
        monthlySales: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        // Step 2: Business Info
        legalBusinessName: "",
        yearsInBusiness: "",
        businessClassification: "",
        taxId: "",
        industry: "",
        isHomeBased: "no",
        businessAddress: "",

        // Step 3: Ownership
        ownershipPercentage: "",
        last4Ssn: "",
        homeZipCode: "",
        ssn: "",
        homeAddress: "",
        homeCity: "",
        homeState: "",
        dob: "",

        // Step 4: Preferences
        fundsTiming: "",
        importantFactor: "",
        source: ""
    })

    const [interests, setInterests] = useState<string[]>([])

    // --- VISIBILITY FIX: Custom styling to match your exact theme (pill-shaped, gray background) ---
    const inputBaseStyles = "w-full bg-slate-100 border-0 rounded-full px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-sm";
    const radioBaseStyles = "flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border-2";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target
        const stateKey = id.replace('biz-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        setFormData(prev => ({ ...prev, [stateKey]: value }))
    }

    const toggleInterest = (interest: string) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const payload = {
            funding_amount: formData.fundingAmount,
            monthly_sales: formData.monthlySales,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            legal_business_name: formData.legalBusinessName,
            years_in_business: formData.yearsInBusiness,
            business_classification: formData.businessClassification,
            tax_id: formData.taxId,
            industry: formData.industry,
            is_home_based: formData.isHomeBased === "yes",
            business_address: formData.businessAddress,
            ownership_percentage: formData.ownershipPercentage,
            last_4_ssn: formData.last4Ssn,
            home_zip_code: formData.homeZipCode,
            ssn: formData.ssn,
            home_address: formData.homeAddress,
            home_city: formData.homeCity,
            home_state: formData.homeState,
            dob: formData.dob,
            interests: interests,
            funds_timing: formData.fundsTiming,
            important_factor: formData.importantFactor,
            source: formData.source
        }

        const { data, error } = await supabase
            .from('business_loans')
            .insert([payload])
            .select('id')
            .single()

        setIsSubmitting(false)

        if (error) {
            console.error("Database insertion failed:", error.message)
            return
        }

        console.log("Business Application Secured. ID:", data.id)
        router.push(`/userjourney/success`)
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">
            <header className="mb-12">
                <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight leading-tight">
                    Business Funding
                </h1>
                <p className="mt-6 text-on-surface-variant text-lg max-w-xl leading-relaxed">
                    Check your eligibility in 60 seconds. Provide your business details below to secure your financing.
                </p>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0a251e]"></div>

                    <form className="space-y-10" onSubmit={handleSubmit}>

                        {/* SECTION 1: ELIGIBILITY & BASICS */}
                        <div className="space-y-6">
                            <h2 className="pb-2 text-xl font-bold text-primary flex items-center gap-2 border-b border-slate-100">
                                <Briefcase size={20} className="text-secondary" /> Basics & Eligibility
                            </h2>

                            <FieldGroup className="grid sm:grid-cols-2 gap-6">
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-funding-amount" className="font-semibold text-slate-700">How much funding do you need? <span className="text-red-500">*</span></FieldLabel>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <Input id="biz-funding-amount" type="number" required placeholder="0.00" className={`${inputBaseStyles} pl-9`} value={formData.fundingAmount} onChange={handleInputChange} />
                                    </div>
                                </Field>
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-monthly-sales" className="font-semibold text-slate-700">What is your average monthly sales? <span className="text-red-500">*</span></FieldLabel>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <Input id="biz-monthly-sales" type="number" required placeholder="0.00" className={`${inputBaseStyles} pl-9`} value={formData.monthlySales} onChange={handleInputChange} />
                                    </div>
                                </Field>
                            </FieldGroup>

                            <FieldGroup className="grid sm:grid-cols-2 gap-6 pt-4">
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-first-name" className="font-semibold text-slate-700">First Name <span className="text-red-500">*</span></FieldLabel>
                                    <Input id="biz-first-name" required className={inputBaseStyles} value={formData.firstName} onChange={handleInputChange} />
                                </Field>
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-last-name" className="font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></FieldLabel>
                                    <Input id="biz-last-name" required className={inputBaseStyles} value={formData.lastName} onChange={handleInputChange} />
                                </Field>
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-email" className="font-semibold text-slate-700">Business Email Address <span className="text-red-500">*</span></FieldLabel>
                                    <Input id="biz-email" type="email" required className={inputBaseStyles} value={formData.email} onChange={handleInputChange} />
                                </Field>
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-phone" className="font-semibold text-slate-700">Cell Phone <span className="text-red-500">*</span></FieldLabel>
                                    <Input id="biz-phone" type="tel" required className={inputBaseStyles} value={formData.phone} onChange={handleInputChange} />
                                </Field>
                            </FieldGroup>
                        </div>

                        {/* SECTION 2: BUSINESS INFORMATION */}
                        <div className="pt-8 space-y-8">
                            <h2 className="pb-2 text-xl font-bold text-primary flex items-center gap-2 border-b border-slate-100">
                                <Building size={20} className="text-secondary" /> Business Information
                            </h2>

                            <Field className="space-y-2">
                                <FieldLabel htmlFor="biz-legal-business-name" className="font-semibold text-slate-700">Legal Business Name <span className="text-red-500">*</span></FieldLabel>
                                <Input id="biz-legal-business-name" required className={inputBaseStyles} value={formData.legalBusinessName} onChange={handleInputChange} />
                            </Field>

                            <div className="space-y-4">
                                <FieldLabel className="font-semibold text-slate-700">Years in Business</FieldLabel>
                                <RadioGroup value={formData.yearsInBusiness} onValueChange={(val) => setFormData(p => ({ ...p, yearsInBusiness: val }))} className="grid grid-cols-2 gap-4">
                                    <label className={`${radioBaseStyles} ${formData.yearsInBusiness === '0-1' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="0-1" id="years-0-1" className="sr-only" /> 0-1 year
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.yearsInBusiness === '1-2' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="1-2" id="years-1-2" className="sr-only" /> 1-2 years
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.yearsInBusiness === '2-5' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="2-5" id="years-2-5" className="sr-only" /> 2-5 years
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.yearsInBusiness === '5+' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="5+" id="years-5-plus" className="sr-only" /> 5+ years
                                    </label>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4">
                                <FieldLabel className="font-semibold text-slate-700">Business Classification</FieldLabel>
                                <RadioGroup value={formData.businessClassification} onValueChange={(val) => setFormData(p => ({ ...p, businessClassification: val }))} className="grid grid-cols-2 gap-4">
                                    <label className={`${radioBaseStyles} ${formData.businessClassification === 'Partnership' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Partnership" id="class-partnership" className="sr-only" /> Partnership
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.businessClassification === 'LLC' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="LLC" id="class-llc" className="sr-only" /> LLC
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.businessClassification === 'Corporation' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Corporation" id="class-corp" className="sr-only" /> Corporation
                                    </label>
                                    <label className={`${radioBaseStyles} text-center ${formData.businessClassification === 'Sole Proprietorship' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Sole Proprietorship" id="class-sole" className="sr-only" /> Sole Proprietorship
                                    </label>
                                </RadioGroup>
                            </div>

                            <FieldGroup className="grid sm:grid-cols-2 gap-6">
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-tax-id" className="font-semibold text-slate-700">Tax ID / SSN</FieldLabel>
                                    <Input id="biz-tax-id" className={inputBaseStyles} value={formData.taxId} onChange={handleInputChange} />
                                </Field>
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-industry" className="font-semibold text-slate-700">Industry</FieldLabel>
                                    <Input id="biz-industry" className={inputBaseStyles} value={formData.industry} onChange={handleInputChange} />
                                </Field>
                            </FieldGroup>

                            <div className="space-y-4 pt-2">
                                <FieldLabel className="font-semibold text-slate-700">Home based business?</FieldLabel>
                                <RadioGroup value={formData.isHomeBased} onValueChange={(val) => setFormData(p => ({ ...p, isHomeBased: val }))} className="flex gap-4">
                                    <label className={`flex items-center gap-3 px-8 py-3 rounded-full cursor-pointer transition-all ${formData.isHomeBased === 'yes' ? 'bg-[#0a251e] text-white font-bold shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        <RadioGroupItem value="yes" id="home-yes" className="sr-only" /> Yes
                                    </label>
                                    <label className={`flex items-center gap-3 px-8 py-3 rounded-full cursor-pointer transition-all ${formData.isHomeBased === 'no' ? 'bg-[#0a251e] text-white font-bold shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        <RadioGroupItem value="no" id="home-no" className="sr-only" /> No
                                    </label>
                                </RadioGroup>
                            </div>

                            <Field className="space-y-2">
                                <FieldLabel htmlFor="biz-business-address" className="font-semibold text-slate-700">Physical business address (no P.O. boxes)</FieldLabel>
                                <Input id="biz-business-address" className={inputBaseStyles} value={formData.businessAddress} onChange={handleInputChange} />
                            </Field>
                        </div>

                        {/* SECTION 3: OWNERSHIP DETAILS */}
                        <div className="pt-8 space-y-8">
                            <h2 className="pb-2 text-xl font-bold text-primary flex items-center gap-2 border-b border-slate-100">
                                <ShieldCheck size={20} className="text-secondary" /> Ownership Details
                            </h2>

                            <FieldGroup className="grid sm:grid-cols-2 gap-6">
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-ownership-percentage" className="font-semibold text-slate-700">Ownership Percentage <span className="text-red-500">*</span></FieldLabel>
                                    <div className="relative">
                                        <Input id="biz-ownership-percentage" type="number" required className={inputBaseStyles} value={formData.ownershipPercentage} onChange={handleInputChange} />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                    </div>
                                </Field>
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-ssn" className="font-semibold text-slate-700">Full Social Security Number <span className="text-red-500">*</span></FieldLabel>
                                    <Input id="biz-ssn" type="password" placeholder="XXX-XX-XXXX" required className={inputBaseStyles} value={formData.ssn} onChange={handleInputChange} />
                                </Field>
                            </FieldGroup>

                            <FieldGroup className="grid sm:grid-cols-2 gap-6">
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-dob" className="font-semibold text-slate-700">Date of Birth <span className="text-red-500">*</span></FieldLabel>
                                    <Input id="biz-dob" type="date" required className={inputBaseStyles} value={formData.dob} onChange={handleInputChange} />
                                </Field>
                            </FieldGroup>

                            <div className="pt-4 space-y-6">
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="biz-home-address" className="font-semibold text-slate-700">Home Address</FieldLabel>
                                    <Input id="biz-home-address" className={inputBaseStyles} value={formData.homeAddress} onChange={handleInputChange} />
                                </Field>
                                <FieldGroup className="grid sm:grid-cols-3 gap-6">
                                    <Field className="sm:col-span-1 space-y-2">
                                        <FieldLabel htmlFor="biz-home-city" className="font-semibold text-slate-700">City</FieldLabel>
                                        <Input id="biz-home-city" className={inputBaseStyles} value={formData.homeCity} onChange={handleInputChange} />
                                    </Field>
                                    <Field className="sm:col-span-1 space-y-2">
                                        <FieldLabel htmlFor="biz-home-state" className="font-semibold text-slate-700">State</FieldLabel>
                                        <select id="biz-home-state" value={formData.homeState} onChange={handleInputChange} className={inputBaseStyles}>
                                            <option value="">Select...</option>
                                            <option value="FL">FL</option>
                                            <option value="CA">CA</option>
                                            <option value="NY">NY</option>
                                            <option value="TX">TX</option>
                                        </select>
                                    </Field>
                                    <Field className="sm:col-span-1 space-y-2">
                                        <FieldLabel htmlFor="biz-home-zip-code" className="font-semibold text-slate-700">Zip Code</FieldLabel>
                                        <Input id="biz-home-zip-code" className={inputBaseStyles} value={formData.homeZipCode} onChange={handleInputChange} />
                                    </Field>
                                </FieldGroup>
                            </div>
                        </div>

                        {/* SECTION 4: PREFERENCES */}
                        <div className="pt-8 space-y-8">
                            <h2 className="pb-2 text-xl font-bold text-primary border-b border-slate-100">What are you interested in?</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Working Capital', 'Credit Line', 'Invoice Factoring', 'Equipment Financing', 'Vehicle Financing'].map((interest) => (
                                    <label key={interest} className={`${radioBaseStyles} justify-start gap-4 ${interests.includes(interest) ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded text-[#0a251e] focus:ring-[#0a251e]"
                                            checked={interests.includes(interest)}
                                            onChange={() => toggleInterest(interest)}
                                        />
                                        {interest}
                                    </label>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <FieldLabel className="font-semibold text-slate-700">When do you need funds?</FieldLabel>
                                <RadioGroup value={formData.fundsTiming} onValueChange={(val) => setFormData(p => ({ ...p, fundsTiming: val }))} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <label className={`${radioBaseStyles} ${formData.fundsTiming === 'Immediately' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Immediately" id="timing-immediate" className="sr-only" /> Immediately
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.fundsTiming === 'Within a week' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Within a week" id="timing-week" className="sr-only" /> Within a week
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.fundsTiming === 'Within a month' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Within a month" id="timing-month" className="sr-only" /> Within a month
                                    </label>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4">
                                <FieldLabel className="font-semibold text-slate-700">What is most important when securing financing?</FieldLabel>
                                <RadioGroup value={formData.importantFactor} onValueChange={(val) => setFormData(p => ({ ...p, importantFactor: val }))} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <label className={`${radioBaseStyles} ${formData.importantFactor === 'Speed' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Speed" id="factor-speed" className="sr-only" /> Speed
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.importantFactor === 'Cost' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Cost" id="factor-cost" className="sr-only" /> Cost
                                    </label>
                                    <label className={`${radioBaseStyles} ${formData.importantFactor === 'Amount' ? 'border-[#0a251e] bg-[#0a251e]/5 text-[#0a251e] font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                                        <RadioGroupItem value="Amount" id="factor-amount" className="sr-only" /> Amount
                                    </label>
                                </RadioGroup>
                            </div>

                            <Field className="max-w-md space-y-2">
                                <FieldLabel htmlFor="biz-source" className="font-semibold text-slate-700">How did you hear about us?</FieldLabel>
                                <select id="biz-source" value={formData.source} onChange={handleInputChange} className={inputBaseStyles}>
                                    <option value="">Select option...</option>
                                    <option value="Google">Google Search</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Referral">Friend or Colleague</option>
                                    <option value="Advertisement">Advertisement</option>
                                    <option value="Reffered by a partner / Consultant">Referred by a partner / Consultant</option>
                                </select>
                            </Field>
                        </div>

                        <div className="pt-10 flex items-center justify-between border-t border-slate-200 mt-10">
                            <button type="button" onClick={() => router.back()} className="text-slate-500 font-bold hover:text-slate-800 flex items-center gap-2 transition-colors uppercase text-sm tracking-widest">
                                <ArrowLeft size={16} /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#0a251e] text-white px-12 py-4 rounded-full font-black tracking-widest hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-[#0a251e]/30 disabled:opacity-50 uppercase"
                            >
                                {isSubmitting ? "Processing..." : "Submit Application"} <ArrowRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* SIDEBAR */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                        <ShieldCheck className="text-secondary w-10 h-10 mb-4" />
                        <h3 className="font-headline font-bold text-primary text-xl mb-3">Secure Commercial Vault</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Your business and personal data is encrypted with AES-256 standards. We never share proprietary info with unauthorized third-parties.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                        <Lightbulb className="text-secondary w-6 h-6 shrink-0 mt-1" />
                        <div>
                            <p className="font-bold text-primary mb-1">Commercial Support</p>
                            <p className="text-sm text-slate-600 leading-relaxed">Click the help icon in the header to chat directly with a commercial underwriter.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}