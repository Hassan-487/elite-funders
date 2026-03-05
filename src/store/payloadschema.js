
export const PAYLOAD_SCHEMA = {
  newApplication: {
    amount: { key: "How Much Do You Need?" },
  },

  businessType: {
    type: { key: "Type of Business" },
  },

  bankAccount: {
    hasAccount: {
      key: "Do you have a business bank account?",
      transform: (v) => (v === "yes" ? "Yes" : "No"),
    },
  },

  startDate: {
    startMonth: { key: "Month" },
    startYear: { key: "Year" },
  },

  monthlyRevenue: {
    monthlyrevenue: { key: "Monthly Revenue?" },
  },

  personalCreditScore: {
    creditscore: { key: "personal credit score?" },
  },

  businessIndustry: {
    industry: { key: "What industry is your business in?" },
  },

  fundingPurpose: {
    purpose: { key: "What do you need financing for?" },
  },

  QuickMoney: {
    speed: { key: "How quickly do you need the money?" },
  },

  businessName: {
    name: { key: "Business Name" },
  },

  aboutYourself: {
    firstName: { key: "Business Owner First Name" },
    lastName: { key: "Business Owner Last Name" },
    phone: { key: "Business Owner Phone Number" },
    email: { key: "Business Owner Email Address" },
  },


  businessDetails: {
    businessName: { key: "Business Name" },
    email: { key: "Email Address" },
    phone: { key: "Phone Number" },
    address: { key: "Street Address" },
    city: { key: "City" },
    state: { key: "State" },
    zip: { key: "Zip" },
    ein: { key: "Federal Tax ID (EIN)" },
    incorporationState: { key: "State of incorporation" },
  },

  signature: {
    finalSignature: { key: "Signature URL" },
    mode: { key: "Signature Mode" },
    Image_ID: { key: "Image_ID" },
  },

  documentUpload: {
    one: { key: "Bank Statement #1 URL" },
    two: { key: "Bank Statement #2 URL" },
    three: { key: "Bank Statement #3 URL" },
    four: { key: "Bank Statement #4 URL" },
  },
};