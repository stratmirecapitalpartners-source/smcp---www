import React from 'react'
import { NewButton } from './ui/new-button'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import LoanSelectionModal from './LoanPopup'

const Howitwork = () => {
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isMeetModalOpen, setIsMeetModalOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const [isRouting, setIsRouting] = useState(false);

    const handleScenarioClick = async () => {
        setIsRouting(true);

        // 1. Check if they are logged in at all
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // Not logged in -> Send to partner login
            router.push('/become-partner/login');
            return;
        }

        // 2. If logged in, check their partner approval status
        const { data: partner } = await supabase
            .from('loan_partners')
            .select('status')
            .eq('email', user.email)
            .single();

        // 3. Execute final routing based on database status
        if (partner?.status === 'APPROVED') {
            router.push('/partner/dashboard'); // Where the scenario form lives
        } else {
            router.push('/become-partner'); // Not approved or doesn't exist
        }

        setIsRouting(false);
    };
    return (
        <>
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        {/* <span className="text-secondary font-headline font-bold tracking-widest text-[10px] uppercase mb-4 block">HOW IT WORKS</span> */}
                        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">Our 4 Steps Process</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Step 1 */}
                        <div className="bg-surface p-10 text-center border border-slate-100 group rounded-md shadow-md">
                            <div className="font-headline font-black text-xs mb-4 uppercase text-primary/40">Step 1</div>
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">assignment</span>
                            </div>
                            <h4 className="font-headline font-extrabold text-sm text-primary mb-4 uppercase tracking-wider">Loan Application</h4>
                            <p className="font-body text-xs leading-relaxed text-gray-600">Begin your journey through our encrypted portal with a high-level summary.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-surface p-10 text-center border border-slate-100 group rounded-md shadow-md">
                            <div className="font-headline font-black text-xs mb-4 uppercase text-primary/40">Step 2</div>
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">analytics</span>
                            </div>
                            <h4 className="font-headline font-extrabold text-sm text-primary mb-4 uppercase tracking-wider">Analysis</h4>
                            <p className="font-body text-xs leading-relaxed text-gray-600">Our expert analysts review your assets to engineer a bespoke solution.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-surface p-10 text-center border border-slate-100 group rounded-md shadow-md">
                            <div className="font-headline font-black text-xs mb-4 uppercase text-primary/40">Step 3</div>
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <h4 className="font-headline font-extrabold text-sm text-primary mb-4 uppercase tracking-wider">Loan Approval</h4>
                            <p className="font-body text-xs leading-relaxed text-gray-600">Receive a formal commitment letter detailing your specific capital stack.</p>
                        </div>
                        {/* Step 4 */}
                        <div className="bg-surface p-10 text-center border border-slate-100 group rounded-md shadow-md">
                            <div className="font-headline font-black text-xs mb-4 uppercase text-primary/40">Step 4</div>
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">account_balance</span>
                            </div>
                            <h4 className="font-headline font-extrabold text-sm text-primary mb-4 uppercase tracking-wider">Loan Funding</h4>
                            <p className="font-body text-xs leading-relaxed text-gray-600">Swift deployment of capital directly into your accounts with zero friction.</p>
                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        <NewButton variant="primary"
                            onClick={() => setIsLoanModalOpen(true)}
                        >
                            Get Approved
                        </NewButton>
                    </div>
                </div>
            </section>

            <LoanSelectionModal
                isOpen={isLoanModalOpen}
                onClose={() => setIsLoanModalOpen(false)}
            />

        </>
    )
}

export default Howitwork