"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NewButton } from '@/components/ui/new-button';
import LoanSelectionModal from '@/components/LoanPopup';
import MeetingSelectionModal from '@/components/MeetingSelectionModal';
import { createClient } from '@/lib/supabase';

// --- DATA STRUCTURE FROM PROVIDED DOCUMENT ---
const LOAN_DATA = [
    {
        categoryTitle: "Business Funding",
        description: "Tailored capital solutions for operational scaling and growth.",
        route: "/business-loan",
        loans: [
            {
                title: "Business Line of Credit",
                desc: "Our Business Line of Credit provides flexible, revolving access to working capital, allowing businesses to draw funds as needed and repay only what they use. Whether you're managing seasonal cash flow, covering payroll, purchasing inventory, or handling unexpected expenses, a business line of credit gives you immediate access to capital without the need to reapply for every funding request.",
                highlights: [
                    "Credit limits up to $5 million", "Revolving line of credit with reusable funds", "Draw funds whenever needed", "Pay interest only on the amount utilized", "Fast approval process", "Minimal documentation options available", "Secured and unsecured programs available", "No restrictions on fund usage", "Flexible repayment options", "Ideal for managing cash flow fluctuations", "Supports inventory purchases and payroll expenses", "Available for startups and established businesses", "Online account access", "Credit line increases available for qualified borrowers", "Competitive interest rates", "At least 6+ months in business", "600 FICO score"
                ]
            },
            {
                title: "Equipment Financing",
                desc: "Our Equipment Financing program helps businesses acquire new or used equipment without depleting working capital.",
                highlights: [
                    "Financing up to 100% of equipment cost", "New and used equipment eligible", "Loan amounts up to $10 million", "Fixed monthly payments", "Competitive interest rates", "Terms up to 84 months", "No minimum time in business", "At least 580 FICO score", "Fast approvals", "Minimal documentation for qualified borrowers", "Equipment serves as collateral", "Preserve working capital", "Soft costs may be financed", "Vendor financing available", "Startups considered", "Flexible payment schedules", "Tax advantages may apply"
                ]
            },
            {
                title: "Term Loans",
                desc: "Our Term Loan program provides fixed-rate financing for businesses seeking capital to expand operations, purchase assets, refinance debt, or support long-term growth initiatives.",
                highlights: [
                    "Loan amounts up to $10 million", "At least 4 months in business", "660+ FICO score", "Fixed and variable interest rate options", "Terms from 12 months to 25 years", "Purchase equipment, inventory, or commercial real estate", "Debt consolidation available", "Business expansion financing", "Acquisition financing", "Working capital purposes accepted", "Fast underwriting", "Flexible collateral options", "Early payoff options available", "Competitive commercial rates", "SBA options available", "Established and growing businesses eligible", "Customized repayment schedules"
                ]
            },
            {
                title: "Invoice Financing / Factoring",
                desc: "Convert outstanding invoices into immediate working capital with our Invoice Financing / Factoring program. Instead of waiting 30, 60, or 90 days for customer payments, businesses can unlock cash tied up in receivables to improve cash flow, meet payroll, purchase inventory, and fund continued growth.",
                highlights: [
                    "Advance up to 90% of invoice value", "Same-day funding available", "No additional collateral required", "Financing based on customer invoices", "Improve business cash flow", "At least 6 months in business", "600+ FICO score", "Flexible funding as invoices are generated", "Credit decisions based primarily on customer creditworthiness", "No long-term debt created", "Ideal for B2B businesses", "Supports business growth", "Fast approval process", "Minimal paperwork", "Ongoing funding available", "Scalable financing solution", "Competitive factoring rates"
                ]
            },
            {
                title: "SBA Loan",
                desc: "Our SBA Loan program offers government-backed financing designed to help small businesses obtain affordable capital with lower down payments, longer repayment terms, and competitive interest rates. These loans are ideal for purchasing commercial real estate, acquiring equipment, refinancing debt, expanding operations, or providing long-term working capital.",
                highlights: [
                    "Government-backed financing", "At least 2 years in business", "675+ FICO score", "Loan amounts up to $5 million", "Low down payment options", "Longer repayment terms", "Competitive interest rates", "Commercial real estate financing", "Business acquisition financing", "Equipment purchases", "Working capital available", "Debt refinancing", "Franchise financing", "Startup financing on select programs", "SBA 7(a) and SBA 504 options", "Flexible use of funds", "No balloon payments on most programs"
                ]
            },
            {
                title: "Business Acquisition Loan",
                desc: "Our Business Acquisition Loan provides financing for entrepreneurs and investors purchasing an existing business or franchise.",
                highlights: [
                    "Finance business acquisitions", "Franchise purchases eligible", "Loan amounts up to $10 million", "At least 6+ months in business", "No minimum FICO score", "SBA financing available", "Working capital may be included", "Equipment and inventory financing included", "Commercial real estate may be financed", "Competitive repayment terms", "Fast underwriting", "Flexible ownership structures", "Established and first-time buyers considered", "Business valuation review", "Customized financing packages", "Expansion capital available", "Acquisition advisory support"
                ]
            },
            {
                title: "Accounts Receivable Funding",
                desc: "Our Accounts Receivable Funding program enables businesses to leverage unpaid invoices for immediate access to cash. By converting receivables into working capital, businesses can improve liquidity, stabilize operations, and seize new growth opportunities without waiting for customer payments.",
                highlights: [
                    "Unlock cash from outstanding receivables", "Minimum of $100,000 outstanding B2B Accounts Receivable aged up to 90 days outstanding is required", "No minimum FICO", "Funding based on invoice value", "No additional collateral required", "Improve cash flow", "Fast funding decisions", "Ongoing funding as receivables grow", "Flexible financing structures", "Supports payroll and operating expenses", "Minimal documentation", "B2B businesses preferred", "Scalable financing", "Credit decisions based on customer quality", "Preserve existing credit lines", "Competitive advance rates", "Fast approvals"
                ]
            },
            {
                title: "Merchant Cash Advance (MCA)",
                desc: "Our Merchant Cash Advance (MCA) program provides fast access to capital for businesses that process credit card or debit card sales. Funding is repaid through a percentage of future daily or weekly sales, making repayment flexible and aligned with business revenue.",
                highlights: [
                    "Funding up to $2 million", "Approval in as little as 24 hours", "At least 4 months in business", "No minimum FICO score", "No collateral required", "Repayment based on future sales", "Daily or weekly payment options", "Minimal paperwork", "Low credit score options available", "Startup-friendly programs", "Fast funding", "Flexible use of funds", "Short-term financing", "Ideal for retail, restaurants, and service businesses", "Revenue-based qualification", "Renewal opportunities"
                ]
            },
            {
                title: "Working Capital Loans",
                desc: "Our Working Capital Loan program provides businesses with immediate financing to cover day-to-day operating expenses, manage seasonal fluctuations, purchase inventory, hire staff, or invest in growth opportunities. Flexible funding options help maintain healthy cash flow without disrupting operations.",
                highlights: [
                    "Loan amounts up to $5 million", "At least 4 months in business", "No minimum FICO score", "Fast funding", "Working capital for daily operations", "Inventory purchases", "Payroll support", "Marketing and expansion financing", "Flexible repayment options", "Short-term and long-term programs", "Competitive interest rates", "Minimal documentation options", "Unsecured options available", "Fast approvals", "Suitable for most industries", "Customized financing solutions", "Ongoing access to capital"
                ]
            },
            {
                title: "Business Credit Cards",
                desc: "Our Business Credit Card solutions provide convenient revolving credit to help companies manage operating expenses, travel costs, inventory purchases, and everyday business spending.",
                highlights: [
                    "Competitive credit limits", "No minimum time in business", "Good to excellent personal credit typically required", "Rewards and cashback programs", "Travel benefits on qualifying cards", "Employee cards available", "Expense tracking tools", "Online account management", "Introductory APR offers on select programs", "Fraud protection features", "Build business credit history", "Flexible monthly payments", "Accepted worldwide", "Purchase protection benefits", "No annual fee options available", "Credit line increases for qualified businesses"
                ]
            }
        ]
    },
    {
        categoryTitle: "Commercial Property Funding",
        description: "Institutional architecture for real estate and commercial assets.",
        route: "/userjourney",
        loans: [
            {
                title: "Retail Strips Loans",
                desc: "Our Retail Strips Loans program provides financing for neighborhood shopping centers, multi-tenant retail plazas, and community retail developments.",
                highlights: [
                    "Loan amounts up to $25 million", "Financing for neighborhood, community, and regional shopping centers", "Purchase, refinance, and cash-out refinance available", "Up to 80% Loan-to-Value (LTV) for qualified borrowers", "Multi-tenant and single-tenant retail properties eligible", "Interest-only payment options available", "Fixed and adjustable-rate financing", "Competitive amortization periods up to 30 years", "Owner-occupied and investment properties accepted", "Tenant improvement financing available", "Fast underwriting and approvals", "LLC, Corporation, Partnership, and Trust ownership accepted", "Portfolio financing available", "Foreign National financing considered on select programs", "Customized financing structures available"
                ]
            },
            {
                title: "Office Park Loans",
                desc: "Our Office Park Loan program offers financing for professional office campuses, medical office parks, business centers, and multi-building office developments. Designed for investors, developers, and owner-users, this program provides flexible financing solutions for acquisitions, refinancing, expansion, and property improvements.",
                highlights: [
                    "Loan amounts up to $30 million", "Office parks and professional office campuses eligible", "Medical and professional office buildings accepted", "Purchase and refinance financing", "Construction and expansion financing available", "Competitive fixed and variable rates", "Interest-only options", "Long-term amortization", "Fast underwriting", "Portfolio financing available", "Multiple building financing", "Customized repayment structures"
                ]
            },
            {
                title: "Hotel Loans",
                desc: "Finance acquisitions, renovations, refinancing, and new hospitality developments with our Hotel Loan program. Whether you're purchasing a flagged hotel, boutique property, motel, resort, or extended-stay facility, we provide customized financing solutions designed to support hospitality investors and operators throughout every stage of ownership.",
                highlights: [
                    "Loan amounts up to $50 million", "Financing for hotels, motels, resorts, and extended-stay properties", "Purchase, refinance, and renovation financing", "Construction financing available", "Flagged and independent hotels eligible", "Interest-only payment options", "Cash-out refinancing", "Long-term fixed-rate financing", "Owner-operated and investment properties accepted", "Franchise conversion financing", "Portfolio hospitality financing", "Fast approvals for experienced operators", "Flexible underwriting", "Customized loan structures"
                ]
            },
            {
                title: "Storage Facilities Loans",
                desc: "Our Storage Facilities Loan program is designed for investors and developers acquiring, constructing, expanding, or refinancing self-storage facilities. With continued demand for storage nationwide, this financing solution helps borrowers capitalize on stable income-producing assets with flexible underwriting and competitive terms.",
                highlights: [
                    "Loan amounts up to $25 million", "Climate-controlled and traditional storage facilities accepted", "Interest-only options available", "Competitive LTVs", "Fast underwriting", "Flexible repayment terms"
                ]
            },
            {
                title: "Mixed-use Property Loans",
                desc: "Designed for investors seeking diversified income streams, our Mixed-use Property Loan program finances properties that combine residential, office, retail, or commercial uses within one development. These loans provide flexible underwriting for complex income-producing assets while accommodating a variety of ownership structures.",
                highlights: [
                    "Loan amounts up to $20 million", "Purchase and refinance financing", "Cash-out refinance available", "Interest-only payment options", "Fixed and adjustable-rate financing", "Flexible occupancy requirements", "Long-term amortization", "Stabilized and value-add properties eligible", "Multiple tenant income considered", "Foreign National financing available", "Fast underwriting", "Customized financing", "Portfolio expansion opportunities"
                ]
            },
            {
                title: "Light Industrial Loans",
                desc: "Our Light Industrial Loan program provides financing for manufacturing facilities, flex-space properties, research facilities, and industrial service buildings. Designed for investors and business owners alike, these loans offer competitive financing for acquisitions, refinancing, and expansion projects.",
                highlights: [
                    "Loan amounts up to $30 million", "Manufacturing and flex-space properties eligible", "Purchase and refinance financing", "Owner-user and investment properties accepted", "Long-term fixed-rate financing", "Interest-only options", "Competitive amortization", "Cash-out refinance", "Portfolio financing"
                ]
            },
            {
                title: "Warehouses Loans",
                desc: "Our Warehouses Loans program provides flexible capital solutions for acquiring, refinancing, constructing, or expanding industrial real estate investments.",
                highlights: [
                    "Loan amounts up to $50 million", "Distribution centers and logistics facilities eligible", "Purchase, refinance, and expansion financing", "Industrial owner-user financing", "Long-term financing available", "Interest-only payment options", "Fixed and adjustable-rate programs", "Cash-out refinance", "Competitive leverage", "Flexible underwriting", "Portfolio financing", "Fast approvals"
                ]
            },
            {
                title: "Mobile Home Park Loans",
                desc: "Our Mobile Home Park Loan program provides financing for manufactured housing communities ranging from small parks to institutional-quality assets.",
                highlights: [
                    "Loan amounts up to $25 million", "Financing for manufactured housing communities", "Purchase, refinance, and expansion financing", "Cash-out refinance available", "Interest-only options", "Long-term amortization", "Community improvements eligible", "Stabilized and value-add communities accepted", "Flexible occupancy requirements", "Portfolio financing", "Fast underwriting"
                ]
            },
            {
                title: "Office Loans",
                desc: "Our Office Loan program provides flexible financing solutions for owner-occupied and investment office properties. Whether you're purchasing a professional office building, refinancing an existing property, or expanding your commercial real estate portfolio, we offer customized financing with competitive rates and flexible repayment options to support your long-term business and investment goals.",
                highlights: [
                    "Loan amounts up to $25 million", "Financing for owner-occupied and investment office buildings", "Purchase, refinance, and cash-out refinance available", "Up to 80% Loan-to-Value (LTV) for qualified borrowers", "Fixed and adjustable-rate financing available", "Interest-only payment options", "Long-term amortization up to 30 years", "Medical and professional office buildings eligible", "Multi-tenant office properties accepted", "Fast underwriting and approvals", "LLC, Corporation, Partnership, and Trust ownership accepted", "Portfolio financing available", "Competitive commercial loan terms", "Flexible documentation requirements", "Customized financing structures"
                ]
            },
            {
                title: "Adult Care Facilities Loans",
                desc: "Our Adult Care Facilities Loan program provides specialized financing for assisted living facilities, memory care centers, skilled nursing facilities, rehabilitation centers, and other healthcare-related properties.",
                highlights: [
                    "Loan amounts up to $30 million", "Financing for assisted living, memory care, skilled nursing, and rehabilitation facilities", "Purchase, refinance, renovation, and expansion financing", "Construction financing available", "Long-term fixed and adjustable-rate options", "Interest-only payment programs", "Owner-operated and investment properties eligible", "Equipment financing may be combined", "Acquisition financing available", "Cash-out refinance options", "Fast underwriting for experienced operators", "Flexible repayment terms", "LLC and Corporate ownership accepted", "Customized healthcare lending solutions", "Competitive commercial financing"
                ]
            },
            {
                title: "Apartment Loans",
                desc: "Our Apartment Loan program offers financing for multifamily apartment communities of all sizes, from small apartment buildings to institutional-grade assets.",
                highlights: [
                    "Loan amounts up to $50 million", "Financing for stabilized and value-add apartment communities", "Purchase and refinance financing", "Cash-out refinance available", "Fixed and floating-rate options", "Interest-only payment programs", "Long-term amortization up to 30 years", "LLC, Corporation, Partnership, and Trust ownership accepted", "Foreign National financing available", "Fast approvals for experienced investors", "Customized multifamily lending solutions"
                ]
            },
            {
                title: "Automotive Loans",
                desc: "Our Automotive Loan program provides financing for dealerships, automotive service centers, collision repair facilities, tire shops, and other automotive-related commercial properties.",
                highlights: [
                    "Loan amounts up to $20 million", "Financing for dealerships and automotive commercial properties", "Long-term financing", "Interest-only options", "Flexible underwriting", "Fast approvals", "Customized financing structures"
                ]
            },
            {
                title: "Church Loans",
                desc: "Our Church Loan program provides financing solutions for churches, ministries, religious organizations, and faith-based institutions.",
                highlights: [
                    "Loan amounts up to $25 million", "Acquisition financing", "Refinance existing church mortgages", "Construction financing available", "Expansion and renovation financing", "Fixed and adjustable-rate options", "Interest-only payment programs", "Fellowship halls, schools, and ministry buildings eligible", "Flexible amortization schedules", "Cash-out refinancing available", "Fast underwriting", "Customized nonprofit lending", "Competitive commercial financing", "Flexible repayment options"
                ]
            },
            {
                title: "Self-storage Loans",
                desc: "Our Self-storage Loan program provides financing for investors and operators looking to acquire, develop, refinance, or expand self-storage facilities.",
                highlights: [
                    "Loan amounts up to $25 million", "Existing and new construction projects eligible", "Climate-controlled and traditional facilities accepted", "Purchase and refinance financing", "Expansion financing available", "Interest-only payment options", "Long-term financing", "Cash-out refinance", "Portfolio financing", "Flexible underwriting", "Fast approvals", "Competitive commercial rates", "LLC ownership accepted", "Customized lending solutions"
                ]
            },
            {
                title: "Commercial Bridge Loans",
                desc: "Our Commercial Bridge Loan program delivers fast, short-term financing for investors and business owners who need immediate access to capital while arranging permanent financing or completing value-add improvements.",
                highlights: [
                    "Loan amounts up to $50 million", "Terms from 6–36 months", "Interest-only payment options", "Fast approvals and closings", "Purchase and refinance financing", "Cash-out refinance available", "Bridge-to-permanent financing options", "Office, retail, industrial, multifamily, hospitality, mixed-use, and specialty properties eligible", "High leverage available for qualified borrowers", "Flexible underwriting based on asset strength and exit strategy", "Minimal documentation options available", "LLC, Corporation, Partnership, and Trust ownership accepted", "Foreign National financing available", "No prepayment penalties on select programs", "Customized commercial financing solutions"
                ]
            }
        ]
    },
    {
        categoryTitle: "Construction Funding",
        description: "Capital for ground-up development, vertical construction, and horizontal lot development.",
        route: "/userjourney",
        loans: [
            {
                title: "Ground Up Construction",
                desc: "Bring your development vision to life with our Ground Up Construction Loan, designed to finance projects from raw land through final completion.",
                highlights: [
                    "Loan amounts up to $20 million", "Financing for residential and commercial ground-up construction", "Up to 85% Loan-to-Cost (LTC) for qualified borrowers", "Up to 75% Loan-to-Completed Value (LTCV)", "Interest-only payments during construction", "Flexible draw schedules with fast funding", "Purchase of land and construction costs may be financed together", "One-time or multiple draw disbursements available", "Experienced and first-time builders considered", "Single-family, multifamily, mixed-use, office, retail, industrial, and hospitality projects eligible", "LLCs, Corporations, Partnerships, and Trusts accepted", "Interest reserves may be included", "Fast underwriting with dedicated construction specialists", "Bridge-to-permanent financing options available", "Competitive terms with customized repayment structures"
                ]
            },
            {
                title: "Construction-to-Permanent Loan (C2P)",
                desc: "Our Construction-to-Permanent (C2P) Loan combines construction financing and permanent mortgage financing into one seamless transaction. Instead of obtaining separate construction and permanent loans, borrowers benefit from a single closing, reduced costs, and a streamlined financing process. Once construction is complete, the loan automatically converts into long-term financing, eliminating the need for a second closing.",
                highlights: [
                    "One closing from construction through permanent financing", "Eliminates the need for refinancing after construction", "Reduced closing costs compared to separate loans", "Interest-only payments during construction", "Automatic conversion to permanent mortgage upon completion", "Loan amounts up to $10 million", "Financing for primary residences, second homes, investment, and commercial projects", "Flexible construction periods up to 24 months", "Fixed and adjustable-rate permanent financing options", "Builder and owner-builder programs available (subject to qualifications)", "Custom home construction eligible", "Residential and commercial properties accepted", "Interest reserves available on qualifying projects"
                ]
            },
            {
                title: "Stand-Alone Construction Loan",
                desc: "This program provides short-term financing dedicated exclusively to the construction phase of your project. This program is ideal for borrowers who plan to obtain permanent financing from another lender after construction is complete or intend to sell the property upon completion. Flexible draw schedules and customized loan structures help keep projects on schedule and within budget.",
                highlights: [
                    "Short-term financing for construction only", "Terms up to 24 months", "Interest-only payments during construction", "Flexible draw schedules based on project milestones", "Competitive Loan-to-Cost financing", "Residential and commercial construction projects eligible", "Builder and developer financing available", "Custom homes, spec homes, and investment projects accepted", "Fast draw processing", "Individual and entity borrowers eligible", "Construction monitoring and inspection services included", "Interest reserves may be financed", "Flexible exit strategies", "Fast underwriting", "Permanent financing with another lender permitted"
                ]
            },
            {
                title: "Commercial Construction Loan",
                desc: "Commercial Construction Loan provides financing for new office buildings, retail centers, multifamily communities, industrial facilities, medical buildings, hospitality projects, and other income-producing commercial developments.",
                highlights: [
                    "Loan amounts up to $50 million", "Financing for office, retail, multifamily, industrial, hospitality, and mixed-use developments", "Up to 85% Loan-to-Cost", "Interest-only payments during construction", "Construction periods up to 36 months", "Multiple draw disbursements", "Experienced developer programs", "Flexible underwriting based on project feasibility", "Interest reserves available", "Acquisition and construction financing combined", "Owner-occupied and investment projects eligible", "Bridge-to-permanent financing available"
                ]
            },
            {
                title: "Renovation / Rehab Construction Loan",
                desc: "This program provides financing for property improvements that increase value and marketability. Funds may be used for cosmetic updates, structural improvements, tenant improvements, adaptive reuse projects, or major rehabilitation efforts across residential and commercial properties.",
                highlights: [
                    "Financing for renovation and rehabilitation projects", "Up to 100% eligible renovation financing", "Purchase plus renovation financing available", "Interest-only payments during renovation", "Residential and commercial properties eligible", "Flexible draw schedules", "Cosmetic and structural improvements accepted", "Tenant improvements eligible", "Adaptive reuse projects considered", "Value-add investment strategies supported", "Fast inspections and draw funding", "Experienced and first-time investors welcome", "LLC and corporate ownership accepted"
                ]
            },
            {
                title: "Bridge Loan (Construction-Related)",
                desc: "Our Construction Bridge Loan provides interim financing that keeps your project moving while permanent financing, additional equity, or project stabilization is achieved. This program is ideal for developers needing immediate capital to complete construction, lease up a property, or bridge timing gaps between financing phases.",
                highlights: [
                    "Short-term financing up to 36 months", "Loan amounts up to $15 million", "Interest-only payment options", "Construction completion financing", "Lease-up bridge financing", "Stabilization financing", "Fast approvals and closings", "Residential and commercial projects eligible", "Flexible repayment options", "Acquisition, refinance, or recapitalization available", "Experienced developers preferred", "LLC, Corporation, and Partnership ownership accepted", "Customized loan structures", "Bridge-to-permanent solutions available", "Designed for time-sensitive projects"
                ]
            }
        ]
    },
    {
        categoryTitle: "Investment Property Funding",
        description: "High leverage funding for fix-and-flips, land development, and portfolio growth.",
        route: "/userjourney",
        loans: [
            {
                title: "Fix & Flip / Hold",
                desc: "Designed for real estate investors purchasing, renovating, and reselling or holding residential investment properties. Fast closings, high leverage, and renovation financing help maximize returns.",
                highlights: [
                    "Loan amounts up to $3 million", "Up to 95% Loan-to-Cost", "Up to 75% After Repair Value", "100% rehab financing available", "Rates starting from 7.99%", "10-day closings available", "Interest-only terms up to 18 months", "No prepayment penalty", "First-time investors welcome", "Eligible for SFR, 2–4 units, condos, PUDs"
                ]
            },
            {
                title: "Land Loan",
                desc: "Our Land Loan program provides financing solutions for investors, developers, and builders acquiring undeveloped, entitled, or development-ready land.",
                highlights: [
                    "Loan amounts up to $10 million", "Financing available for residential, commercial, and agricultural land", "Raw land, entitled land, and shovel-ready projects eligible", "Purchase and refinance transactions available", "Competitive Loan-to-Value (LTV) options", "Interest-only payment options", "Flexible loan terms from 12–60 months", "Individual and entity ownership accepted", "LLC, Corporation, Partnership, and Trust ownership permitted", "Fast underwriting and expedited closings", "Cross-collateralization options available", "No income documentation options for experienced investors", "Financing available for future residential or commercial development", "Suitable for developers, builders, and long-term investors", "Foreign National financing available on qualifying transactions"
                ]
            },
            {
                title: "DSCR Loans",
                desc: "If you’re looking for a no income verification loan, our DSCR Loans are based on the property's cash flow rather than your personal income, making it easier to qualify for investment financing.",
                highlights: [
                    "Loan amounts up to $3.5 million", "Qualification based on property cash flow rather than personal income", "Purchase, rate-term refinance, and cash-out refinance available", "Long-term and short-term rentals eligible", "Airbnb and vacation rental income considered where permitted", "No tax returns or employment verification required", "First-time investors eligible with qualifying criteria", "Individual and entity ownership accepted", "LLC, S Corporation, C Corporation, and Trust vesting available", "Interest-only payment options available", "Gift funds permitted", "Seller concessions allowed on qualifying transactions", "Vacant properties may qualify", "Condos, Condo Hotels, Co-ops, Townhomes, PUDs, and 1–4 Unit properties eligible", "Foreign National financing available", "Fixed and Adjustable Rate Mortgage options", "Portfolio expansion friendly", "Streamlined underwriting process"
                ]
            },
            {
                title: "Bridge Loans",
                desc: "Our Bridge Loan program provides fast, short-term financing designed to help investors capitalize on time-sensitive real estate opportunities.",
                highlights: [
                    "Up to 80% LTV", "Loan amounts up to $10 million", "Short-term financing from 6–36 months", "Purchase, refinance, and cash-out refinance available", "Interest-only payment options", "Fast approvals and closings in as little as 7–14 business days", "Flexible underwriting based on asset value and exit strategy", "Financing for stabilized and transitional properties", "Residential and commercial investment properties eligible", "No seasoning required on select programs", "Bridge-to-permanent financing options available", "LLC, Corporation, Partnership, and Trust ownership accepted", "Foreign National financing available on qualifying transactions", "Multiple exit strategies accepted, including sale or refinance", "Competitive leverage for experienced investors", "Minimal documentation options available for qualified borrowers"
                ]
            },
            {
                title: "Multifamily Loans",
                desc: "Expand your real estate portfolio with financing designed specifically for multifamily residential properties. Our Multifamily Loan program offers competitive financing solutions for purchasing, refinancing, or improving apartment buildings and small multifamily properties.",
                highlights: [
                    "Loan amounts up to $3 million", "Financing for 2–8 unit residential properties", "Investment properties only", "Maximum LTV up to 75%", "DSCR qualification starting at 1.00", "Purchase, refinance, and cash-out refinance available", "Vacant units accepted on qualifying purchases", "First-time investors eligible with qualifying mortgage history", "Full Documentation, Bank Statement, P&L, and DSCR options available", "Interest-only payment options available", "Individual and entity ownership accepted", "LLC, Corporation, and Trust vesting permitted", "Foreign National financing available", "Competitive fixed and adjustable rate options", "Suitable for long-term rental portfolio growth"
                ]
            },
            {
                title: "Mixed-use Properties",
                desc: "Our Mixed-Use Property Loan program provides customized financing for investment properties that combine residential and commercial space within a single building.",
                highlights: [
                    "Loan amounts up to $7.5 million", "Purchase, refinance, and cash-out refinance available", "Mixed residential and commercial occupancy permitted", "Flexible underwriting for investor-owned properties", "Interest-only payment options available", "Competitive fixed and adjustable rate programs", "Owner-occupied and investment properties eligible", "LLC and Corporate ownership accepted", "Fast underwriting and expedited closings", "Multiple tenant income considered", "Long-term amortization options available", "Foreign National financing available", "Stabilized and value-add properties eligible", "Portfolio financing available", "Customized financing structures for complex transactions"
                ]
            },
            {
                title: "Apartment Buildings",
                desc: "Competitive financing to support stabilized, value-add, and transitional apartment properties with flexible loan structures and competitive terms.",
                highlights: [
                    "Loan amounts up to $25 million", "Financing for stabilized and value-add apartment communities", "Purchase, refinance, and cash-out options", "Long-term fixed and adjustable rate options", "Interest-only payment programs available", "Competitive amortization periods", "Non-recourse options available on qualifying transactions", "Individual and entity borrowers accepted", "Foreign National financing available", "Flexible DSCR requirements", "Multiple property financing available", "Fast underwriting for experienced investors", "Suitable for acquisitions and recapitalizations", "Portfolio expansion opportunities", "Customized financing structures available"
                ]
            },
            {
                title: "Portfolio Loans",
                desc: "Our Portfolio Loan program is designed for investors managing multiple properties who need flexible financing beyond conventional lending guidelines.",
                highlights: [
                    "Finance multiple properties under one lending relationship", "Loan amounts based on total portfolio value", "Purchase and refinance options available", "Blanket collateral options", "Flexible underwriting guidelines", "Interest-only options available", "Cross-collateralization permitted", "Simplified documentation for experienced investors", "Residential and commercial properties eligible", "LLC and Corporate ownership accepted", "DSCR-based qualification available", "Foreign National financing available", "Portfolio expansion financing", "Streamlined servicing", "Customized loan structures"
                ]
            },
            {
                title: "Blanket Loans",
                desc: "Our Blanket Loans program allows investors to finance multiple properties under one mortgage, simplifying loan management while providing flexibility to buy, refinance, or expand an investment portfolio.",
                highlights: [
                    "One loan covering multiple properties", "Loan amounts up to $20 million", "Purchase and refinance available", "Residential and commercial investment properties eligible", "Cross-collateralized financing", "Flexible release provisions for individual property sales", "Interest-only options available", "Competitive fixed and adjustable rates", "Simplified monthly payment", "Portfolio growth financing", "LLC, Corporation, Partnership, and Trust ownership accepted", "Fast underwriting for seasoned investors"
                ]
            },
            {
                title: "Hard Money Loans",
                desc: "Our Hard Money Loans program provides asset-based financing for investors requiring fast access to capital. Ideal for acquisitions, renovations, bridge financing, and distressed properties, these loans prioritize property value over traditional income documentation.",
                highlights: [
                    "Fast approvals and funding", "Close in as little as 5–10 business days", "Loan amounts up to $10 million", "Asset-based underwriting", "Minimal income documentation", "Purchase, refinance, and cash-out available", "Interest-only payment options", "Short-term loan terms", "Residential and commercial investment properties eligible", "Financing for distressed properties", "High leverage options for qualified borrowers", "LLC, Corporation, and Trust ownership accepted", "Foreign National financing available", "No prepayment penalty on select programs", "Ideal for fix-and-flip, bridge financing, and value-add investments"
                ]
            }
        ]
    }
];

