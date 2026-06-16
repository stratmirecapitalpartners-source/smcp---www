// components/MortgageCalculatorForm.tsx
"use client";
import React, { useState, useEffect } from 'react';

export default function MortgageCalculatorForm() {
    // State for inputs
    const [loanAmount, setLoanAmount] = useState(450000);
    const [downPayment, setDownPayment] = useState(90000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);

    // Optional parameters
    const [homeInsurance, setHomeInsurance] = useState(125);
    const [hoaFees, setHoaFees] = useState(0);

    // Constants for fixed costs
    const propertyTaxesMonthly = 342;

    // Calculated values
    const [monthlyPI, setMonthlyPI] = useState(0);
    const [pmiMonthly, setPmiMonthly] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        calculateMortgage();
    }, [loanAmount, downPayment, interestRate, loanTerm, homeInsurance, hoaFees]);

    const calculateMortgage = () => {
        const principal = loanAmount - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        let pi = 0;
        if (principal <= 0) {
            pi = 0;
        } else if (monthlyRate === 0) {
            pi = principal / numberOfPayments;
        } else {
            pi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        setMonthlyPI(pi);

        // Dynamic PMI calculation: Automatically applied if down payment is less than 20%
        const currentDownPercent = loanAmount > 0 ? (downPayment / loanAmount) * 100 : 0;
        const calculatedPmi = currentDownPercent < 20 ? (loanAmount * 0.0075) / 12 : 0;
        setPmiMonthly(calculatedPmi);

        // Comprehensive Monthly Accumulation
        setTotalPayment(pi + propertyTaxesMonthly + homeInsurance + hoaFees + calculatedPmi);
    };

    const handlePercentChange = (val: any) => {
        const percent = parseFloat(val) || 0;
        setDownPaymentPercent(percent);
        setDownPayment((percent / 100) * loanAmount);
    };

    const handleAmountChange = (val: any) => {
        const amount = parseFloat(val) || 0;
        setDownPayment(amount);
        if (loanAmount > 0) {
            setDownPaymentPercent((amount / loanAmount) * 100);
        }
    };

    return (
        <section className="px-12 pb-24 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Input Panel */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-primary">Loan Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                                <input
                                    type="number"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary py-4 pl-10 pr-4 rounded-lg text-lg font-semibold outline-none"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">Down Payment ($)</label>
                                <input
                                    type="number"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={downPayment}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">Percentage (%)</label>
                                <input
                                    type="number"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={downPaymentPercent.toFixed(1)}
                                    onChange={(e) => handlePercentChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">Loan Term</label>
                                <select
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                >
                                    <option value={30}>30 Years Fixed</option>
                                    <option value={20}>20 Years Fixed</option>
                                    <option value={15}>15 Years Fixed</option>
                                    <option value={10}>10 Years Fixed</option>
                                </select>
                            </div>
                        </div>

                        {/* Optional Cost Additions */}
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/20">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">Home Insurance ($/mo)</label>
                                <input
                                    type="number"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={homeInsurance}
                                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">HOA Fees ($/mo)</label>
                                <input
                                    type="number"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={hoaFees}
                                    onChange={(e) => setHoaFees(Number(e.target.value))}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-7">
                    <div className="bg-surface-container-lowest rounded-xl p-10 border border-outline-variant/10 shadow-sm h-full flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                            <div>
                                <h2 className="font-headline font-bold text-primary text-2xl mb-1">Your Monthly Estimate</h2>
                                <p className="text-on-surface-variant text-sm">Full predictive breakdown including ancillary fees</p>
                            </div>
                            <div className="text-left sm:text-right">
                                <div className="text-5xl md:text-6xl font-extrabold text-primary tracking-tighter mb-1">
                                    ${Math.round(totalPayment).toLocaleString()}
                                </div>
                                <span className="text-secondary font-bold text-sm">/ MONTH</span>
                            </div>
                        </div>

                        <div className="space-y-5 max-w-md w-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-on-surface-variant font-medium">Principal & Interest</span>
                                </div>
                                <span className="text-primary font-bold">${Math.round(monthlyPI).toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                    <span className="text-on-surface-variant font-medium">Property Taxes</span>
                                </div>
                                <span className="text-primary font-bold">${propertyTaxesMonthly}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                                    <span className="text-on-surface-variant font-medium">Homeowners Insurance</span>
                                </div>
                                <span className="text-primary font-bold">${Math.round(homeInsurance).toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                    <span className="text-on-surface-variant font-medium">HOA Fees</span>
                                </div>
                                <span className="text-primary font-bold">${Math.round(hoaFees).toLocaleString()}</span>
                            </div>

                            {/* Mortgage Insurance (PMI) */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${pmiMonthly > 0 ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                                    <span className="text-on-surface-variant font-medium">Mortgage Insurance (PMI)</span>
                                </div>
                                <span className={`font-bold ${pmiMonthly > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                                    ${Math.round(pmiMonthly).toLocaleString()}
                                </span>
                            </div>

                            <div className="pt-4 border-t border-outline-variant/30">
                                {pmiMonthly > 0 && (
                                    <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg mb-4 text-xs font-medium">
                                        <strong>Notice:</strong> PMI is active because your down payment is below 20%. Put down ${Math.round(loanAmount * 0.2).toLocaleString()} to eliminate this fee.
                                    </div>
                                )}
                                <button className="w-full bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all uppercase text-sm tracking-wide">
                                    Get Pre-Approved Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}