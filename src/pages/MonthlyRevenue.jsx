import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight, DollarSign } from "lucide-react";

export default function MonthlyRevenue() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Less than $20,000");

  const options = [
    "Less than $20,000",
    "$20,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000 +",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-2 sm:px-4">

      {/* Progress */}
      <div className="w-full max-w-3xl mb-8 sm:mb-10">
        <div className="flex justify-between text-xs sm:text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">5</span> of 15
          </div>
          <div className="text-blue-600">36%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 5 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            Monthly Revenue?
          </h2>
          <p className="text-gray-500 text-sm">
            (Average last 3 months)
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
                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7" />
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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

           <button
  onClick={() => {
    if (selected === "Less than $20,000") {
      navigate("/apply/rejected");
    } else {
      navigate("/apply/credit-score");
    }
  }}
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
