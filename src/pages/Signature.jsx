import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";

export default function Signature() {
  const navigate = useNavigate();
  const sigRef = useRef(null);
  const { signature, setStepData } = useFormStore();


  const [mode, setMode] = useState(signature?.mode ?? "type");
  const [typedName, setTypedName] = useState(signature?.typedName ?? "");
  const [drawnSignature, setDrawnSignature] = useState(
    signature?.drawnSignature ?? null
  );

  /* =====================
      SAVE TO STORE
  ===================== */
  useEffect(() => {
    setStepData("signature", {
      mode,
      typedName,
      drawnSignature,
    });
  }, [mode, typedName, drawnSignature, setStepData]);

  
  useEffect(() => {
    console.log("ZUSTAND → signature slice:", signature);
  }, [signature]);

  /* =====================
      HELPERS
  ===================== */
  const clearSignature = () => {
    if (mode === "draw") {
      sigRef.current?.clear();
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
      <ProgressBar currentStep={12} totalSteps={13} />
      

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Signature
        </h2>

        {/* Toggle */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setMode("draw")}
            className={`flex-1 py-3 ${
              mode === "draw"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Draw Signature
          </button>
          <button
            onClick={() => setMode("type")}
            className={`flex-1 py-3 ${
              mode === "type"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Type Signature
          </button>
        </div>

       
{mode === "type" && (
  <>
    <input
      type="text"
      value={typedName}
      onChange={(e) => setTypedName(e.target.value)}
      placeholder="Type your full name"
      className="w-full border rounded-lg px-4 py-4 text-center text-lg outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* PREVIEW */}
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">
        Signature Preview
      </h3>

      <div className="h-44 border rounded-xl flex items-center justify-center bg-gray-50">
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
    </div>
  </>
)}


     
{mode === "draw" && (
  <>
    <div className="border rounded-xl bg-gray-50">
      <SignatureCanvas
        ref={sigRef}
        penColor="#10B981"
        canvasProps={{
          width: 520,
          height: 200,
          className: "w-full h-48 rounded-xl",
        }}
        onEnd={saveDrawnSignature}
      />
    </div>

    {/* PREVIEW */}
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">
        Signature Preview
      </h3>

      <div className="h-44 border rounded-xl flex items-center justify-center bg-white">
        {drawnSignature ? (
          <img
            src={drawnSignature}
            alt="Signature Preview"
            className="h-32 object-contain"
          />
        ) : (
          <span className="text-gray-400">
            Your signature will appear here
          </span>
        )}
      </div>
    </div>
  </>
)}


        {/* Clear */}
       <button
  onClick={clearSignature}
  className="mt-6 px-6 py-3 text-base font-medium text-blue-600 underline rounded-lg hover:bg-blue-50 transition"
>
  Clear Signature
</button>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg"
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
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
