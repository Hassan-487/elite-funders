import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState,useRef  } from "react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";
import { triggerCheckpoint } from "@/store/triggercheckpoints";
import { useAutoSave } from "@/hooks/AutoSave";


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

export default function BusinessOwnerInformation() {
  const navigate = useNavigate();
  const { secondBusinessOwner, setStepData } = useFormStore();
const [isVerifying, setIsVerifying] = useState(false);
  const [popup, setPopup] = useState({
  show: false,
  message: "",
});
useAutoSave({
  enabled: true,
  step: "businessOwner",
});
const showPopup = (message) => {
  setPopup({ show: true, message });
  setTimeout(() => {
    setPopup({ show: false, message: "" });
  }, 6000);
};
const fieldRefs = {
  "Second Business Owner First Name": useRef(null),
  "Second Business Owner Last Name": useRef(null),
  "Second Business Owner Street Address": useRef(null),
  "Second Business Owner City": useRef(null),
  "Second Business Owner State": useRef(null),
  "Second Business Owner Zip": useRef(null),
  "Second Business Owner Ownership %": useRef(null),
  "Second Business Owner Date of Birth": useRef(null),
  "Second Business Owner Social Security No": useRef(null),
  "Second Business Owner Phone Number": useRef(null),
  "Second Business Owner Email Address": useRef(null),
};

const [form, setForm] = useState({
  "Second Business Owner First Name":
    secondBusinessOwner?.["Second Business Owner First Name"] ?? "",

  "Second Business Owner Last Name":
    secondBusinessOwner?.["Second Business Owner Last Name"] ?? "",

  "Second Business Owner Street Address":
    secondBusinessOwner?.["Second Business Owner Street Address"] ?? "",

  "Second Business Owner City":
    secondBusinessOwner?.["Second Business Owner City"] ?? "",

  "Second Business Owner State":
    secondBusinessOwner?.["Second Business Owner State"] ?? "",

  "Second Business Owner Zip":
    secondBusinessOwner?.["Second Business Owner Zip"] ?? "",

  "Second Business Owner Ownership %":
    secondBusinessOwner?.["Second Business Owner Ownership %"] ?? "",

  "Second Business Owner Date of Birth":
    secondBusinessOwner?.["Second Business Owner Date of Birth"] ?? "",

  "Second Business Owner Social Security No":
    secondBusinessOwner?.["Second Business Owner Social Security No"] ?? "",

  "Second Business Owner Phone Number":
    secondBusinessOwner?.["Second Business Owner Phone Number"] ?? "",

  "Second Business Owner Email Address":
    secondBusinessOwner?.["Second Business Owner Email Address"] ?? "",
});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setStepData("secondBusinessOwner", form);
  }, [form, setStepData]);


