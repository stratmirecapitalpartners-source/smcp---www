import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, Map } from 'lucide-react';

export default function ContactPage() {
  const TALLY_FORM_URL = "https://tally.so/r/D4W18E";
  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[480px] flex items-center overflow-hidden bg-[#042f24]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            className="w-full h-full object-cover grayscale mix-blend-overlay"
            alt="Institutional background"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
        {/* Gradient fade to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#042f24] via-[#042f24]/80 to-transparent"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full mt-16">
          <div className="max-w-2xl">
            <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Institutional Access
            </span>
            <h1 className="text-white font-black text-5xl md:text-7xl tracking-tight mb-6">
              Contact Our Team
            </h1>
            <p className="text-emerald-50/80 font-medium text-lg max-w-lg leading-relaxed">
              Connecting sophisticated capital with architectural investment strategies. Reach out to our dedicated advisory group.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 -mt-24 relative z-30 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Contact Form (Left) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200">
            {/* <h2 className="font-black text-3xl text-slate-900 mb-8 tracking-tight">Inquiry Submission</h2> */}
            {/* <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a6c50] focus:ring-1 focus:ring-[#0a6c50] rounded-xl py-4 px-5 text-sm transition-all text-slate-900 outline-none"
                    placeholder="Johnathan Sterling"
                    type="text"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a6c50] focus:ring-1 focus:ring-[#0a6c50] rounded-xl py-4 px-5 text-sm transition-all text-slate-900 outline-none"
                    placeholder="j.sterling@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a6c50] focus:ring-1 focus:ring-[#0a6c50] rounded-xl py-4 px-5 text-sm transition-all text-slate-900 outline-none"
                    placeholder="(855) 202-1312"
                    type="tel"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Company
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a6c50] focus:ring-1 focus:ring-[#0a6c50] rounded-xl py-4 px-5 text-sm transition-all text-slate-900 outline-none"
                    placeholder="Strategic Holdings LLC"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Message
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0a6c50] focus:ring-1 focus:ring-[#0a6c50] rounded-xl py-4 px-5 text-sm transition-all text-slate-900 outline-none resize-none"
                  placeholder="How can our capital strategies assist your portfolio?"
                  rows={6}
                ></textarea>
              </div>
              <div className="pt-4">
                <button
                  className="w-full md:w-auto px-10 py-4 bg-[#0a6c50] text-white font-bold rounded-xl hover:bg-[#085a42] transition-colors flex items-center justify-center gap-3 text-sm shadow-lg shadow-[#0a6c50]/20 uppercase tracking-wide"
                  type="submit"
                >
                  Submit Inquiry
                  <ArrowRight size={18} />
                </button>
              </div>
            </form> */}
            <iframe
              src={`${TALLY_FORM_URL}?transparentBackground=1`}
              height="100%"
              className="flex-1 w-full border-none min-h-[700px]"
              title="Stratmire Capital Application Form"

              allowFullScreen
              allow="autoplay; fullscreen; microphone; camera"
            ></iframe>
          </div>

          {/* Sidebar Info (Right) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Office Card */}
            <div className="bg-white p-8 rounded-2xl border-l-4 border-l-[#0a6c50] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-5">
                <div className="bg-[#0a6c50]/10 text-[#0a6c50] p-3 rounded-xl shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Corporate Office</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
                    3020 West New Haven Avenue<br />
                    Suite 133<br />
                    Melbourne, FL 32904
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white p-8 rounded-2xl border-l-4 border-l-[#0a6c50] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-5">
                <div className="bg-[#0a6c50]/10 text-[#0a6c50] p-3 rounded-xl shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Direct Support</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
                    Toll-Free: 855-202-1312
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-2xl border-l-4 border-l-[#0a6c50] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-5">
                <div className="bg-[#0a6c50]/10 text-[#0a6c50] p-3 rounded-xl shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Inquiries</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
                    info@stratmirecapitalpartners.com
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-sm group">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2438.331421552302!2d-80.67119461947686!3d28.079614947868635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88de0e795214a143%3A0xbd116df1b7539709!2s3020%20W%20New%20Haven%20Ave%20%23133%2C%20West%20Melbourne%2C%20FL%2032904%2C%20USA!5e0!3m2!1sen!2sin!4v1781251124712!5m2!1sen!2sin" width="400" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}