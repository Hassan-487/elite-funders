

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set, get) => ({
      /* ===== STATE ===== */
      businessName: {},
      newApplication: {},
      aboutYourself: {},
      businessDetails: {},
      businessIndustry: {},
      businessType: {},
      fundingPurpose: {},
      monthlyRevenue: {},
      personalCreditScore: {},
      bankAccount: {},
      documentUpload: {},
      startDate: {},
      signature: {},
      businessOwner: {},
      secondBusinessOwner: {},
      QuickMoney: {},
      

      /* ===== ACTIONS ===== */
      setStepData: (step, data) =>
        set((state) => ({
          [step]: {
            ...state[step],
            ...data,
          },
        })),

      hydrateFromBackend: (payload) => {
        set(() => ({
          businessName: payload.businessName || {},
          newApplication: payload.newApplication || {},
          aboutYourself: payload.aboutYourself || {},
          businessDetails: payload.businessDetails || {},
          businessIndustry: payload.businessIndustry || {},
          businessType: payload.businessType || {},
          fundingPurpose: payload.fundingPurpose || {},
          monthlyRevenue: payload.monthlyRevenue || {},
          personalCreditScore: payload.personalCreditScore || {},
          bankAccount: payload.bankAccount || {},
          documentUpload: payload.documentUpload || {},
          startDate: payload.startDate || {},
          signature: payload.signature || {},
          businessOwner: payload.businessOwner || {},
          secondBusinessOwner: payload.secondBusinessOwner || {},
          QuickMoney: payload.QuickMoney || {},
        }));
      },

      clearAll: () =>
        set({
          businessName: {},
          newApplication: {},
          aboutYourself: {},
          businessDetails: {},
          businessIndustry: {},
          businessType: {},
          fundingPurpose: {},
          monthlyRevenue: {},
          personalCreditScore: {},
          bankAccount: {},
          documentUpload: {},
          startDate: {},
          signature: {},
          businessOwner: {},
          secondBusinessOwner: {},
          QuickMoney: {},
        }),
    }),
    {
      name: "elite-funder-application",
    }
  )
);