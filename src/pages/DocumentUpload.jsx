
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useEffect,useState } from "react";
import { useFormStore } from "@/store";
import ProgressBar from "@/components/ProgressBar";
import { triggerCheckpoint } from "@/store/triggercheckpoints";


export default function UploadBankStatements() {
  const navigate = useNavigate();
const [isUploading, setIsUploading] = useState(false);

  const {
    documentUpload,
    setStepData,
    getAllData,
    clearAll,
  } = useFormStore();

const store = useFormStore();
const businessState = store.businessDetails?.state;
const isCalifornia = businessState === "California";
  

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

 const getPreviousMonths = (count) => {
  const months = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString("default", { month: "long" });
    months.push(monthName);
  }

  return months;
};
 
const months = getPreviousMonths(isCalifornia ? 4 : 3);



const handleSubmit = async () => {
  const store = useFormStore.getState();

  const businessName = store.businessName?.name;
  const { mode, finalSignature } = store.signature;
  const { one, two, three, four } = store.documentUpload;

  if (
    !businessName ||
    !one ||
    !two ||
    !three ||
    (isCalifornia && !four)
  ) {
    alert("Missing required data");
    return;
  }

  try {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("business_name", businessName);

    /* ======================
       SIGNATURE HANDLING
    ====================== */

    let signatureFile;

    if (mode === "draw" && finalSignature instanceof File) {
      signatureFile = finalSignature;
    } else {
      // typed signature placeholder
      signatureFile = new File(["typed"], "typed-signature.txt", {
        type: "text/plain",
      });
    }

 
    const files = [
      signatureFile,
      one,
      two,
      three,
    ];

    if (isCalifornia && four) {
      files.push(four);
    }

    files.forEach((file) => {
      formData.append("files", file);
    });

   
    const response = await fetch(
      "https://hook.us2.make.com/diw1njluv115mux5lcqnxyfzqgqiigfu",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();

    const signatureUrl = data?.["Signature URL"];
    const bank1Url = data?.["Bank_Statement_1_URL"];
    const bank2Url = data?.["Bank_Statement_2_URL"];
    const bank3Url = data?.["Bank_Statement_3_URL"];
    const bank4Url = data?.["Bank_Statement_4_URL"];
    const imageId = data?.["Image_ID"];

    

    if (mode === "draw" && signatureUrl) {
      setStepData("signature", {
        finalSignature: signatureUrl,
        Image_ID: imageId,
      });
    }

    /* ======================
       STORE DOCUMENT URLS
    ====================== */

    setStepData("documentUpload", {
      one: bank1Url,
      two: bank2Url,
      three: bank3Url,
      ...(isCalifornia && { four: bank4Url }),
    });

    /* ======================
       FINAL PAYLOAD
    ====================== */

    await triggerCheckpoint("PAGE_15");
    clearAll();  
    navigate("/apply/thank-you");

  } catch (err) {
    console.error(err);
    alert("Submission failed. Please try again.");
  } finally {
    setIsUploading(false);
  }
};


  const UploadBox = ({ label, fileKey }) => (
    
    <div className="space-y-2">
      <label className="text-sm text-indigo-900">{label}</label>

      <label className="flex flex-col items-center justify-center gap-2 px-6 py-8 bg-blue-50 border border-dashed rounded-lg cursor-pointer hover:bg-blue-100 transition">
        <Upload className="w-6 h-6 text-blue-600" />

        {documentUpload[fileKey] instanceof File ? (
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
         <UploadBox label={`Bank Statement of  ${months[0]} *`} fileKey="one" />
<UploadBox label={`Bank Statement of ${months[1]} *`} fileKey="two" />
<UploadBox label={`Bank Statement of ${months[2]} *`} fileKey="three" />

{isCalifornia && (
  <UploadBox label={`Bank Statement of ${months[3]} *`} fileKey="four" />
)}
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
