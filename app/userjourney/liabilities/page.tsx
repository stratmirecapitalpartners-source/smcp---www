"use client"

import { useState, useEffect, Suspense, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck, Lightbulb, Trash2, Plus } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Strict type definition for Liability Data
type OtherLiability = {
  id: number;
  liabilityType: string;
  monthlyPayment: string;
};

// Removed 'async' to comply with Client Component rules
export default function LiabilitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const router = useRouter()

  // Unwrap the promise using React's use() hook instead of await
  const params = use(searchParams);
  const borrowerId = params?.id ?? '';
  const supabase = createClient()

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Liabilities State Management
  const [hasOtherLiabilities, setHasOtherLiabilities] = useState("no")
  const [liabilities, setLiabilities] = useState<OtherLiability[]>([])
  const [isAddingLiability, setIsAddingLiability] = useState(true)

  const [liabilityForm, setLiabilityForm] = useState({
    liabilityType: "",
    monthlyPayment: ""
  })

  // Fetch existing borrower liabilities and flags from Supabase on mount
  useEffect(() => {
    if (!borrowerId) {
      console.error("No Borrower ID found. Redirecting to start.")
      router.push('/userjourney')
      return;
    }

    const fetchExistingLiabilities = async () => {
      const { data, error } = await supabase
        .from('borrowers')
        .select('has_other_liabilities, other_liabilities')
        .eq('id', borrowerId)
        .single()

      if (error) {
        console.error("Failed to fetch existing liabilities:", error.message)
        return
      }

      if (data) {
        if (data.has_other_liabilities) {
          setHasOtherLiabilities("yes")
          setLiabilities(data.other_liabilities || [])
          if (data.other_liabilities && data.other_liabilities.length > 0) {
            setIsAddingLiability(false)
          }
        }
      }
    }

    fetchExistingLiabilities()
  }, [borrowerId, supabase, router])

  // --- Handlers ---
  const handleLiabilityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    let stateKey = id.replace('lia-', '')
    if (stateKey === 'liability-type') stateKey = 'liabilityType'
    if (stateKey === 'monthly-payment') stateKey = 'monthlyPayment'

    const formattedKey = stateKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    setLiabilityForm(prev => ({ ...prev, [formattedKey]: value }))
  }

  const saveLiability = () => {
    if (!liabilityForm.liabilityType) {
      console.error("Liability validation failed: Type is required.")
      return;
    }

    setLiabilities([...liabilities, { ...liabilityForm, id: Date.now() } as OtherLiability])

    // Reset the form
    setLiabilityForm({
      liabilityType: "",
      monthlyPayment: ""
    })
    setIsAddingLiability(false)
  }

  const removeLiability = (idToRemove: number) => {
    setLiabilities(liabilities.filter(l => l.id !== idToRemove))
    if (liabilities.length === 1) setIsAddingLiability(true)
  }

  // --- Master Database Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!borrowerId) return;

    if (hasOtherLiabilities === "yes" && liabilities.length === 0) {
      console.error("Validation failed: At least one liability must be provided if 'Yes' is selected.")
      return
    }

    setIsSubmitting(true)

    // UPDATE the existing record
    const { error } = await supabase
      .from('borrowers')
      .update({
        has_other_liabilities: hasOtherLiabilities === "yes",
        other_liabilities: hasOtherLiabilities === "yes" ? liabilities : []
      })
      .eq('id', borrowerId)

    setIsSubmitting(false)

    if (error) {
      console.error("Database update failed:", error.message)
      return
    }

    console.log("Liabilities saved successfully.")

    // Send to the next section in your pipeline with persistent borrowerId query string
    router.push(`/userjourney/documents?id=${borrowerId}`)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
        <header className="mb-12">
          <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight leading-tight">
            Financial Liabilities
          </h1>
          <p className="mt-6 text-on-surface-variant text-lg max-w-xl leading-relaxed">
            Please provide details regarding your current financial obligations and monthly liabilities.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30"></div>

            <form className="space-y-8" onSubmit={handleSubmit} suppressHydrationWarning>

              {/* OTHER LIABILITIES SECTION */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-primary leading-tight">Do you have any of the following liabilities? (Alimony, Child Support, Separate Maintenance, Job Related Expenses, etc.)</h2>
                </div>

                <FieldSet className="w-full max-w-xs pt-2">
                  <RadioGroup value={hasOtherLiabilities} onValueChange={setHasOtherLiabilities} className="flex flex-row gap-8">
                    <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasOtherLiabilities === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                      <RadioGroupItem value="yes" id="lia-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                      <span className="font-bold leading-none text-primary">Yes</span>
                    </label>
                    <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasOtherLiabilities === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                      <RadioGroupItem value="no" id="lia-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                      <span className="font-bold leading-none text-primary">No</span>
                    </label>
                  </RadioGroup>
                </FieldSet>

                {hasOtherLiabilities === "yes" && (
                  <div className="pt-8 space-y-6">
                    <h3 className="text-xl font-medium text-primary">Liabilities - Other</h3>

                    {/* Render Saved Liabilities */}
                    {liabilities.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {liabilities.map((liability) => (
                          <div key={liability.id} className="border border-outline-variant/30 p-5 rounded-md bg-surface-container-lowest shadow-sm flex justify-between items-center">
                            <div className="flex-1 grid grid-cols-2 gap-4 items-center">
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Type</span>
                                <p className="font-bold text-primary">{liability.liabilityType}</p>
                              </div>
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Monthly Payment</span>
                                <p className="font-bold text-[#4CAF50]">${liability.monthlyPayment}</p>
                              </div>
                            </div>
                            <button type="button" onClick={() => removeLiability(liability.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors ml-4 flex items-center justify-center shrink-0">
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Liability Form Engine */}
                    {isAddingLiability ? (
                      <div className="space-y-6 pt-4">
                        <FieldGroup className="flex flex-col sm:flex-row gap-6 items-start">

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="lia-liability-type" className={!liabilityForm.liabilityType ? "text-destructive" : "text-primary"}>Type <span className="text-destructive">*</span></FieldLabel>
                            <select
                              id="lia-liability-type"
                              value={liabilityForm.liabilityType}
                              onChange={handleLiabilityChange}
                              className={`w-full px-3 py-2 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary text-primary bg-white rounded-none ${!liabilityForm.liabilityType ? 'border-destructive text-slate-400' : 'border-outline-variant/50'}`}
                            >
                              <option value="" disabled className="text-slate-400">Select type...</option>
                              <option value="Alimony" className="text-primary bg-white">Alimony</option>
                              <option value="Child Support" className="text-primary bg-white">Child Support</option>
                              <option value="Separate Maintenance" className="text-primary bg-white">Separate Maintenance</option>
                              <option value="Job Related Expenses" className="text-primary bg-white">Job Related Expenses</option>
                              <option value="Other" className="text-primary bg-white">Other</option>
                            </select>
                            {!liabilityForm.liabilityType && <span className="text-xs text-destructive mt-1 block">This field is required</span>}
                          </Field>

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="lia-monthly-payment">Monthly Payment</FieldLabel>
                            <div className="relative">
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                              <Input
                                id="lia-monthly-payment"
                                type="number"
                                placeholder="0.00"
                                value={liabilityForm.monthlyPayment}
                                onChange={handleLiabilityChange}
                                className="pl-4 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary rounded-none px-0 border-outline-variant/50 bg-transparent"
                              />
                            </div>
                          </Field>

                        </FieldGroup>

                        <div className="flex gap-4 pt-2">
                          <button type="button" onClick={saveLiability} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm">
                            Save New Liability
                          </button>
                          {liabilities.length > 0 && (
                            <button type="button" onClick={() => setIsAddingLiability(false)} className="bg-white border border-outline-variant/40 text-primary px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 uppercase shadow-sm">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setIsAddingLiability(true)} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm flex items-center gap-2 mt-4">
                        <Plus size={18} /> ADD LIABILITY
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-10 flex items-center justify-between border-t border-outline-variant/20 mt-10">
                <button type="button" onClick={() => router.back()} className="text-on-surface-variant font-bold hover:text-primary flex items-center gap-2 transition-colors uppercase text-sm tracking-widest">
                  <ArrowLeft size={16} /> Prev
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || (hasOtherLiabilities === 'yes' && liabilities.length === 0)}
                  className="bg-secondary text-white px-10 py-3 rounded-md font-black tracking-widest hover:brightness-110 transition-all flex items-center gap-3 shadow-md disabled:opacity-50 uppercase text-sm"
                >
                  {isSubmitting ? "Saving..." : "Next"}
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
    </Suspense>
  );
}