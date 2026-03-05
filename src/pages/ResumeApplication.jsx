

import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { STEP_TO_ROUTE } from "@/utils/stepToRoute";

import { useFormStore } from "@/store";
import { resumeApplicationByEmail  } from "@/services/applicationService";
import { findResumeStep } from "@/utils/findResumeStep";
import {
  CHECKPOINT_TO_ROUTE,
  LS_PROGRESS_KEY,
} from "@/utils/applicationResume";

export default function ResumeApplication() {
  const navigate = useNavigate();

  const { clearAll, hydrateFromBackend } = useFormStore();

//   const route = STEP_TO_ROUTE[findResumeStep] || "/apply";
// navigate(route);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);




const handleResume = async () => {
  if (!email.trim()) {
    setError("Please enter your email address.");
    return;
  }

  setLoading(true);
  setNotFound(false);

  try {
    const payload = await resumeApplicationByEmail(email);

    if (payload?.found === false) {
      setNotFound(true);
      return;
    }

    if (payload?.found === true) {
      clearAll();
      hydrateFromBackend(payload.fields); // ✅ FIXED

      // allow Zustand to update before navigation
      setTimeout(() => {
        const step = findResumeStep();
        const route = STEP_TO_ROUTE[step] || "/apply";
         navigate(route);
      }, 0);

      return;
    }
  } catch (err) {
    console.error(err);
    setNotFound(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-3xl p-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-lg mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            Resume Your Application
          </h2>

          <p className="text-gray-500 text-sm max-w-md">
            Enter the email address you used when starting your application.
            We’ll help you continue from where you left off.
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setNotFound(false);
              }}
              placeholder="johndoe@gmail.com"
              className="w-full outline-none text-sm"
            />
          </div>

          <p
            className={`text-xs mt-2 ${
              error ? "text-red-500" : "text-gray-400"
            }`}
          >
            {error ||
              "We'll search for your saved application using this email."}
          </p>
        </div>

        {/* Buttons */}
        {!notFound && (
          <div className="flex justify-between items-center border-t pt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleResume}
              disabled={!email.trim() || loading}
              className={`px-8 py-3 rounded-lg shadow-md transition
                ${
                  email.trim() && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {loading ? "Searching..." : "Find My Application"}
            </button>
          </div>
        )}

        {/* Application Not Found */}
        {notFound && (
          <div className="mt-6 p-5 border border-yellow-200 bg-yellow-50 rounded-xl text-sm">
            <p className="mb-3 text-gray-800 font-medium">
              We couldn’t find an application with this email.
            </p>

            <p className="mb-4 text-gray-600">
              You can start a new application or try another email.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/apply")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                Start New Application
              </button>

              <button
                onClick={() => setNotFound(false)}
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}