import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set, get) => ({
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

      /* =====================
          ACTIONS
      ===================== */
      setStepData: (step, data) =>
        set((state) => ({
          [step]: {
            ...state[step],
            ...data,
          },
        })),

      getAllData: () => get(),

      clearAll: () =>
        set({
          businessName: {},
            NewApplication: {},
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
          QuickMoney: {},
          businessOwner: {},
        }),
    }),
    {
      name: "elite-funder-application", // localStorage key
      partialize: (state) => ({
        businessName: state.businessName,
        NewApplication: state.NewApplication,
        aboutYourself: state.aboutYourself,
        businessDetails: state.businessDetails,
        businessIndustry: state.businessIndustry,
        businessType: state.businessType,
        fundingPurpose: state.fundingPurpose,
        monthlyRevenue: state.monthlyRevenue,
        personalCreditScore: state.personalCreditScore,
        startDate: state.startDate,
        signature: state.signature,
        businessOwner: state.businessOwner,
          QuickMoney: state.QuickMoney, 
        // ⚠️ bankAccount can be excluded later if sensitive
      }),
    }
  )
);
