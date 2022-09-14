import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";
import { PageContent } from "@component/PageContent";
import { PageContainer } from "@component/PageContainer";

const Calculation: CustomNextPage = () => {
  return (
    <PageContainer title="経費精算">
      <PageContent className="p-3">Hi Welcome to calculation</PageContent>
    </PageContainer>
  );
};

Calculation.getLayout = DashboardLayout;
export default Calculation;
