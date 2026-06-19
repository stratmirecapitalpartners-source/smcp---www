"use client"
import React, { useState } from 'react'
import LoanSelectionModal from '@/components/LoanPopup'
import MeetingSelectionModal from '@/components/MeetingSelectionModal'
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const Mainherov0 = () => {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isMeetModalOpen, setIsMeetModalOpen] = useState(false);

  // New state to control the scenario path selection
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);

  const router = useRouter();
  const supabase = createClient();
  const [isRouting, setIsRouting] = useState(false);

  // Executes only if they select "As a Partner"
  const handlePartnerScenarioClick = async () => {
    setIsRouting(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/become-partner/login');
      return;
    }

    const { data: partner } = await supabase
      .from('loan_partners')
      .select('status')
      .eq('email', user.email)
      .single();

    if (partner?.status === 'APPROVED') {
      router.push('/partner/dealform');
    } else {
      router.push('/become-partner');
    }

    setIsRouting(false);
    setIsScenarioModalOpen(false);
  };

  // Executes instantly if they select "As a Client"
  const handleClientScenarioClick = () => {
    setIsScenarioModalOpen(false);
    router.push('/partner/dealform');
  };

  return (
    <>
      <section className="relative h-[850px] flex items-center overflow-hidden vault-gradient">
        <div className="absolute inset-0 opacity-40">
          <img className="w-full h-full object-cover grayscale mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPc02GeYMHj7n4N47HG5IgbeEpZ19qzslk6Vh5Z7xLXDYu0SOXUcfM9BO5KQzBJpVb5Zvc3t9cjfbWB1bSwLCKjKPGe_UiOW5mp5cmjjioh9kjF0vywgPnL9x33NoWrZ97kEr-lDvGhipNkB01HmziObHHciUkJ1XlYKacoOvOyhFf4QRr-beyynRlwP09Hn_bpDRIlgreF6IsfwpfFs27q4W6ebee7I38tXOBkXMgzhcRDa-JECBfZAWGSOfir66_ovcvCTKp_O0" alt="Hero background" />
        </div>
        <div className="relative z-10 container mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-10">
            <h1 className="text-white font-headline font-extrabold text-5xl md:text-7xl leading-tight tracking-tight mb-8">
              ALL-IN-ONE, SOLUTION-DRIVEN FUNDING YOU CAN RELY ON
            </h1>
            <p className="text-primary-fixed text-lg md:text-xl max-w-3xl leading-relaxed mb-12 opacity-90">
              Whether you’re seeking capital to grow your business, acquire or refinance, or invest in
              residential or commercial real estate, the Stratmire Capital team delivers tailored funding
              solutions designed to help you achieve your financial ambitions with precision and confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">

              <button
                onClick={() => setIsLoanModalOpen(true)}
                className="bg-secondary text-on-secondary px-10 py-5 rounded-md font-headline font-bold uppercase tracking-wider text-sm shadow-xl shadow-black/20 hover:brightness-110 transition-all text-center"
              >
                Apply for a loan
              </button>

              <button
                onClick={() => setIsMeetModalOpen(true)}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all"
              >
                Schedule a meeting with an expert
              </button>

              {/* Triggers the new selection modal */}
              <button
                onClick={() => setIsScenarioModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-md font-bold transition-all backdrop-blur-sm flex items-center gap-2"
              >
                Submit a Loan Scenario
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Existing Modals */}
      <LoanSelectionModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
      />

      <MeetingSelectionModal
        isOpen={isMeetModalOpen}
        onClose={() => setIsMeetModalOpen(false)}
      />

      {/* New Scenario Path Selection Modal */}
      {isScenarioModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsScenarioModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-black text-[#042f24] mb-2 tracking-tight">Submit a Scenario</h3>
            <p className="text-slate-500 mb-8 text-sm">Please select how you are submitting this scenario so we can route you to the correct portal.</p>

            <div className="space-y-4">
              <button
                onClick={handleClientScenarioClick}
                className="w-full bg-[#042f24] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#0a6c50] transition-colors shadow-md flex items-center justify-between group"
              >
                <span>As a Client</span>
                <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handlePartnerScenarioClick}
                disabled={isRouting}
                className="w-full bg-slate-50 text-[#042f24] py-4 px-6 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm flex items-center justify-between group disabled:opacity-50"
              >
                <span>{isRouting ? 'Verifying...' : 'As a Partner'}</span>
                {!isRouting && (
                  <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Mainherov0