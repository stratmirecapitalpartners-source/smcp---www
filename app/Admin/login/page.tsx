"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const supabase = createClient();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                // 1. Sign Up
                const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
                if (authError) throw authError;

                // 2. Auto-Approve the Profile instantly
                if (authData.user) {
                    const { error: profileError } = await supabase.from('admin_profiles').insert([{
                        id: authData.user.id,
                        email: authData.user.email,
                        status: 'approved', // Instantly approved
                        role: 'main_admin'  // Instantly given full access
                    }]);

                    if (profileError) throw profileError;

                    // 3. Because Supabase auto-logs in on signup, push straight to dashboard
                    router.push('/Admin');
                }
            } else {
                // Log In
                const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
                if (loginError) throw loginError;
                router.push('/Admin');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-16 h-16 bg-[#042f24] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <ShieldCheck size={32} className="text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">Secure Vault Access</h1>
                    <p className="text-slate-500 text-sm mt-2">Authorized personnel only.</p>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}

                <form onSubmit={handleAuth} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Corporate Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#042f24]/20 focus:border-[#042f24] outline-none transition-all bg-slate-50 focus:bg-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Master Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#042f24]/20 focus:border-[#042f24] outline-none transition-all bg-slate-50 focus:bg-white" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#042f24] text-white font-bold py-3.5 rounded-xl hover:bg-[#0a4233] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#042f24]/20">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? "Create Admin Account" : "Authenticate")}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="mt-6 text-center pt-6 border-t border-slate-100">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                        {isSignUp ? "Already have access? Log in" : "Create new admin account"}
                    </button>
                </div>
            </div>
        </div>
    );
}