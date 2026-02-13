import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ResumeApplication from "./pages/ResumeApplication";
import NewApplicationS1 from "./pages/NewApplicationS1";
import BusinessType from "./pages/BuisnessType";
import BankAccount from "./pages/BankAccount";
import StartDate from "./pages/StartDate";
import MonthlyRevenue from "./pages/MonthlyRevenue"
import PersonalCreditScore from "./pages/PersonalCreditScore"
import BuisnessIndustry from "./pages/BuisnessIndustry"
import FundingPurpose from "./pages/FundingPurpose"
import QuickMoney from "./pages/QuickMoney"
import AboutYourself from "./pages/AboutYourself"
import BuisnessDetail from "./pages/BuisnessDetails"
import Signature from "./pages/Signature"
import DocumentUpload from "./pages/DocumentUpload"
import ApplicationRejection from "./pages/ApplicationRejection"
import ThankYou from "./pages/Thankyou";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Header stays full width */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<ResumeApplication />} />
            <Route path="/apply" element={<NewApplicationS1 />} />
            <Route path="/apply/business-type" element={<BusinessType />} />
            <Route path="/apply/bank-account" element={<BankAccount />} />
            <Route path="/apply/start-date" element={<StartDate />} />
            <Route path="/apply/monthly-revenue" element={<MonthlyRevenue />} />
             <Route path="/apply/credit-score" element={<PersonalCreditScore />} />
            <Route path="/apply/buisness-industry" element={<BuisnessIndustry />} />
             <Route path="/apply/funding-purpose" element={<FundingPurpose />} />
             <Route path="/apply/quick-money" element={<QuickMoney />} />
             <Route path="/apply/about-self" element={<AboutYourself />} />
              <Route path="/apply/buisness-detail" element={<BuisnessDetail />} />
              <Route path="/apply/signature" element={<Signature />} />
              <Route path="/apply/doc-upload" element={<DocumentUpload />} />
            <Route path="/apply/rejected" element={<ApplicationRejection />} />
            <Route path="/apply/thank-you" element={<ThankYou />} />
          </Routes>
        </div>
      </main>

      {/* Footer stays full width */}
      <Footer />

    </div>
  );
}

export default App;
