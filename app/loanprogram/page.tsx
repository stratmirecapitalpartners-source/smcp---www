"use client"
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { NewButton } from '@/components/ui/new-button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LoanPrograms() {
  const router = useRouter();
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">

      <main className="min-h-screen">
        {/* Hero Section */}
        {/* <section className="vault-gradient text-white py-24 px-8 overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-3/5 z-10">
              <span className="text-secondary-fixed font-headline font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Institutional Grade Funding
              </span>
              <h1 className="font-headline font-extrabold text-5xl md:text-7xl tracking-tight mb-8 leading-[1.1]">
                The Modern Standard for <span className="text-secondary-fixed">Capital Placement.</span>
              </h1>
              <p className="font-body text-lg text-primary-fixed/80 max-w-xl leading-relaxed mb-10">
                Strategic liquidity solutions for high-performance enterprises and real estate visionaries. We provide the architecture for your growth.
              </p>
            </div>
            <div className="md:w-2/5 relative">
              <div className="aspect-[4/5] w-full rounded-lg overflow-hidden nexos-shadow">
                <img
                  alt="Modern architectural detail"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPTdV8OMqTOWPOwq4gPGcN9KgtYqi4tuYH6yatTnFU6WkxUN2mEGbrXcXIlMrYqSaSnaatltXohH84X2qqgZDfbA8Hg46KKYXaxQDdMevoV0NkkjLPA7eMlN_y4wpcZF3MxfSCbmo_huCyDx-wmT_g0kcAFZvvBiO0-VTUxs1NQVsy5MHxSvJ0WZeEuvcD1W5yJVVbO5XlNgwhLuuC57xFw05mUqClrMCuAn64LJwfXS3ke9jZONVhfikeWniElCAYeDOcNRfzYqU"
                />
              </div>
            </div>
          </div>
        </section> */}
        <section className="w-full bg-[#042f24] py-20 lg:py-28 px-4 sm:px-8 relative overflow-hidden font-sans">
          {/* Subtle background abstract glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

            {/* Left Side Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* <span className="text-teal-400 font-bold tracking-[0.2em] text-xs uppercase block">
                Institutional Grade Funding
              </span> */}
              <h1 className="text-secondary font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none">
                YOUR NEXT LOAN <br /> STARTS HERE
              </h1>
              <p className="text-emerald-50/70 font-medium text-base sm:text-lg max-w-xl leading-relaxed">
                At Stratmire Capital Partners LLC, we believe access to capital should be simple,
                strategic, and tailored to the unique needs of every borrower. Whether you&apos;re a business
                owner seeking growth capital or a real estate investor expanding your portfolio, our
                mission is to connect you with the right financing solution quickly and efficiently.
              </p>
            </div>

            {/* Right Side Image Box */}
            <div className="lg:col-span-5 w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/10 relative group">
              {/* Green tint mix-blend overlay to perfectly match your navbar color scheme */}
              <div className="absolute inset-0 bg-[#042f24]/30 mix-blend-multiply z-10 transition-colors duration-300 group-hover:bg-[#042f24]/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042f24]/40 via-transparent to-transparent z-10" />

              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Stratmire Commercial Real Estate Architecture Portfolio"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" />
            </div>

          </div>
        </section>




        {/* Loan Programs Grid */}
        <section className="bg-surface py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 items-start">

              {/* Business Funding Card */}
              <div className="bg-white rounded-xl border border-outline-variant/30 p-8 lg:p-10 nexos-shadow space-y-10">
                <div className="border-b border-outline-variant/30 pb-8">
                  <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight mb-3">
                    Business Funding
                  </h2>
                  <p className="text-on-surface-variant font-body text-lg">
                    Tailored capital solutions for operational scaling and growth.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* 01 Working Capital Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Business Line of Credit</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Bridge gaps in cash flow and cover everyday operational expenses with flexible, low-friction capital infusions.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 02 Business Credit Cards */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Equipment Financing</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Finance the purchase of essential business equipment with competitive rates and flexible terms.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 03 Equipment Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Term Loan</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Finance the tools you need to succeed, from medical technology to advanced manufacturing equipment.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 04 Truck & Heavy Equipment Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Invoice Financing / Factoring</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Turn your outstanding invoices into immediate working capital.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 05 Business Lines of Credit */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">SBA Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Access long-term financing with favorable rates and flexible terms through government-backed programs.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 06 Term Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Business Acquisition Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Secure the capital needed to purchase and expand your business with flexible and competitive funding options.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 07 SBA Loan */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Accounts Recievable Funding</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Convert unpaid invoices into immediate working capital. Ideal for B2B companies seeking predictable cash flow.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 08 Business Acquisition Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Merchant Cash Advance</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Funding designed to facilitate the purchase of an existing business or competitor to scale your footprint.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 09 Accounts Receivable Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Working Capital Loan</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Unlock the value of your outstanding invoices and get paid immediately instead of waiting for net terms.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 10 Gap Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Business Credit Cards</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Short-term liquidity solutions to bridge the period between immediate funding needs and permanent financing.
                      </p>
                      <button onClick={() => router.push('/business-loan')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>
                </div>
              </div>

              {/* Commercial Funding Card */}
              <div className="bg-white rounded-xl border border-outline-variant/30 p-8 lg:p-10 nexos-shadow space-y-10">
                <div className="border-b border-outline-variant/30 pb-8">
                  <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight mb-3">
                    Commercial Property Funding
                  </h2>
                  <p className="text-on-surface-variant font-body text-lg">
                    Institutional architecture for real estate and commercial assets.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* 01 1-4 Unit Investment Properties */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Hotel Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Financing designed for the hospitality sector, supporting acquisitions, refinancing, and PIP (Property Improvement Plan) requirements.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 02 Fix & Flip/Hold */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Retail Strip Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Short-term bridge capital for acquisition and renovation of distressed properties with high-ROI potential.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 03 Multi-Family Loan */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Office Park Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Institutional grade financing for 5+ unit apartment complexes, offering competitive leverage and terms.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 04 Mixed Use Properties */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Storage Facilites Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Capital for properties combining residential and commercial space, tailored to unique urban development needs.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 05 Commercial Properties */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Mobile Home Park Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Financing for retail, office, and industrial assets with sophisticated debt structures for high-value acquisitions.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 06 Land Loan */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Light Industrial Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Raw land or improved lot financing for future development or tactical asset holding.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 07 Construction Loan */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Warehouses Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Mixed-Use Property Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Church Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Office Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Self Storage Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>


                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Appartment Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Adult Care Facilities Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Commercial Bridge Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Ground-up development financing for commercial and large-scale residential projects with interest-only periods.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>
                </div>
              </div>

              {/* Construction Funding */}
              <div className="bg-white rounded-xl border border-outline-variant/30 p-8 lg:p-10 nexos-shadow space-y-10">
                <div className="border-b border-outline-variant/30 pb-8">
                  <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight mb-3">
                    Construction Funding
                  </h2>
                  <p className="text-on-surface-variant font-body text-lg">
                    Capital for ground-up development, vertical construction, and horizontal lot development.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* 01 Working Capital Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Construction-to-Permanent Loans (C2P)</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Bridge gaps in cash flow and cover everyday operational expenses with flexible, low-friction capital infusions.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 02 Business Credit Cards */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Standlone Construction Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        High-limit corporate cards with premium rewards and specialized expense management tools for your team.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 03 Equipment Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Commercial Construction Loan</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Finance the tools you need to succeed, from medical technology to advanced manufacturing equipment.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 04 Truck & Heavy Equipment Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Renovation / Rehab Construction Loan</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Specialized financing for fleets, logistics, and heavy construction machinery with flexible repayment terms.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 05 Business Lines of Credit */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Ground Up Construction Loan</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Revolving credit that gives you on-demand access to capital whenever opportunity or necessity arises.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 06 Term Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Bridge Loan (Construction Related)</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Traditional lump-sum funding with fixed repayment schedules, ideal for major expansion projects.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-outline-variant/30 p-8 lg:p-10 nexos-shadow space-y-10">
                <div className="border-b border-outline-variant/30 pb-8">
                  <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight mb-3">
                    Investment Property Funding
                  </h2>
                  <p className="text-on-surface-variant font-body text-lg">
                    Tailored capital solutions for operational scaling and growth.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* 01 Working Capital Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">MultiFamily Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Bridge gaps in cash flow and cover everyday operational expenses with flexible, low-friction capital infusions.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 02 Business Credit Cards */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Portfolio Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        High-limit corporate cards with premium rewards and specialized expense management tools for your team.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 03 Equipment Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Blanket Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Finance the tools you need to succeed, from medical technology to advanced manufacturing equipment.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 04 Truck & Heavy Equipment Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Appartment Building Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Specialized financing for fleets, logistics, and heavy construction machinery with flexible repayment terms.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 05 Business Lines of Credit */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Mixed-Use Property Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Revolving credit that gives you on-demand access to capital whenever opportunity or necessity arises.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 06 Term Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Land Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Traditional lump-sum funding with fixed repayment schedules, ideal for major expansion projects.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 07 SBA Loan */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Bridge Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Government-backed financing offering favorable terms and lower down payments for small business growth.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 08 Business Acquisition Loans */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">DSCR Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Funding designed to facilitate the purchase of an existing business or competitor to scale your footprint.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 09 Accounts Receivable Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Fix And Flip / Fix & Hold Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Unlock the value of your outstanding invoices and get paid immediately instead of waiting for net terms.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>

                  {/* 10 Gap Funding */}
                  <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                      <h3 className="font-headline font-bold text-base text-primary">Hard Money Loans</h3>
                      <span className="material-symbols-outlined expand-icon text-outline transition-transform duration-300">expand_more</span>
                    </summary>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        Short-term liquidity solutions to bridge the period between immediate funding needs and permanent financing.
                      </p>
                      <button onClick={() => router.push('/userjourney')} className="bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </details>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8 bg-secondary text-white rounded-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl mb-8 tracking-tight">
              Ready to unlock your capital potential?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <NewButton variant='primary'>
                Start Application
              </NewButton>
              <NewButton variant='secondary'
              >
                Consult an Advisor
              </NewButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}