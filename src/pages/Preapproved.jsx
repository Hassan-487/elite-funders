import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PreApproved() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-3xl border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-600 flex items-center justify-center">
            <Check className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Congratulations! You Are Pre-Approved For Funding!
        </h1>

        {/* Button */}
        <button
          onClick={() => navigate("/apply/business-detail")}
          className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Complete Application
        </button>
      </div>
    </div>
  );
}
