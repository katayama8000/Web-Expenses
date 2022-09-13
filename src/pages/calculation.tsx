import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";

const Calculation: CustomNextPage = () => {
  return <div className="text-red-300 font-extrabold">Notification!!!</div>;
};

Calculation.getLayout = DashboardLayout;
export default Calculation;
