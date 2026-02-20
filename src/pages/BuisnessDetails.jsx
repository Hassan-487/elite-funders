

import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
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
  const { businessDetails, setStepData } = useFormStore();

  const [form, setForm] = useState({
    businessName: businessDetails?.businessName ?? "",
    confirmBusinessName: businessDetails?.confirmBusinessName ?? "",
    // startMonth: businessDetails?.startMonth ?? "",
    // startYear: businessDetails?.startYear ?? "",
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

  // useEffect(() => {
  //   console.log("ZUSTAND → businessDetails slice:", businessDetails);
  //  }, [businessDetails]);

  
  const setField = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };


  const formatEIN = (value) => {
  // remove everything except digits
  const digits = value.replace(/\D/g, "").slice(0, 9);

  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


  const handleNext = () => {
    const newErrors = {};

    if (!form.businessName) newErrors.businessName = "Business name is required";
    if (form.confirmBusinessName !== form.businessName)
      newErrors.confirmBusinessName = "Business names do not match";

    // if (!form.startMonth || !form.startYear)
    //   newErrors.date = "Business start date is required";

    if (!emailRegex.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.phone || form.phone.length < 10)
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

    if (Object.keys(newErrors).length === 0) {
      navigate("/apply/owner-info");
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
              onChange={(v) => setField("businessName", v)} error={errors.businessName} />
            <Input label="Confirm Business Name" value={form.confirmBusinessName}
              onChange={(v) => setField("confirmBusinessName", v)} error={errors.confirmBusinessName} />
          </TwoCol>

          {/* {errors.date && <p className="text-xs text-red-500">{errors.date}</p>} */}

          {/* <TwoCol>
            <Input label="Business Start Month (1-12)"
              value={form.startMonth} onChange={(v) => setField("startMonth", v)} />
            <Input label="Business Start Year"
              value={form.startYear} onChange={(v) => setField("startYear", v)} />
          </TwoCol> */}

          {/* EMAIL + PHONE ROW */}
          <TwoCol>
  {/* EMAIL */}
  <Input
    label="Business Email Address"
    value={form.email}
    onChange={(v) => setField("email", v)}
    error={errors.email}
  />

  {/* PHONE */}
  <div className="w-full">
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
  </div>
</TwoCol>


          <Input label="Business Address" value={form.address}
            onChange={(v) => setField("address", v)} error={errors.address} />

          <TwoCol>
            <Input label="City" value={form.city}
              onChange={(v) => setField("city", v)} error={errors.city} />
            <Input label="State" value={form.state}
              onChange={(v) => setField("state", v)} error={errors.state} />
          </TwoCol>

          <TwoCol>
            <Input label="ZIP" value={form.zip}
              onChange={(v) => setField("zip", v)} error={errors.zip} />
              
            <Input label="Federal Tax ID (EIN)"
              placeholder="12-3456789"
              value={form.ein}
              onChange={(v) => {
                const formatted = formatEIN(v);
                setField("ein", formatted);
              }}
              error={errors.ein} />
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



function Input({ label, value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
