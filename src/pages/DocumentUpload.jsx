

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useEffect,useState } from "react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";
import { triggerCheckpoint } from "@/store/triggercheckpoints";
import { signInWithGoogle } from "@/utils/googleAuth";

import { uploadToDrive } from "@/utils/googleDriveUpload";


export default function UploadBankStatements() {
  const navigate = useNavigate();
const [isUploading, setIsUploading] = useState(false);

  const {
    documentUpload,
    setStepData,
    getAllData,
    clearAll,
  } = useFormStore();

  /* =====================
      FILE HANDLER
  ===================== */
  const handleFileChange = (key, file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    // Store ACTUAL File in Zustand (memory only)
    setStepData("documentUpload", {
      [key]: file,
    });
  };

 
  // useEffect(() => {
  //   console.log("ZUSTAND → documentUpload (FILES):", documentUpload);
  // }, [documentUpload]);

  
const handleSubmit = async () => {
  const store = useFormStore.getState();
  const { one, two, three } = store.documentUpload;

  if (!one || !two || !three) {
    alert("Please upload all three bank statements");
    return;
  }

  try {
    setIsUploading(true); 

    //  Auth first
    await signInWithGoogle();

    //  Upload PDFs → URLs
    const bank1Url = await uploadToDrive(one);
    const bank2Url = await uploadToDrive(two);
    const bank3Url = await uploadToDrive(three);

    //  Upload signature if drawn
    let signatureUrl = null;
    if (store.signature?.mode === "draw") {
      const res = await fetch(store.signature.finalSignature);
      const blob = await res.blob();
      const file = new File([blob], "signature.png", {
        type: "image/png",
      });
      signatureUrl = await uploadToDrive(file);
    }

    //  Store URLs only
    setStepData("documentUpload", {
      one: bank1Url,
      two: bank2Url,
      three: bank3Url,
    });

    setStepData("signature", {
      finalSignature:
        store.signature?.mode === "type"
          ? store.signature.finalSignature
          : signatureUrl,
    });

    await triggerCheckpoint("PAGE_15");

    clearAll();
    navigate("/apply/thank-you");
  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed. Please try again.");
  } finally {
    setIsUploading(false); // 🔵 STOP LOADING
  }
};



  const UploadBox = ({ label, fileKey }) => (
    
    <div className="space-y-2">
      <label className="text-sm text-indigo-900">{label}</label>

      <label className="flex flex-col items-center justify-center gap-2 px-6 py-8 bg-blue-50 border border-dashed rounded-lg cursor-pointer hover:bg-blue-100 transition">
        <Upload className="w-6 h-6 text-blue-600" />

        {documentUpload[fileKey] ? (
          <span className="text-sm text-green-600 font-medium">
            {documentUpload[fileKey].name}
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
     <ProgressBar currentStep={15} totalSteps={15} />
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Upload Bank Statements
        </h2>

        <div className="space-y-6 mt-8">
          <UploadBox label="Bank Statement 1 *" fileKey="one" />
          <UploadBox label="Bank Statement 2 *" fileKey="two" />
          <UploadBox label="Bank Statement 3 *" fileKey="three" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>


<button
  onClick={handleSubmit}
  disabled={isUploading}
  className={`bg-blue-600 text-white px-8 py-3 rounded-lg
    flex items-center justify-center gap-3
    ${isUploading ? "opacity-70 cursor-not-allowed" : ""}
  `}
>
  {isUploading && (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  )}

  <span>
    {isUploading ? "Submitting application…" : "Submit Application"}
  </span>
</button>

         
        </div>
      </div>
    </div>
  );
}
