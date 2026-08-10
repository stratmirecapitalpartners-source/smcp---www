import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

// Define the shape of the data you are passing in
export interface ApplicationData {
    id: string;
    funding_amount: string;
    monthly_sales: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    legal_business_name: string;
    years_in_business: string;
    business_classification: string; // Entity Type
    industry: string;
    tax_id: string;
    is_home_based: boolean;
    business_address: string;
    ownership_percentage: string;
    dob: string;
    ssn: string;
    last_4_ssn: string;
    home_address: string;
    home_city: string;
    home_state: string; // Assuming state & zip are separate or combined
    home_zip_code: string;
}

// Helper to create bold label + standard value lines
const createDataRow = (label: string, value: string | number | undefined | null) => {
    return new Paragraph({
        children: [
            new TextRun({ text: `${label}: `, bold: true }),
            new TextRun({ text: value ? String(value) : "N/A" }),
        ],
        spacing: { after: 120 },
    });
};

export const downloadBusinessApplicationWordDoc = async (appData: ApplicationData) => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    // HEADER
                    new Paragraph({
                        text: "Direct Business Funding Application",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 },
                    }),
                    new Paragraph({
                        text: `Application ID: ${appData.id}`,
                        spacing: { after: 400 },
                    }),

                    // SECTION 1: Request & Applicant Info
                    new Paragraph({
                        text: "REQUEST & APPLICANT INFO",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 },
                    }),
                    createDataRow("Funding Needed", appData.funding_amount),
                    createDataRow("Monthly Sales", appData.monthly_sales),
                    createDataRow("First Name", appData.first_name),
                    createDataRow("Last Name", appData.last_name),
                    createDataRow("Email Address", appData.email),
                    createDataRow("Phone Number", appData.phone),

                    // SECTION 2: Business Information
                    new Paragraph({
                        text: "BUSINESS INFORMATION",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 },
                    }),
                    createDataRow("Legal Business Name", appData.legal_business_name),
                    createDataRow("Years in Business", appData.years_in_business),
                    createDataRow("Entity Type", appData.business_classification),
                    createDataRow("Industry", appData.industry),
                    createDataRow("Tax ID / EIN", appData.tax_id),
                    createDataRow("Home Based Business?", appData.is_home_based ? "Yes" : "No"),
                    createDataRow("Physical Address", appData.business_address),

                    // SECTION 3: Ownership & Identity Verification
                    new Paragraph({
                        text: "OWNERSHIP & IDENTITY VERIFICATION",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 },
                    }),
                    createDataRow("Ownership Stake", `${appData.ownership_percentage}%`),
                    createDataRow("Date of Birth", appData.dob),
                    createDataRow("SSN", appData.ssn),
                    createDataRow("SSN (Last 4)", appData.last_4_ssn),
                    createDataRow("Home Address", appData.home_address),
                    createDataRow("City", appData.home_city),
                    createDataRow("State & Zip", `${appData.home_state} ${appData.home_zip_code}`),
                ],
            },
        ],
    });

    // Generate the blob and trigger the download
    const blob = await Packer.toBlob(doc);
    const safeName = appData.legal_business_name?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || "application";
    saveAs(blob, `${safeName}_loan_application.docx`);
};