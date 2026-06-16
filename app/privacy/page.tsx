import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { Shield, Eye, Lock, Database, Info, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">

            {/* Clean Hero for Legal Pages */}
            <section className="bg-[#042f24] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#042f24] via-[#042f24]/80 to-transparent"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-4">
                        <Shield className="text-[#D4AF37] w-8 h-8" />
                    </div>
                    <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-emerald-50/80 font-medium text-lg">
                        Stratmire Capital Partners LLC
                    </p>
                </div>
            </section>

            {/* Legal Document Container */}
            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 -mt-12 relative z-20 pb-24 w-full">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200">

                    <div className="mb-10 text-slate-500 font-medium text-sm border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <p><strong>Last Updated:</strong> June 10, 2026</p>
                            <p><strong>Version:</strong> 1.0 Website Privacy Policy</p>
                        </div>
                        <div className="bg-slate-100 px-4 py-2 rounded-xl text-slate-700 font-bold text-xs font-mono tracking-wide">
                            PUBLIC DISCLOSURE
                        </div>
                    </div>

                    <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">

                        <section className="prose prose-slate">
                            <p>
                                At Stratmire Capital Partners LLC, your trust and the security of your information is very important to us.
                                This Privacy Policy explains what we do to protect and maintain your information and to let you know how you can limit
                                the information that we share with others.
                            </p>
                            <p className="mt-4">
                                <strong>&quot;Site&quot;</strong> refers to this Internet web site (www.stratmirecapitalpartners.com) and its related services.
                                <strong>&quot;You&quot;</strong> or <strong>&quot;User&quot;</strong> refers to a registered user of this Site.
                                <strong>&quot;Stratmire Capital Partners LLC&quot;</strong> or <strong>&quot;We&quot;</strong> refers to Stratmire Capital Partners LLC.
                            </p>
                            <p className="mt-4">
                                This Site contains links to other sites. Stratmire Capital Partners LLC is not responsible for the privacy practices of the content of any other Web sites to which We link or to which We are linked. We encourage You to read the posted privacy statement whenever interacting with any web site.
                            </p>
                        </section>

                        {/* THE WORK SPACE */}
                        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div className="flex items-start gap-4">
                                <FileText className="text-[#0a6c50] w-6 h-6 shrink-0 mt-0.5" />
                                <div>
                                    <h2 className="text-base font-bold text-slate-900 mb-2">The Work Space</h2>
                                    <p className="text-sm">
                                        This area of the Site is for the benefit of Users. The private and shared Work Space areas of the Site help to facilitate communication and the exchange and sharing of information. The information contained in private work spaces shared between Users and Stratmire Capital Partners LLC is not used for any purposes other than to facilitate communication and the exchange of information between the parties involved.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* INFORMATION WE GATHER */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <Database size={20} className="text-[#0a6c50]" /> Information We Gather
                            </h2>
                            <p>We collect nonpublic personal information about you, including:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Information we receive from you on applications, online registrations or other forms (such as your name, address, phone, fax, email address, street address, assets, income, debt and more).</li>
                                <li>Information about your transactions with us, our affiliates or others (such as account balance, transaction history or information about our communications with you).</li>
                                <li>Information about your creditworthiness, credit history and other facts about you that we obtain from consumer reporting agencies or from providers of marketing and demographic information.</li>
                                <li>Information about your employment, employment history, your past real estate transactions, your property insurance coverage and more.</li>
                            </ul>
                            <p className="mt-3">
                                We are required by law to verify the information that you provide to us but we greatly appreciate your honesty in accurately representing your financial information, history and ability to repay any current or future credit obligations.
                            </p>
                        </section>

                        {/* AUTOMATICALLY GATHERED */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <Eye size={20} className="text-[#0a6c50]" /> Automatically Gathered Information
                            </h2>
                            <p>
                                Stratmire Capital Partners LLC automatically collects your browser type and browser software version to tailor the presentation of the services to your platform and to maintain a record of your activity on the Site.
                            </p>
                            <p className="mt-3">
                                Stratmire Capital Partners LLC may also use cookies to enable users to specify unique preferences and to track user trends and patterns. Users always have the option of disabling cookies via their browser preferences. If you disable cookies on your browser, please note that some parts of our Site may not function as effectively or may be considerably slower.
                            </p>
                            <p className="mt-3">
                                As an automatic process, our web server software records a log file of IP addresses that access the Site. We also collect IP address information but do not ordinarily link IP addresses to Users Nonpublic personal information. However, we can and will use IP addresses to identify a User when we, in our sole discretion, determine that it is necessary to enforce compliance with our Terms and Conditions of Use or to protect our service, Site, customers or others.
                            </p>
                        </section>

                        {/* USE AND DISCLOSURE */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <Lock size={20} className="text-[#0a6c50]" /> Information Use and Disclosure
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-base font-bold text-slate-800 mb-1">Protecting Confidentiality and Security</h3>
                                    <p>
                                        Keeping financial information is one of our most important responsibilities. Only those persons who need access to your information to perform their job responsibilities are authorized to access your information. We take commercially reasonable precautions to protect your information and limit disclosure by maintaining physical, electronic and procedural safeguards. We share your information with others as required by law or as necessary to obtain credit approval for your loan.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-slate-800 mb-1">With Affiliates</h3>
                                    <p>We do not share your information with affiliates.</p>
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-slate-800 mb-1">With Third Party Service Providers, Joint Marketers and Otherwise</h3>
                                    <p>
                                        We do not share data with third parties for marketing/promotional purposes. We may work with non-affiliated companies or organizations to provide services on our behalf in connection with obtaining approval for your loan or to provide you with opportunities to buy products or services offered by us or jointly with other financial institutions. As a result, we may disclose some of the information that we gather from you. For your protection, we require that these companies keep all personal information confidential.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-slate-800 mb-1">Permitted Disclosures by Law</h3>
                                    <p>We may share personal information:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>With regulatory authorities and law enforcement officials</li>
                                        <li>To protect against fraud</li>
                                        <li>To report activity to credit bureaus</li>
                                        <li>To respond to a subpoena</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* MARKETING & ANCILLARY USE */}
                        <section className="space-y-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-2">Registration Information & Advertising</h2>
                                <p>
                                    We use nonpublic personal information for our own internal purposes including contacting You via email to inform You about updates to our services and providing You with other information that we deem necessary. We reserve the right to disclose your information as required by law. We do not rent or sell our Users nonpublic personal information to third parties.
                                </p>
                                <p className="mt-3">
                                    At this time, we do not display banner advertising on our site, but we may send You email communications including information that we think may be of interest to You. You may opt out of receiving these promotional email communications at any time by contacting us.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-2">Demographic Information & Comments</h2>
                                <p>
                                    The demographic information that Stratmire Capital Partners LLC collects in the registration process and through online surveys may be used to help us improve our services to meet the needs and preferences of our Users. This may include targeting advertising to You about our services. Information we gather through a contest may also be disclosed to third parties as necessary for prize fulfillment and other aspects of any contest or similar offering.
                                </p>
                                <p className="mt-3">
                                    We value your input regarding our services or the operation of the Site. You can submit any comments by contacting us. If You provide this information, we will only use it to acknowledge or respond to your comments. In certain circumstances, we may ask for your permission to post your comments in marketing or promotional materials.
                                </p>
                            </div>
                        </section>

                        {/* DO NOT TRACK */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">Browser Do Not Track Requests</h2>
                            <p>
                                Stratmire Capital Partners LLC and other parties not affiliated with us may collect nonpublic personal information about your online activities over time and across different websites when you use our website or the services offered on our website.
                            </p>
                            <p className="mt-3">
                                Industry standards regarding how to handle “Do Not Track” requests from web browsers are still evolving and there is currently no set of industry standards for handling such requests. As such we may not separately respond to or take any action with respect to a “do not track” configuration set in your internet browser. At this time, we do not have any protocol in place that allows you to opt-out of internet tracking.
                            </p>
                        </section>

                        {/* SYSTEM SAFETY INTERACTION BOX */}
                        <section className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 flex items-start gap-4">
                            <Info className="text-[#0a6c50] w-6 h-6 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <h3 className="font-bold text-slate-900 mb-1">Opting Out & Updating Records</h3>
                                <p className="mb-2">
                                    You may opt out, that is, you may direct us not to share your information, by calling us at the toll-free support line.
                                </p>
                                <p className="font-bold text-[#0a6c50] text-base mb-2">
                                    Phone Support: 855-202-1312
                                </p>
                                <p>
                                    To correct, update, or resolve any questions regarding your nonpublic data records or internet tracking methods, please reach out to Customer Service immediately.
                                </p>
                            </div>
                        </section>

                        {/* CORPORATE CONTACT CARD */}
                        <section className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                            <h2 className="text-lg font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">Contact Administration</h2>
                            <p className="font-bold text-lg">Stratmire Capital Partners LLC </p>
                            <p className="text-slate-400 text-sm">Customer Service Division </p>
                            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-sm text-slate-300">
                                <p><strong>Email Communications:</strong> info@stratmitecapitalpartners.com </p>
                                <p><strong>Primary Web Portal:</strong> www.stratmirecapitalpartners.com </p>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}