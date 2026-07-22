"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Home, FolderOpen, Send, ChevronRight, LogOut, CheckCircle2, Building, Clock, XCircle, Wallet, X, Timer } from 'lucide-react';
import LoanSelectionModal from '@/components/LoanPopup';

// Define the shapes of our application data
type StandardLoanApplication = {
  id: string;
  created_at: string;
  status: string;
  missing_docs: number;
};

type BusinessLoanApplication = {
  id: string;
  created_at: string;
  status: string;
  legal_business_name: string;
  funding_amount: string;
};

export default function MyLoanDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [userName, setUserName] = useState<string>("Roney Gajjar");
  const [applications, setApplications] = useState<StandardLoanApplication[]>([]);
  const [businessApplications, setBusinessApplications] = useState<BusinessLoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // New state to handle the loan selection modal
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUserDashboard() {
      // 1. Get the current logged-in user
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.user_metadata?.first_name) {
        setUserName(`${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`);
      } else if (user?.email) {
        setUserName(user.email); // Fallback to email if name isn't set
      }

      if (user?.email) {
        // 2. Fetch Standard Loan applications (borrowers table)
        const { data: standardData, error: standardError } = await supabase
          .from('borrowers')
          .select('id, created_at, uploaded_documents')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (!standardError && standardData) {
          const mappedApps = standardData.map((app: any) => {
            const uploadedCount = app.uploaded_documents ? Object.keys(app.uploaded_documents).length : 0;
            const missingCount = Math.max(0, 16 - uploadedCount);
            return {
              id: app.id,
              created_at: app.created_at,
              status: missingCount === 0 ? 'COMPLETED' : 'IN PROGRESS',
              missing_docs: missingCount
            };
          });
          setApplications(mappedApps);
        }

        // 3. Fetch Business Loan applications (business_loans table)
        const { data: bizData, error: bizError } = await supabase
          .from('business_loans')
          .select('id, created_at, status, legal_business_name, funding_amount')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (!bizError && bizData) {
          setBusinessApplications(bizData);
        }
      }

      setLoading(false);
    }

    fetchUserDashboard();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('currentApplicationId');
    sessionStorage.clear();
    router.push('/login');
  };

  const startNewStandardApplication = () => {
    localStorage.removeItem('currentApplicationId');
    sessionStorage.removeItem('activeBorrowerId');
    sessionStorage.removeItem('borrowerInfoDraft');
    setIsLoanModalOpen(false);
    router.push('/userjourney?new=true');
  };

  const startBusinessApplication = () => {
    setIsLoanModalOpen(false);
    router.push('/business-loan');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getBusinessStatusUI = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return { icon: <CheckCircle2 size={16} />, color: 'bg-emerald-500 text-white', label: 'APPROVED' };
      case 'REJECTED':
        return { icon: <XCircle size={16} />, color: 'bg-red-500 text-white', label: 'DECLINED' };
      default:
        return { icon: <Clock size={16} />, color: 'bg-amber-500 text-white', label: 'UNDER REVIEW' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant/30 pb-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-brand-dark tracking-tight font-headline">Client Portal</h1>
            <div className="mt-4">
              <Link href="/" className="text-secondary hover:text-primary transition-colors">
                <Home size={28} strokeWidth={2} />
              </Link>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-2 text-slate-600 font-medium">
            <span>Welcome {userName}</span>
            <span className="text-slate-300">|</span>
            <button onClick={handleSignOut} className="text-primary hover:text-secondary transition-colors flex items-center gap-1">
              Sign Out <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="space-y-4">
            <div className="animate-pulse bg-slate-200 h-32 rounded-xl w-full"></div>
            <div className="animate-pulse bg-slate-200 h-32 rounded-xl w-full"></div>
          </div>
        ) : (
          <>
            {/* NO APPLICATIONS FALLBACK */}
            {applications.length === 0 && businessApplications.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center mb-12 shadow-sm">
                <FolderOpen size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Applications</h3>
                <p className="text-slate-500 max-w-md mx-auto">You haven't submitted any funding requests yet. Click below to start your application.</p>
              </div>
            )}

            {/* BUSINESS APPLICATIONS LIST */}
            {businessApplications.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-black text-brand-dark mb-6 font-headline flex items-center gap-2">
                  <Wallet className="text-[#0a6c50]" size={24} /> Commercial Funding
                </h2>
                <div className="space-y-6">
                  {businessApplications.map((app) => {
                    const statusUI = getBusinessStatusUI(app.status);

                    return (
                      <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0a6c50]"></div>

                        {/* Info Side */}
                        <div className="flex items-start gap-5 relative z-10">
                          <div className="mt-1 bg-[#0a6c50]/10 p-3 rounded-lg border border-[#0a6c50]/20">
                            <Building size={28} className="text-[#0a6c50]" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Business Name</p>
                            <h3 className="text-2xl font-bold text-brand-dark mb-1">{app.legal_business_name || 'N/A'}</h3>
                            <p className="text-slate-500 text-sm font-medium">
                              Requested: <span className="text-slate-800">${Number(app.funding_amount).toLocaleString()}</span> • Submitted {formatDate(app.created_at)}
                            </p>
                          </div>
                        </div>

                        {/* Actions Side */}
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={`px-4 py-2 rounded-md text-xs font-black flex items-center gap-2 uppercase tracking-wider ${statusUI.color}`}>
                            {statusUI.icon} {statusUI.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STANDARD LOAN APPLICATIONS LIST */}
            {applications.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-black text-brand-dark mb-6 font-headline flex items-center gap-2">
                  <Home className="text-primary" size={24} /> Standard Loan Applications
                </h2>
                <div className="space-y-6">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-brand-dark rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                      {/* Info Side */}
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="mt-1 bg-white/10 p-3 rounded-lg border border-white/5">
                          <Home size={28} className="text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Full Loan Application</h3>
                          <p className="text-slate-300 text-sm flex items-center gap-2">
                            Started {formatDate(app.created_at)}
                          </p>
                        </div>
                      </div>

                      {/* Actions Side */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10">
                        {app.status === 'COMPLETED' ? (
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-slate-300 px-6 py-3 rounded-md text-sm font-bold flex items-center justify-center min-w-[200px] h-[48px]">
                            COMPLETED {formatDate(app.created_at)}
                          </div>
                        ) : (
                          <button
                            onClick={() => router.push(`/userjourney?id=${app.id}`)}
                            className="bg-white text-brand-dark px-6 py-3 rounded-md text-sm font-bold flex items-center justify-between min-w-[200px] h-[48px] hover:bg-slate-100 transition-colors shadow-lg"
                          >
                            <ChevronRight size={18} className="text-slate-400" /> RESUME
                          </button>
                        )}

                        <button
                          onClick={() => {
                            localStorage.setItem('currentApplicationId', app.id);
                            sessionStorage.setItem('activeBorrowerId', app.id);
                            router.push(`/userjourney/documents?id=${app.id}`);
                          }}
                          className="bg-primary/20 hover:bg-primary/40 border border-primary/30 text-white px-6 py-3 rounded-md text-sm font-bold flex items-center justify-between gap-4 h-[48px] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FolderOpen size={18} /> DOCUMENTS
                          </div>
                          {app.missing_docs > 0 ? (
                            <span className="bg-secondary text-brand-dark text-[10px] uppercase tracking-wider px-2 py-1 rounded font-black">
                              {app.missing_docs} TO-DO
                            </span>
                          ) : (
                            <span className="bg-emerald-500 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 font-black">
                              <CheckCircle2 size={12} /> COMPLETE
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* START NEW APPLICATION BUTTON */}
        <div className="mt-8 border-t border-slate-200 pt-12">
          <button
            onClick={() => setIsLoanModalOpen(true)}
            className="w-full md:w-auto bg-[#042f24] hover:bg-[#0a6c50] text-white rounded-xl p-6 flex items-center justify-center md:justify-start gap-4 transition-all shadow-lg shadow-[#042f24]/20 group"
          >
            <div className="shrink-0 p-2 rounded-full bg-white/10">
              <Send size={24} className="text-white -ml-1 mt-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black mb-1">Start New Application</h3>
              <p className="text-white/70 text-sm">Select your loan type to begin</p>
            </div>
          </button>
        </div>

      </div>

      <LoanSelectionModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
      />

      {/* LOAN SELECTION MODAL */}
      {/* {isLoanModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-200">

            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">What kind of loan are you looking for?</h2>
              <button
                onClick={() => setIsLoanModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <button
                onClick={startBusinessApplication}
                className="w-full bg-[#042f24] text-white p-4 rounded-xl flex items-center gap-4 hover:bg-[#0a6c50] hover:-translate-y-0.5 transition-all shadow-md shadow-[#042f24]/10"
              >
                <Home size={22} className="opacity-90" strokeWidth={1.5} />
                <span className="font-semibold text-lg tracking-wide">Business Loan</span>
              </button>

              <button
                onClick={startNewStandardApplication}
                className="w-full bg-[#042f24] text-white p-4 rounded-xl flex items-center gap-4 hover:bg-[#0a6c50] hover:-translate-y-0.5 transition-all shadow-md shadow-[#042f24]/10"
              >
                <Home size={22} className="opacity-90" strokeWidth={1.5} />
                <span className="font-semibold text-lg tracking-wide">Commercial Property</span>
              </button>

              <button
                onClick={startNewStandardApplication}
                className="w-full bg-[#042f24] text-white p-4 rounded-xl flex items-center gap-4 hover:bg-[#0a6c50] hover:-translate-y-0.5 transition-all shadow-md shadow-[#042f24]/10"
              >
                <Timer size={22} className="opacity-90" strokeWidth={1.5} />
                <span className="font-semibold text-lg tracking-wide">Investment Property</span>
              </button>

              <button
                onClick={startNewStandardApplication}
                className="w-full bg-[#042f24] text-white p-4 rounded-xl flex items-center gap-4 hover:bg-[#0a6c50] hover:-translate-y-0.5 transition-all shadow-md shadow-[#042f24]/10"
              >
                <Building size={22} className="opacity-90" strokeWidth={1.5} />
                <span className="font-semibold text-lg tracking-wide">Construction Property</span>
              </button>
            </div>

          </div>
        </div>
      )} */}
    </div>
  );
}