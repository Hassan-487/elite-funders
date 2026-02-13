import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Send,
  ClipboardList,
  Building,
  Megaphone,
  Rocket,
  CreditCard,
  CarFront,
  Expand,
  Users,
  CircleDollarSign,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  HandHelping,
} from "lucide-react";
import { useFormStore } from "@/store"; 
import ProgressBar from "@/components/ProgressBar";

export default function FundingPurpose() {
  const navigate = useNavigate();
  const { fundingPurpose, setStepData } = useFormStore();

  
  const [selected, setSelected] = useState(
    fundingPurpose?.purpose ?? "Buy a business / franchise"
  );

  const options = [
    { label: "Buy a business / franchise", icon: Briefcase },
    { label: "Remodel my location", icon: Send },
    { label: "Inventory", icon: ClipboardList },
    { label: "Commercial real estate", icon: Building },
    { label: "Marketing", icon: Megaphone },
    { label: "Start a business", icon: Rocket },
    { label: "Equipment purchase", icon: CreditCard },
    { label: "Working capital", icon: HandHelping },
    { label: "Purchase a vehicle", icon: CarFront },
    { label: "Expansion", icon: Expand },
    { label: "Finance accounts receivable", icon: Users },
    { label: "Refinance debt", icon: CircleDollarSign },
    { label: "Others (Specify)", icon: MoreHorizontal },
  ];

  /* =====================
      SAVE TO STORE
  ===================== */
  useEffect(() => {
    setStepData("fundingPurpose", { purpose: selected });
  }, [selected, setStepData]);

  /* =====================
      DEBUG LOG
  ===================== */
  useEffect(() => {
    console.log(
      "ZUSTAND → fundingPurpose slice:",
      fundingPurpose
    );
  }, [fundingPurpose]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-4 pb-32">
      <ProgressBar currentStep={8} totalSteps={13} />

      {/* Card */}
      <div className="w-full max-w-3xl bg-white border border-gray-100 shadow-lg rounded-2xl p-6 sm:p-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            What Do You Need Funding For?
          </h2>
          <p className="text-gray-500 text-sm">
            We have lenders for all credit scenarios
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
          {options.map(({ label, icon: Icon }) => (
            <div
              key={label}
              onClick={() => setSelected(label)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition border ${
                selected === label
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:shadow-sm"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  selected === label
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <span className="text-sm text-center font-medium text-gray-600">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => navigate("/apply/quick-money")}
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
