"use client"
import React, { useState } from 'react'
import LoanSelectionModal from '@/components/LoanPopup'
import MeetingSelectionModal from '@/components/MeetingSelectionModal' // <-- Import the new modal
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const Mainherov0 = () => {
  // Setup separate states for both modals
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
      router.push('/partner/dealform'); // Where the scenario form lives
    } else {
      router.push('/become-partner'); // Not approved or doesn't exist
    }

    setIsRouting(false);
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

              {/* This button now triggers the modal state instead of Cal.com directly */}
              <button
                onClick={() => setIsMeetModalOpen(true)}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all"
              >
                Schedule a meeting with an expert
              </button>

              <button
                onClick={handleScenarioClick}
                disabled={isRouting}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-md font-bold transition-all backdrop-blur-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isRouting ? 'Verifying Access...' : 'Submit a Loan Scenario'}
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Mount both modals outside the main flow */}
      <LoanSelectionModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
      />

      <MeetingSelectionModal
        isOpen={isMeetModalOpen}
        onClose={() => setIsMeetModalOpen(false)}
      />
    </>
  )
}

export default Mainherov0