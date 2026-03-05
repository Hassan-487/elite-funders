
import { useAutoSave } from "@/hooks/AutoSave";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect,useRef } from "react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

export default function BusinessDetails() {
  const navigate = useNavigate();
  const { businessDetails, businessName,setStepData } = useFormStore();
  const [isVerifying,setIsVerifying]=useState(false);
const [popup, setPopup] = useState({
  show: false,
  message: "",
});
const refs = {
  businessName: useRef(null),
  confirmBusinessName: useRef(null),
  email: useRef(null),
  phone: useRef(null),
  address: useRef(null),
  city: useRef(null),
  state: useRef(null),
  zip: useRef(null),
  ein: useRef(null),
  incorporationState: useRef(null),
};

const scrollToError = (errors) => {
  const firstErrorField = Object.keys(errors)[0];

  if (refs[firstErrorField]?.current) {
    refs[firstErrorField].current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    refs[firstErrorField].current.focus();
  }
};


useAutoSave({
  enabled: true,
  step: "businessDetails",
});

const showPopup = (message) => {
  setPopup({ show: true, message });
  setTimeout(() => {
    setPopup({ show: false, message: "" });
  }, 6000);
};


  const [form, setForm] = useState({
    businessName: businessDetails?.businessName ?? businessName?.name?? "",
    confirmBusinessName: businessDetails?.confirmBusinessName ??  businessName?.name?? "",
    email: businessDetails?.email ?? "",
    phone: businessDetails?.phone ?? "",
    address: businessDetails?.address ?? "",
    city: businessDetails?.city ?? "",
    state: businessDetails?.state ?? "",
    zip: businessDetails?.zip ?? "",
    ein: businessDetails?.ein ?? "",
    incorporationState: businessDetails?.incorporationState ?? "",
  });

  const [errors, setErrors] = useState({});


  useEffect(() => {
    setStepData("businessDetails", form);
  }, [form, setStepData]);


  

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

const validateField = (field, value, form) => {
  const phoneDigits = form.phone?.replace(/\D/g, "");

  switch (field) {
    case "businessName":
      if (!value) return "Business name is required";
      return "";

    case "confirmBusinessName":
      if (value !== form.businessName)
        return "Business names do not match";
      return "";

    case "email":
      if (value && !emailRegex.test(value))
        return "Enter a valid email address";
      return "";

    case "phone":
      const digits = value.replace(/\D/g, "");
      if (digits && digits.length < 10)
        return "Valid phone number is required";
      return "";

    case "address":
      if (!value) return "Address is required";
      return "";

    case "city":
      if (!value) return "City is required";
      return "";

    case "state":
      if (!value) return "State is required";
      return "";

    case "zip":
      if (!value) return "ZIP is required";
      return "";

    case "ein":
      if (value && !/^\d{2}-\d{7}$/.test(value))
        return "EIN format should be XX-XXXXXXX";
      return "";

    case "incorporationState":
      if (!value) return "Select state of incorporation";
      return "";

    default:
      return "";
  }
};

  // const setField = (field, value) => {
  //   setForm((p) => ({ ...p, [field]: value }));
  //   setErrors((p) => ({ ...p, [field]: "" }));
  // };

const setField = (field, value) => {
  setForm((prev) => {
    const updated = { ...prev, [field]: value };

    const error = validateField(field, value, updated);

    setErrors((p) => ({
      ...p,
      [field]: error,
    }));

    return updated;
  });
};
  const formatEIN = (value) => {
  // remove everything except digits
  const digits = value.replace(/\D/g, "").slice(0, 9);

  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;




const handleNext = async () => {
  const newErrors = {};

  if (!form.businessName)
    newErrors.businessName = "Business name is required";

  if (form.confirmBusinessName !== form.businessName)
    newErrors.confirmBusinessName = "Business names do not match";

  if (!emailRegex.test(form.email))
    newErrors.email = "Enter a valid email address";

  const phoneDigits = form.phone?.replace(/\D/g, "");
  if (!phoneDigits || phoneDigits.length < 10)
    newErrors.phone = "Valid phone number is required";

  if (!form.address) newErrors.address = "Address is required";
  if (!form.city) newErrors.city = "City is required";
  if (!form.state) newErrors.state = "State is required";
  if (!form.zip) newErrors.zip = "ZIP is required";

  if (form.ein && !/^\d{2}-\d{7}$/.test(form.ein))
    newErrors.ein = "EIN format should be XX-XXXXXXX";

  if (!form.incorporationState)
    newErrors.incorporationState = "Select state of incorporation";

  setErrors(newErrors);
  if (Object.keys(newErrors).length !== 0) {
   scrollToError(newErrors);
   return;}
  setIsVerifying(true);

  try {
    const [emailRes, phoneRes] = await Promise.all([
      validateEmailFE(form.email),
      validatePhoneFE(phoneDigits),
    ]);

    if (!emailRes || emailRes.status !== "valid") {
      setErrors((p) => ({ ...p, email: "Email is not deliverable" }));
      showPopup("Please enter a valid, deliverable business email.");
      return;
    }

    if (!phoneRes || !phoneRes.phone_valid) {
      setErrors((p) => ({ ...p, phone: "Invalid phone number" }));
      showPopup("Please enter a valid business phone number.");
      return;
    }
    navigate("/apply/owner-info");

  } catch (err) {
    showPopup("Validation service unavailable. Please try again.");
  } finally {
  
    setIsVerifying(false);
  }
};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      <ProgressBar currentStep={12} totalSteps={15} />

      <div className="w-full max-w-3xl bg-white border shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Business Details
        </h2>

        <div className="space-y-6 mt-8">
          <TwoCol>
            <Input label="Business Name" value={form.businessName}
              onChange={(v) => setField("businessName", v)} error={errors.businessName}   inputRef={refs.businessName} />
            <Input label="Confirm Business Name" value={form.confirmBusinessName}
              onChange={(v) => setField("confirmBusinessName", v)} error={errors.confirmBusinessName}   inputRef={refs.confirmBusinessName} />
          </TwoCol>

        

          {/* EMAIL + PHONE ROW */}
          <TwoCol>
  {/* EMAIL */}
  <Input
    label="Business Email Address"
    value={form.email}
    onChange={(v) => setField("email", v)}
    error={errors.email}
    inputRef={refs.email}
  />

  {/* PHONE */}
  {/* <div className="w-full">
    <label className="text-sm text-indigo-900">Business Phone Number</label>
    {errors.phone && (
      <p className="text-xs text-red-500">{errors.phone}</p>
    )}

    <PhoneInput
      country="us"
      value={form.phone}
     onChange={(phone) => setField("phone", `+${phone}`)}
      containerClass="!w-full"
      inputClass="!w-full !h-[48px] !border !rounded-lg !pl-14 !pr-3 !text-sm focus:!ring-2 focus:!ring-blue-500"
      buttonClass="!border !rounded-l-lg"
    />
  </div> */}
  <div className="w-full">
  <label className="text-sm text-indigo-900">Business Phone Number</label>

  <p className="text-xs text-red-500 h-4">
    {errors.phone || ""}
  </p>
<div ref={refs.phone}>
  <PhoneInput
    country="us"
    value={form.phone}
    onChange={(phone) => setField("phone", `+${phone}`)}
    containerClass="!w-full"
    inputClass="!w-full !h-[48px] !border !rounded-lg !pl-14 !pr-3 !text-sm focus:!ring-2 focus:!ring-blue-500"
  />
  </div>
</div>
</TwoCol>


          <Input label="Business Address" value={form.address}
            onChange={(v) => setField("address", v)} error={errors.address} />

          <TwoCol>
  <Input
    label="City"
    value={form.city}
    onChange={(v) => setField("city", v)}
    error={errors.city}  inputRef={refs.city}
  />

  <Select
    label="State"
    options={US_STATES}
    value={form.state}
    onChange={(v) => setField("state", v)}
    error={errors.state}
  />
</TwoCol>

          <TwoCol>
            <Input label="ZIP" value={form.zip}
              onChange={(v) => setField("zip", v)} error={errors.zip} inputRef={refs.zip} />
              
            <Input label="Federal Tax ID (EIN)"
              placeholder="12-3456789"
              value={form.ein}
              onChange={(v) => {
                const formatted = formatEIN(v);
                setField("ein", formatted);
              }}
              error={errors.ein} inputRef={refs.ein} />
          </TwoCol>

          <Select
            label="State of Incorporation"
            options={US_STATES}
            value={form.incorporationState}
            onChange={(v) => setField("incorporationState", v)}
            error={errors.incorporationState}
          />
        </div>

       <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10">
          <button
            onClick={() => navigate(-2)}
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
      ? "bg-gray-400 cursor-not-allowed"
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



// function Input({ label, value, onChange, placeholder, error }) {
//   return (
//     <div>
//       <label className="text-sm text-indigo-900">{label}</label>
//       {error && <p className="text-xs text-red-500">{error}</p>}
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="mt-2 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function Select({ label, options, value, onChange, error }) {
//   return (
//     <div>
//       <label className="text-sm text-indigo-900">{label}</label>
//       {error && <p className="text-xs text-red-500">{error}</p>}
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="mt-2 w-full border rounded-lg px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">Select</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   );
// }


function Input({ label, value, onChange, placeholder, error, inputRef }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>

      <p className="text-xs text-red-500 min-h-[18px]">{error}</p>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
function Select({ label, options, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>

      <p className="text-xs text-red-500 h-4">
        {error || ""}
      </p>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border rounded-lg px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}


function TwoCol({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
}
