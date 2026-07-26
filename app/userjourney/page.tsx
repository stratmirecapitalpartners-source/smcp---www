"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, ArrowLeft, ShieldCheck, Lightbulb, Trash2, Plus, AlertTriangle, Info } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Strict type definitions
type Address = {
  id: number;
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  dateMovedIn: string;
  dateMovedOut: string;
  isCurrent: boolean;
  housingStatus: string;
  monthlyPayment: string;
};

type Job = {
  id: number;
  employerName: string;
  isSelfEmployed: string;
  hasOwnership: string;
};

type IncomeSource = {
  id: number;
  source: string;
  monthlyIncome: string;
};

// 1. MAIN LOGIC REFACTORED AS A CHILD COMPONENT
function BorrowerInfoForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [borrowerId, setBorrowerId] = useState<string | null>(null)

  // Hydration State to prevent race conditions
  const [isHydrated, setIsHydrated] = useState(false)

  // Referral State
  const [referralCode, setReferralCode] = useState("")

  // Demographics & Consent State
  const [hasOtherNames, setHasOtherNames] = useState("no")
  const [creditConsent, setCreditConsent] = useState("yes")
  const [citizenship, setCitizenship] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")

  // Address History State Management
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddingAddress, setIsAddingAddress] = useState(true)
  const [addrForm, setAddrForm] = useState({
    street: "", unit: "", city: "", state: "", zip: "",
    dateMovedIn: "", dateMovedOut: "", isCurrent: false,
    housingStatus: "Renting", monthlyPayment: ""
  })

  // Mailing Address State Management
  const [hasDifferentMailingAddress, setHasDifferentMailingAddress] = useState("no")
  const [mailingAddress, setMailingAddress] = useState({
    street: "", unit: "", city: "", state: "", zip: ""
  })

  // Dependents State Management
  const [hasDependents, setHasDependents] = useState("no")
  const [dependents, setDependents] = useState<{ id: number; age: string }[]>([])
  const [newDependentAge, setNewDependentAge] = useState("")

  // Military Service State Management
  const [hasMilitaryService, setHasMilitaryService] = useState("no")
  const [militaryStatus, setMilitaryStatus] = useState("")
  const [militaryExpirationDate, setMilitaryExpirationDate] = useState("")

  // Homeownership Education State Management
  const [hasEducation, setHasEducation] = useState("no")
  const [educationFormat, setEducationFormat] = useState("")
  const [isHudApproved, setIsHudApproved] = useState("")
  const [hudAgencyId, setHudAgencyId] = useState("")
  const [educationProgramName, setEducationProgramName] = useState("")
  const [educationCompletionDate, setEducationCompletionDate] = useState("")

  // Housing Counseling State Management
  const [hasCounseling, setHasCounseling] = useState("no")
  const [counselingFormat, setCounselingFormat] = useState("")
  const [isCounselingHudApproved, setIsCounselingHudApproved] = useState("")
  const [counselingHudAgencyId, setCounselingHudAgencyId] = useState("")
  const [counselingAgencyName, setCounselingAgencyName] = useState("")
  const [counselingCompletionDate, setCounselingCompletionDate] = useState("")

  // Employment History State Management
  const [hasBeenEmployed, setHasBeenEmployed] = useState("no")
  const [jobs, setJobs] = useState<Job[]>([])
  const [isAddingJob, setIsAddingJob] = useState(true)
  const [jobForm, setJobForm] = useState({
    employerName: "",
    isSelfEmployed: "",
    hasOwnership: ""
  })

  // Additional Income State Management
  const [hasAdditionalIncome, setHasAdditionalIncome] = useState("no")
  const [additionalIncomes, setAdditionalIncomes] = useState<IncomeSource[]>([])
  const [isAddingIncome, setIsAddingIncome] = useState(true)
  const [incomeForm, setIncomeForm] = useState({
    source: "",
    monthlyIncome: ""
  })

  // Language Preference State Management
  const [languagePreference, setLanguagePreference] = useState("English")

  // Primary Identity & Contact State
  const [formData, setFormData] = useState({
    suffix: "", firstName: "", middleName: "", lastName: "",
    altFirstName: "", altMiddleName: "", altLastName: "",
    email: "", phone: "", ssn: "", birthDate: "",
  })

  // HYDRATION & SMART ROUTING
  useEffect(() => {
    // Utilize the Next.js router state natively instead of window.location
    const isForceNew = searchParams.get('new') === 'true';
    const savedLocalId = localStorage.getItem('currentApplicationId');

    if (savedLocalId && !isForceNew) {
      router.push('/dashboard');
      return;
    }

    const savedId = sessionStorage.getItem('activeBorrowerId');
    if (savedId) setBorrowerId(savedId);

    const savedDraft = sessionStorage.getItem('borrowerInfoDraft');
    if (savedDraft) {
      const parsed = JSON.parse(savedDraft);
      setFormData(parsed.formData || formData);
      setAddresses(parsed.addresses || []);
      setJobs(parsed.jobs || []);
      setDependents(parsed.dependents || []);
      setAdditionalIncomes(parsed.additionalIncomes || []);
      setMailingAddress(parsed.mailingAddress || { street: "", unit: "", city: "", state: "", zip: "" });

      setReferralCode(parsed.referralCode || "");

      setHasOtherNames(parsed.hasOtherNames || "no");
      setHasDependents(parsed.hasDependents || "no");
      setHasBeenEmployed(parsed.hasBeenEmployed || "no");
      setHasAdditionalIncome(parsed.hasAdditionalIncome || "no");
      setHasMilitaryService(parsed.hasMilitaryService || "no");
      setMilitaryStatus(parsed.militaryStatus || "");
      setMilitaryExpirationDate(parsed.militaryExpirationDate || "");
      setHasDifferentMailingAddress(parsed.hasDifferentMailingAddress || "no");

      setHasEducation(parsed.hasEducation || "no");
      setEducationFormat(parsed.educationFormat || "");
      setIsHudApproved(parsed.isHudApproved || "");
      setHudAgencyId(parsed.hudAgencyId || "");
      setEducationProgramName(parsed.educationProgramName || "");
      setEducationCompletionDate(parsed.educationCompletionDate || "");

      setHasCounseling(parsed.hasCounseling || "no");
      setCounselingFormat(parsed.counselingFormat || "");
      setIsCounselingHudApproved(parsed.isCounselingHudApproved || "");
      setCounselingHudAgencyId(parsed.counselingHudAgencyId || "");
      setCounselingAgencyName(parsed.counselingAgencyName || "");
      setCounselingCompletionDate(parsed.counselingCompletionDate || "");

      setLanguagePreference(parsed.languagePreference || "English");
      setCreditConsent(parsed.creditConsent || "yes");
      setCitizenship(parsed.citizenship || "");
      setMaritalStatus(parsed.maritalStatus || "");
    }

    setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  // PERSISTENCE: Save to browser memory automatically as they type
  useEffect(() => {
    if (!isHydrated) return;

    const draft = {
      formData, addresses, jobs, dependents, additionalIncomes, mailingAddress, referralCode,
      hasOtherNames, hasDependents, hasBeenEmployed, hasAdditionalIncome,
      hasMilitaryService, militaryStatus, militaryExpirationDate,
      hasEducation, educationFormat, isHudApproved, hudAgencyId, educationProgramName, educationCompletionDate,
      hasCounseling, counselingFormat, isCounselingHudApproved, counselingHudAgencyId, counselingAgencyName, counselingCompletionDate,
      hasDifferentMailingAddress, languagePreference, creditConsent, citizenship, maritalStatus
    };
    sessionStorage.setItem('borrowerInfoDraft', JSON.stringify(draft));
  }, [
    isHydrated,
    formData, addresses, jobs, dependents, additionalIncomes, mailingAddress, referralCode,
    hasOtherNames, hasDependents, hasBeenEmployed, hasAdditionalIncome,
    hasMilitaryService, militaryStatus, militaryExpirationDate,
    hasEducation, educationFormat, isHudApproved, hudAgencyId, educationProgramName, educationCompletionDate,
    hasCounseling, counselingFormat, isCounselingHudApproved, counselingHudAgencyId, counselingAgencyName, counselingCompletionDate,
    hasDifferentMailingAddress, languagePreference, creditConsent, citizenship, maritalStatus
  ]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const rawId = id.replace('fieldgroup-', '').replace('input-', '')
    const stateKey = rawId.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    setFormData(prev => ({ ...prev, [stateKey]: value }))
  }

  // --- Address Logic ---
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    const stateKey = id.replace('addr-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());

    setAddrForm(prev => ({
      ...prev,
      [stateKey]: type === "checkbox" ? checked : value
    }))
  }

  const saveAddress = () => {
    if (!addrForm.street || !addrForm.city || !addrForm.state || !addrForm.zip) {
      console.error("Address validation failed: Missing required fields.")
      return;
    }

    const cleansedAddress = {
      ...addrForm,
      id: Date.now(),
      dateMovedOut: addrForm.isCurrent ? "" : addrForm.dateMovedOut,
      monthlyPayment: addrForm.housingStatus !== 'Renting' ? "" : addrForm.monthlyPayment
    };

    setAddresses([...addresses, cleansedAddress as Address])

    setAddrForm({
      street: "", unit: "", city: "", state: "", zip: "",
      dateMovedIn: "", dateMovedOut: "", isCurrent: false,
      housingStatus: "Renting", monthlyPayment: ""
    })
    setIsAddingAddress(false)
  }

  const removeAddress = (idToRemove: number) => {
    setAddresses(addresses.filter(a => a.id !== idToRemove))
    if (addresses.length === 1) setIsAddingAddress(true)
  }

  // --- Mailing Address Logic ---
  const handleMailingAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    const stateKey = id.replace('mail-', '')
    setMailingAddress(prev => ({ ...prev, [stateKey]: value }))
  }

  // --- Employment Logic ---
  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const stateKey = id.replace('job-', '')
    setJobForm(prev => ({ ...prev, [stateKey]: value }))
  }

  const saveJob = () => {
    if (!jobForm.employerName || !jobForm.isSelfEmployed || !jobForm.hasOwnership) {
      console.error("Job validation failed: Missing required fields.")
      return;
    }

    setJobs([...jobs, { ...jobForm, id: Date.now() } as Job])

    setJobForm({
      employerName: "",
      isSelfEmployed: "",
      hasOwnership: ""
    })
    setIsAddingJob(false)
  }

  const removeJob = (idToRemove: number) => {
    setJobs(jobs.filter(j => j.id !== idToRemove))
    if (jobs.length === 1) setIsAddingJob(true)
  }

  // --- Additional Income Logic ---
  const saveIncome = () => {
    if (!incomeForm.source || !incomeForm.monthlyIncome) {
      console.error("Income validation failed: Missing required fields.")
      return;
    }

    setAdditionalIncomes([...additionalIncomes, { ...incomeForm, id: Date.now() } as IncomeSource])

    setIncomeForm({
      source: "",
      monthlyIncome: ""
    })
    setIsAddingIncome(false)
  }

  const removeIncome = (idToRemove: number) => {
    setAdditionalIncomes(additionalIncomes.filter(i => i.id !== idToRemove))
    if (additionalIncomes.length === 1) setIsAddingIncome(true)
  }

  // --- Dependent Logic ---
  const handleAddDependent = () => {
    if (!newDependentAge || isNaN(Number(newDependentAge))) return
    setDependents([...dependents, { id: Date.now(), age: newDependentAge }])
    setNewDependentAge("")
  }

  const handleRemoveDependent = (idToRemove: number) => {
    setDependents(dependents.filter(dep => dep.id !== idToRemove))
  }

  // --- Master Database Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.ssn || !formData.birthDate) return
    if (addresses.length === 0) return
    if (hasDifferentMailingAddress === "yes" && (!mailingAddress.street || !mailingAddress.city || !mailingAddress.state || !mailingAddress.zip)) return
    if (hasMilitaryService === "yes" && !militaryStatus) return
    if (hasMilitaryService === "yes" && militaryStatus === "active_duty" && !militaryExpirationDate) return
    if (hasBeenEmployed === "yes" && jobs.length === 0) return
    if (hasAdditionalIncome === "yes" && additionalIncomes.length === 0) return

    setIsSubmitting(true)

    const dependentAgesArray = dependents.map(dep => parseInt(dep.age, 10))

    let finalBorrowerId = borrowerId;

    const payload = {
      suffix: formData.suffix,
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      has_other_names: hasOtherNames === "yes",
      alt_first_name: hasOtherNames === "yes" ? formData.altFirstName : null,
      alt_middle_name: hasOtherNames === "yes" ? formData.altMiddleName : null,
      alt_last_name: hasOtherNames === "yes" ? formData.altLastName : null,
      email: formData.email,
      phone: formData.phone,
      ssn: formData.ssn,
      credit_check_consent: creditConsent === "yes",
      birth_date: formData.birthDate,
      citizenship_status: citizenship,
      marital_status: maritalStatus,
      has_dependents: hasDependents === "yes",
      dependents_ages: hasDependents === "yes" ? dependentAgesArray : [],
      address_history: addresses,

      has_different_mailing_address: hasDifferentMailingAddress === "yes",
      mailing_street: hasDifferentMailingAddress === "yes" ? mailingAddress.street : null,
      mailing_unit: hasDifferentMailingAddress === "yes" ? mailingAddress.unit : null,
      mailing_city: hasDifferentMailingAddress === "yes" ? mailingAddress.city : null,
      mailing_state: hasDifferentMailingAddress === "yes" ? mailingAddress.state : null,
      mailing_zip: hasDifferentMailingAddress === "yes" ? mailingAddress.zip : null,

      has_military_service: hasMilitaryService === "yes",
      military_status: hasMilitaryService === "yes" ? militaryStatus : null,
      military_expiration_date: hasMilitaryService === "yes" && militaryStatus === "active_duty" ? militaryExpirationDate : null,

      language_preference: languagePreference,

      has_homeownership_education: hasEducation === "yes",
      education_format: hasEducation === "yes" ? educationFormat : null,
      is_hud_approved: hasEducation === "yes" ? (isHudApproved === "yes") : null,
      hud_agency_id: hasEducation === "yes" && isHudApproved === "yes" ? hudAgencyId : null,
      education_program_name: hasEducation === "yes" && isHudApproved === "no" ? educationProgramName : null,
      education_completion_date: hasEducation === "yes" ? educationCompletionDate : null,

      has_housing_counseling: hasCounseling === "yes",
      counseling_format: hasCounseling === "yes" ? counselingFormat : null,
      is_counseling_hud_approved: hasCounseling === "yes" ? (isCounselingHudApproved === "yes") : null,
      counseling_hud_agency_id: hasCounseling === "yes" && isCounselingHudApproved === "yes" ? counselingHudAgencyId : null,
      counseling_agency_name: hasCounseling === "yes" && isCounselingHudApproved === "no" ? counselingAgencyName : null,
      counseling_completion_date: hasCounseling === "yes" ? counselingCompletionDate : null,

      has_been_employed: hasBeenEmployed === "yes",
      employment_history: hasBeenEmployed === "yes" ? jobs : [],

      has_additional_income: hasAdditionalIncome === "yes",
      additional_income_sources: hasAdditionalIncome === "yes" ? additionalIncomes : [],

      referring_partner_code: referralCode ? referralCode.toUpperCase() : null
    };

    if (borrowerId) {
      // UPDATE EXISTING ROW
      const { error } = await supabase
        .from('borrowers')
        .update(payload)
        .eq('id', borrowerId);

      if (error) {
        console.error("Database update failed:", error.message);
        setIsSubmitting(false);
        return;
      }
    } else {
      // INSERT NEW ROW
      const { data, error } = await supabase
        .from('borrowers')
        .insert([payload])
        .select('id')
        .single();

      if (error) {
        console.error("Database insertion failed:", error.message);
        setIsSubmitting(false);
        return;
      }
      finalBorrowerId = data.id;
      sessionStorage.setItem('activeBorrowerId', data.id);
    }

    setIsSubmitting(false);
    console.log("Vault record secured. ID:", finalBorrowerId);

    // Proceed to Assets page with ID
    router.push(`/userjourney/assets?id=${finalBorrowerId}`);
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
      <header className="mb-12">
        <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight leading-tight">
          Personal Identity
        </h1>
        <p className="mt-6 text-on-surface-variant text-lg max-w-xl leading-relaxed">
          To secure your private vault at Stratmire Capital, please provide your primary contact and identification details.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8 bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30"></div>

          <form className="space-y-8" onSubmit={handleSubmit} suppressHydrationWarning>

            {/* IDENTITY SECTION */}
            <h2 className="pb-3 text-lg font-bold text-primary">Whats the borrower&apos;s Legal Name ?</h2>
            <FieldGroup className="grid max-w-xl grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="suffix">Suffix</FieldLabel>
                <Input id="suffix" placeholder="Suffix" value={formData.suffix} onChange={handleInputChange} />
              </Field>
              <Field>
                <FieldLabel htmlFor="first-name">First Name <span className="text-destructive">*</span></FieldLabel>
                <Input id="first-name" placeholder="Jordan" required value={formData.firstName} onChange={handleInputChange} />
              </Field>
              <Field>
                <FieldLabel htmlFor="middle-name">Middle Name</FieldLabel>
                <Input id="middle-name" placeholder="Michael" value={formData.middleName} onChange={handleInputChange} />
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name">Last Name <span className="text-destructive">*</span></FieldLabel>
                <Input id="last-name" placeholder="Lee" required value={formData.lastName} onChange={handleInputChange} />
              </Field>
            </FieldGroup>

            {/* ALTERNATIVE NAMES */}
            <h2 className="text-lg font-bold text-primary border-t border-outline-variant/20 pt-6">Have you ever gone by any other names?</h2>
            <FieldSet className="w-full max-w-xs pt-2">
              <RadioGroup value={hasOtherNames} onValueChange={setHasOtherNames} className="flex flex-col gap-4">
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasOtherNames === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="yes" id="names-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">Yes, I have used other names</span>
                </label>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasOtherNames === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="no" id="names-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">No, I have not</span>
                </label>
              </RadioGroup>
            </FieldSet>

            {hasOtherNames === "yes" && (
              <div className="bg-surface-container-high/50 p-6 rounded-lg border border-outline-variant/20 transition-all">
                <h3 className="text-sm font-bold text-primary mb-4">Previous / Alternative Name</h3>
                <FieldGroup className="grid max-w-xl grid-cols-2 gap-4">
                  <Field className="col-span-2 sm:col-span-1">
                    <FieldLabel htmlFor="alt-first-name">First Name <span className="text-destructive">*</span></FieldLabel>
                    <Input id="alt-first-name" placeholder="Previous First Name" required={hasOtherNames === "yes"} value={formData.altFirstName} onChange={handleInputChange} />
                  </Field>
                  <Field className="col-span-2 sm:col-span-1">
                    <FieldLabel htmlFor="alt-middle-name">Middle Name</FieldLabel>
                    <Input id="alt-middle-name" placeholder="Previous Middle Name" value={formData.altMiddleName} onChange={handleInputChange} />
                  </Field>
                  <Field className="col-span-2 sm:col-span-1">
                    <FieldLabel htmlFor="alt-last-name">Last Name <span className="text-destructive">*</span></FieldLabel>
                    <Input id="alt-last-name" placeholder="Previous Last Name" required={hasOtherNames === "yes"} value={formData.altLastName} onChange={handleInputChange} />
                  </Field>
                </FieldGroup>
              </div>
            )}

            {/* CONTACT INFO */}
            <FieldGroup className="grid max-w-xl grid-cols-2 gap-4 pt-6 border-t border-outline-variant/20 mt-6">
              <Field>
                <FieldLabel htmlFor="fieldgroup-email">Email <span className="text-destructive">*</span></FieldLabel>
                <Input id="fieldgroup-email" type="email" placeholder="name@example.com" required value={formData.email} onChange={handleInputChange} />
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-phone">Phone <span className="text-destructive">*</span></FieldLabel>
                <Input id="fieldgroup-phone" type="tel" placeholder="(123) 456-7890" required value={formData.phone} onChange={handleInputChange} />
              </Field>
            </FieldGroup>

            {/* REFERRAL INFORMATION */}
            <div className="border-t border-outline-variant/20 pt-8 space-y-4 mt-6">
              <h2 className="text-lg font-bold text-primary">Were you referred by a Stratmire Partner?</h2>
              <Field className="max-w-sm">
                <FieldLabel htmlFor="referral-code">Partner Referral Code <span className="text-sm font-normal text-on-surface-variant">(Optional)</span></FieldLabel>
                <Input
                  id="referral-code"
                  type="text"
                  placeholder="e.g. X79Y2Z"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="uppercase font-mono tracking-wider"
                />
                <span className="text-xs text-on-surface-variant mt-1 block">Enter the 6-digit code provided by your broker or partner.</span>
              </Field>
            </div>

            {/* DEMOGRAPHICS */}
            <h2 className="text-lg font-bold text-primary border-t border-outline-variant/20 pt-6">What&apos;s your birth date?</h2>
            <Field>
              <Input id="birth-date" type="date" required value={formData.birthDate} onChange={handleInputChange} className="max-w-xs" />
            </Field>

            <h2 className="text-lg font-bold text-primary">What&apos;s your citizenship status?</h2>
            <FieldSet className="w-full pt-2">
              <RadioGroup value={citizenship} onValueChange={setCitizenship} className="flex flex-col gap-4" required>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${citizenship === 'us-citizen' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="us-citizen" id="citizen-us" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">U.S. Citizen</span>
                </label>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${citizenship === 'permanent-resident' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="permanent-resident" id="citizen-permanent" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">Permanent Resident Alien</span>
                </label>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${citizenship === 'non-resident' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="non-resident" id="citizen-nonresident" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">Non-Permanent Resident Alien</span>
                </label>
              </RadioGroup>
            </FieldSet>

            <h2 className="text-lg font-bold text-primary">What&apos;s your Marital status?</h2>
            <FieldSet className="w-full max-w-xs pt-2">
              <RadioGroup value={maritalStatus} onValueChange={setMaritalStatus} className="flex flex-col gap-4" required>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${maritalStatus === 'married' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="married" id="marital-married" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">Married</span>
                </label>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${maritalStatus === 'separated' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="separated" id="marital-separated" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">Separated</span>
                </label>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${maritalStatus === 'unmarried' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="unmarried" id="marital-unmarried" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-normal leading-none text-primary">Unmarried</span>
                </label>
              </RadioGroup>
            </FieldSet>

            {/* ADDRESS HISTORY SECTION */}
            <h2 className="text-2xl font-black text-primary border-t border-outline-variant/20 pt-8">{formData.firstName || "Borrower"}&apos;s Addresses</h2>

            <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-md flex items-center gap-3 font-medium mt-4">
              <AlertTriangle size={20} className="shrink-0" />
              You must provide your most recent 2 years of address history
            </div>

            {addresses.length > 0 && (
              <div className="space-y-4 my-6">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-outline-variant/30 p-5 rounded-md bg-surface-container-lowest shadow-sm flex justify-between items-start">
                    <div>
                      <p className="font-bold text-primary text-lg">{addr.street} {addr.unit && `Apt ${addr.unit}`}</p>
                      <p className="text-on-surface-variant">{addr.city}, {addr.state} {addr.zip}</p>
                      <p className="text-sm text-on-surface-variant mt-2">Status: {addr.housingStatus} {addr.monthlyPayment && `($${addr.monthlyPayment}/mo)`}</p>
                      <p className="text-sm font-medium text-secondary mt-1">
                        {addr.dateMovedIn || "N/A"} to {addr.isCurrent ? "Present" : (addr.dateMovedOut || "N/A")}
                      </p>
                    </div>
                    <button type="button" onClick={() => removeAddress(addr.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {isAddingAddress ? (
              <div className="mt-6 space-y-6">
                <FieldGroup className="grid grid-cols-12 gap-6">
                  <Field className="col-span-12 sm:col-span-9">
                    <FieldLabel htmlFor="addr-street" className={!addrForm.street ? "text-red-500" : ""}>Street <span className="text-red-500">*</span></FieldLabel>
                    <Input id="addr-street" placeholder="123 Main St" value={addrForm.street} onChange={handleAddressChange} className={!addrForm.street ? "border-red-300 focus:ring-red-200" : ""} />
                    {!addrForm.street && <span className="text-xs text-red-500 mt-1 block">This field is required</span>}
                  </Field>
                  <Field className="col-span-12 sm:col-span-3">
                    <FieldLabel htmlFor="addr-unit">Unit</FieldLabel>
                    <Input id="addr-unit" placeholder="Apt 4B" value={addrForm.unit} onChange={handleAddressChange} />
                  </Field>

                  <Field className="col-span-12 sm:col-span-6">
                    <FieldLabel htmlFor="addr-city">City <span className="text-red-500">*</span></FieldLabel>
                    <Input id="addr-city" placeholder="City" value={addrForm.city} onChange={handleAddressChange} />
                  </Field>
                  <Field className="col-span-6 sm:col-span-3">
                    <FieldLabel htmlFor="addr-state" className={!addrForm.state ? "text-red-500" : ""}>State <span className="text-red-500">*</span></FieldLabel>
                    <select
                      id="addr-state"
                      value={addrForm.state}
                      onChange={handleAddressChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-secondary focus:border-secondary text-primary bg-white ${!addrForm.state ? 'border-red-300 text-red-500' : 'border-outline-variant/50'}`}
                    >
                      <option value="">Select...</option>
                      <option value="CA">CA</option>
                      <option value="NY">NY</option>
                      <option value="TX">TX</option>
                      <option value="FL">FL</option>
                    </select>
                    {!addrForm.state && <span className="text-xs text-red-500 mt-1 block">This field is required</span>}
                  </Field>
                  <Field className="col-span-6 sm:col-span-3">
                    <FieldLabel htmlFor="addr-zip">Zip <span className="text-red-500">*</span></FieldLabel>
                    <Input id="addr-zip" placeholder="12345" value={addrForm.zip} onChange={handleAddressChange} />
                  </Field>
                  <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-7">
                    <Field className="flex flex-col justify-end">
                      <FieldLabel htmlFor="addr-date-moved-in">Date moved in</FieldLabel>
                      <Input id="addr-date-moved-in" type="date" value={addrForm.dateMovedIn} onChange={handleAddressChange} />
                    </Field>

                    <div className="flex flex-col justify-end gap-4">
                      {!addrForm.isCurrent && (
                        <div className="flex-1 space-y-2">
                          <FieldLabel htmlFor="addr-date-moved-out">Date moved out</FieldLabel>
                          <Input id="addr-date-moved-out" type="date" value={addrForm.dateMovedOut} onChange={handleAddressChange} className="w-full" />
                        </div>
                      )}
                      <label className="flex items-center gap-3 border border-outline-variant/30 px-4 rounded-md bg-white text-sm font-medium whitespace-nowrap h-[42px] cursor-pointer shadow-sm hover:bg-slate-50 transition-colors">
                        <input type="checkbox" id="addr-is-current" checked={addrForm.isCurrent} onChange={handleAddressChange} className="w-4 h-4 cursor-pointer text-secondary" />
                        This is {formData.firstName || "the borrower"}&apos;s current residence.
                      </label>
                    </div>
                  </div>

                </FieldGroup>

                <div className="space-y-4 pt-4">
                  <FieldLabel>Housing status</FieldLabel>
                  <RadioGroup value={addrForm.housingStatus} onValueChange={(val) => setAddrForm(p => ({ ...p, housingStatus: val }))} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label className={`flex items-center gap-3 p-6 border-2 rounded-md cursor-pointer transition-all ${addrForm.housingStatus === 'Renting' ? 'border-blue-400 bg-blue-50' : 'border-outline-variant/30 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="Renting" id="hs-rent" className="shrink-0" />
                      <span className="font-medium text-primary">Renting</span>
                    </label>
                    <label className={`flex items-center gap-3 p-6 border-2 rounded-md cursor-pointer transition-all ${addrForm.housingStatus === 'Own' ? 'border-blue-400 bg-blue-50' : 'border-outline-variant/30 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="Own" id="hs-own" className="shrink-0" />
                      <span className="font-medium text-primary">Own</span>
                    </label>
                    <label className={`flex items-center gap-3 p-6 border-2 rounded-md cursor-pointer transition-all ${addrForm.housingStatus === 'No Expense' ? 'border-blue-400 bg-blue-50' : 'border-outline-variant/30 bg-white hover:bg-slate-50'}`}>
                      <RadioGroupItem value="No Expense" id="hs-none" className="shrink-0" />
                      <span className="font-medium text-primary leading-tight">No Expense<br /></span>
                    </label>
                  </RadioGroup>
                </div>

                {addrForm.housingStatus === 'Renting' && (
                  <Field className="max-w-xs pt-2">
                    <FieldLabel htmlFor="addr-monthly-payment">Monthly rent amount</FieldLabel>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                      <Input id="addr-monthly-payment" type="number" placeholder="0.00" value={addrForm.monthlyPayment} onChange={handleAddressChange} className="pl-8" />
                    </div>
                  </Field>
                )}

                <div className="flex gap-4 pt-8">
                  <button type="button" onClick={saveAddress} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm">
                    Save New Address
                  </button>
                  {addresses.length > 0 && (
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="bg-white border border-outline-variant/40 text-primary px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 uppercase shadow-sm">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setIsAddingAddress(true)} className="w-full mt-6 border-2 border-dashed border-outline-variant/40 text-primary p-6 rounded-xl font-bold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
                <Plus size={20} /> ADD ANOTHER ADDRESS
              </button>
            )}

            {/* MAILING ADDRESS SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-xl font-bold text-primary">Is {formData.firstName || "the borrower"}&apos;s mailing address different from their current address?</h2>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={hasDifferentMailingAddress} onValueChange={setHasDifferentMailingAddress} className="flex flex-row gap-8">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasDifferentMailingAddress === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="mail-diff-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasDifferentMailingAddress === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="mail-diff-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>

              {hasDifferentMailingAddress === "yes" && (
                <div className="bg-surface-container-high/50 p-6 md:p-8 rounded-lg space-y-8 mt-4 border border-outline-variant/20">
                  <FieldGroup className="grid grid-cols-12 gap-6">
                    <Field className="col-span-12 sm:col-span-9">
                      <FieldLabel htmlFor="mail-street">Street <span className="text-destructive">*</span></FieldLabel>
                      <Input id="mail-street" placeholder="123 Main St" required={hasDifferentMailingAddress === "yes"} value={mailingAddress.street} onChange={handleMailingAddressChange} />
                    </Field>
                    <Field className="col-span-12 sm:col-span-3">
                      <FieldLabel htmlFor="mail-unit">Unit</FieldLabel>
                      <Input id="mail-unit" placeholder="Apt 4B" value={mailingAddress.unit} onChange={handleMailingAddressChange} />
                    </Field>
                    <Field className="col-span-12 sm:col-span-6">
                      <FieldLabel htmlFor="mail-city">City <span className="text-destructive">*</span></FieldLabel>
                      <Input id="mail-city" placeholder="City" required={hasDifferentMailingAddress === "yes"} value={mailingAddress.city} onChange={handleMailingAddressChange} />
                    </Field>
                    <Field className="col-span-6 sm:col-span-3">
                      <FieldLabel htmlFor="mail-state">State <span className="text-destructive">*</span></FieldLabel>
                      <select
                        id="mail-state"
                        required={hasDifferentMailingAddress === "yes"}
                        value={mailingAddress.state}
                        onChange={handleMailingAddressChange}
                        className="w-full px-3 py-2 border border-outline-variant/50 rounded-md focus:ring-secondary focus:border-secondary text-primary bg-white"
                      >
                        <option value="">Select...</option>
                        <option value="CA">CA</option>
                        <option value="NY">NY</option>
                        <option value="TX">TX</option>
                        <option value="FL">FL</option>
                      </select>
                    </Field>
                    <Field className="col-span-6 sm:col-span-3">
                      <FieldLabel htmlFor="mail-zip">Zip <span className="text-destructive">*</span></FieldLabel>
                      <Input id="mail-zip" placeholder="12345" required={hasDifferentMailingAddress === "yes"} value={mailingAddress.zip} onChange={handleMailingAddressChange} />
                    </Field>
                  </FieldGroup>
                </div>
              )}
            </div>

            {/* EMPLOYMENT HISTORY SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-2xl font-black text-primary">Has {formData.firstName || "the borrower"} been employed in the last two years?</h2>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={hasBeenEmployed} onValueChange={setHasBeenEmployed} className="flex flex-row gap-8">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasBeenEmployed === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="emp-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasBeenEmployed === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="emp-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>

              {hasBeenEmployed === "yes" && (
                <div className="pt-4 space-y-6">
                  {jobs.length > 0 && (
                    <div className="space-y-4 my-6">
                      {jobs.map((job) => (
                        <div key={job.id} className="border border-outline-variant/30 p-5 rounded-md bg-surface-container-lowest shadow-sm flex justify-between items-center">
                          <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                            <div>
                              <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Employer Name</span>
                              <p className="font-bold text-primary">{job.employerName}</p>
                            </div>
                            <div>
                              <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Self Employed</span>
                              <p className="font-medium text-slate-700 capitalize">{job.isSelfEmployed}</p>
                            </div>
                            <div>
                              <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Ownership &ge; 25%</span>
                              <p className="font-medium text-slate-700 capitalize">{job.hasOwnership}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeJob(job.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors ml-4 flex items-center gap-2 text-sm font-bold">
                            <span className="hidden sm:inline">JOB DETAILS</span> <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {isAddingJob ? (
                    <div className="bg-surface-container-high/30 border border-outline-variant/30 p-6 md:p-8 rounded-lg space-y-8 mt-4">
                      <Field className="max-w-md">
                        <FieldLabel htmlFor="job-employerName">Employer or Business Name <span className="text-destructive">*</span></FieldLabel>
                        <Input id="job-employerName" placeholder="Acme Corp" value={jobForm.employerName} onChange={handleJobChange} className="bg-white" />
                      </Field>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-primary">Are you self-employed or the business owner? <span className="text-destructive">*</span></h3>
                        <FieldSet className="w-full max-w-xs">
                          <RadioGroup value={jobForm.isSelfEmployed} onValueChange={(val) => setJobForm(p => ({ ...p, isSelfEmployed: val }))} className="flex flex-row gap-4">
                            <label className={`flex items-center gap-3 bg-white px-6 py-3 rounded-md border-2 transition-all cursor-pointer shadow-sm ${jobForm.isSelfEmployed === 'yes' ? 'border-primary bg-slate-50' : 'border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="yes" id="job-self-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-medium leading-none text-primary">Yes</span>
                            </label>
                            <label className={`flex items-center gap-3 bg-white px-6 py-3 rounded-md border-2 transition-all cursor-pointer shadow-sm ${jobForm.isSelfEmployed === 'no' ? 'border-primary bg-slate-50' : 'border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="no" id="job-self-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-medium leading-none text-primary">No</span>
                            </label>
                          </RadioGroup>
                        </FieldSet>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-primary">Do you have ownership of 25% or more? <span className="text-destructive">*</span></h3>
                        <FieldSet className="w-full max-w-xs">
                          <RadioGroup value={jobForm.hasOwnership} onValueChange={(val) => setJobForm(p => ({ ...p, hasOwnership: val }))} className="flex flex-row gap-4">
                            <label className={`flex items-center gap-3 bg-white px-6 py-3 rounded-md border-2 transition-all cursor-pointer shadow-sm ${jobForm.hasOwnership === 'yes' ? 'border-primary bg-slate-50' : 'border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="yes" id="job-own-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-medium leading-none text-primary">Yes</span>
                            </label>
                            <label className={`flex items-center gap-3 bg-white px-6 py-3 rounded-md border-2 transition-all cursor-pointer shadow-sm ${jobForm.hasOwnership === 'no' ? 'border-primary bg-slate-50' : 'border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="no" id="job-own-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-medium leading-none text-primary">No</span>
                            </label>
                          </RadioGroup>
                        </FieldSet>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="button" onClick={saveJob} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm">
                          Save Job
                        </button>
                        {jobs.length > 0 && (
                          <button type="button" onClick={() => setIsAddingJob(false)} className="bg-white border border-outline-variant/40 text-primary px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 uppercase shadow-sm">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setIsAddingJob(true)} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm flex items-center gap-2 mt-4">
                      <Plus size={18} /> ADD ANOTHER JOB
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ADDITIONAL INCOME SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-2xl font-black text-primary">Does {formData.firstName || "the borrower"} have any additional income sources?</h2>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={hasAdditionalIncome} onValueChange={setHasAdditionalIncome} className="flex flex-row gap-8">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasAdditionalIncome === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="add-inc-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasAdditionalIncome === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="add-inc-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>

              {hasAdditionalIncome === "yes" && (
                <div className="pt-4 space-y-6">
                  <h3 className="text-lg font-medium text-primary">Please provide details about the additional income</h3>

                  {/* Render Saved Incomes */}
                  {additionalIncomes.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {additionalIncomes.map((income) => (
                        <div key={income.id} className="border border-outline-variant/30 p-5 rounded-md bg-surface-container-lowest shadow-sm flex justify-between items-center">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Source</span>
                              <p className="font-bold text-primary">{income.source}</p>
                            </div>
                            <div>
                              <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Monthly Income</span>
                              <p className="font-medium text-slate-700">${income.monthlyIncome}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeIncome(income.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors ml-4 flex items-center gap-2 text-sm font-bold">
                            <span className="hidden sm:inline">REMOVE</span> <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Income Form Engine */}
                  {isAddingIncome ? (
                    <div className="space-y-6">
                      <FieldGroup className="flex flex-col sm:flex-row gap-6 items-end">
                        <Field className="flex-1 w-full">
                          <FieldLabel htmlFor="inc-source" className={!incomeForm.source ? "text-red-500" : ""}>Source <span className="text-red-500">*</span></FieldLabel>
                          <select
                            id="inc-source"
                            value={incomeForm.source}
                            onChange={(e) => setIncomeForm(p => ({ ...p, source: e.target.value }))}
                            className={`w-full px-3 py-2 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary text-primary bg-transparent rounded-none px-0 ${!incomeForm.source ? 'border-red-400' : 'border-outline-variant/50'}`}
                          >
                            <option value="">Select source...</option>
                            <option value="Alimony / Child Support">Alimony / Child Support</option>
                            <option value="Automobile Allowance">Automobile Allowance</option>
                            <option value="Boarder Income">Boarder Income</option>
                            <option value="Capital Gains">Capital Gains</option>
                            <option value="Disability">Disability</option>
                            <option value="Foster Care">Foster Care</option>
                            <option value="Housing or Parsonage">Housing or Parsonage</option>
                            <option value="Notes Receivable">Notes Receivable</option>
                            <option value="Pension">Pension</option>
                            <option value="Rental Income">Rental Income</option>
                            <option value="Retirement">Retirement</option>
                            <option value="Social Security">Social Security</option>
                            <option value="Trust">Trust</option>
                            <option value="Other">Other</option>
                          </select>
                          {!incomeForm.source && <span className="text-xs text-red-500 mt-1 block">This field is required</span>}
                        </Field>

                        <Field className="flex-1 w-full">
                          <FieldLabel htmlFor="inc-monthly">Monthly Income</FieldLabel>
                          <div className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                            <Input
                              id="inc-monthly"
                              type="number"
                              placeholder="0.00"
                              value={incomeForm.monthlyIncome}
                              onChange={(e) => setIncomeForm(p => ({ ...p, monthlyIncome: e.target.value }))}
                              className="pl-4 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary rounded-none px-0 border-outline-variant/50 bg-transparent"
                            />
                          </div>
                        </Field>
                      </FieldGroup>

                      <div className="flex gap-4 pt-2">
                        <button type="button" onClick={saveIncome} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm">
                          Save New Income Source
                        </button>
                        {additionalIncomes.length > 0 && (
                          <button type="button" onClick={() => setIsAddingIncome(false)} className="bg-white border border-outline-variant/40 text-primary px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 uppercase shadow-sm">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setIsAddingIncome(true)} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm flex items-center gap-2 mt-4">
                      <Plus size={18} /> ADD INCOME SOURCE
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* MILITARY SERVICE SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-xl font-bold text-primary">Did {formData.firstName || "the borrower"} (or their deceased spouse) ever serve, or are they currently serving, in the United States Armed Forces?</h2>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={hasMilitaryService} onValueChange={setHasMilitaryService} className="flex flex-row gap-8">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasMilitaryService === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="mil-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasMilitaryService === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="mil-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>

              {hasMilitaryService === "yes" && (
                <div className="pt-4 space-y-6">
                  <h2 className="text-lg font-bold text-primary">What is {formData.firstName || "the borrower"}&apos;s military status?</h2>
                  <FieldSet className="w-full">
                    <RadioGroup value={militaryStatus} onValueChange={setMilitaryStatus} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className={`flex items-start gap-3 px-6 py-4 rounded-md border-2 transition-all cursor-pointer ${militaryStatus === 'active_duty' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                        <RadioGroupItem value="active_duty" id="mil-active" className="shrink-0 h-4 w-4 mt-1 border border-primary text-primary focus:ring-secondary" />
                        <span className="font-normal leading-tight text-primary">Currently on Active Duty</span>
                      </label>
                      <label className={`flex items-start gap-3 px-6 py-4 rounded-md border-2 transition-all cursor-pointer ${militaryStatus === 'retired' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                        <RadioGroupItem value="retired" id="mil-retired" className="shrink-0 h-4 w-4 mt-1 border border-primary text-primary focus:ring-secondary" />
                        <span className="font-normal leading-tight text-primary">Currently retired, discharged, or separate from service</span>
                      </label>
                      <label className={`flex items-start gap-3 px-6 py-4 rounded-md border-2 transition-all cursor-pointer ${militaryStatus === 'reserve' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                        <RadioGroupItem value="reserve" id="mil-reserve" className="shrink-0 h-4 w-4 mt-1 border border-primary text-primary focus:ring-secondary" />
                        <span className="font-normal leading-tight text-primary">Only period of service was as a non-activate member of the Reserve or National Guard</span>
                      </label>
                      <label className={`flex items-start gap-3 px-6 py-4 rounded-md border-2 transition-all cursor-pointer ${militaryStatus === 'surviving_spouse' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                        <RadioGroupItem value="surviving_spouse" id="mil-spouse" className="shrink-0 h-4 w-4 mt-1 border border-primary text-primary focus:ring-secondary" />
                        <span className="font-normal leading-tight text-primary">Surviving Spouse</span>
                      </label>
                    </RadioGroup>
                  </FieldSet>

                  {militaryStatus === "active_duty" && (
                    <Field className="max-w-sm pt-4">
                      <FieldLabel htmlFor="mil-exp-date">Expiration date of service/tour</FieldLabel>
                      <Input id="mil-exp-date" type="date" required value={militaryExpirationDate} onChange={(e) => setMilitaryExpirationDate(e.target.value)} />
                    </Field>
                  )}
                </div>
              )}
            </div>

            {/* HOMEOWNERSHIP EDUCATION SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-xl font-bold text-primary">Has {formData.firstName || "the borrower"} completed home-ownership education (group or web-based classes) within the last 12 months?</h2>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={hasEducation} onValueChange={setHasEducation} className="flex flex-row gap-8">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasEducation === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="edu-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasEducation === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="edu-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>

              {hasEducation === "yes" && (
                <div className="pt-6 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">What format was it in? (Check the most recent)</h3>
                    <FieldSet className="w-full">
                      <RadioGroup value={educationFormat} onValueChange={setEducationFormat} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className={`flex items-center gap-3 px-6 py-4 rounded-md border-2 transition-all cursor-pointer ${educationFormat === 'in_person' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                          <RadioGroupItem value="in_person" id="edu-format-in-person" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                          <span className="font-normal leading-tight text-primary">Attended Workshop in Person</span>
                        </label>
                        <label className={`flex items-center gap-3 px-6 py-4 rounded-md border-2 transition-all cursor-pointer ${educationFormat === 'web_based' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                          <RadioGroupItem value="web_based" id="edu-format-web" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                          <span className="font-normal leading-tight text-primary">Completed Web-Based Workshop</span>
                        </label>
                      </RadioGroup>
                    </FieldSet>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-1/2">
                        <h3 className="text-lg font-medium text-primary mb-3">Was it provided by a HUD-approved agency?<br /><span className="text-sm font-normal text-on-surface-variant">(If you are unsure, please select &apos;no&apos;)</span></h3>
                        <FieldSet className="w-full max-w-xs">
                          <RadioGroup value={isHudApproved} onValueChange={setIsHudApproved} className="flex flex-row gap-4">
                            <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${isHudApproved === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="yes" id="hud-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-bold leading-none text-primary">Yes</span>
                            </label>
                            <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${isHudApproved === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="no" id="hud-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-bold leading-none text-primary">No</span>
                            </label>
                          </RadioGroup>
                        </FieldSet>
                      </div>

                      <div className="w-full md:w-1/2 bg-white border border-outline-variant/30 border-t-4 border-t-[#0088cc] rounded-md p-5 flex items-start gap-3 shadow-sm">
                        <div className="text-[#0088cc] shrink-0 mt-0.5">
                          <Info size={20} />
                        </div>
                        <div className="text-sm text-slate-700 leading-relaxed">
                          <p>
                            For a list of HUD-approved agencies go to:<br />
                            <a href="https://www.hud.gov/program_offices/housing/sfh/hcc/hcs.cfm" className="text-[#0088cc] hover:underline font-medium break-all" target="_blank" rel="noreferrer">
                              https://www.hud.gov/program_offices/housing/sfh/hcc/hcs.cfm
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isHudApproved !== "" && (
                    <div className="pt-4 space-y-6">
                      {isHudApproved === "yes" ? (
                        <Field className="max-w-md">
                          <FieldLabel htmlFor="hud-agency-id" className="text-destructive">Please provide the Housing Counseling Agency ID # <span className="text-destructive">*</span></FieldLabel>
                          <Input id="hud-agency-id" type="text" required value={hudAgencyId} onChange={(e) => setHudAgencyId(e.target.value)} className="border-destructive/50 focus:ring-destructive/20" />
                        </Field>
                      ) : (
                        <Field className="max-w-md">
                          <FieldLabel htmlFor="edu-prog-name" className="text-destructive">Name of the housing education program <span className="text-destructive">*</span></FieldLabel>
                          <Input id="edu-prog-name" type="text" required value={educationProgramName} onChange={(e) => setEducationProgramName(e.target.value)} className="border-destructive/50 focus:ring-destructive/20" />
                        </Field>
                      )}
                      <Field className="max-w-xs">
                        <FieldLabel htmlFor="edu-completion-date" className="text-destructive">Date of completion <span className="text-destructive">*</span></FieldLabel>
                        <Input id="edu-completion-date" type="date" required value={educationCompletionDate} onChange={(e) => setEducationCompletionDate(e.target.value)} className="border-destructive/50 focus:ring-destructive/20" />
                      </Field>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* HOUSING COUNSELING SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-xl font-bold text-primary">Has {formData.firstName || "the borrower"} completed housing counseling (customized counselor-to-client services) within the last 12 months?</h2>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={hasCounseling} onValueChange={setHasCounseling} className="flex flex-row gap-8">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasCounseling === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="counseling-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasCounseling === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="counseling-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-bold leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>

              {hasCounseling === "yes" && (
                <div className="pt-6 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">What format was it in?</h3>
                    <FieldSet className="w-full">
                      <RadioGroup value={counselingFormat} onValueChange={setCounselingFormat} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <label className={`flex items-center gap-3 px-4 py-4 rounded-md border-2 transition-all cursor-pointer ${counselingFormat === 'face_to_face' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                          <RadioGroupItem value="face_to_face" id="counseling-format-f2f" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                          <span className="font-normal leading-tight text-primary">Face-to-Face</span>
                        </label>
                        <label className={`flex items-center gap-3 px-4 py-4 rounded-md border-2 transition-all cursor-pointer ${counselingFormat === 'telephone' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                          <RadioGroupItem value="telephone" id="counseling-format-phone" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                          <span className="font-normal leading-tight text-primary">Telephone</span>
                        </label>
                        <label className={`flex items-center gap-3 px-4 py-4 rounded-md border-2 transition-all cursor-pointer ${counselingFormat === 'internet' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                          <RadioGroupItem value="internet" id="counseling-format-web" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                          <span className="font-normal leading-tight text-primary">Internet</span>
                        </label>
                        <label className={`flex items-center gap-3 px-4 py-4 rounded-md border-2 transition-all cursor-pointer ${counselingFormat === 'hybrid' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                          <RadioGroupItem value="hybrid" id="counseling-format-hybrid" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                          <span className="font-normal leading-tight text-primary">Hybrid</span>
                        </label>
                      </RadioGroup>
                    </FieldSet>
                    <p className="text-sm text-on-surface-variant">Check the most recent</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-1/2">
                        <h3 className="text-lg font-medium text-primary mb-3">Was it provided by a HUD-approved agency?<br /><span className="text-sm font-normal text-on-surface-variant">(If you are unsure, please select &apos;no&apos;)</span></h3>
                        <FieldSet className="w-full max-w-xs">
                          <RadioGroup value={isCounselingHudApproved} onValueChange={setIsCounselingHudApproved} className="flex flex-row gap-4">
                            <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${isCounselingHudApproved === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="yes" id="counseling-hud-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-bold leading-none text-primary">Yes</span>
                            </label>
                            <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${isCounselingHudApproved === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                              <RadioGroupItem value="no" id="counseling-hud-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                              <span className="font-bold leading-none text-primary">No</span>
                            </label>
                          </RadioGroup>
                        </FieldSet>

                        {isCounselingHudApproved === "no" && (
                          <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
                            If you are unsure of HUD approval, please choose &apos;No&apos; and provide the name of the agency below.
                          </p>
                        )}
                      </div>

                      <div className="w-full md:w-1/2 bg-white border border-outline-variant/30 border-t-4 border-t-[#0088cc] rounded-md p-5 flex items-start gap-3 shadow-sm">
                        <div className="text-[#0088cc] shrink-0 mt-0.5">
                          <Info size={20} />
                        </div>
                        <div className="text-sm text-slate-700 leading-relaxed">
                          <p>
                            For a list of HUD-approved agencies go to:<br />
                            <a href="https://www.hud.gov/program_offices/housing/sfh/hcc/hcs.cfm" className="text-[#0088cc] hover:underline font-medium break-all" target="_blank" rel="noreferrer">
                              https://www.hud.gov/program_offices/housing/sfh/hcc/hcs.cfm
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isCounselingHudApproved !== "" && (
                    <div className="pt-4 space-y-6">
                      {isCounselingHudApproved === "yes" ? (
                        <Field className="max-w-md">
                          <FieldLabel htmlFor="counseling-hud-agency-id" className="text-destructive">Please provide the Housing Counseling Agency ID # <span className="text-destructive">*</span></FieldLabel>
                          <Input id="counseling-hud-agency-id" type="text" required value={counselingHudAgencyId} onChange={(e) => setCounselingHudAgencyId(e.target.value)} className="border-destructive/50 focus:ring-destructive/20" />
                        </Field>
                      ) : (
                        <Field className="max-w-md">
                          <FieldLabel htmlFor="counseling-agency-name" className="text-destructive">Name of the housing counseling agency <span className="text-destructive">*</span></FieldLabel>
                          <Input id="counseling-agency-name" type="text" required value={counselingAgencyName} onChange={(e) => setCounselingAgencyName(e.target.value)} className="border-destructive/50 focus:ring-destructive/20" />
                        </Field>
                      )}
                      <Field className="max-w-xs">
                        <FieldLabel htmlFor="counseling-completion-date" className="text-destructive">Date of completion <span className="text-destructive">*</span></FieldLabel>
                        <Input id="counseling-completion-date" type="date" required value={counselingCompletionDate} onChange={(e) => setCounselingCompletionDate(e.target.value)} className="border-destructive/50 focus:ring-destructive/20" />
                      </Field>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* LANGUAGE PREFERENCE SECTION */}
            <div className="border-t border-outline-variant/20 pt-10 space-y-6">
              <h2 className="text-xl font-bold text-primary">What is {formData.firstName || "the borrower"}&apos;s language preference?</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your loan transaction is likely to be conducted in English. This question requests information to see if communications are available to assist you in your preferred language. Please be aware that communications may NOT be available in your preferred language.
              </p>

              <Field className="max-w-xs">
                <FieldLabel htmlFor="language-pref">Language Preference</FieldLabel>
                <select
                  id="language-pref"
                  value={languagePreference}
                  onChange={(e) => setLanguagePreference(e.target.value)}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-md focus:ring-secondary focus:border-secondary text-primary bg-white"
                >
                  <option value="">Select a language...</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Tagalog">Tagalog</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="Korean">Korean</option>
                  <option value="Other">Other</option>
                </select>
                <span className="text-xs text-on-surface-variant mt-1 block">Optional</span>
              </Field>

              <div className="bg-white border border-outline-variant/30 border-t-4 border-t-[#0088cc] rounded-md p-6 flex items-start gap-4 shadow-sm mt-4">
                <div className="text-[#0088cc] shrink-0 mt-0.5">
                  <Info size={24} />
                </div>
                <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                  <p>
                    Your answer will NOT negatively affect your mortgage application. Your answer does not mean the Lender or Other Loan Participants agree to communicate or provide documents in your preferred language. However, it may let them assist you or direct you to persons who can assist you.
                  </p>
                  <p>
                    <strong>Language assistance and resources may be available through housing counseling agencies approved by the U.S. Department of Housing and Urban Development. To find a housing counseling agency, contact one of the following Federal government agencies:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>U.S. Department of Housing and Urban Development (HUD) at (800) 569-4287 or <a href="https://www.hud.gov/program_offices/housing/sfh/hcc" className="text-[#0088cc] hover:underline" target="_blank" rel="noreferrer">https://www.hud.gov/program_offices/housing/sfh/hcc</a>.</li>
                    <li>Consumer Financial Protection Bureau (CFPB) at (855) 411-2372 or <a href="https://www.consumerfinance.gov/find-a-housing-counselor/" className="text-[#0088cc] hover:underline" target="_blank" rel="noreferrer">https://www.consumerfinance.gov/find-a-housing-counselor/</a>.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DEPENDENTS SECTION */}
            <h2 className="text-lg font-bold text-primary border-t border-outline-variant/20 pt-6">Does the borrower have any dependents?</h2>
            <FieldSet className="w-full max-w-xs pt-2">
              <RadioGroup value={hasDependents} onValueChange={setHasDependents} className="flex flex-row gap-8">
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasDependents === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="yes" id="dep-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-bold leading-none text-primary">Yes</span>
                </label>
                <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasDependents === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                  <RadioGroupItem value="no" id="dep-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                  <span className="font-bold leading-none text-primary">No</span>
                </label>
              </RadioGroup>
            </FieldSet>

            {hasDependents === "yes" && (
              <div className="pt-4">
                <h3 className="text-md font-bold text-primary mb-4">Please list the ages of all dependents</h3>
                <div className="space-y-3 mb-4 max-w-xl">
                  {dependents.map((dep) => (
                    <div key={dep.id} className="flex justify-between items-center border border-outline-variant/30 p-4 rounded-md bg-white shadow-sm">
                      <span className="font-medium text-on-surface">Age {dep.age}</span>
                      <button type="button" onClick={() => handleRemoveDependent(dep.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors flex items-center gap-2 text-sm font-bold">
                        <Trash2 size={16} /> REMOVE
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 max-w-xl items-end bg-surface-container-lowest p-4 rounded-md border border-outline-variant/20">
                  <Field className="flex-1">
                    <FieldLabel htmlFor="new-dependent-age">Dependent Age</FieldLabel>
                    <Input id="new-dependent-age" type="number" min="0" max="100" placeholder="e.g. 5" value={newDependentAge} onChange={(e) => setNewDependentAge(e.target.value)} />
                  </Field>
                  <button type="button" onClick={handleAddDependent} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:brightness-110 transition-all h-[42px]">
                    <Plus size={18} /> ADD DEPENDENT
                  </button>
                </div>
              </div>
            )}

            {/* SSN & FINAL CONSENT */}
            <FieldGroup className="max-w-2xl pt-6 border-t border-outline-variant/20 mt-6">
              <Field>
                <FieldLabel htmlFor="input-ssn">Social Security Number <span className="text-destructive">*</span></FieldLabel>
                <Input id="input-ssn" type="password" placeholder="XXX-XX-XXXX" required value={formData.ssn} onChange={handleInputChange} />
              </Field>
              <h4 className="text-sm text-on-surface-variant pt-4">
                You understand that by clicking YES immediately following this notice, you are providing &apos;written instructions&apos; to MVP MortgagePros LLC under the Fair Credit Reporting Act authorizing MVP MortgagePros LLC to obtain information from your personal credit profile or other Information from Experian and/or other credit bureaus. You authorize MVP MortgagePros LLC to obtain such information solely in accordance with a Mortgage Loan Application.
              </h4>
              <FieldSet className="w-full max-w-xs pt-2">
                <RadioGroup value={creditConsent} onValueChange={setCreditConsent} className="flex flex-col gap-4">
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${creditConsent === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="yes" id="consent-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-normal leading-none text-primary">Yes</span>
                  </label>
                  <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${creditConsent === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                    <RadioGroupItem value="no" id="consent-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                    <span className="font-normal leading-none text-primary">No</span>
                  </label>
                </RadioGroup>
              </FieldSet>
            </FieldGroup>

            <div className="pt-6 flex items-center justify-between border-t border-outline-variant/20 mt-6">
              <a href="./" className="text-on-surface-variant font-bold hover:text-primary flex items-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Return to Overview
              </a>
              <button
                type="submit"
                disabled={isSubmitting || addresses.length === 0 || (hasBeenEmployed === 'yes' && jobs.length === 0) || (hasAdditionalIncome === 'yes' && additionalIncomes.length === 0)}
                className="bg-secondary text-white px-10 py-4 rounded-md font-black tracking-tight hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-secondary/20 disabled:opacity-50"
              >
                {isSubmitting ? "Securing Data..." : "Submit Application"} <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* SECURITY SIDEBAR */}
        <div className="col-span-12 md:col-span-4 space-y-8">
          <div className="bg-white/40 backdrop-blur-xl border border-outline-variant/20 p-8 rounded-xl">
            <ShieldCheck className="text-secondary w-8 h-8 mb-4" />
            <h3 className="font-headline font-bold text-primary text-lg mb-2">Vault-Grade Security</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Your data is encrypted with AES-256 standards. We never share info with third-parties.
            </p>
          </div>

          <div className="bg-surface-container-high p-6 rounded-xl flex items-start gap-4">
            <Lightbulb className="text-on-surface-variant w-6 h-6 shrink-0" />
            <div>
              <p className="text-sm font-bold text-primary mb-1">Need assistance?</p>
              <p className="text-xs text-on-surface-variant">Click the help icon in the header to chat with a loan officer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. PARENT COMPONENT THAT WRAPS IN SUSPENSE
export default function BorrowerInfoPage() {
  return (
    <Suspense fallback={
      <div className="p-12 flex justify-center items-center">
        <p className="text-primary font-medium text-lg animate-pulse">Loading personal identity profile...</p>
      </div>
    }>
      <BorrowerInfoForm />
    </Suspense>
  )
}