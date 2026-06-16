import React from 'react'

const About = () => {
    return (
        <>
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-12 text-center mb-4">
                            <span className="text-secondary font-black tracking-[0.2em] text-3xl uppercase mb-4 block">Stratmire Capital</span>
                            <h2 className="text-2xlxl md:text-2xl font-headline font-extrabold text-primary tracking-tight leading-tight max-w-4xl mx-auto">
                                Empowering Businesses and Investors Through Tailored Capital Solutions
                            </h2>
                        </div>
                        <div className="md:col-span-7">
                            <p className="text-gray-700 font-body text-lg leading-relaxed mb-6">
                                Stratmire Capital Partners is a premier loan brokerage serving clients across the United
                                States, delivering sophisticated financing solutions with precision, discretion, and speed.
                            </p>
                            <p className="text-gray-500 font-body text-base leading-relaxed mb-8">
                                Whether you’re seeking capital for business expansion, bridge financing, commercial real
                                estate, ground-up development, or value-add investment strategies such as fix-and-flip
                                projects, our team provides access to a curated network of private and institutional
                                lenders—ensuring each opportunity is aligned with the right capital source.
                            </p>
                        </div>
                        <div className="md:col-span-5 flex flex-col gap-8">
                            <div className="bg-surface p-8 border-l-4 border-primary rounded-md">
                                <h4 className="font-headline font-bold text-xl text-primary mb-3">A Network Built for Scale</h4>
                                <p className="text-gray-600 font-body text-sm leading-relaxed">
                                    With partnerships spanning over 500 funding sources, we structure financing solutions
                                    across a wide spectrum of deal types.
                                </p>
                            </div>
                            <div className="bg-surface p-8 border-l-4 border-primary rounded-md">
                                <h4 className="font-headline font-bold text-xl text-primary mb-3">Our Commitment</h4>
                                <p className="text-gray-600 font-body text-sm leading-relaxed">
                                    Every solution we deliver is customized to support long-term growth and optimize
                                    financial positioning.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About