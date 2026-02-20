import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";
import { triggerCheckpoint } from "@/store/triggercheckpoints";


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
  const { businessOwner, setStepData } = useFormStore();

  const [form, setForm] = useState({
    "Business Owner First Name": businessOwner?.["Business Owner First Name"] ?? "",
    "Business Owner Last Name": businessOwner?.["Business Owner Last Name"] ?? "",
    "Business Owner Street Address": businessOwner?.["Business Owner Street Address"] ?? "",
    "Business Owner City": businessOwner?.["Business Owner City"] ?? "",
    "Business Owner State": businessOwner?.["Business Owner State"] ?? "",
    "Business Owner Zip": businessOwner?.["Business Owner Zip"] ?? "",
    "Ownership %": businessOwner?.["Ownership %"] ?? "",
    "Business Owner Date of Birth": businessOwner?.["Business Owner Date of Birth"] ?? "",
    "Business Owner Social Security No": businessOwner?.["Business Owner Social Security No"] ?? "",
    "Business Owner Phone Number": businessOwner?.["Business Owner Phone Number"] ?? "",
    "Business Owner Email Address": businessOwner?.["Business Owner Email Address"] ?? "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setStepData("businessOwner", form);
  }, [form, setStepData]);

//  useEffect(() => {
//     console.log("ZUSTAND → businessOwner slice:", businessOwner);
//    }, [businessOwner]);

  const setField = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const formatDOB = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const m = digits.slice(0, 2);
    const d = digits.slice(2, 4);
    const y = digits.slice(4, 8);
    if (digits.length <= 2) return m;
    if (digits.length <= 4) return `${m}/${d}`;
    return `${m}/${d}/${y}`;
  };

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
  const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

  const isAdult = (dob) => {
    const [m, d, y] = dob.split("/").map(Number);
    const birth = new Date(y, m - 1, d);
    const age = new Date(Date.now() - birth.getTime()).getUTCFullYear() - 1970;
    return age >= 18;
  };


  const handleNext = async () => {
  const e = {};

  if (!form["Business Owner First Name"]) e["Business Owner First Name"] = "Required";
  if (!form["Business Owner Last Name"]) e["Business Owner Last Name"] = "Required";
  if (!form["Business Owner Street Address"]) e["Business Owner Street Address"] = "Required";
  if (!form["Business Owner City"]) e["Business Owner City"] = "Required";
  if (!form["Business Owner State"]) e["Business Owner State"] = "Required";

  if (!zipRegex.test(form["Business Owner Zip"]))
    e["Business Owner Zip"] = "ZIP must be 5 digits";

  const ownership = Number(form["Ownership %"]);
  if (isNaN(ownership) || ownership < 0 || ownership > 100)
    e["Ownership %"] = "Ownership must be between 0 and 100";

  if (!dobRegex.test(form["Business Owner Date of Birth"]))
    e["Business Owner Date of Birth"] = "Use MM/DD/YYYY";
  else if (!isAdult(form["Business Owner Date of Birth"]))
    e["Business Owner Date of Birth"] = "Must be at least 18";

  if (!ssnRegex.test(form["Business Owner Social Security No"]))
    e["Business Owner Social Security No"] = "Invalid SSN";

  if (!form["Business Owner Phone Number"] || form["Business Owner Phone Number"].length < 10)
    e["Business Owner Phone Number"] = "Invalid phone number";

  if (!emailRegex.test(form["Business Owner Email Address"]))
    e["Business Owner Email Address"] = "Invalid email address";

  setErrors(e);

  if (Object.keys(e).length !== 0) return;

  try {
    
    await triggerCheckpoint("PAGE_13");

    navigate("/apply/signature");
  } catch (err) {
    console.error("PAGE_12 checkpoint failed:", err);
  }
};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      <ProgressBar currentStep={13} totalSteps={15} />

      <div className="w-full max-w-3xl bg-white border shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Business Owner Information
        </h2>

        <div className="space-y-6 mt-8">
          <TwoCol>
            <Input label="First Name" value={form["Business Owner First Name"]}
              onChange={(v) => setField("Business Owner First Name", v)}
              error={errors["Business Owner First Name"]}
            />
            <Input label="Last Name" value={form["Business Owner Last Name"]}
              onChange={(v) => setField("Business Owner Last Name", v)}
              error={errors["Business Owner Last Name"]}
            />
          </TwoCol>

          <Input label="Street Address"
            value={form["Business Owner Street Address"]}
            onChange={(v) => setField("Business Owner Street Address", v)}
            error={errors["Business Owner Street Address"]}
          />

          <ThreeCol>
            <Input label="City" value={form["Business Owner City"]}
              onChange={(v) => setField("Business Owner City", v)}
              error={errors["Business Owner City"]}
            />
            <Select label="State" options={US_STATES}
              value={form["Business Owner State"]}
              onChange={(v) => setField("Business Owner State", v)}
              error={errors["Business Owner State"]}
            />
            <Input label="Zip" inputMode="numeric"
              value={form["Business Owner Zip"]}
              onChange={(v) => setField("Business Owner Zip", v)}
              error={errors["Business Owner Zip"]}
            />
          </ThreeCol>

          <Input label="Ownership %" inputMode="numeric"
            value={form["Ownership %"]}
            onChange={(v) => setField("Ownership %", v)}
            error={errors["Ownership %"]}
          />

          <Input label="Date of Birth (MM/DD/YYYY)" inputMode="numeric"
            value={form["Business Owner Date of Birth"]}
            onChange={(v) => setField("Business Owner Date of Birth", formatDOB(v))}
            error={errors["Business Owner Date of Birth"]}
          />

          <Input label="Social Security Number" inputMode="numeric"
            value={form["Business Owner Social Security No"]}
            onChange={(v) => setField("Business Owner Social Security No", formatSSN(v))}
            error={errors["Business Owner Social Security No"]}
          />

          <div>
            <label className="text-sm text-indigo-900">Phone Number</label>
            {errors["Business Owner Phone Number"] && (
              <p className="text-xs text-red-500">
                {errors["Business Owner Phone Number"]}
              </p>
            )}
           <PhoneInput
  country="us"
  value={form["Business Owner Phone Number"]}
  onChange={(value) =>
    setField("Business Owner Phone Number", `+${value}`)
  }
  inputClass="!w-full !h-[48px] !border !rounded-lg !pl-14 !text-sm"
/>

          </div>

          <Input label="Email Address" inputMode="email"
            value={form["Business Owner Email Address"]}
            onChange={(v) => setField("Business Owner Email Address", v)}
            error={errors["Business Owner Email Address"]}
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

/* =====================
    UI HELPERS
===================== */

function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  inputMode = "text",
}) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-2 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border rounded-lg px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
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
