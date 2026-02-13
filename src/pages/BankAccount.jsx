import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Landmark, Banknote } from "lucide-react";
import { useFormStore } from "@/store"; // or ../store if no alias
import ProgressBar from "@/components/ProgressBar";

export default function BankAccountStep() {
  const navigate = useNavigate();

  const { bankAccount, setStepData } = useFormStore();

  // Load from store safely
  const [selected, setSelected] = useState(
    bankAccount?.hasAccount ?? "yes"
  );

  /* =====================
      SAVE TO STORE
  ===================== */
  useEffect(() => {
    setStepData("bankAccount", { hasAccount: selected });
  }, [selected, setStepData]);

  /* =====================
      DEBUG LOG
  ===================== */
  useEffect(() => {
    console.log("ZUSTAND → bankAccount slice:", bankAccount);
  }, [bankAccount]);

  const handleNext = () => {
    if (selected === "no") {
      navigate("/apply/rejected");
    } else {
      navigate("/apply/start-date");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-2 sm:px-4">
     <ProgressBar currentStep={3} totalSteps={13} />
      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            Do you have a business bank account?
          </h2>
          <p className="text-gray-500 text-sm">
            This helps us determine your funding options
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-10">
          {/* YES */}
          <div
            onClick={() => setSelected("yes")}
            className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl cursor-pointer transition border ${
              selected === "yes"
                ? "bg-blue-50 border-blue-600 shadow-md"
                : "bg-white border-gray-200 hover:shadow-sm"
            }`}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl mb-3 sm:mb-4 transition ${
                selected === "yes"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-blue-600"
              }`}
            >
              <Landmark className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Yes, I have one
            </span>
          </div>

          {/* NO */}
          <div
            onClick={() => setSelected("no")}
            className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl cursor-pointer transition border ${
              selected === "no"
                ? "bg-blue-50 border-blue-600 shadow-md"
                : "bg-white border-gray-200 hover:shadow-sm"
            }`}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl mb-3 sm:mb-4 transition ${
                selected === "no"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-blue-600"
              }`}
            >
              <Banknote className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-700">
              No, not yet
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Next
            <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
