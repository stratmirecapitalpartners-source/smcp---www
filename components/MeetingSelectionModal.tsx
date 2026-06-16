"use client"
import React, { useEffect } from 'react';
import { X, MapPin, Phone, Calendar } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

interface MeetingSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MeetingSelectionModal({ isOpen, onClose }: MeetingSelectionModalProps) {

    // 1. Initialize UI styles on load
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    if (!isOpen) return null;

    // 2. Programmatic handler that forces Cal.com to open reliably
    const handleScheduleMeet = async () => {
        const cal = await getCalApi({ "namespace": "15min" });
        cal("modal", {
            // action: "open",
            calLink: "roney-gajjar-qbehlx/15min",
            config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" }
        });
        onClose(); // Closes the Stratmire modal smoothly right as the calendar appears
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="p-6 md:p-8 flex justify-between items-start border-b border-slate-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                        How would you like to connect?
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-800 transition-colors p-1"
                        aria-label="Close modal"
                    >
                        <X size={28} strokeWidth={2} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-4 bg-slate-50">

                    {/* OPTION 1: IN PERSON */}
                    <button
                        onClick={() => {
                            alert("Visit us at our office:\n\n3020 West New Haven Avenue, Suite 133\nMelbourne, FL 32904");
                            onClose();
                        }}
                        className="w-full flex items-center gap-5 bg-[#0a251e] hover:bg-[#123d32] text-white p-6 rounded-xl transition-all shadow-md group"
                    >
                        <MapPin size={32} strokeWidth={1.5} className="shrink-0 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-left">
                            <span className="block text-xl font-bold leading-tight">In Person</span>
                            <span className="block text-sm text-emerald-100/70 mt-1">Visit our Melbourne, FL office</span>
                        </div>
                    </button>

                    {/* OPTION 2: TELEPHONIC */}
                    <a
                        href="tel:855-202-1312"
                        onClick={onClose}
                        className="w-full flex items-center gap-5 bg-[#0a251e] hover:bg-[#123d32] text-white p-6 rounded-xl transition-all shadow-md group"
                    >
                        <Phone size={32} strokeWidth={1.5} className="shrink-0 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-left">
                            <span className="block text-xl font-bold leading-tight">Telephone</span>
                            <span className="block text-sm text-emerald-100/70 mt-1">Call us instantly at 855-202-1312</span>
                        </div>
                    </a>

                    {/* OPTION 3: CAL.COM INTEGRATION (FIXED) */}
                    <button
                        onClick={handleScheduleMeet}
                        className="w-full flex items-center gap-5 bg-[#0a251e] hover:bg-[#123d32] text-white p-6 rounded-xl transition-all shadow-md group"
                    >
                        <Calendar size={32} strokeWidth={1.5} className="shrink-0 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-left">
                            <span className="block text-xl font-bold leading-tight">Schedule a Meet</span>
                            <span className="block text-sm text-emerald-100/70 mt-1">Book a video/audio slot on our calendar</span>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    );
}