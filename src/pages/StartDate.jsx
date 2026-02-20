

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";

export default function BusinessStartDateStep() {
  const navigate = useNavigate();
  const { startDate, setStepData } = useFormStore();

  const [startMonth, setStartMonth] = useState(
    startDate?.startMonth ?? ""
  );
  const [startYear, setStartYear] = useState(
    startDate?.startYear ?? ""
  );

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

 
  const currentYear = new Date().getFullYear();

const years = [
  "Before 1989",
  ...Array.from(
    { length: currentYear - 1989 },
    (_, i) => currentYear - 1 - i
  ),
];


// useEffect(() => {
//   if (!startDate) return;

//   console.log("ZUSTAND → startDate slice:", startDate);

//   if (startDate.startYear) {
//     console.log("ZUSTAND → startYear:", startDate.startYear);
//   }
// }, [startDate]);



  useEffect(() => {
    setStepData("startDate", {
      startMonth,
      startYear,
    });
  }, [startMonth, startYear, setStepData]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-3 sm:px-4">
      <ProgressBar currentStep={4} totalSteps={15} />

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            Business Start Date
          </h2>
          <p className="text-gray-500 text-sm">
            (Use acquisition date if not founder)
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Month
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Year
            </label>
          <select
  value={startYear}
  onChange={(e) => setStartYear(e.target.value)}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
>
  <option value="">Select year</option>

  {years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>

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
            onClick={() => navigate("/apply/monthly-revenue")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            disabled={!startMonth || !startYear}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