const scrollToError = (errors) => {
  const firstKey = Object.keys(errors)[0];

  const ref = fieldRefs[firstKey];

  if (ref?.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    ref.current.focus?.();
  }
};


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
  switch (field) {
    case "Second Business Owner First Name":
      if (!value) return "Required";
      return "";

    case "Second Business Owner Last Name":
      if (!value) return "Required";
      return "";

    case "Second Business Owner Street Address":
      if (!value) return "Required";
      return "";

    case "Second Business Owner City":
      if (!value) return "Required";
      return "";

    case "Second Business Owner State":
      if (!value) return "Required";
      return "";

    case "Second Business Owner Zip":
      if (value && !zipRegex.test(value)) return "ZIP must be 5 digits";
      return "";

    case "Second Business Owner Ownership %":
      const ownership = Number(value);
      if (value && (isNaN(ownership) || ownership < 0 || ownership > 100))
        return "Ownership must be between 0 and 100";
      return "";

    case "Second Business Owner Date of Birth":
      if (value && !isAdult(value)) return "Must be at least 18";
      return "";

    case "Second Business Owner Social Security No":
      if (value && !ssnRegex.test(value)) return "Invalid SSN";
      return "";

    case "Second Business Owner Phone Number":
      const digits = value.replace(/\D/g, "");
      if (digits && digits.length < 10) return "Invalid phone number";
      return "";

    case "Second Business Owner Email Address":
      if (value && !emailRegex.test(value)) return "Invalid email address";
      return "";

    default:
      return "";
  }
};

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

  // const setField = (field, value) => {
  //   setForm((p) => ({ ...p, [field]: value }));
  //   setErrors((p) => ({ ...p, [field]: "" }));
  // };

  

  const formatSSN = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 5);
    const c = digits.slice(5, 9);
    if (digits.length <= 3) return a;
    if (digits.length <= 5) return `${a}-${b}`;
    return `${a}-${b}-${c}`;
  };


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const zipRegex = /^\d{5}$/;
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
 const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

 const isAdult = (dob) => {
  const birth = new Date(dob); // dob = YYYY-MM-DD
  const age =
    new Date(Date.now() - birth.getTime()).getUTCFullYear() - 1970;
  return age >= 18;
};


  const handleNext = async () => {
  const e = {};

  if (!form["Second Business Owner First Name"]) e["Second Business Owner First Name"] = "Required";
  if (!form["Second Business Owner Last Name"]) e["Second Business Owner Last Name"] = "Required";
  if (!form["Second Business Owner Street Address"]) e["Second Business Owner Street Address"] = "Required";
  if (!form["Second Business Owner City"]) e["Second Business Owner City"] = "Required";
  if (!form["Second Business Owner State"]) e["Second Business Owner State"] = "Required";

  if (!zipRegex.test(form["Second Business Owner Zip"]))
    e["Second Business Owner Zip"] = "ZIP must be 5 digits";

  const ownership = Number(form["Second Business Owner Ownership %"]);
  if (isNaN(ownership) || ownership < 0 || ownership > 100)
    e["Second Business Owner Ownership %"] = "Ownership must be between 0 and 100";

  if (!dobRegex.test(form["Second Business Owner Date of Birth"]))
    e["Second Business Owner Date of Birth"] = "Use MM/DD/YYYY";
  else if (!isAdult(form["Second Business Owner Date of Birth"]))
    e["Second Business Owner Date of Birth"] = "Must be at least 18";

  if (!ssnRegex.test(form["Second Business Owner Social Security No"]))
    e["Second Business Owner Social Security No"] = "Invalid SSN";

  if (!form["Second Business Owner Phone Number"] || form["Second Business Owner Phone Number"].length < 10)
    e["Second Business Owner Phone Number"] = "Invalid phone number";

  if (!emailRegex.test(form["Second Business Owner Email Address"]))
    e["Second Business Owner Email Address"] = "Invalid email address";

 setErrors(e);
if (Object.keys(e).length !== 0) {
  scrollToError(e);
  return;
}

setIsVerifying(true);

try {
  // 🔥 FE VALIDATION CALLS
  const [emailRes, phoneRes] = await Promise.all([
    validateEmailFE(form["Second Business Owner Email Address"]),
    validatePhoneFE(form["Second Business Owner Phone Number"]),
  ]);

  // Email decision
  if (emailRes.status !== "valid") {
    setErrors((p) => ({
      ...p,
      "Second Business Owner Email Address": "Email is not deliverable",
    }));
    showPopup("Please enter a valid, deliverable email address.");
    return;
  }

  // Phone decision
  if (!phoneRes.phone_valid) {
    setErrors((p) => ({
      ...p,
      "Second Business Owner Phone Number": "Invalid phone number",
    }));
    showPopup("Please enter a valid mobile phone number.");
    return;
  }

  // ✅ All validations passed
  triggerCheckpoint("PAGE_13");
  navigate("/apply/signature");

} catch (err) {
  showPopup("Validation service failed. Please try again.");
} finally {
  setIsVerifying(false);
}
};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      <ProgressBar currentStep={13} totalSteps={15} />

      <div className="w-full max-w-3xl bg-white border shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Second Business Owner Information
        </h2>

        <div className="space-y-6 mt-8">
          <TwoCol>
            <Input label="First Name" value={form["Second Business Owner First Name"]}
              onChange={(v) => setField("Second Business Owner First Name", v)} 

              error={errors["Second Business Owner First Name"]} inputRef={fieldRefs["Second Business Owner First Name"]}
            />
            <Input label="Last Name" value={form["Second Business Owner Last Name"]}
              onChange={(v) => setField("Second Business Owner Last Name", v)}
              error={errors["Second Business Owner Last Name"]} inputRef={fieldRefs["Second Business Owner Last Name"]}
            />
          </TwoCol>

          <Input label="Street Address"
            value={form["Second Business Owner Street Address"]}
            onChange={(v) => setField("Second Business Owner Street Address", v)}
            error={errors["Second Business Owner Street Address"]} inputRef={fieldRefs["Second Business Owner Street Address"]}
          />

          <ThreeCol>
            <Input label="City" value={form["Second Business Owner City"]}
              onChange={(v) => setField("Second Business Owner City", v)}
              error={errors["Second Business Owner City"]} inputRef={fieldRefs["Second Business Owner City"]}
            />
            <Select label="State" options={US_STATES}
              value={form["Second Business Owner State"]}
              onChange={(v) => setField("Second Business Owner State", v)}
              error={errors["Second Business Owner State"]} inputRef={fieldRefs["Second Business Owner State"]}
            />
            <Input label="Zip" inputMode="numeric"
              value={form["Second Business Owner Zip"]}
              onChange={(v) => setField("Second Business Owner Zip", v)}
              error={errors["Second Business Owner Zip"]} inputRef={fieldRefs["Second Business Owner Zip"]}
            />
          </ThreeCol>

          <Input label="Second Business Owner Ownership %" inputMode="numeric"
            value={form["Second Business Owner Ownership %"]}
            onChange={(v) => setField("Second Business Owner Ownership %", v)}
            error={errors["Second Business Owner Ownership %"]} inputRef={fieldRefs["Second Business Owner Ownership %"]}
          />

          <Input 
  label="Date of Birth"
  inputMode="none"
  value={form["Second Business Owner Date of Birth"]}
  onChange={(v) => setField("Second Business Owner Date of Birth", v)}
  error={errors["Second Business Owner Date of Birth"]}  inputRef={fieldRefs["Second Business Owner Date of Birth"]}
  type="date"
  max={new Date().toISOString().split("T")[0]}
