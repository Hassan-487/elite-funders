import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, Mail } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormStore } from "@/store"; 
import ProgressBar from "@/components/ProgressBar";
import { triggerCheckpoint } from "@/store/triggercheckpoints";
import { useAutoSave } from "@/hooks/AutoSave";

export default function AboutYourself() {
  const navigate = useNavigate();
  const { aboutYourself, setStepData } = useFormStore();
  const [consentChecked, setConsentChecked] = useState(false);
const [popup, setPopup] = useState({
  show: false,
  message: "",
});
  const [form, setForm] = useState({
    firstName: aboutYourself?.firstName ?? "",
    lastName: aboutYourself?.lastName ?? "",
    email: aboutYourself?.email ?? "",
    phone: aboutYourself?.phone ?? "",
  });
 const [isVerifying, setIsVerifying] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleFirstName = (value) => {
  if (!nameRegex.test(value)) {
    setErrors((p) => ({
      ...p,
      firstName: "Numbers and symbols are not allowed",
    }));
  } else {
    setErrors((p) => ({ ...p, firstName: "" }));
  }

  setForm((p) => ({ ...p, firstName: value }));
};

const handleLastName = (value) => {
  if (!nameRegex.test(value)) {
    setErrors((p) => ({
      ...p,
      lastName: "Numbers and symbols are not allowed",
    }));
  } else {
    setErrors((p) => ({ ...p, lastName: "" }));
  }

  setForm((p) => ({ ...p, lastName: value }));
};

  useEffect(() => {
    setStepData("aboutYourself", form);
  }, [form, setStepData]);


  // useEffect(() => {
  //   console.log("ZUSTAND → aboutYourself slice:", aboutYourself);
  // }, [aboutYourself]);

const showPopup = (message) => {
  setPopup({ show: true, message });

  // auto-hide after 3 seconds
  setTimeout(() => {
    setPopup({ show: false, message: "" });
  }, 6000);
};

useAutoSave({
  enabled: true,
  step: "aboutYourself",
});

const validateEmailFE = async (email) => {
  const res = await fetch(
    `https://api.zerobounce.net/v2/validate?api_key=${
      import.meta.env.VITE_ZEROBOUNCE_KEY
    }&email=${encodeURIComponent(email)}`
  );

  return res.json();
};

const validatePhoneFE = async (phone) => {
  const res = await fetch(
    `https://api.veriphone.io/v2/verify?key=${
      import.meta.env.VITE_VERIPHONE_KEY
    }&phone=${encodeURIComponent(phone)}`
  );

  return res.json();
};



const handleNext = async () => {
  const newErrors = {};

  if (!form.firstName)
    newErrors.firstName = "First name is required";

  if (!form.lastName)
    newErrors.lastName = "Last name is required";

  if (!emailRegex.test(form.email))
    newErrors.email = "Enter a valid email address";

  if (!form.phone || form.phone.length < 10)
    newErrors.phone = "Enter a valid phone number";

  if (!consentChecked)
    newErrors.consent = "Consent is required";

  setErrors(newErrors);
  if (Object.keys(newErrors).length !== 0) return;

  // ✅ START VERIFYING
  setIsVerifying(true);

  try {
    const [emailRes, phoneRes] = await Promise.all([
      validateEmailFE(form.email),
      validatePhoneFE(form.phone),
    ]);

    if (emailRes.status !== "valid") {
      setErrors((p) => ({
        ...p,
        email: "Email is not deliverable",
      }));
      showPopup("Please enter a valid, deliverable email address.");
      return;
    }

    if (!phoneRes.phone_valid) {
      setErrors((p) => ({
        ...p,
        phone: "Invalid phone number",
      }));
      showPopup("Please enter a valid mobile phone number.");
      return;
    }

    // ✅ SUCCESS
    triggerCheckpoint("PAGE_11");
    navigate("/apply/pre-approved");

  } catch (err) {
    showPopup("Validation service failed. Please try again.");
  } finally {
    // ✅ ALWAYS RESET
    setIsVerifying(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-32">
      
      <ProgressBar currentStep={11} totalSteps={15} />
      <div className="w-full max-w-2xl bg-white border shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-8">
          Tell us about yourself
        </h2>

        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="text-sm text-indigo-900">First Name</label>
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 py-3">
              <User className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => handleFirstName(e.target.value)}
                placeholder="John"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-indigo-900">Last Name</label>
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 py-3">
              <User className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => handleLastName(e.target.value)}
                placeholder="Davis"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-indigo-900">Email address</label>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 py-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="john.davis@gmail.com"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-indigo-900">
              Mobile Phone Number
            </label>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone}
              </p>
            )}
            <div className="mt-2">
             <PhoneInput
              country="us"
              value={form.phone}
              onChange={(phone) =>
  setForm((p) => ({ ...p, phone: `+${phone}` }))
}
              inputClass="!w-full !border !rounded-lg !pl-14 !py-3 !text-sm"
            />
            </div>
          </div>

          {errors.consent && (
            <p className="text-xs text-red-500">{errors.consent}</p>
          )}
          <label className="flex gap-3 text-xs text-gray-500">
           <input
  type="checkbox"
  checked={consentChecked}
  onChange={(e) => setConsentChecked(e.target.checked)}
  className="accent-blue-600 mt-1"
/>
            <span>
              I agree to receive text messages and accept the{" "}
              <span className="text-blue-600 underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-blue-600 underline">Privacy Policy</span>.
            </span>
          </label>
        </div>

           <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
  onClick={handleNext}
  disabled={isVerifying}
  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg shadow-md transition
    ${isVerifying
      ? "bg-gray-400 cursor-not-allowed text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
>
  {isVerifying ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-white"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Verifying email & phone…
    </>
  ) : (
    <>
      Next
      <ArrowRight className="w-4 h-4" />
    </>
  )}
</button>
        </div>
      </div>
      {popup.show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setPopup({ show: false, message: "" })}
    />

    {/* Modal */}
    <div className="relative bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6 text-center animate-fade-in">
      <h3 className="text-lg font-semibold text-red-600 mb-2">
        Validation Error
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        {popup.message}
      </p>
      <button
        onClick={() => setPopup({ show: false, message: "" })}
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
}
