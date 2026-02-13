import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set, get) => ({
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
        }),
    }),
    {
      name: "elite-funder-application", // localStorage key
      partialize: (state) => ({
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
        // ⚠️ bankAccount can be excluded later if sensitive
      }),
    }
  )
);
