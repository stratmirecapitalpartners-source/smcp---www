// app/loanprogram/page.tsx
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import LoanProgramsContent from '@/components/LoanProgramsContent';
import React from 'react';

export default function LoanProgramsPage() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">

      {/* All interactive content is handled in this Client Component */}
      <LoanProgramsContent />

      <Footer />
    </div>
  );
}