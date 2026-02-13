export default function ApplicationRejection() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Thank You For Your Interest!
        </h1>

        {/* Message */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Thank you for submitting your application to Elite Funders. After
          careful review, your business doesn’t yet meet our current minimum
          requirements for funding.
        </p>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          We’d still love to work with you as your business grows. In the
          meantime, the alternative funding options below can help you secure
          capital or build credit for the future.
        </p>

        {/* Links */}
        <div className="flex flex-col gap-3 pt-2">
          <a
            href="#"
            className="text-blue-600 font-medium hover:underline"
          >
            Low Credit Finance – up to $5k for lower credit profiles
          </a>

          <a
            href="#"
            className="text-blue-600 font-medium hover:underline"
          >
            Super Personal Finder – personal loans up to $50k
          </a>

          <a
            href="#"
            className="text-blue-600 font-medium hover:underline"
          >
            LoanRaptor – same-day approvals for working-capital loans
          </a>
        </div>

        {/* Support */}
        <div className="pt-6 text-xs sm:text-sm text-gray-500 leading-relaxed">
          <p>
            Have any questions about qualifying or want advice on next steps?
          </p>
          <p>
            Simply reply to this email or call us at{" "}
            <span className="font-medium text-gray-700">(888) 343-1156</span>.
            We’re here to help.
          </p>
        </div>

        {/* Signature */}
        <div className="pt-4 text-xs sm:text-sm text-gray-500">
          <p>Warm regards,</p>
          <p className="font-medium text-gray-700">
            The Elite Funders Team
          </p>
        </div>
      </div>
    </div>
  );
}
