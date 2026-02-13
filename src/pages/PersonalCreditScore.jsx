import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Star,
  ThumbsUp,
  Minus,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { useFormStore } from "@/store"; 
import ProgressBar from "@/components/ProgressBar";

export default function PersonalCreditScoreStep() {
  const {personalCreditScore, setStepData } = useFormStore();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(
    personalCreditScore?.range ?? "Excellent (720+)"
  );

  const options = [
    { label: "Excellent (720+)", icon: BadgeCheck },
    { label: "Great (680–719)", icon: Star },
    { label: "Good (640–679)", icon: ThumbsUp },
    { label: "Fair (600–639)", icon: Minus },
    { label: "Low (550–599)", icon: AlertTriangle },
    { label: "Poor (Below 550)", icon: AlertCircle },
  ];

useEffect(()=>{
  setStepData("personalCreditScore", { range: selected });

},[selected, setStepData]);

 useEffect(() => {
    console.log(
      "ZUSTAND → personalCreditScore slice:",
      personalCreditScore
    );
  }, [personalCreditScore]);
  

  return (
<div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-3 sm:px-4 pb-24 sm:pb-32">
    <ProgressBar currentStep={6} totalSteps={13} />

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            What’s your estimated personal credit score?
          </h2>
          <p className="text-gray-500 text-sm">
            We have lenders for all credit scenarios
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {options.map(({ label, icon: Icon }) => (
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
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl mb-3 transition ${
                  selected === label
                    ? "bg-blue-600 text-white shadow-inner"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <span
                className={`text-sm font-medium text-center ${
                  selected === label ? "text-indigo-900" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

         <button
  onClick={() => navigate("/apply/buisness-industry")}
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
