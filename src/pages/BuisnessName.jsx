import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";

export default function BusinessNameStep() {
  const navigate = useNavigate();

  const { businessName, setStepData } = useFormStore();

  // ✅ restore on refresh
  const [name, setName] = useState(businessName?.name ?? "");

  /* =====================
      SAVE TO ZUSTAND
  ===================== */
  useEffect(() => {
    setStepData("businessName", {
      name,
    });
  }, [name, setStepData]);

  const handleNext = () => {
    if (!name.trim()) return;
    navigate("/apply/about-self");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      <ProgressBar currentStep={10} totalSteps={15} />

      <div className="w-full max-w-2xl bg-white border shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-900 mb-8">
          What is the name of your business?
        </h2>

        <div className="mb-10">
          <label className="block text-sm text-gray-600 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Business Name"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!name.trim()}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg disabled:opacity-50"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
