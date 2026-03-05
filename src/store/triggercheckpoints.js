


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

/* BUILD BUSINESS OWNERS ARRAY */

const owners = [];

if (store.businessOwner?.["Business Owner First Name"]) {
  owners.push({
    first_name: store.businessOwner["Business Owner First Name"],
    last_name: store.businessOwner["Business Owner Last Name"],
    phone: store.businessOwner["Business Owner Phone Number"],
    email: store.businessOwner["Business Owner Email Address"],
    street_address: store.businessOwner["Business Owner Street Address"],
    city: store.businessOwner["Business Owner City"],
    state: store.businessOwner["Business Owner State"],
    zip: store.businessOwner["Business Owner Zip"],
    ownership_percent: store.businessOwner["Ownership %"],
    dob: store.businessOwner["Business Owner Date of Birth"],
    ssn: store.businessOwner["Business Owner Social Security No"],
  });
}

if (store.secondBusinessOwner?.["Second Business Owner First Name"]) {
  owners.push({
    first_name: store.secondBusinessOwner["Second Business Owner First Name"],
    last_name: store.secondBusinessOwner["Second Business Owner Last Name"],
    phone: store.secondBusinessOwner["Second Business Owner Phone Number"],
    email: store.secondBusinessOwner["Second Business Owner Email Address"],
    street_address:
      store.secondBusinessOwner["Second Business Owner Street Address"],
    city: store.secondBusinessOwner["Second Business Owner City"],
    state: store.secondBusinessOwner["Second Business Owner State"],
    zip: store.secondBusinessOwner["Second Business Owner Zip"],
    ownership_percent:
      store.secondBusinessOwner["Second Business Owner Ownership %"],
    dob: store.secondBusinessOwner["Second Business Owner Date of Birth"],
    ssn:
      store.secondBusinessOwner[
        "Second Business Owner Social Security No"
      ],
  });
}

const finalPayload = {
  fields: {
    ...flatPayload,
    WEB_SOURCE,
    ...(owners.length > 0 && { business_owners: owners }),
  },
};
  // console.group(`🚀 ${checkpointName} (CUMULATIVE PAYLOAD)`);
  // console.log(finalPayload);
  // console.groupEnd();

  try {
    
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalPayload),
    });

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
    console.error(" Checkpoint webhook failed:", err);
    throw err;
  }
};