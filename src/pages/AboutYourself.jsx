 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight, User, Mail, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


export default function AboutYourself() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-32">
      {/* Progress */}
      <div className="w-full max-w-3xl mb-10">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">10</span> of 15
          </div>
          <div className="text-blue-600">73%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 10 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-lg rounded-3xl p-6 sm:p-10">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-8">
          Tell us about yourself
        </h2>

        {/* Form */}
        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="text-sm text-indigo-900">First Name</label>
            <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 py-3 text-gray-500">
              <User className="w-4 h-4" />
              <input
                type="text"
                placeholder="Hammad"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-indigo-900">Last Name</label>
            <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 py-3 text-gray-500">
              <User className="w-4 h-4" />
              <input
                type="text"
                placeholder="Ramzan"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-indigo-900">Email address</label>
            <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 py-3 text-gray-500">
              <Mail className="w-4 h-4" />
              <input
                type="email"
                placeholder="hammadramzan53@gmail.com"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
  <label className="text-sm text-indigo-900">
    Mobile Phone Number
  </label>

  <div className="mt-2">
    <PhoneInput
      country={"uk"}
      value={phone}
      onChange={setPhone}
      inputClass="!w-full !border !rounded-lg !pl-14 !py-3 !text-sm"
      containerClass="!w-full"
      buttonClass="!border-r !rounded-l-lg"
      dropdownClass="!text-sm"
      inputProps={{
        name: "phone",
        required: true,
      }}
    />
  </div>
           </div>


          {/* Consent */}
          <label className="flex gap-3 text-xs text-gray-500 leading-relaxed">
            <input type="checkbox" className="mt-1 accent-blue-600" />
            <span>
              I agree to receive text message notifications from Elite Funders.
              This consent is not a condition of purchase. I agree to the{" "}
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
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          
           <button
  onClick={() => navigate("/apply/buisness-detail")}
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
