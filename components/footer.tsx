import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-primary-container text-gray-900 py-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-8">

                    {/* ARCHITECTURE UPDATE: Changed to grid-cols-5 */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 mb-20">

                        {/* SPAN UPDATE: This block now spans 2 columns to give the logo room to breathe */}
                        <div className="md:col-span-2 flex flex-col items-start md:pr-12">
                            <img
                                src="/stratmire_logo.png"
                                alt="Stratmire Logo"
                                /* max-w-none overrides Tailwind's crush behavior. w-80 forces it large. */
                                className="-ml-16 -mt-10 h-auto w-72 lg:w-80 mb-6 object-contain max-w-none"
                            />
                            <p className="text-gray-900 text-sm -mt-10 leading-relaxed font-body">
                                Premier nationwide loan brokerage providing high-velocity capital solutions for investors and businesses.
                            </p>
                        </div>

                        <div className="md:col-span-1">
                            <h5 className="font-headline font-extrabold text-xs uppercase tracking-widest mb-8 text-secondary">Quick Links</h5>
                            <ul className="space-y-4 text-sm text-gray-900 font-body">
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./">Home</a></li>
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./loanprogram">Loan Programs</a></li>
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./how-it-works">How it Works</a></li>
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./contact">Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="md:col-span-1">
                            <h5 className="font-headline font-extrabold text-xs uppercase tracking-widest mb-8 text-secondary">Legal</h5>
                            <ul className="space-y-4 text-sm text-gray-900 font-body">
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./privacy">Privacy Policy</a></li>
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./terms">Terms of Service</a></li>
                                <li><a className="hover:text-primary hover:underline transition-colors" href="./accessibility">Security</a></li>
                            </ul>
                        </div>

                        <div className="md:col-span-1">
                            <h5 className="font-headline font-extrabold text-xs uppercase tracking-widest mb-8 text-secondary">Follow Us</h5>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 border border-gray-900/10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all" href="mailto:info@stratmirecapitalpartners.com">
                                    <span className="material-symbols-outlined text-lg text-gray-900">mail</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-900/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[11px] text-gray-900 font-headline font-bold uppercase tracking-widest">
                            © 2026 STRATMIRE CAPITAL PARTNERS. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex gap-8">
                            <span className="text-[10px] text-gray-900 font-bold uppercase tracking-widest">Design and Developed by <a className="text-gray-900 font-bold uppercase tracking-widest" href="https://www.honeyhexa.com">Honey Hexa</a></span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer