import { ApplicationModel } from "@type/index";
export type UseApplicationModel = {
  application: ApplicationModel[];
  isLoading: boolean;
  getApplication?: () => void;
  getApprovedApplication?: () => void;
  getUnapprovedApplication?: () => void;
};
