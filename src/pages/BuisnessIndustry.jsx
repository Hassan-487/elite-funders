import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
   BriefcaseMedical ,
  TrafficCone ,
  Dices ,
  Factory,
  ShoppingBag ,
  HeartHandshake,
  User,
  HeartPulse,
  Cpu,
  Building2,
  Gavel ,
  Truck,
  UtensilsCrossed ,
  Hotel,
  MoreHorizontal,
} from "lucide-react";

export default function BusinessIndustry() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Beauty, Wellness & Fitness");

  const industries = [
    { label: "Beauty, Wellness & Fitness", icon: HeartPulse  },
    { label: "Construction & Contracting", icon: TrafficCone  },
    { label: "Entertainment & Media", icon: Dices  },
    { label: "Manufacturing & Distribution", icon: Factory },
    { label: "Retail & E-Commerce", icon: ShoppingBag  },
    { label: "Nonprofit Organizations", icon: HeartHandshake },
    { label: "Personal Services", icon: User },
    { label: "Healthcare & Medical", icon: BriefcaseMedical  },
    { label: "Technology & IT Services", icon: Cpu },
    { label: "Real Estate", icon: Building2 },
    { label: "Professional Services(Legal,Accounting)", icon: Gavel  },
    { label: "Transportation & Logistics", icon: Truck },
    { label: "Restaurants & Food Services", icon: UtensilsCrossed  },
    { label: "Hospitality & Tourism", icon: Hotel },
    { label: "Others", icon: MoreHorizontal },
  ];

  return (
<div className="min-h-screen bg-white flex flex-col items-center pt-12 sm:pt-20 px-3 sm:px-4 pb-24 sm:pb-32">

      {/* Progress */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between text-xs sm:text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">7</span> of 15
          </div>
          <div className="text-blue-600">50%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 7 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white shadow-lg border border-gray-100 rounded-2xl p-6 sm:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
            Select Your Business Industry
          </h2>
          <p className="text-gray-500 text-sm">
            We have lenders for all credit scenarios
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {industries.map(({ label, icon: Icon }) => (
            <div
              key={label}
              onClick={() => setSelected(label)}
              className={`flex flex-col items-center justify-center p-5 rounded-xl cursor-pointer transition border ${
                selected === label
                  ? "bg-blue-50 border-blue-600 shadow-md"
                  : "bg-white border-gray-200 hover:shadow-sm"
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl mb-3 transition ${
                  selected === label
                    ? "bg-blue-600 text-white shadow-inner"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <span
                className={`text-xs sm:text-sm font-medium text-center leading-tight ${
                  selected === label ? "text-indigo-900" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
  onClick={() => navigate("/apply/funding-purpose")}
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
