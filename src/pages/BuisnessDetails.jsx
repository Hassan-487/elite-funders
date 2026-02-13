import { useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight  } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

export default function BusinessDetails() {
  const navigate = useNavigate();

  // State Management
  const [phone, setPhone] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [dateError, setDateError] = useState("");

  /* =====================
      Date Validation
  ===================== */
  const validateBusinessDate = () => {
    const month = Number(startMonth);
    const year = Number(startYear);

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Feb is 2
    const currentYear = now.getFullYear();  // 2026

    if (!startMonth || !startYear) {
      return "Please enter both month and year.";
    }

    if (month < 1 || month > 12) {
      return "Month must be between 1 and 12.";
    }

    if (year < 1900) {
      return "Year must be 1900 or later.";
    }

    // Check if the year is in the future
    if (year > currentYear) {
      return "Business start date cannot be in the future.";
    }

    // Check if same year but future month (e.g., March 2026)
    if (year === currentYear && month > currentMonth) {
      return `For ${currentYear}, the month cannot be later than ${currentMonth}.`;
    }

    return "";
  };

  const handleNext = () => {
    const error = validateBusinessDate();
    if (error) {
      setDateError(error);
      return;
    }
    setDateError("");
    navigate("/apply/signature");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      {/* Progress */}
      <div className="w-full max-w-3xl mb-10">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">11</span> of 15
          </div>
          <div className="text-blue-600">83%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 11 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white border border-gray-100 shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Business Details
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2 mb-8">
          (Use acquisition date if not founder)
        </p>

        {/* FORM */}
        <div className="space-y-6">
          {/* Error Display */}
          {dateError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{dateError}</p>
            </div>
          )}

          {/* Business Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Business Name" placeholder="Elite Funders LLC" />
            <Input label="Confirm Business Name" placeholder="Elite Funders LLC" />
          </div>

          {/* Start Month / Year - Changed to Inputs with Validation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-indigo-900">Business Start Month (1-12)</label>
              <input
                type="number"
                value={startMonth}
                onChange={(e) => {
                  setStartMonth(e.target.value);
                  setDateError("");
                }}
                placeholder="e.g. 2"
                className={`mt-2 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 ${
                  dateError ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-indigo-900">Business Start Year</label>
              <input
                type="number"
                value={startYear}
                onChange={(e) => {
                  setStartYear(e.target.value);
                  setDateError("");
                }}
                placeholder="e.g. 2015"
                className={`mt-2 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 ${
                  dateError ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
            </div>
          </div>

          {/* DBA */}
          <Input label="DBA (if applicable)" placeholder="-" />

          {/* Contact + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-indigo-900">Mobile Phone Number</label>
              <div className="mt-2">
                <PhoneInput
                  country={"pk"} // Changed to Pakistan as per your profile info
                  value={phone}
                  onChange={setPhone}
                  inputClass="!w-full !border !rounded-lg !pl-14 !py-3 !text-sm"
                  containerClass="!w-full"
                  buttonClass="!border-r !rounded-l-lg"
                  dropdownClass="!text-sm"
                  inputProps={{ name: "phone", required: true }}
                />
              </div>
            </div>
            <Input label="Email address (Optional)" placeholder="example@email.com" />
          </div>

          <Input label="Business Address" placeholder="Street address" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="City" placeholder="Lahore" />
            <Input label="State" placeholder="Punjab" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Zip" placeholder="54000" />
            <Input label="Federal Tax ID (EIN)" placeholder="12-3456789" />
          </div>

          {/* State of Incorporation - Kept as Select for professional selection */}
          <Select label="State of Incorporation" options={["Punjab", "Sindh", "KPK", "Balochistan"]} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
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
    Reusable Components
===================== */

function Input({ label, placeholder }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options = [] }) {
  return (
    <div>
      <label className="text-sm text-indigo-900">{label}</label>
      <select className="mt-2 w-full border rounded-lg px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}