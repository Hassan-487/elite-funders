import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Zap,
  CalendarDays,
  Calendar,
  Globe ,
} from "lucide-react";

export default function QuickMoney() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("ASAP (48 hours or less)");

  const options = [
    {
      label: "ASAP (48 hours or less)",
      icon: Zap,
    },
    {
      label: "Within a week",
      icon: CalendarDays,
    },
    {
      label: "Within a month",
      icon: Calendar,
    },
    {
      label: "Unsure, just browsing rates",
      icon: Globe ,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-4 pb-32">
      {/* Progress */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">
            Step <span className="text-blue-600">9</span> of 15
          </span>
          <span className="text-blue-600">65%</span>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 9 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

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
              className={`flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition border
                ${
                  selected === label
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:shadow-sm"
                }
              `}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4
                  ${
                    selected === label
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-blue-600"
                  }
                `}
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
