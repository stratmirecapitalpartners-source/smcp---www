// app/mortgagecalc/page.tsx
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import MortgageCalculatorForm from '@/components/MortgageCalculatorForm';
import React from 'react';

export default function MortgageCalculatorPage() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased">

      <main className="min-h-screen bg-surface">
        <header className="pt-32 pb-12 px-12 max-w-screen-2xl mx-auto">
          <div className="max-w-3xl">

            <h1 className="font-display text-5xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight mb-6">
              Mortgage Calculator
            </h1>
          </div>
        </header>

        {/* Stateful Client engine sits safely isolated below headers */}
        <MortgageCalculatorForm />
      </main>

    </div>
  );
}