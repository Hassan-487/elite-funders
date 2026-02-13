import { CheckCircle, Phone, Mail, ShieldCheck } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white border border-blue-500 shadow-xl rounded-lg p-6 sm:p-10">

        

        {/* Main Message */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            You're Pre-Approved! 🎉
          </h2>

          <p className="font-semibold text-gray-800 mt-4">
            Great news! Your Business Is Eligible for Funding!
          </p>

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            Your application has been successfully matched with one or more of
            our top-tier lending partners. Our underwriting team is reviewing
            your file now to finalize your approval.
          </p>
        </div>

        {/* What to Expect */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-800 mb-4 text-center">
            What to Expect Next:
          </h3>

          <ul className="space-y-4 text-sm text-gray-700">
            <li className="flex gap-3">
              <span>📄</span>
              <span>
                <strong>Additional Info (if needed):</strong> One of our funding
                specialists will contact you if anything else is required.
              </span>
            </li>

            <li className="flex gap-3">
              <span>📬</span>
              <span>
                <strong>Approval Notice:</strong> You’ll receive confirmation
                once your offer is ready.
              </span>
            </li>

            <li className="flex gap-3">
              <span>💸</span>
              <span>
                <strong>Fast Funding:</strong> After approval and offer
                acceptance, funds are typically deposited same-day or next
                business day via ACH or wire.
              </span>
            </li>
          </ul>
        </div>

        {/* Closing Line */}
        <div className="text-center mt-8 font-semibold text-gray-800">
          You're almost there — funding is on the way!
        </div>

        {/* Contact */}
        <div className="mt-10 border-t pt-6 text-center">
          <p className="font-semibold mb-2">Need help?</p>

          <div className="text-sm text-gray-700 space-y-1">
            <p className="flex justify-center items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              (888) 343-1156
            </p>

            <p className="flex justify-center items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Support@EliteFunders.com
            </p>

            <p className="text-xs text-gray-500">
              Hours: Mon–Fri, 9 AM–6 PM EST
            </p>
          </div>
        </div>

        {/* Security */}
        <div className="mt-8 text-center text-xs text-gray-600 space-y-2">
          <div className="flex justify-center items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Data Protected: Your info is 256-bit encrypted
          </div>
          <div>
            No Credit Impact: Only a soft credit check
          </div>
        </div>
      </div>
    </div>
  );
}
