import React from 'react'
import { NewButton } from './ui/new-button'
import LoanSelectionModal from './LoanPopup'
import MeetingSelectionModal from './MeetingSelectionModal'

const Loanpartner = () => {
    return (
        <>
            <section className="py-24 bg-secondary text-slate-100 rounded-xl" >
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="text-slate-100 font-headline font-bold tracking-widest text-[10px] uppercase mb-4 block">EXPANSION OPPORTUNITY</span>
                            <h2 className="text-slate-100 text-4xl md:text-5xl font-headline font-black tracking-tight leading-tight mb-8">
                                Become a Loan Partner
                            </h2>
                            <p className="text-lg text-slate-100 font-body leading-relaxed mb-12 max-w-xl opacity-90">
                                Partner with the fastest growing commercial loan marketplace. We provide the infrastructure; you provide the vision.
                            </p>
                            <a href="/become-partner/team">
                                <NewButton variant='primary'>
                                    Join As Loan Partner
                                </NewButton>
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                            <div className="flex flex-col gap-4">
                                <span className="material-symbols-outlined text-3xl text-slate-100">check_circle</span>
                                <h4 className="font-headline font-black text-sm uppercase">No Licensing</h4>
                                <p className="text-slate-100 text-xs leading-relaxed">Focus on deal flow while we handle the regulatory framework.</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="material-symbols-outlined text-3xl text-slate-100">handshake</span>
                                <h4 className="font-headline font-black text-sm uppercase">Compensation</h4>
                                <p className="text-slate-100 text-xs leading-relaxed">Earn significant rewards for recruiting new partners to the network.</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="material-symbols-outlined text-3xl text-slate-100">public</span>
                                <h4 className="font-headline font-black text-sm uppercase">Nationwide Reach</h4>
                                <p className="text-slate-100 text-xs leading-relaxed">Work across all 50 states and various commercial asset classes.</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="material-symbols-outlined text-3xl text-slate-100">bolt</span>
                                <h4 className="font-headline font-black text-sm uppercase">Fast Payouts</h4>
                                <p className="text-slate-100 text-xs leading-relaxed">Automated system ensures commissions are cleared upon funding.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Loanpartner