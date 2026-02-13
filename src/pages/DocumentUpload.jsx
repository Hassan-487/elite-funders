import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";

export default function UploadBankStatements() {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    one: null,
    two: null,
    three: null,
  });

  const handleFileChange = (key, file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const UploadBox = ({ label, fileKey }) => (
    <div className="space-y-2">
      <label className="text-sm text-indigo-900">{label}</label>

      <label className="flex flex-col items-center justify-center gap-2 px-6 py-8 bg-blue-50 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-blue-100 transition text-center">
        <Upload className="w-6 h-6 text-blue-600" />

        {files[fileKey] ? (
          <span className="text-sm text-green-600 font-medium">
            {files[fileKey].name}
          </span>
        ) : (
          <span className="text-sm text-gray-600">
            Drag & drop PDF here or{" "}
            <span className="text-blue-600 underline">Choose file</span>
          </span>
        )}

        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFileChange(fileKey, e.target.files[0])}
        />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12 pb-40">
      {/* Progress */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-gray-500">
            Step <span className="text-blue-600">2</span> of 15
          </div>
          <div className="text-blue-600">12%</div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < 2 ? "bg-blue-600" : "bg-blue-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-100 rounded-3xl p-6 sm:p-10">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Upload Bank Statements
        </h2>

        <p className="text-center text-sm text-gray-500 mt-2">
          Upload PDF bank statements for the last three months
        </p>

        <p className="text-center text-xs text-gray-500 mt-1 mb-8">
          Max 100MB each ·{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Privacy Policy
          </span>
        </p>

        {/* Upload Fields */}
        <div className="space-y-6">
          <UploadBox label="Bank Statement 1 *" fileKey="one" />
          <UploadBox label="Bank Statement 2 *" fileKey="two" />
          <UploadBox label="Bank Statement 3 *" fileKey="three" />
        </div>

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
              if (!files.one || !files.two || !files.three) {
                alert("Please upload all three bank statements");
                return;
              }
              navigate("/apply/next-step");
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Sumbit
          </button>
        </div>

       
      </div>
    </div>
  );
}
