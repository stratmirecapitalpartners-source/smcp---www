"use client";
import React, { useState, useEffect } from 'react';

export default function MortgageCalculatorForm() {
    // State for inputs
    const [loanAmount, setLoanAmount] = useState<number | string>(450000);
    const [downPayment, setDownPayment] = useState<number | string>(90000);
    const [downPaymentPercent, setDownPaymentPercent] = useState<number | string>(20);
    const [interestRate, setInterestRate] = useState<number | string>(6.5);
    const [loanTerm, setLoanTerm] = useState<number | string>(30);

    // Optional parameters
    const [homeInsurance, setHomeInsurance] = useState<number | string>(125);
    const [hoaFees, setHoaFees] = useState<number | string>(0);

    // Constants for fixed costs
    const propertyTaxesMonthly = 342;

    // Calculated values
    const [monthlyPI, setMonthlyPI] = useState(0);
    const [pmiMonthly, setPmiMonthly] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    // Helper: Removes leading zeros (e.g., "03" -> "3") but keeps "0.5" intact
    const sanitizeInput = (val: string) => {
        if (val === '') return '';
        return val.replace(/^0+(?=\d)/, '');
    };

    useEffect(() => {
        calculateMortgage();
    }, [loanAmount, downPayment, interestRate, loanTerm, homeInsurance, hoaFees]);

    const calculateMortgage = () => {
        const parsedLoanAmount = Number(loanAmount) || 0;
        const parsedDownPayment = Number(downPayment) || 0;
        const parsedInterestRate = Number(interestRate) || 0;
        const parsedLoanTerm = Number(loanTerm) || 0;
        const parsedHomeInsurance = Number(homeInsurance) || 0;
        const parsedHoaFees = Number(hoaFees) || 0;

        const principal = parsedLoanAmount - parsedDownPayment;
        const monthlyRate = parsedInterestRate / 100 / 12;
        const numberOfPayments = parsedLoanTerm * 12;

        let pi = 0;
        if (principal <= 0) {
            pi = 0;
        } else if (monthlyRate === 0) {
            pi = principal / numberOfPayments;
        } else {
            const mathPower = Math.pow(1 + monthlyRate, numberOfPayments);
            pi = (principal * monthlyRate * mathPower) / (mathPower - 1);

            // Safeguard against astronomical interest rates causing Infinity/Infinity = NaN
            if (!isFinite(pi) || isNaN(pi)) {
                pi = 0;
            }
        }

        setMonthlyPI(pi);

        const currentDownPercent = parsedLoanAmount > 0 ? (parsedDownPayment / parsedLoanAmount) * 100 : 0;
        const calculatedPmi = currentDownPercent < 20 ? (parsedLoanAmount * 0.0075) / 12 : 0;
        setPmiMonthly(calculatedPmi);

        setTotalPayment(pi + propertyTaxesMonthly + parsedHomeInsurance + parsedHoaFees + calculatedPmi);
    };

    const handlePercentChange = (val: string) => {
        const cleanVal = sanitizeInput(val);
        if (cleanVal === '') {
            setDownPaymentPercent('');
            setDownPayment(0);
            return;
        }
        const percent = parseFloat(cleanVal) || 0;
        const parsedLoanAmount = Number(loanAmount) || 0;
        setDownPaymentPercent(cleanVal);
        setDownPayment((percent / 100) * parsedLoanAmount);
    };

    const handleAmountChange = (val: string) => {
        const cleanVal = sanitizeInput(val);
        if (cleanVal === '') {
            setDownPayment('');
            setDownPaymentPercent(0);
            return;
        }
        const amount = parseFloat(cleanVal) || 0;
        const parsedLoanAmount = Number(loanAmount) || 0;
        setDownPayment(cleanVal);
        if (parsedLoanAmount > 0) {
            setDownPaymentPercent((amount / parsedLoanAmount) * 100);
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
                                    onChange={(e) => setLoanAmount(sanitizeInput(e.target.value))}
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
                                    value={downPaymentPercent === '' ? '' : Number(downPaymentPercent).toFixed(1)}
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
                                    onChange={(e) => setInterestRate(sanitizeInput(e.target.value))}
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
                                    onChange={(e) => setHomeInsurance(sanitizeInput(e.target.value))}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-primary">HOA Fees ($/mo)</label>
                                <input
                                    type="number"
                                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 py-4 px-4 rounded-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
                                    value={hoaFees}
                                    onChange={(e) => setHoaFees(sanitizeInput(e.target.value))}
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
                                <span className="text-primary font-bold">${Math.round(Number(homeInsurance) || 0).toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                    <span className="text-on-surface-variant font-medium">HOA Fees</span>
                                </div>
                                <span className="text-primary font-bold">${Math.round(Number(hoaFees) || 0).toLocaleString()}</span>
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
                                        <strong>Notice:</strong> PMI is active because your down payment is below 20%. Put down ${Math.round((Number(loanAmount) || 0) * 0.2).toLocaleString()} to eliminate this fee.
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