import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { Accessibility, Eye, HelpCircle, AlertCircle, Phone, Mail } from 'lucide-react';

export default function AccessibilityStatementPage() {
    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">

            {/* Institutional Legal Header */}
            <section className="bg-[#042f24] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#042f24] via-[#042f24]/80 to-transparent"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-4">
                        <Accessibility className="text-[#D4AF37] w-8 h-8" />
                    </div>
                    <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight mb-4">
                        Accessibility Statement
                    </h1>
                    <p className="text-emerald-50/80 font-medium text-lg">
                        Stratmire Capital Partners LLC
                    </p>
                </div>
            </section>

            {/* Main Document Content */}
            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 -mt-12 relative z-20 pb-24 w-full">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 space-y-10">

                    <div className="text-slate-500 font-medium text-sm border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <p><strong>Entity Portal:</strong> www.stratmirecapitalpartners.com</p>
                            <p><strong>Standards Baseline:</strong> WCAG 2.1 Compliance</p>
                        </div>
                        <div className="bg-slate-100 px-4 py-2 rounded-xl text-slate-700 font-bold text-xs font-mono tracking-wide uppercase">
                            Compliance Record
                        </div>
                    </div>

                    <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">

                        {/* General Commitment */}
                        <section className="prose prose-slate">
                            <h2 className="text-xl font-bold text-slate-900 mb-3">General Commitment</h2>
                            <p>
                                Stratmire Capital Partners LLC strives to ensure that its services are accessible to people with disabilities on its website: <span className="font-medium text-slate-900">www.stratmirecapitalpartners.com</span>.
                                We have invested a significant amount of resources to help ensure that our website is made easier to use and more accessible for people with disabilities, with the strong belief that every person has the right to live with dignity, equality, comfort, and independence.
                            </p>
                        </section>

                        {/* Accessibility on our Website */}
                        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div className="flex items-start gap-4">
                                <Eye className="text-[#0a6c50] w-6 h-6 shrink-0 mt-0.5" />
                                <div>
                                    <h2 className="text-base font-bold text-slate-900 mb-2">Accessibility on our Website</h2>
                                    <p className="text-sm">
                                        Our web infrastructure makes available the <strong className="text-slate-800">UserWay Accessibility Widget</strong> which is powered by a dedicated accessibility server. The software allows the site to continuously improve its architectural compliance with the Web Content Accessibility Guidelines (WCAG 2.1).
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Enabling the Accessibility Menu */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                Enabling the Accessibility Menu
                            </h2>
                            <p>
                                The institutional accessibility menu can be enabled instantly by clicking the accessibility menu icon that appears on the corner of the page. After triggering the accessibility menu, please wait a moment for the user interface interface to load in its entirety.
                            </p>
                        </section>

                        {/* Disclaimer */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <AlertCircle size={20} className="text-amber-600" /> Disclaimer
                            </h2>
                            <p>
                                Stratmire Capital Partners LLC is committed to continuing our efforts to constantly improve the accessibility of our website and services in the belief that it is our collective moral obligation to allow seamless, accessible, and unhindered use also for those of us with disabilities.
                            </p>
                            <p className="mt-3">
                                Despite our efforts to make all pages and content on our website fully accessible, some content may not have yet been fully adapted to the strictest accessibility standards. This may be a result of not having found or identified the most appropriate technological solution currently available on the market.
                            </p>
                        </section>

                        {/* Here For You Callout */}
                        <section className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 flex items-start gap-4">
                            <HelpCircle className="text-[#0a6c50] w-6 h-6 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <h3 className="font-bold text-slate-900 mb-1">Here For You</h3>
                                <p className="mb-4">
                                    If you are experiencing difficulty with any content on our website, structural widgets, or any of its services, or require assistance with any part of our software, please reach out to us during normal business hours. Our dedicated support specialists are ready to assist.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-center gap-2 font-semibold text-[#0a6c50]">
                                        <Phone size={16} />
                                        <span>855-202-1312</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-semibold text-[#0a6c50]">
                                        <Mail size={16} />
                                        <span>info@stratmirecapitalpartners.com</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Branded Regulatory Context Block */}
                        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <p>© 2026 STRATMIRE CAPITAL. ALL RIGHTS RESERVED.</p>
                            <div className="flex gap-4 mt-2 sm:mt-0">
                                <span>ADA Compliant Portal</span>
                                <span>•</span>
                                <span>Institutional Operations</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}