// --- MICRO-COMPONENT TO HANDLE INDIVIDUAL TOGGLE STATE ---
const LoanItem = ({ loan, route, router }: { loan: any, route: string, router: any }) => {
    const [showHighlights, setShowHighlights] = useState(false);

    return (
        <>
            <details className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-outline-variant/50">
                <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                    <h3 className="font-headline font-bold text-base text-primary">{loan.title}</h3>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <div className="px-5 pb-6">
                    <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                        {loan.desc}
                    </p>

                    <div className="flex flex-col sm:flex-col gap-3">
                        <button
                            onClick={(e) => { e.preventDefault(); setShowHighlights(true); }}
                            className="w-full sm:w-auto bg-slate-100 text-slate-700 px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all text-center"
                        >
                            Program Highlights
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); router.push(route); }}
                            className="w-full sm:w-auto bg-secondary text-on-secondary px-6 py-2.5 rounded-md font-headline font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all text-center"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </details>

            {/* MODAL FOR HIGHLIGHTS */}
            {showHighlights && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#042f24] text-white">
                            <div>
                                <h2 className="text-xl font-bold">{loan.title}</h2>
                                <p className="text-emerald-400 text-xs tracking-wider uppercase font-bold mt-1">Program Highlights</p>
                            </div>
                            <button
                                onClick={() => setShowHighlights(false)}
                                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6 md:p-8 bg-slate-50">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {loan.highlights.map((highlight: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <span className="w-2 h-2 rounded-full bg-[#0a6c50] mt-1.5 shrink-0 opacity-80"></span>
                                        <span className="text-sm font-medium text-slate-700 leading-snug">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                            <button
                                onClick={() => setShowHighlights(false)}
                                className="px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => { setShowHighlights(false); router.push(route); }}
                                className="bg-[#0a6c50] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#085a42] transition-colors shadow-md"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function LoanProgramsContent() {
    const router = useRouter();
    const supabase = createClient();

    // Setup states for the modals
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isMeetModalOpen, setIsMeetModalOpen] = useState(false);
    const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
    const [isRouting, setIsRouting] = useState(false);

    // Executes instantly if they select "As a Client"
    const handleClientScenarioClick = () => {
        setIsScenarioModalOpen(false);
        router.push('/partner/dealform');
    };

    // DIAGNOSTIC ROUTING: Executes if they select "As a Partner"
    const handlePartnerScenarioClick = async () => {
        setIsRouting(true);
        console.log("=== STARTING PARTNER VERIFICATION ===");

        try {
            // 1. Check current authenticated session
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError) {
                console.error("Supabase Auth Error:", authError.message);
                router.push('/become-partner/login');
                return;
            }

            if (!user) {
                console.warn("No active user session found. Redirecting to login.");
                router.push('/become-partner/login');
                return;
            }

            console.log("Authenticated user found:", user.email);

            // 2. Fetch partner record from public schema
            const { data: partner, error: dbError } = await supabase
                .from('loan_partners')
                .select('status')
                .eq('email', user.email)
                .maybeSingle();

            if (dbError) {
                console.error("Database Query Failed. Most likely an RLS Policy issue:", dbError.message);
                alert(`Database Error: ${dbError.message}`);
                setIsRouting(false);
                return;
            }

            console.log("Database response for partner record:", partner);

            // 3. Evaluate conditional branching paths
            if (partner && partner.status === 'APPROVED') {
                console.log("Verification Success. Routing to Deal Form.");
                router.push('/partner/dealform');
            } else {
                console.warn(`Verification Failed. Status is: ${partner?.status || 'NOT_FOUND'}. Routing to onboarding.`);
                router.push('/become-partner');
            }

        } catch (err) {
            console.error("Unexpected runtime exception:", err);
        } finally {
            setIsRouting(false);
            setIsScenarioModalOpen(false); // Close the modal regardless of outcome
            console.log("=== VERIFICATION COMPLETE ===");
        }
    };

    return (
        <main className="min-h-screen">

            {/* HERO SECTION */}
            {/* <section className="w-full bg-[#042f24] py-20 lg:py-28 px-4 sm:px-8 relative overflow-hidden font-sans">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <h1 className="text-secondary font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none">
                            YOUR NEXT LOAN <br /> STARTS HERE
                        </h1>
                        <p className="text-emerald-50/70 font-medium text-base sm:text-lg max-w-xl leading-relaxed">
                            At Stratmire Capital Partners LLC, we believe access to capital should be simple,
                            strategic, and tailored to the unique needs of every borrower. Whether you're a business
                            owner seeking growth capital or a real estate investor expanding your portfolio, our
                            mission is to connect you with the right financing solution quickly and efficiently.
                        </p>
                    </div>

                    <div className="lg:col-span-5 w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/10 relative group">
                        <div className="absolute inset-0 bg-[#042f24]/30 mix-blend-multiply z-10 transition-colors duration-300 group-hover:bg-[#042f24]/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#042f24]/40 via-transparent to-transparent z-10" />
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            alt="Stratmire Commercial Real Estate Architecture Portfolio"
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                        />
                    </div>
                </div>
            </section> */}

            {/* HERO SECTION */}
            <section className="relative w-full bg-[#0B1120] pt-24 pb-32 lg:pt-32 lg:pb-40 px-6 sm:px-12 overflow-hidden font-sans">
                {/* Background Textures & Glows */}
                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                        {/* Text Content - Left Side */}
                        <div className="w-full lg:w-[55%] space-y-8 text-left">
                            <div className="flex items-center gap-4">
                                <div className="h-[2px] w-12 bg-blue-500"></div>
                                <span className="text-sm font-black text-blue-400 uppercase tracking-[0.2em]">
                                    Premium Capital Solutions
                                </span>
                            </div>

                            <h1 className="text-white font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[1.05]">
                                YOUR NEXT LOAN <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                    STARTS HERE
                                </span>
                            </h1>

                            <div className="border-l-4 border-blue-500/30 pl-6 py-2">
                                <p className="text-slate-300 font-medium text-lg sm:text-xl leading-relaxed">
                                    At Stratmire Capital Partners LLC, we believe access to capital should be simple,
                                    strategic, and tailored to the unique needs of every borrower. Whether you're a business
                                    owner seeking growth capital or a real estate investor expanding your portfolio, our
                                    mission is to connect you with the right financing solution quickly and efficiently.
                                </p>
                            </div>
                        </div>

                        {/* Visual / Image Composition - Right Side */}
                        <div className="w-full lg:w-[45%] relative mt-8 lg:mt-0">

                            {/* Offset Frame Decoration */}
                            <div className="absolute inset-0 bg-blue-900/20 border border-blue-500/20 rounded-3xl transform translate-x-4 translate-y-6 sm:translate-x-8 sm:translate-y-8"></div>

                            {/* Main Image */}
                            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <div className="absolute inset-0 bg-[#0B1120]/20 mix-blend-multiply z-10" />
                                <img
                                    className="w-full h-full object-cover filter contrast-105"
                                    alt="Stratmire Commercial Real Estate Architecture Portfolio"
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                                />
                            </div>

                            {/* Floating Overlay Card - Bottom Left */}
                            <div className="absolute z-20 -bottom-6 -left-2 sm:-left-8 bg-[#0F172A] border border-blue-500/20 p-5 sm:p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center gap-4 backdrop-blur-md w-[90%] sm:w-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-black text-lg leading-tight tracking-tight">Accelerate Growth</p>
                                    <p className="text-blue-300 text-sm font-medium mt-0.5">Tailored financial strategies</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* DYNAMIC LOAN PROGRAMS GRID */}
            <section className="bg-surface py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 items-start">

                        {/* Map over the centralized data array */}
                        {LOAN_DATA.map((category, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-outline-variant/30 p-8 lg:p-10 nexos-shadow space-y-10">

                                <div className="border-b border-outline-variant/30 pb-8">
                                    <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight mb-3">
                                        {category.categoryTitle}
                                    </h2>
                                    <p className="text-on-surface-variant font-body text-lg">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {/* Sub-mapping over the individual loans to utilize the stateful sub-component */}
                                    {category.loans.map((loan, loanIdx) => (
                                        <LoanItem
                                            key={loanIdx}
                                            loan={loan}
                                            route={category.route}
                                            router={router}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 px-8 bg-secondary text-white rounded-xl">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-headline font-extrabold text-4xl md:text-5xl mb-8 tracking-tight">
                        Ready to unlock your capital potential?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        {/* Trigger Loan Selection Modal */}
                        <span onClick={() => setIsLoanModalOpen(true)} className="cursor-pointer">
                            <NewButton variant='primary'>
                                Start Application
                            </NewButton>
                        </span>

                        <span onClick={() => setIsMeetModalOpen(true)} className="cursor-pointer">
                            <NewButton variant='secondary'>
                                Consult an Advisor
                            </NewButton>
                        </span>
                    </div>
                </div>
            </section>

            {/* Render Modals at the bottom */}
            <LoanSelectionModal
                isOpen={isLoanModalOpen}
                onClose={() => setIsLoanModalOpen(false)}
            />

            <MeetingSelectionModal
                isOpen={isMeetModalOpen}
                onClose={() => setIsMeetModalOpen(false)}
            />

            {/* Scenario Path Selection Modal */}
            {isScenarioModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsScenarioModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-2xl font-black text-[#042f24] mb-2 tracking-tight">Submit a Scenario</h3>
                        <p className="text-slate-500 mb-8 text-sm">Please select how you are submitting this scenario so we can route you to the correct portal.</p>

                        <div className="space-y-4">
                            <button
                                onClick={handleClientScenarioClick}
                                className="w-full bg-[#042f24] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#0a6c50] transition-colors shadow-md flex items-center justify-between group"
                            >
                                <span>As a Client</span>
                                <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button
                                onClick={handlePartnerScenarioClick}
                                disabled={isRouting}
                                className="w-full bg-slate-50 text-[#042f24] py-4 px-6 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm flex items-center justify-between group disabled:opacity-50"
                            >
                                <span>{isRouting ? 'Verifying...' : 'As a Partner'}</span>
                                {!isRouting && (
                                    <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

// change the popup styling a bit where the cross should be a bit left and all other things are good and one more thing some cards has lot of elements and popup gets a scroll so change the list styling to match the bullet points it shouldnt be side by side if its exceeding the space