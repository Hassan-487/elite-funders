import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { useFormStore } from "@/store"; // or ../store if no alias
import ProgressBar from "@/components/ProgressBar";

export default function BusinessStartDateStep() {
  const navigate = useNavigate();

  const { startDate, setStepData } = useFormStore();

  // Load from store safely
  const [selected, setSelected] = useState(
    startDate?.range ?? "6-9 Months"
  );

  const options = [
    "0-3 Months",
    "3-6 Months",
    "6-9 Months",
    "9-12 Months",
    "More Than 1 year",
  ];

  /* =====================
      SAVE TO STORE
  ===================== */
  useEffect(() => {
    setStepData("startDate", { range: selected });
  }, [selected, setStepData]);

  /* =====================
      DEBUG LOG
  ===================== */
  useEffect(() => {
    console.log("ZUSTAND → startDate slice:", startDate);
  }, [startDate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-2 sm:px-4">
     <ProgressBar currentStep={4} totalSteps={13} />

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            Business Start Date
          </h2>
          <p className="text-gray-500 text-sm">
            (Use acquisition date if not founder)
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {options.map((label) => (
            <div
              key={label}
              onClick={() => setSelected(label)}
              className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl cursor-pointer transition border ${
                selected === label
                  ? "bg-blue-50 border-blue-600 shadow-md"
                  : "bg-white border-gray-200 hover:shadow-sm"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl mb-3 sm:mb-4 transition ${
                  selected === label
                    ? "bg-blue-600 text-white shadow-inner"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                <CalendarDays className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <span className="text-sm font-medium text-gray-700 text-center">
                {label}
              </span>
            </div>
          ))}
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
            onClick={() => navigate("/apply/monthly-revenue")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
