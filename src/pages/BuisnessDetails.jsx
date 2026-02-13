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
    startMonth: businessDetails?.startMonth ?? "",
    startYear: businessDetails?.startYear ?? "",
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

 
  useEffect(() => {
    console.log("ZUSTAND → businessDetails slice:", businessDetails);
  }, [businessDetails]);

  /* =====================
      HELPERS
  ===================== */
  const setField = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  

  const handleBusinessName = (value) => {
    if (!value.trim()) {
      setErrors((p) => ({ ...p, businessName: "Business name is required" }));
    } else {
      setErrors((p) => ({ ...p, businessName: "" }));
    }
    setForm((p) => ({ ...p, businessName: value }));
  };

  const handleConfirmBusinessName = (value) => {
    if (value !== form.businessName) {
      setErrors((p) => ({
        ...p,
        confirmBusinessName: "Business names do not match",
      }));
    } else {
      setErrors((p) => ({ ...p, confirmBusinessName: "" }));
    }
    setForm((p) => ({ ...p, confirmBusinessName: value }));
  };

  const handleMonth = (value) => {
    if (!value || value < 1 || value > 12) {
      setErrors((p) => ({ ...p, date: "Month must be between 1 and 12" }));
    } else {
      setErrors((p) => ({ ...p, date: "" }));
    }
    setForm((p) => ({ ...p, startMonth: value }));
  };

  const handleYear = (value) => {
    const year = Number(value);
    const currentYear = new Date().getFullYear();

    if (!year || year < 1900 || year > currentYear) {
      setErrors((p) => ({
        ...p,
        date: "Enter a valid business start year",
      }));
    } else {
      setErrors((p) => ({ ...p, date: "" }));
    }
    setForm((p) => ({ ...p, startYear: value }));
  };

  const handleZip = (value) => {
    if (!/^\d*$/.test(value)) {
      setErrors((p) => ({ ...p, zip: "ZIP must contain only digits" }));
    } else {
      setErrors((p) => ({ ...p, zip: "" }));
    }
    setForm((p) => ({ ...p, zip: value }));
  };

  const handleEin = (value) => {
    if (value && !/^\d{0,2}(-?\d{0,7})?$/.test(value)) {
      setErrors((p) => ({ ...p, ein: "Invalid EIN format" }));
    } else {
      setErrors((p) => ({ ...p, ein: "" }));
    }
    setForm((p) => ({ ...p, ein: value }));
  };

 
  const handleNext = () => {
    const newErrors = {};

    if (!form.businessName) newErrors.businessName = "Business name is required";
    if (form.confirmBusinessName !== form.businessName)
      newErrors.confirmBusinessName = "Business names do not match";

    if (!form.startMonth || !form.startYear)
      newErrors.date = "Business start date is required";

    if (!form.phone || form.phone.length < 10)
      newErrors.phone = "Valid US phone number is required";

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
      navigate("/apply/signature");
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      <ProgressBar currentStep={11} totalSteps={13} />

      {/* Card */}
      <div className="w-full max-w-3xl bg-white border shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Business Details
        </h2>

        {/* FORM */}
        <div className="space-y-6 mt-8">
          <TwoCol>
            <Input label="Business Name" value={form.businessName}
              onChange={handleBusinessName} error={errors.businessName} />
            <Input label="Confirm Business Name" value={form.confirmBusinessName}
              onChange={handleConfirmBusinessName} error={errors.confirmBusinessName} />
          </TwoCol>

          {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}

          <TwoCol>
            <Input label="Business Start Month (1-12)"
              value={form.startMonth} onChange={handleMonth} />
            <Input label="Business Start Year"
              value={form.startYear} onChange={handleYear} />
          </TwoCol>

          <div>
            <label className="text-sm text-indigo-900">Mobile Phone Number</label>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            <PhoneInput
              country="us"
              value={form.phone}
              onChange={(phone) =>
                setForm((p) => ({ ...p, phone }))
              }
              inputClass="!w-full !border !rounded-lg !pl-14 !py-3 !text-sm"
            />
          </div>

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
              onChange={handleZip} error={errors.zip} />
            <Input label="Federal Tax ID (EIN)"
              placeholder="12-3456789"
              value={form.ein}
              onChange={handleEin} error={errors.ein} />
          </TwoCol>

          <Select
            label="State of Incorporation"
            options={US_STATES}
            value={form.incorporationState}
            onChange={(v) => setField("incorporationState", v)}
            error={errors.incorporationState}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-12">
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

/* =====================
    Reusable UI
===================== */

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
