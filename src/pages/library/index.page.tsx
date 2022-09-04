import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";

const Library: CustomNextPage = () => {
  return (
    <div className="text-green-500 font-extrabold text-center p-10 text-3xl">
      This page will be a Web library.
    </div>
  );
};

Library.getLayout = DashboardLayout;

export default Library;
