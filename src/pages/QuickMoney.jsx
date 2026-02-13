import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  CalendarDays,
  Calendar,
  Globe,
} from "lucide-react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";

export default function QuickMoney() {
  const navigate = useNavigate();
  const { QuickMoney, setStepData } = useFormStore();

  const [selected, setSelected] = useState(
    QuickMoney?.speed ?? "ASAP (48 hours or less)"
  );

  const options = [
    { label: "ASAP (48 hours or less)", icon: Zap },
    { label: "Within a week", icon: CalendarDays },
    { label: "Within a month", icon: Calendar },
    { label: "Unsure, just browsing rates", icon: Globe },
  ];

  /* =====================
      SAVE TO STORE
  ===================== */
  useEffect(() => {
    setStepData("QuickMoney", { speed: selected });
  }, [selected, setStepData]);

  /* =====================
      DEBUG LOG
  ===================== */
  useEffect(() => {
    console.log("ZUSTAND → QuickMoney slice:", QuickMoney);
  }, [QuickMoney]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-4 pb-32">
    <ProgressBar currentStep={9} totalSteps={13} />

      {/* Card */}
      <div className="w-full max-w-3xl bg-white border border-gray-100 shadow-lg rounded-2xl p-6 sm:p-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900">
            How quickly do you need the money?
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
          {options.map(({ label, icon: Icon }) => (
            <div
              key={label}
              onClick={() => setSelected(label)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition border ${
                selected === label
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:shadow-sm"
              }`}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 ${
                  selected === label
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <span className="text-sm text-center font-medium text-gray-600 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => navigate("/apply/about-self")}
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
