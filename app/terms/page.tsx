import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

export default function TermsOfServicePage() {
    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">

            {/* Clean, Minimal Hero for Legal Pages */}
            <section className="bg-[#042f24] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#042f24] via-[#042f24]/80 to-transparent"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight mb-4">
                        Website Terms of Service
                    </h1>
                    <p className="text-emerald-50/80 font-medium text-lg">
                        Stratmire Capital Partners LLC
                    </p>
                </div>
            </section>

            {/* Legal Content Document */}
            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 -mt-12 relative z-20 pb-24 w-full">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200">

                    <div className="mb-10 text-slate-500 font-medium text-sm border-b border-slate-100 pb-6">
                        <p><strong>Effective Date:</strong> June 10, 2026</p>
                        <p><strong>Version:</strong> 1.0</p>
                    </div>

                    <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">

                        <section>
                            <p>
                                Welcome to the Stratmire Capital Partners LLC website (&quot;Website&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Website and related services provided by Stratmire Capital Partners LLC (&quot;Stratmire Capital,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                            </p>
                            <p className="mt-4 font-bold text-slate-800">
                                By accessing or using this Website, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use this Website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Purpose of Website</h2>
                            <p>
                                The Website is intended to provide information regarding financing solutions, lending programs, referral opportunities, loan consulting services, educational resources, and related business services offered by Stratmire Capital Partners LLC. The Website is provided for informational and business purposes only and does not constitute an offer to lend, a commitment to fund, or financial advice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">2. No Lending Commitment</h2>
                            <p>
                                Stratmire Capital Partners LLC is a loan brokerage and referral company. Unless expressly stated otherwise, we are not a direct lender. Information presented on this Website:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Does not guarantee loan approval.</li>
                                <li>Does not guarantee funding.</li>
                                <li>Does not guarantee interest rates, loan terms, or availability.</li>
                                <li>Should not be relied upon as a financing commitment.</li>
                            </ul>
                            <p className="mt-3">
                                All financing decisions are made solely by participating lenders, investors, and funding partners.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Eligibility</h2>
                            <p>By using this Website, you represent that:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>You are at least 18 years old.</li>
                                <li>You have the legal authority to enter into binding agreements.</li>
                                <li>Any information you provide is accurate and complete.</li>
                                <li>You will use the Website only for lawful purposes.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">4. User Submissions</h2>
                            <p>
                                When submitting forms, applications, inquiries, or documents through the Website, you agree that:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>All information provided is truthful and accurate.</li>
                                <li>You have the authority to provide such information.</li>
                                <li>You authorize Stratmire Capital Partners LLC to review and share submitted information with lenders, investors, service providers, and financing partners as necessary to evaluate financing opportunities.</li>
                            </ul>
                            <p className="mt-3">
                                We reserve the right to reject or remove any submission that is false, misleading, unlawful, or inappropriate.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">5. SMS, Email, and Telephone Communications</h2>
                            <p>
                                By submitting your contact information through the Website, you expressly consent to receive: Emails, Phone calls, Voicemail messages, Text messages (SMS), Marketing communications, and Transactional communications from Stratmire Capital Partners LLC and its representatives.
                            </p>
                            <p className="mt-3">
                                Consent is not a condition of obtaining financing. You may opt out of marketing communications at any time by following the unsubscribe instructions provided or replying STOP to SMS communications where applicable. Message and data rates may apply.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Referral Partner and Loan Consultant Opportunities</h2>
                            <p>
                                The Website may describe business opportunities for referral partners, loan consultants, and independent contractors. Nothing on the Website shall be interpreted as:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>An offer of employment.</li>
                                <li>A guarantee of earnings.</li>
                                <li>A guarantee of commissions.</li>
                                <li>A guarantee of business success.</li>
                            </ul>
                            <p className="mt-3">
                                Compensation structures are governed by separate agreements executed between the parties. Individual results may vary.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Intellectual Property</h2>
                            <p>
                                All Website content, including but not limited to Logos, Trademarks, Service marks, Graphics, Forms, Marketing materials, Videos, Articles, Presentations, and Text content are owned by or licensed to Stratmire Capital Partners LLC and are protected by applicable intellectual property laws.
                            </p>
                            <p className="mt-3">You may not:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Reproduce content without written permission.</li>
                                <li>Modify content.</li>
                                <li>Distribute content for commercial purposes.</li>
                                <li>Use our trademarks without authorization.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Prohibited Conduct</h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Use the Website for unlawful purposes.</li>
                                <li>Submit false loan applications.</li>
                                <li>Attempt unauthorized access to Website systems.</li>
                                <li>Upload viruses or malicious code.</li>
                                <li>Interfere with Website operations.</li>
                                <li>Harvest or collect user information without authorization.</li>
                            </ul>
                            <p className="mt-3 text-red-600 font-medium">
                                Violation of this section may result in immediate termination of access and legal action.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Third-Party Links and Services</h2>
                            <p>
                                The Website may contain links to third-party websites, lenders, service providers, or other external resources. Stratmire Capital Partners LLC:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Does not control third-party websites.</li>
                                <li>Is not responsible for their content.</li>
                                <li>Does not guarantee the accuracy of third-party information.</li>
                                <li>Is not liable for damages resulting from third-party services.</li>
                            </ul>
                            <p className="mt-3 font-medium">Your use of third-party websites is at your own risk.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Disclaimer of Warranties</h2>
                            <p>
                                The Website and all content are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Stratmire Capital Partners LLC makes no warranties regarding Website availability, accuracy, security, financing outcomes, funding availability, or business results.
                            </p>
                            <p className="mt-3 font-bold uppercase">
                                We expressly disclaim all warranties, whether express or implied, including merchantability and fitness for a particular purpose.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by law, Stratmire Capital Partners LLC, its officers, members, employees, contractors, affiliates, and partners shall not be liable for: Loss of profits, Business interruption, Data loss, Financing denials, Funding delays, Indirect damages, Incidental damages, or Consequential damages arising from the use of the Website or reliance on Website information.
                            </p>
                            <p className="mt-3">
                                Our total liability shall not exceed $100 or the amount paid directly to us for services related to the claim, whichever is greater.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Indemnification</h2>
                            <p>
                                You agree to defend, indemnify, and hold harmless Stratmire Capital Partners LLC and its affiliates from any claims, liabilities, losses, damages, costs, or expenses arising from: Your use of the Website, Your violation of these Terms, Information you submit through the Website, or Violation of applicable laws or regulations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">13. Privacy Policy</h2>
                            <p>
                                Your use of the Website is also governed by our Privacy Policy. Information collected through the Website may include Name, Email address, Phone number, Business information, Financial information, and Loan application data. Information may be shared with lenders, underwriters, investors, and service providers for business and financing purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">14. Electronic Signatures and Records</h2>
                            <p>
                                By using the Website and submitting information electronically, you agree that:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Electronic records satisfy legal writing requirements.</li>
                                <li>Electronic signatures have the same legal effect as handwritten signatures.</li>
                                <li>Electronic communications satisfy legal notice requirements.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">15. Governing Law</h2>
                            <p>
                                These Terms shall be governed by the laws of the State of Florida without regard to conflict-of-law principles. Any legal action relating to these Terms shall be brought exclusively in courts located in Florida.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">16. Dispute Resolution</h2>
                            <p>
                                Any dispute arising out of or relating to these Terms shall first be addressed through good-faith negotiation. If unresolved, disputes may be submitted to binding arbitration in accordance with the rules of the American Arbitration Association, unless prohibited by applicable law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">17. Changes to Terms</h2>
                            <p>
                                Stratmire Capital Partners LLC reserves the right to update or modify these Terms at any time. Changes become effective upon posting to the Website. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.
                            </p>
                        </section>

                        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">18. Contact Information</h2>
                            <p className="font-bold text-slate-900">Stratmire Capital Partners LLC</p>
                            <p>Christopher Carter, VP Lending</p>
                            <div className="mt-4 space-y-1">
                                <p><strong>Email:</strong> general@stratmire.cap</p>
                                <p><strong>Phone:</strong> 855-202-1312</p>
                                <p><strong>Website:</strong> www.stratmire.cap</p>
                            </div>
                        </section>

                        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
                            <p className="font-bold text-slate-900">
                                By accessing or using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                            </p>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}