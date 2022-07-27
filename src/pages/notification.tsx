import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";

const Notification: CustomNextPage = () => {
  return <div className="text-red-300 font-extrabold">Notification!!!</div>;
};

Notification.getLayout = DashboardLayout;

export default Notification;
