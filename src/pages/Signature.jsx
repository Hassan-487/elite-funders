import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

export default function Signature() {
  const navigate = useNavigate();
  const sigRef = useRef(null);

  const [mode, setMode] = useState("type"); // type | draw
  const [typedName, setTypedName] = useState("");
  const [drawnSignature, setDrawnSignature] = useState(null);

  const clearSignature = () => {
    if (mode === "draw") {
      sigRef.current.clear();
      setDrawnSignature(null);
    } else {
      setTypedName("");
    }
  };

  const saveDrawnSignature = () => {
    if (!sigRef.current.isEmpty()) {
      setDrawnSignature(sigRef.current.toDataURL());
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-40">
      {/* Progress */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">12</span> of 15
          </div>
          <div className="text-blue-600">90%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 12 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-3xl p-6 sm:p-10">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Signature
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2 mb-8">
          Please provide your signature to complete the application
        </p>

        {/* Toggle */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setMode("draw")}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              mode === "draw"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Draw Signature
          </button>
          <button
            onClick={() => setMode("type")}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              mode === "type"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Type Signature
          </button>
        </div>

        {/* TYPE SIGNATURE */}
        {mode === "type" && (
          <>
            <input
              type="text"
              placeholder="Type your full name"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              className="w-full border rounded-lg px-4 py-4 text-center text-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-6 h-40 border rounded-lg flex items-center justify-center bg-gray-50">
              {typedName ? (
                <span
                  className="text-5xl text-green-600"
                  style={{ fontFamily: "'Bilbo Swash Caps', cursive" }}
                >
                  {typedName}
                </span>
              ) : (
                <span className="text-gray-400">
                  Your signature will appear here
                </span>
              )}
            </div>
          </>
        )}

        {/* DRAW SIGNATURE */}
        {mode === "draw" && (
          <>
            <div className="border rounded-lg bg-gray-50">
              <SignatureCanvas
                ref={sigRef}
                penColor="#10B981"
                canvasProps={{
                  width: 520,
                  height: 200,
                  className: "w-full h-48 rounded-lg",
                }}
                onEnd={saveDrawnSignature}
              />
            </div>

            <div className="mt-6 h-40 border rounded-lg flex items-center justify-center bg-white">
              {drawnSignature ? (
                <img
                  src={drawnSignature}
                  alt="Signature"
                  className="h-32 object-contain"
                />
              ) : (
                <span className="text-gray-400">
                  Your signature will appear here
                </span>
              )}
            </div>
          </>
        )}

        {/* Info */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg text-xs text-gray-600">
          By signing below, I certify that the information provided in this
          application is true and accurate to the best of my knowledge.
        </div>

        {/* Clear */}
        <button
          onClick={clearSignature}
          className="mt-3 text-blue-600 text-sm underline"
        >
          Clear
        </button>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

       

          <button
  onClick={() => {
              if (mode === "type" && !typedName) return;
              if (mode === "draw" && !drawnSignature) return;
              navigate("/apply/doc-upload");
            }}
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
