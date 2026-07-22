"use client"

import { useState, useEffect, Suspense, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck, Lightbulb, Trash2, Plus } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Strict type definition for Asset Data
type BankingAsset = {
  id: number;
  assetType: string;
  financialInstitution: string;
  accountNumber: string;
  cashValue: string;
};

type OtherAsset = {
  id: number;
  assetType: string;
  cashValue: string;
};

// Removed 'async' to comply with Client Component rules
export default function BankingAssetsPage({
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

  // Banking Assets State Management
  const [hasBankingAssets, setHasBankingAssets] = useState("no")
  const [assets, setAssets] = useState<BankingAsset[]>([])
  const [isAddingAsset, setIsAddingAsset] = useState(true)

  const [assetForm, setAssetForm] = useState({
    assetType: "",
    financialInstitution: "",
    accountNumber: "",
    cashValue: ""
  })

  // Other Assets State Management
  const [hasOtherAssets, setHasOtherAssets] = useState("no")
  const [otherAssets, setOtherAssets] = useState<OtherAsset[]>([])
  const [isAddingOtherAsset, setIsAddingOtherAsset] = useState(true)

  const [otherAssetForm, setOtherAssetForm] = useState({
    assetType: "",
    cashValue: ""
  })

  // Fetch existing borrower assets and flags from Supabase on mount
  useEffect(() => {
    if (!borrowerId) {
      console.error("No Borrower ID found. Redirecting to start.")
      router.push('/userjourney')
      return;
    }

    const fetchExistingAssets = async () => {
      const { data, error } = await supabase
        .from('borrowers')
        .select('has_banking_assets, banking_assets, has_other_assets, other_assets')
        .eq('id', borrowerId)
        .single()

      if (error) {
        console.error("Failed to fetch existing assets:", error.message)
        return
      }

      if (data) {
        if (data.has_banking_assets) {
          setHasBankingAssets("yes")
          setAssets(data.banking_assets || [])
          if (data.banking_assets && data.banking_assets.length > 0) {
            setIsAddingAsset(false)
          }
        }
        if (data.has_other_assets) {
          setHasOtherAssets("yes")
          setOtherAssets(data.other_assets || [])
          if (data.other_assets && data.other_assets.length > 0) {
            setIsAddingOtherAsset(false)
          }
        }
      }
    }

    fetchExistingAssets()
  }, [borrowerId, supabase, router])

  // --- Banking Asset Handlers ---
  const handleAssetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    let stateKey = id.replace('asset-', '')
    if (stateKey === 'type') stateKey = 'assetType'
    if (stateKey === 'financial-institution') stateKey = 'financialInstitution'
    if (stateKey === 'account-number') stateKey = 'accountNumber'
    if (stateKey === 'cash-value') stateKey = 'cashValue'

    const formattedKey = stateKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    setAssetForm(prev => ({ ...prev, [formattedKey]: value }))
  }

  const saveAsset = () => {
    if (!assetForm.assetType) {
      console.error("Asset validation failed: Asset Type is required.")
      return;
    }

    setAssets([...assets, { ...assetForm, id: Date.now() } as BankingAsset])

    setAssetForm({
      assetType: "",
      financialInstitution: "",
      accountNumber: "",
      cashValue: ""
    })
    setIsAddingAsset(false)
  }

  const removeAsset = (idToRemove: number) => {
    setAssets(assets.filter(a => a.id !== idToRemove))
    if (assets.length === 1) setIsAddingAsset(true)
  }

  // --- Other Asset Handlers ---
  const handleOtherAssetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    let stateKey = id.replace('other-asset-', '')
    if (stateKey === 'type') stateKey = 'assetType'
    if (stateKey === 'cash-value') stateKey = 'cashValue'

    const formattedKey = stateKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    setOtherAssetForm(prev => ({ ...prev, [formattedKey]: value }))
  }

  const saveOtherAsset = () => {
    if (!otherAssetForm.assetType) {
      console.error("Other Asset validation failed: Asset Type is required.")
      return;
    }

    setOtherAssets([...otherAssets, { ...otherAssetForm, id: Date.now() } as OtherAsset])

    setOtherAssetForm({
      assetType: "",
      cashValue: ""
    })
    setIsAddingOtherAsset(false)
  }

  const removeOtherAsset = (idToRemove: number) => {
    setOtherAssets(otherAssets.filter(a => a.id !== idToRemove))
    if (otherAssets.length === 1) setIsAddingOtherAsset(true)
  }

  // --- Master Database Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!borrowerId) return;

    if (hasBankingAssets === "yes" && assets.length === 0) {
      console.error("Validation failed: At least one banking asset must be provided if 'Yes' is selected.")
      return
    }

    if (hasOtherAssets === "yes" && otherAssets.length === 0) {
      console.error("Validation failed: At least one other asset must be provided if 'Yes' is selected.")
      return
    }

    setIsSubmitting(true)

    // UPDATE the existing record
    const { error } = await supabase
      .from('borrowers')
      .update({
        has_banking_assets: hasBankingAssets === "yes",
        banking_assets: hasBankingAssets === "yes" ? assets : [],
        has_other_assets: hasOtherAssets === "yes",
        other_assets: hasOtherAssets === "yes" ? otherAssets : []
      })
      .eq('id', borrowerId)

    setIsSubmitting(false)

    if (error) {
      console.error("Database update failed:", error.message)
      return
    }

    console.log("Assets saved successfully.")
    // Redirect to the next step (Liabilities) with persistent borrowerId query string
    router.push(`/userjourney/liabilities?id=${borrowerId}`)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
        <header className="mb-12">
          <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight leading-tight">
            Financial Assets
          </h1>
          <p className="mt-6 text-on-surface-variant text-lg max-w-xl leading-relaxed">
            Please provide details regarding your current bank accounts, retirement funds, and other liquid assets.
          </p>
        </header>

        {/* Updated grid breakpoint from lg to md for reliable multi-column layout */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30"></div>

            <form className="space-y-8" onSubmit={handleSubmit} suppressHydrationWarning>

              {/* BANKING ASSETS SECTION */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-primary">Do you have any banking assets?</h2>
                  <p className="text-sm text-on-surface-variant italic mt-1">(e.g. Bank Accounts, Retirement, and Other Accounts, etc.)</p>
                </div>

                <FieldSet className="w-full max-w-xs pt-2">
                  <RadioGroup value={hasBankingAssets} onValueChange={setHasBankingAssets} className="flex flex-row gap-8">
                    <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasBankingAssets === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                      <RadioGroupItem value="yes" id="assets-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                      <span className="font-bold leading-none text-primary">Yes</span>
                    </label>
                    <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasBankingAssets === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                      <RadioGroupItem value="no" id="assets-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                      <span className="font-bold leading-none text-primary">No</span>
                    </label>
                  </RadioGroup>
                </FieldSet>

                {hasBankingAssets === "yes" && (
                  <div className="pt-8 space-y-6">
                    <h3 className="text-xl font-medium text-primary">Assets - Bank Accounts, Retirement, and Other Accounts</h3>

                    {/* Render Saved Assets */}
                    {assets.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {assets.map((asset) => (
                          <div key={asset.id} className="border border-outline-variant/30 p-5 rounded-md bg-surface-container-lowest shadow-sm flex justify-between items-center">
                            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Type</span>
                                <p className="font-bold text-primary">{asset.assetType}</p>
                              </div>
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Institution</span>
                                <p className="font-medium text-slate-700">{asset.financialInstitution || "N/A"}</p>
                              </div>
                              <div className="hidden sm:block">
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Account #</span>
                                <p className="font-medium text-slate-700">...{asset.accountNumber ? asset.accountNumber.slice(-4) : "N/A"}</p>
                              </div>
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Value</span>
                                <p className="font-bold text-[#4CAF50]">${asset.cashValue}</p>
                              </div>
                            </div>
                            <button type="button" onClick={() => removeAsset(asset.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors ml-4 flex items-center justify-center shrink-0">
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Asset Form Engine */}
                    {isAddingAsset ? (
                      <div className="space-y-6 pt-4">
                        <FieldGroup className="flex flex-col sm:flex-row gap-6 items-start">

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="asset-type" className={!assetForm.assetType ? "text-destructive" : ""}>Type <span className="text-destructive">*</span></FieldLabel>
                            <select
                              id="asset-type"
                              value={assetForm.assetType}
                              onChange={handleAssetChange}
                              className={`w-full px-3 py-2 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary text-primary bg-white rounded-none ${!assetForm.assetType ? 'border-destructive text-slate-400' : 'border-outline-variant/50'}`}
                            >
                              <option value="" disabled className="text-slate-400">Select asset type...</option>
                              <option value="Checking" className="text-primary bg-white">Checking Account</option>
                              <option value="Savings" className="text-primary bg-white">Savings Account</option>
                              <option value="Certificate of Deposit" className="text-primary bg-white">Certificate of Deposit</option>
                              <option value="Mutual Fund" className="text-primary bg-white">Mutual Fund</option>
                              <option value="Stock" className="text-primary bg-white">Stock</option>
                              <option value="Stock Options" className="text-primary bg-white">Stock Options</option>
                              <option value="Bond" className="text-primary bg-white">Bond</option>
                              <option value="Retirement Fund" className="text-primary bg-white">Retirement Fund</option>
                              <option value="Life Insurance" className="text-primary bg-white">Life Insurance</option>
                              <option value="Other" className="text-primary bg-white">Other</option>
                            </select>
                            {!assetForm.assetType && <span className="text-xs text-destructive mt-1 block">This field is required</span>}
                          </Field>

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="asset-financial-institution">Financial Institution</FieldLabel>
                            <Input
                              id="asset-financial-institution"
                              type="text"
                              value={assetForm.financialInstitution}
                              onChange={handleAssetChange}
                              className="border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary rounded-none px-0 border-outline-variant/50 bg-transparent"
                            />
                          </Field>

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="asset-account-number">Account Number</FieldLabel>
                            <Input
                              id="asset-account-number"
                              type="text"
                              value={assetForm.accountNumber}
                              onChange={handleAssetChange}
                              className="border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary rounded-none px-0 border-outline-variant/50 bg-transparent"
                            />
                          </Field>

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="asset-cash-value">Cash or Market Value</FieldLabel>
                            <div className="relative">
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                              <Input
                                id="asset-cash-value"
                                type="number"
                                placeholder="0.00"
                                value={assetForm.cashValue}
                                onChange={handleAssetChange}
                                className="pl-4 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary rounded-none px-0 border-outline-variant/50 bg-transparent"
                              />
                            </div>
                          </Field>

                        </FieldGroup>

                        <div className="flex gap-4 pt-2">
                          <button type="button" onClick={saveAsset} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm">
                            Save New Asset
                          </button>
                          {assets.length > 0 && (
                            <button type="button" onClick={() => setIsAddingAsset(false)} className="bg-white border border-outline-variant/40 text-primary px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 uppercase shadow-sm">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setIsAddingAsset(true)} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm flex items-center gap-2 mt-4">
                        <Plus size={18} /> ADD ASSET
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* OTHER ASSETS SECTION */}
              <div className="border-t border-outline-variant/20 pt-10 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-primary">Do you have any other assets?</h2>
                  <p className="text-sm text-on-surface-variant italic mt-1">(e.g. Earnest money, sweat equity, rent credit, etc.)</p>
                </div>

                <FieldSet className="w-full max-w-xs pt-2">
                  <RadioGroup value={hasOtherAssets} onValueChange={setHasOtherAssets} className="flex flex-row gap-8">
                    <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasOtherAssets === 'yes' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                      <RadioGroupItem value="yes" id="other-assets-yes" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                      <span className="font-bold leading-none text-primary">Yes</span>
                    </label>
                    <label className={`flex items-center gap-3 px-6 py-3 rounded-md border-2 transition-all cursor-pointer ${hasOtherAssets === 'no' ? 'border-primary bg-slate-50' : 'bg-surface-container-high border-outline-variant/30 hover:brightness-95'}`}>
                      <RadioGroupItem value="no" id="other-assets-no" className="shrink-0 h-4 w-4 border border-primary text-primary focus:ring-secondary" />
                      <span className="font-bold leading-none text-primary">No</span>
                    </label>
                  </RadioGroup>
                </FieldSet>

                {hasOtherAssets === "yes" && (
                  <div className="pt-8 space-y-6">
                    <h3 className="text-xl font-medium text-primary">Other Assets</h3>

                    {/* Render Saved Other Assets */}
                    {otherAssets.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {otherAssets.map((asset) => (
                          <div key={asset.id} className="border border-outline-variant/30 p-5 rounded-md bg-surface-container-lowest shadow-sm flex justify-between items-center">
                            <div className="flex-1 grid grid-cols-2 gap-4 items-center">
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Type</span>
                                <p className="font-bold text-primary">{asset.assetType}</p>
                              </div>
                              <div>
                                <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Value</span>
                                <p className="font-bold text-[#4CAF50]">${asset.cashValue}</p>
                              </div>
                            </div>
                            <button type="button" onClick={() => removeOtherAsset(asset.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors ml-4 flex items-center justify-center shrink-0">
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Other Asset Form Engine */}
                    {isAddingOtherAsset ? (
                      <div className="space-y-6 pt-4">
                        <FieldGroup className="flex flex-col sm:flex-row gap-6 items-start">

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="other-asset-type" className={!otherAssetForm.assetType ? "text-destructive" : ""}>Type <span className="text-destructive">*</span></FieldLabel>
                            <select
                              id="other-asset-type"
                              value={otherAssetForm.assetType}
                              onChange={handleOtherAssetChange}
                              className={`w-full px-3 py-2 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary text-primary bg-white rounded-none ${!otherAssetForm.assetType ? 'border-destructive text-slate-400' : 'border-outline-variant/50'}`}
                            >
                              <option value="" disabled className="text-slate-400">Select asset type...</option>
                              <option value="Earnest Money" className="text-primary bg-white">Earnest Money</option>
                              <option value="Employer Assistance" className="text-primary bg-white">Employer Assistance</option>
                              <option value="Relocation Funds" className="text-primary bg-white">Relocation Funds</option>
                              <option value="Rent Credit" className="text-primary bg-white">Rent Credit</option>
                              <option value="Sweat Equity" className="text-primary bg-white">Sweat Equity</option>
                              <option value="Trade Equity" className="text-primary bg-white">Trade Equity</option>
                              <option value="Other" className="text-primary bg-white">Other</option>
                            </select>
                            {!otherAssetForm.assetType && <span className="text-xs text-destructive mt-1 block">This field is required</span>}
                          </Field>

                          <Field className="flex-1 w-full">
                            <FieldLabel htmlFor="other-asset-cash-value">Value</FieldLabel>
                            <div className="relative">
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                              <Input
                                id="other-asset-cash-value"
                                type="number"
                                placeholder="0.00"
                                value={otherAssetForm.cashValue}
                                onChange={handleOtherAssetChange}
                                className="pl-4 border-b-2 border-x-0 border-t-0 focus:ring-0 focus:border-secondary rounded-none px-0 border-outline-variant/50 bg-transparent"
                              />
                            </div>
                          </Field>

                        </FieldGroup>

                        <div className="flex gap-4 pt-2">
                          <button type="button" onClick={saveOtherAsset} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm">
                            Save New Asset
                          </button>
                          {otherAssets.length > 0 && (
                            <button type="button" onClick={() => setIsAddingOtherAsset(false)} className="bg-white border border-outline-variant/40 text-primary px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 uppercase shadow-sm">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setIsAddingOtherAsset(true)} className="bg-[#4CAF50] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:brightness-110 uppercase shadow-sm flex items-center gap-2 mt-4">
                        <Plus size={18} /> ADD ASSET
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
                  disabled={isSubmitting || (hasBankingAssets === 'yes' && assets.length === 0) || (hasOtherAssets === 'yes' && otherAssets.length === 0)}
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