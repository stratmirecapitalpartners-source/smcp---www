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

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  // Auth State
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Data State
  const [activeTab, setActiveTab] = useState<'borrowers' | 'lenders' | 'staff'>('borrowers');
  const [borrowers, setBorrowers] = useState<any[]>([]);
  const [lenders, setLenders] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);

  // 1. AUTHENTICATION GUARD
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }

      const { data: profile } = await supabase.from('admin_profiles').select('*').eq('id', user.id).single();

      if (!profile || profile.status !== 'approved') {
        setAdminProfile(profile || { status: 'pending' });
      } else {
        setAdminProfile(profile);
      }
      setIsAuthLoading(false);
    }
    checkAuth();
  }, [router, supabase]);

  // 2. FETCH DASHBOARD DATA
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
      }
      setIsLoading(false);
    }
    fetchData();
  }, [activeTab, adminProfile, supabase]);

  // 3. STAFF APPROVAL HANDLER
  const handleUpdateStaffStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('admin_profiles').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setStaff(staff.map(s => s.id === id ? { ...s, status: newStatus } : s));
    } else {
      alert("Failed to update staff status.");
    }
  };

  // 4. PARTNER APPROVAL HANDLER (NEW)
  const handleUpdatePartnerStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('loan_partners').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setLenders(lenders.map(p => p.id === id ? { ...p, status: newStatus } : p));

      // Update modal state if the partner being approved/rejected is currently open
      if (selectedPartner && selectedPartner.id === id) {
        setSelectedPartner({ ...selectedPartner, status: newStatus });
      }
    } else {
      alert("Failed to update partner status.");
    }
  };

  // UNIFIED DELETE
  const handleDelete = async (id: string) => {
    const table = activeTab === 'borrowers' ? 'borrowers' : activeTab === 'lenders' ? 'loan_partners' : 'admin_profiles';
    const isConfirmed = window.confirm(`Are you sure you want to permanently delete this record?`);
    if (!isConfirmed) return;

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) {
      if (activeTab === 'borrowers') setBorrowers(borrowers.filter((u) => u.id !== id));
      else if (activeTab === 'lenders') setLenders(lenders.filter((u) => u.id !== id));
      else setStaff(staff.filter((u) => u.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleExport = () => { /* Export Logic Here */ };

  // --- RENDER STATES ---
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

        {/* SIDEBAR */}
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

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10 relative">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vault Analytics</h1>
              <p className="text-slate-500 mt-1 font-medium">Logged in as {adminProfile?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleExport} className="bg-[#0a6c50] text-white px-5 py-2.5 rounded-lg shadow-sm font-bold hover:bg-[#085a42] transition-colors">Export Report</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

              <div className="flex items-center gap-8 border-b border-slate-200 w-full sm:w-auto">
                <button onClick={() => setActiveTab('borrowers')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'borrowers' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Active Borrowers</button>
                <button onClick={() => setActiveTab('lenders')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'lenders' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Partner Network</button>
                {adminProfile?.role === 'main_admin' && (
                  <button onClick={() => setActiveTab('staff')} className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'staff' ? 'border-[#0a4233] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Staff Approvals</button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
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
                    // --- STAFF TABLE ---
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
                  ) : activeTab === 'borrowers' ? (
                    // --- BORROWERS TABLE ---
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
                    // --- PARTNERS TABLE ---
                    lenders.map((partner) => (
                      <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-slate-900">
                          {partner.first_name} {partner.last_name}
                          <div className="text-xs font-normal text-slate-500 mt-1">{partner.business_name || 'Independent'}</div>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">{partner.email}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${partner.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                            partner.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                            }`}>{partner.status || 'PENDING'}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* INLINE APPROVAL BUTTONS */}
                            {(!partner.status || partner.status === 'PENDING') && (
                              <div className="flex items-center gap-1 mr-3 border-r border-slate-200 pr-3">
                                <button onClick={() => handleUpdatePartnerStatus(partner.id, 'APPROVED')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve Partner">
                                  <CheckCircle2 size={18} />
                                </button>
                                <button onClick={() => handleUpdatePartnerStatus(partner.id, 'REJECTED')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject Partner">
                                  <XCircle size={18} />
                                </button>
                              </div>
                            )}
                            <button onClick={() => handleDelete(partner.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors rounded-lg"><Trash2 size={18} /></button>
                            <button
                              onClick={() => setSelectedPartner(partner)}
                              className="px-4 py-2 bg-[#0a6c50] text-white text-xs font-bold rounded-lg hover:bg-[#085a42] transition-colors ml-2"
                            >
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Render Review Modal when a partner is selected */}
          {selectedPartner && (
            <PartnerReviewModal
              partner={selectedPartner}
              onClose={() => setSelectedPartner(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}