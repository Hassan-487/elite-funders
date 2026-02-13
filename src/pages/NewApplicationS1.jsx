import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight } from "lucide-react";

export default function NewApplicationStep1() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(25000);

  const presetAmounts = [25000, 50000, 100000, 150000, 250000, 500000];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-2 sm:px-4">

      {/* Progress */}
      <div className="w-full max-w-3xl mb-8 sm:mb-10">
        <div className="flex justify-between text-xs sm:text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">1</span> of 15
          </div>
          <div className="text-blue-600">1%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i === 0 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            How much funding do you need?
          </h2>
          <p className="text-gray-500 text-sm">
            Select your desired funding amount
          </p>
        </div>

        {/* Amount */}
        <div className="text-center text-3xl sm:text-5xl font-bold text-blue-600 mb-6">
          ${amount.toLocaleString()}
        </div>

        {/* Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="25000"
            max="500000"
            step="25000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        {/* Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {presetAmounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 rounded-lg border text-sm transition ${
                amount === value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 border-gray-200 hover:bg-gray-200"
              }`}
            >
              ${value.toLocaleString()}
            </button>
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
  onClick={() => navigate("/apply/business-type")}
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
