"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Wallet, Building2, Settings,
  ChevronLeft, ChevronRight, Trash2,
  ShieldAlert, CheckCircle2, XCircle, LogOut
} from 'lucide-react';
import { createClient } from "@/lib/supabase"
import PartnerReviewModal from '@/components/PartnerReviewModal';
import DealReviewModal from '@/components/DealReviewModal';
import BusinessLoanReviewModal from '@/components/BusinessLoanReviewModal';

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Data States
  const [activeTab, setActiveTab] = useState<'borrowers' | 'lenders' | 'staff' | 'deals' | 'business_loans'>('borrowers');
  const [borrowers, setBorrowers] = useState<any[]>([]);
  const [lenders, setLenders] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [businessLoans, setBusinessLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<any | null>(null);
  const [selectedBusinessLoan, setSelectedBusinessLoan] = useState<any | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin/login'); return; }

      const { data: profile } = await supabase.from('admin_profiles').select('*').eq('id', user.id).single();
      if (!profile || profile.status !== 'approved') setAdminProfile(profile || { status: 'pending' });
      else setAdminProfile(profile);
      setIsAuthLoading(false);
    }
    checkAuth();
  }, [router, supabase]);

  useEffect(() => {
    if (!adminProfile || adminProfile.status !== 'approved') return;

    async function fetchData() {
      setIsLoading(true);
      if (activeTab === 'borrowers') {
        const { data } = await supabase.from('borrowers').select('*').order('created_at', { ascending: false });
        if (data) setBorrowers(data);
      } else if (activeTab === 'lenders') {
        const { data } = await supabase.from('loan_partners').select('*').order('created_at', { ascending: false });
        if (data) setLenders(data);
      } else if (activeTab === 'staff') {
        const { data } = await supabase.from('admin_profiles').select('*').order('created_at', { ascending: false });
        if (data) setStaff(data);
      } else if (activeTab === 'deals') {
        const { data } = await supabase.from('deal_submissions').select('*').order('created_at', { ascending: false });
        if (data) setDeals(data);
      } else if (activeTab === 'business_loans') {
        const { data } = await supabase.from('business_loans').select('*').order('created_at', { ascending: false });
        if (data) setBusinessLoans(data);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [activeTab, adminProfile, supabase]);

  const handleUpdateStaffStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('admin_profiles').update({ status: newStatus }).eq('id', id);
    if (!error) setStaff(staff.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleUpdatePartnerStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('loan_partners').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setLenders(lenders.map(p => p.id === id ? { ...p, status: newStatus } : p));
      if (selectedPartner && selectedPartner.id === id) setSelectedPartner({ ...selectedPartner, status: newStatus });
    }
  };

  const handleUpdateDealStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('deal_submissions').update({ status: newStatus }).eq('id', id);
    if (!error) setDeals(deals.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleUpdateBusinessLoanStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('business_loans').update({ status: newStatus }).eq('id', id);
    if (!error) setBusinessLoans(businessLoans.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleDelete = async (id: string) => {
    const table = activeTab === 'borrowers' ? 'borrowers'
      : activeTab === 'lenders' ? 'loan_partners'
        : activeTab === 'deals' ? 'deal_submissions'
          : activeTab === 'business_loans' ? 'business_loans'
            : 'admin_profiles';

    const isConfirmed = window.confirm(`Are you sure you want to permanently delete this record?`);
    if (!isConfirmed) return;

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) {
      if (activeTab === 'borrowers') setBorrowers(borrowers.filter((u) => u.id !== id));
      else if (activeTab === 'lenders') setLenders(lenders.filter((u) => u.id !== id));
      else if (activeTab === 'deals') setDeals(deals.filter((u) => u.id !== id));
      else if (activeTab === 'business_loans') setBusinessLoans(businessLoans.filter((u) => u.id !== id));
      else setStaff(staff.filter((u) => u.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (isAuthLoading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Verifying Credentials...</div>;

  if (adminProfile?.status !== 'approved') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
          <ShieldAlert size={48} className="text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-900 mb-2">Access Pending</h1>
          <p className="text-slate-500 mb-6">Your account is currently awaiting approval from the Main Administrator. You will be able to access the vault once approved.</p>
          <button onClick={handleLogout} className="text-sm font-bold text-[#042f24] hover:underline">Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
      <div className="flex flex-1 overflow-hidden">

        <aside className="w-[260px] bg-[#042f24] text-slate-300 flex flex-col hidden lg:flex shrink-0">
          <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
            <a href="#" className="flex items-center gap-4 px-4 py-3 bg-[#0a4233] text-white rounded-lg font-medium shadow-sm">
              <LayoutDashboard size={20} className="text-emerald-400" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
              <Wallet size={20} /> Loans
            </a>
            <a href="#" className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
              <Building2 size={20} /> Lenders
            </a>

            {adminProfile?.role === 'main_admin' && (
              <button onClick={() => setActiveTab('staff')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'staff' ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'}`}>
                <Settings size={20} /> Access Control
              </button>
            )}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-white transition-colors w-full p-2">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8 lg:p-10 relative">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vault Analytics</h1>
              <p className="text-slate-500 mt-1 font-medium">Logged in as {adminProfile?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-[#0a6c50] text-white px-5 py-2.5 rounded-lg shadow-sm font-bold hover:bg-[#085a42] transition-colors">Export Report</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-x-auto">
              <div className="flex items-center gap-8 border-b border-slate-200 w-full sm:w-auto shrink-0">
                <button onClick={() => setActiveTab('borrowers')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'borrowers' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Active Borrowers</button>
                <button onClick={() => setActiveTab('lenders')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'lenders' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Partner Network</button>
                <button onClick={() => setActiveTab('deals')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'deals' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Deal Scenarios</button>
                <button onClick={() => setActiveTab('business_loans')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'business_loans' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Direct Applications</button>

                {adminProfile?.role === 'main_admin' && (
                  <button onClick={() => setActiveTab('staff')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'staff' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Staff Approvals</button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  {activeTab === 'staff' ? (
                    <tr>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[40%]">Admin Email</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Role</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Status</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[20%]">Actions</th>
                    </tr>
                  ) : activeTab === 'lenders' ? (
                    <tr>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[30%]">Partner / Business</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Contact</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[15%]">Status</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[35%]">Actions</th>
                    </tr>
                  ) : activeTab === 'deals' ? (
                    <tr>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[30%]">Client / Submitter</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Loan Type</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Amount</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[30%]">Status / Actions</th>
                    </tr>
                  ) : activeTab === 'business_loans' ? (
                    <tr>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[30%]">Applicant / Business</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Funding Requested</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Monthly Sales</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[30%]">Status / Actions</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[30%]">Name</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[25%]">Contact</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[25%]">Date Applied</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[20%]">Actions</th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr><td colSpan={5} className="px-8 py-10 text-center text-slate-400 font-medium">Loading data...</td></tr>
                  ) : activeTab === 'staff' ? (
                    staff.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-900">{user.email}</td>
                        <td className="px-8 py-5 text-sm uppercase tracking-wider font-bold text-slate-500">{user.role.replace('_', ' ')}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${user.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                            user.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                            }`}>{user.status}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          {user.status === 'pending' && user.role !== 'main_admin' && (
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleUpdateStaffStatus(user.id, 'approved')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><CheckCircle2 size={20} /></button>
                              <button onClick={() => handleUpdateStaffStatus(user.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><XCircle size={20} /></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : activeTab === 'deals' ? (
                    deals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-slate-900">
                          {deal.client_name || 'Unnamed Client'}
                          <div className="text-[10px] uppercase font-bold tracking-widest mt-1">
                            <span className={deal.submitted_by_type === 'PARTNER' ? 'text-indigo-500' : 'text-emerald-500'}>
                              Submitted By: {deal.submitted_by_type}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{deal.loan_type || 'N/A'}</td>
                        <td className="px-8 py-5 font-mono text-sm font-bold text-slate-700">
                          {deal.loan_amount ? `$${Number(deal.loan_amount).toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-8 py-5 text-right flex items-center justify-end">
                          {deal.status === 'PENDING_REVIEW' && (
                            <div className="flex items-center gap-1 mr-2 border-r border-slate-200 pr-2">
                              <button onClick={() => handleUpdateDealStatus(deal.id, 'APPROVED')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle2 size={18} /></button>
                              <button onClick={() => handleUpdateDealStatus(deal.id, 'REJECTED')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                            </div>
                          )}
                          <span className={`px-3 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider mr-4 ${deal.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : deal.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                            {(deal.status || 'PENDING_REVIEW').replace('_', ' ')}
                          </span>
                          <button onClick={() => handleDelete(deal.id)} className="p-2 text-red-400 hover:text-red-600 mr-2 transition-colors rounded-lg"><Trash2 size={18} /></button>
                          <button onClick={() => setSelectedDeal(deal)} className="px-4 py-2 bg-[#0a6c50] text-white text-xs font-bold rounded-lg hover:bg-[#085a42] transition-colors">Review</button>
                        </td>
                      </tr>
                    ))
                  ) : activeTab === 'business_loans' ? (
                    businessLoans.map((loan) => (
                      <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-slate-900">
                          {loan.first_name} {loan.last_name}
                          <div className="text-[10px] uppercase font-bold tracking-widest mt-1 text-slate-500">
                            {loan.legal_business_name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-8 py-5 font-mono text-sm font-bold text-slate-700">
                          {loan.funding_amount ? `$${Number(loan.funding_amount).toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-8 py-5 font-mono text-sm font-medium text-slate-600">
                          {loan.monthly_sales ? `$${Number(loan.monthly_sales).toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-8 py-5 text-right flex items-center justify-end">
                          {loan.status === 'PENDING_REVIEW' && (
                            <div className="flex items-center gap-1 mr-2 border-r border-slate-200 pr-2">
                              <button onClick={() => handleUpdateBusinessLoanStatus(loan.id, 'APPROVED')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle2 size={18} /></button>
                              <button onClick={() => handleUpdateBusinessLoanStatus(loan.id, 'REJECTED')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                            </div>
                          )}
                          <span className={`px-3 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider mr-4 ${loan.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : loan.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                            {(loan.status || 'PENDING_REVIEW').replace('_', ' ')}
                          </span>
                          <button onClick={() => handleDelete(loan.id)} className="p-2 text-red-400 hover:text-red-600 mr-2 transition-colors rounded-lg"><Trash2 size={18} /></button>
                          <button onClick={() => setSelectedBusinessLoan(loan)} className="px-4 py-2 bg-[#0a6c50] text-white text-xs font-bold rounded-lg hover:bg-[#085a42] transition-colors">Review</button>
                        </td>
                      </tr>
                    ))
                  ) : activeTab === 'borrowers' ? (
                    borrowers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-slate-900">{user.first_name} {user.last_name}</td>
                        <td className="px-8 py-5 text-sm text-slate-600">{user.email}</td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-900">{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5 text-right flex items-center justify-end">
                          <button onClick={() => handleDelete(user.id)} className="p-2 text-red-400 hover:text-red-600 mr-2"><Trash2 size={18} /></button>
                          <Link href={`/admin/application/${user.id}`} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200">Manage</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    lenders.map((partner) => (
                      <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-slate-900">
                          {partner.first_name} {partner.last_name}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-normal text-slate-500">{partner.business_name || 'Independent'}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-indigo-50 text-indigo-600 border border-indigo-100">
                              {partner.partner_tier || 'Starter'}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">{partner.email}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${partner.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                            partner.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                            }`}>{partner.status || 'PENDING'}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {(!partner.status || partner.status === 'PENDING') && (
                              <div className="flex items-center gap-1 mr-3 border-r border-slate-200 pr-3">
                                <button onClick={() => handleUpdatePartnerStatus(partner.id, 'APPROVED')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle2 size={18} /></button>
                                <button onClick={() => handleUpdatePartnerStatus(partner.id, 'REJECTED')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                              </div>
                            )}
                            <button onClick={() => handleDelete(partner.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors rounded-lg"><Trash2 size={18} /></button>
                            <button onClick={() => setSelectedPartner(partner)} className="px-4 py-2 bg-[#0a6c50] text-white text-xs font-bold rounded-lg hover:bg-[#085a42] transition-colors ml-2">Review</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {selectedPartner && <PartnerReviewModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />}
          {selectedDeal && <DealReviewModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
          {selectedBusinessLoan && <BusinessLoanReviewModal loan={selectedBusinessLoan} onClose={() => setSelectedBusinessLoan(null)} />}
        </main>
      </div>
    </div>
  );
}