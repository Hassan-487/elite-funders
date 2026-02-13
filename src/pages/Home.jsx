import { CheckCircle, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center py-16 sm:py-20">

      {/* Badge */}
      <div className="flex items-center gap-2 px-5 py-2 bg-blue-50 rounded-full text-blue-600 font-medium text-xs sm:text-sm mb-6 sm:mb-8">
        <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5" />
        Get Pre-Approved in Minutes
      </div>

      {/* Heading */}
      <div className="text-center max-w-lg mb-8 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900">
          Business Funding
        </h2>
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">
          Made Simple
        </h2>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">
          Complete our quick application to see how much funding you qualify for.
          No credit impact.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-4">

        {/* Start New */}
        <div
          onClick={() => navigate("/apply")}
          className="p-6 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white"
        >
          <h3 className="font-semibold text-lg mb-2">
            Start New Application
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Begin a fresh application for business funding
          </p>
          <span className="text-blue-600 text-sm font-medium">
            Get started →
          </span>
        </div>

        {/* Continue */}
        <div
          onClick={() => navigate("/resume")}
          className="p-6 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white"
        >
          <h3 className="font-semibold text-lg mb-2">
            Continue Existing
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Resume your previously saved application
          </p>
          <span className="text-gray-400 text-sm font-medium">
            Get started →
          </span>
        </div>

      </div>

      {/* Bottom Features */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>5-Minute Application</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Instant Pre-Approval</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>$5K - $500K Funding</span>
        </div>
      </div>

    </main>
  );
}
