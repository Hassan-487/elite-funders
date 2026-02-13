import { Mail, ArrowLeft } from "lucide-react";

export default function ResumeApplication() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 px-4">

      {/* Progress Section */}
      <div className="w-full max-w-3xl mb-10">
        
        <div className="flex justify-between text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">1</span> of 8
          </div>
          <div className="text-blue-600">13%</div>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
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
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-3xl p-10">

        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-lg mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            Resume Your Application
          </h2>

          <p className="text-gray-500 text-sm max-w-md">
            Enter the email address you used when starting your application.
            We'll pick up right where you left off.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm text-indigo-900 mb-2">
            Email Address
          </label>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="hammadramzan53@gmail.com"
              className="w-full outline-none text-sm"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            We'll search for your saved application using this email.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center border-t pt-6">

          <button className="flex items-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Find My Application
          </button>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-xs text-gray-500 mt-6">
          Can't find your application?{" "}
          <span className="text-blue-600 font-semibold underline cursor-pointer">
            Start a new one
          </span>
        </div>

      </div>
    </div>
  );
}
