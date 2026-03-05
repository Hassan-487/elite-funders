
// import { getGoogleAccessToken } from "./googleAuth";

// export const uploadToDrive = async (file) => {
//   const accessToken = getGoogleAccessToken();

//   if (!accessToken) {
//     throw new Error("Google not authenticated");
//   }

//   // 1️⃣ Metadata
//   const metadata = {
//     name: file.name,
//     mimeType: file.type,
//   };

//   const formData = new FormData();
//   formData.append(
//     "metadata",
//     new Blob([JSON.stringify(metadata)], {
//       type: "application/json",
//     })
//   );
//   formData.append("file", file);

//   // 2️⃣ Upload file
//   const uploadRes = await fetch(
//     "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: formData,
//     }
//   );

//   const uploadData = await uploadRes.json();
//   const fileId = uploadData.id;

//   if (!fileId) {
//     throw new Error("Drive upload failed");
//   }

//   // 3️⃣ Make file public
//   await fetch(
//     `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         type: "anyone",
//         role: "reader",
//       }),
//     }
//   );

//   // ✅ OPTION A: return URL string ONLY
//   return `https://drive.google.com/file/d/${fileId}/view`;
// };
