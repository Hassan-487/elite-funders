
import { useFormStore } from "@/store/formStore";
import { buildPayload } from "./payloadBuilder";
import { CHECKPOINTS } from "./checkpoints";
const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;

export const triggerCheckpoint = async (checkpointName) => {
  const checkpointKeys = Object.keys(CHECKPOINTS);
  const checkpointIndex = checkpointKeys.indexOf(checkpointName);

  if (checkpointIndex === -1) {
    console.error("Invalid checkpoint:", checkpointName);
    return;
  }

  //  COLLECT ALL SLICES UP TO THIS CHECKPOINT
  const slicesToSend = checkpointKeys
    .slice(0, checkpointIndex + 1)
    .flatMap((key) => CHECKPOINTS[key]);

  const store = useFormStore.getState();
  const payload = buildPayload(store, slicesToSend);

  console.group(`🚀 ${checkpointName} (CUMULATIVE PAYLOAD)`);
  console.log(payload);
  console.groupEnd();

  return fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
