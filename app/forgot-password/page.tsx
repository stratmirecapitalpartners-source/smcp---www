"use client"
import React, { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize Supabase SSR Client
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            // CRITICAL: Point this to your actual update password route
            redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) {
            setErrorMessage(error.message);
            setStatus('error');
        } else {
            setStatus('success');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-[#042f24] tracking-tight mb-2">Reset Password</h1>
                    <p className="text-slate-500 text-sm">Enter your email to receive a secure recovery link.</p>
                </div>

                {status === 'success' ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                        <h2 className="text-emerald-900 font-bold mb-1">Check your inbox</h2>
                        <p className="text-emerald-700 text-sm">We sent a password recovery link to {email}</p>
                    </div>
                ) : (
                    <form onSubmit={handleResetRequest} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a6c50] focus:ring-2 focus:ring-[#0a6c50]/20 rounded-lg py-3 pl-10 pr-4 outline-none transition-all"
                                    placeholder="partner@stratmire.cap"
                                />
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[#042f24] text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#0a6c50] transition-colors disabled:opacity-70"
                        >
                            {status === 'loading' ? 'Sending Link...' : 'Send Recovery Link'}
                            {!status && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-sm font-bold text-[#0a6c50] hover:underline">
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}