/>

          <Input label="Second Business Owner Social Security Number" inputMode="numeric"
            value={form["Second Business Owner Social Security No"]}
            onChange={(v) => setField("Second Business Owner Social Security No", formatSSN(v))}
            error={errors["Second Business Owner Social Security No"]} inputRef={fieldRefs["Second Business Owner Social Security No"]} 
          />

          <div>
            <div ref={fieldRefs["Second Business Owner Phone Number"]}>
            <label className="text-sm text-indigo-900">Second Business Owner Phone Number</label>
            {errors["Second Business Owner Phone Number"] && (
              <p className="text-xs text-red-500">
                {errors["Second Business Owner Phone Number"]}
              </p>
            )}
           <PhoneInput
  country="us"
  value={form["Second Business Owner Phone Number"]}
  onChange={(value) =>
    setField("Second Business Owner Phone Number", `+${value}`)
  }
  inputClass="!w-full !h-[48px] !border !rounded-lg !pl-14 !text-sm"
/>
</div>
          </div>

          <Input label="Second Business Owner Email Address" inputMode="email"
            value={form["Second Business Owner Email Address"]}
            onChange={(v) => setField("Second Business Owner Email Address", v)}
            error={errors["Second Business Owner Email Address"]} inputRef={fieldRefs["Second Business Owner Email Address"]}
          />
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


function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  inputMode = "text",
  type = "text",
  max,
  inputRef,
}) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>

      <p className="text-xs text-red-500 min-h-[18px]">
        {error || ""}
      </p>

      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        max={max}
        className="mt-1 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options, value, onChange, error, inputRef }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>

      <p className="text-xs text-red-500 min-h-[18px]">
        {error || ""}
      </p>

      <select
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border rounded-lg px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}


function TwoCol({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function ThreeCol({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{children}</div>;
}
