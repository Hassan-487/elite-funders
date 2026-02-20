import { PAYLOAD_SCHEMA } from "./payloadschema";

export const buildPayload = (store, slices) => {
  const payload = {};

  slices.forEach((sliceKey) => {
    const slice = store[sliceKey];
    const schema = PAYLOAD_SCHEMA[sliceKey];

    if (!slice || !schema) return;

    Object.entries(schema).forEach(([field, config]) => {
       const value = slice[field]; 
       if (value !== undefined && value !== "") 
        { payload[config.key] = config.transform ? config.transform(value, slice) : value;

         } 
        });
  });

  return payload;
};
