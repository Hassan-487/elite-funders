
// import { useFormStore } from "@/store/formStore";
// import { buildPayload } from "./payloadBuilder";
// import { CHECKPOINTS } from "./checkpoints";
// import { LS_PROGRESS_KEY } from "@/utils/applicationResume";
// const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;
// const WEB_SOURCE = import.meta.env.VITE_WEB_SOURCE;

// export const triggerCheckpoint = async (checkpointName) => {
//   const checkpointKeys = Object.keys(CHECKPOINTS);
//   const checkpointIndex = checkpointKeys.indexOf(checkpointName);

//   if (checkpointIndex === -1) {
//     console.error("Invalid checkpoint:", checkpointName);
//     return;
//   }

//   //  COLLECT ALL SLICES UP TO THIS CHECKPOINT
//   const slicesToSend = checkpointKeys
//     .slice(0, checkpointIndex + 1)
//     .flatMap((key) => CHECKPOINTS[key]);

//   const store = useFormStore.getState();
  
//    const flatPayload = buildPayload(store, slicesToSend);
// const finalPayload = {
//     fields: {
//       ...flatPayload,
//       WEB_SOURCE,
//     },
//   };
//   console.group(`🚀 ${checkpointName} (CUMULATIVE PAYLOAD)`);
//   console.log(finalPayload);
//   console.groupEnd();

//   return fetch(WEBHOOK_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(finalPayload),
//   });
// };



import { useFormStore } from "@/store/formStore";
import { buildPayload } from "./payloadBuilder";
import { CHECKPOINTS } from "./checkpoints";
import { LS_PROGRESS_KEY } from "@/utils/applicationResume";

const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;
const WEB_SOURCE = import.meta.env.VITE_WEB_SOURCE;

export const triggerCheckpoint = async (checkpointName) => {
  const checkpointKeys = Object.keys(CHECKPOINTS);
  const checkpointIndex = checkpointKeys.indexOf(checkpointName);

  if (checkpointIndex === -1) {
    console.error("Invalid checkpoint:", checkpointName);
    return;
  }

  // Collect slices up to this checkpoint
  const slicesToSend = checkpointKeys
    .slice(0, checkpointIndex + 1)
    .flatMap((key) => CHECKPOINTS[key]);

  const store = useFormStore.getState();

  const flatPayload = buildPayload(store, slicesToSend);

  const finalPayload = {
    fields: {
      ...flatPayload,
      WEB_SOURCE,
    },
  };

  console.group(`🚀 ${checkpointName} (CUMULATIVE PAYLOAD)`);
  console.log(finalPayload);
  console.groupEnd();

  try {
    // 🔹 REPLACE return fetch WITH await fetch
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalPayload),
    });

    // ✅ Save checkpoint ONLY if webhook succeeded
    if (response.ok) {
      localStorage.setItem(
        LS_PROGRESS_KEY,
        JSON.stringify({
          lastCheckpoint: checkpointName,
          updatedAt: Date.now(),
        })
      );
    }

    return response;
  } catch (err) {
    console.error("❌ Checkpoint webhook failed:", err);
    throw err;
  }
};