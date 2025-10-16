import { create } from "zustand";

type CompanyState = {
  selectedCompanyId: string | null;
};

type CompanyActions = {
  setSelectedCompany: (companyId: string | null) => void;
};

export const useCompanyStore = create<CompanyState & CompanyActions>((set) => ({
  selectedCompanyId: null,

  setSelectedCompany: (companyId) => set({ selectedCompanyId: companyId }),
}));
