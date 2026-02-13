export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round(
    (currentStep / totalSteps) * 100
  );

  return (
    <div className="w-full max-w-3xl mb-8 sm:mb-10">
      {/* Top text */}
      <div className="flex justify-between text-xs sm:text-sm mb-2">
        <div className="text-gray-500">
          Step <span className="text-blue-600">{currentStep}</span> of {totalSteps}
        </div>
        <div className="text-blue-600">{percentage}%</div>
      </div>

      {/* Bars */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i < currentStep
                ? "bg-blue-600"
                : "bg-blue-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
