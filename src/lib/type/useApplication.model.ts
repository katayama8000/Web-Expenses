import { ApplicationModel } from "@type/index";
export type UseApplicationModel = {
  application: ApplicationModel[];
  getApplication?: () => void;
  getApprovedApplication?: () => void;
  getUnapprovedApplication?: () => void;
};
