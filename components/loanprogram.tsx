"use client"
import React from 'react';
import { Building2, TrendingUp, HardHat, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoanProgramsSection() {
    const router = useRouter();

    const cards = [
        {
            title: "BUSINESS LOAN",
            icon: <Briefcase size={32} className="mb-4" />,
            bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
            backText: "Fast, flexible capital to scale your operations, purchase inventory, or bridge cash flow gaps.",
        },
        {
            title: "COMMERCIAL PROPERTY",
            icon: <Building2 size={32} className="mb-4" />,
            bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
            backText: "Tailored funding solutions for acquiring or refinancing commercial real estate assets.",
        },
        {
            title: "INVESTMENT PROPERTY",
            icon: <TrendingUp size={32} className="mb-4" />,
            bgImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
            backText: "Maximize your portfolio ROI with our flexible investment property loan programs.",
        },
        {
            title: "CONSTRUCTION PROPERTY",
            icon: <HardHat size={32} className="mb-4" />,
            bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
            backText: "Ground-up construction and major rehab loans designed for professional developers.",
        }
    ];

    return (
        <section className='bg-secondary rounded-xl'>
            <div className="w-full max-w-7xl mx-auto py-32 px-4">
                <div className="md:col-span-12 text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
                        Our Loan Programs
                    </h2>
                </div>
                {/* 4-Column Grid for Large Screens, 2-Column for Tablets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            onClick={() => router.push("/loanprogram")}
                            className="group h-[400px] w-full [perspective:1000px] cursor-pointer"
                        >
                            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-xl">

                                {/* --- FRONT OF CARD --- */}
                                <div
                                    className="absolute inset-0 h-full w-full rounded-xl bg-cover bg-center [backface-visibility:hidden] overflow-hidden pointer-events-none"
                                    style={{ backgroundImage: `url(${card.bgImage})` }}
                                >
                                    {/* Blue Overlay */}
                                    <div className="absolute inset-0 bg-[#000000]/65 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Front Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 text-white">
                                        {card.icon}
                                        <h3 className="text-xl font-black tracking-wider">{card.title}</h3>
                                    </div>
                                </div>

                                {/* --- BACK OF CARD --- */}
                                <div className="absolute inset-0 h-full w-full rounded-xl bg-[#2f74c0] text-white px-6 text-center flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                    <h3 className="text-lg font-bold mb-4 text-white">{card.title}</h3>
                                    <p className="text-blue-50 font-medium leading-relaxed text-sm">
                                        {card.backText}
                                    </p>

                                    {/* Button is now purely visual to guide the user's eye */}
                                    <div className="mt-6 px-6 py-2 border border-white text-white font-bold rounded group-hover:bg-white group-hover:text-[#2f74c0] transition-colors">
                                        Learn More
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}