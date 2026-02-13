import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, Mail } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormStore } from "@/store"; 
import ProgressBar from "@/components/ProgressBar";

export default function AboutYourself() {
  const navigate = useNavigate();
  const { aboutYourself, setStepData } = useFormStore();


  const [form, setForm] = useState({
    firstName: aboutYourself?.firstName ?? "",
    lastName: aboutYourself?.lastName ?? "",
    email: aboutYourself?.email ?? "",
    phone: aboutYourself?.phone ?? "",
    consent: aboutYourself?.consent ?? false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: "",
  });

  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  useEffect(() => {
    setStepData("aboutYourself", form);
  }, [form, setStepData]);


  useEffect(() => {
    console.log("ZUSTAND → aboutYourself slice:", aboutYourself);
  }, [aboutYourself]);

 

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

  /* ---------------- SUBMIT VALIDATION ---------------- */

  const handleNext = () => {
    const newErrors = {};

    if (!form.firstName)
      newErrors.firstName = "First name is required";
    else if (!nameRegex.test(form.firstName))
      newErrors.firstName = "Only letters are allowed";

    if (!form.lastName)
      newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(form.lastName))
      newErrors.lastName = "Only letters are allowed";

    if (!emailRegex.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.phone || form.phone.length < 10)
      newErrors.phone = "Enter a valid phone number";

    if (!form.consent)
      newErrors.consent = "Consent is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/apply/buisness-detail");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-32">
      
      <ProgressBar currentStep={10} totalSteps={13} />
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
                country="uk"
                value={form.phone}
                onChange={(phone) =>
                  setForm((p) => ({ ...p, phone }))
                }
                inputClass="!w-full !border !rounded-lg !pl-14 !py-3 !text-sm"
                containerClass="!w-full"
              />
            </div>
          </div>

          {/* Consent */}
          {errors.consent && (
            <p className="text-xs text-red-500">{errors.consent}</p>
          )}
          <label className="flex gap-3 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) =>
                setForm((p) => ({ ...p, consent: e.target.checked }))
              }
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
