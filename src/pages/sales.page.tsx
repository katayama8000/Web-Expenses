import { PageContainer } from "@component/PageContainer";
import { PageContent } from "@component/PageContent";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/pages/_layout";

const Sales: CustomNextPage = () => {
  return (
    <PageContainer title="営業">
      <PageContent>
        <div className="font-bold">No.1</div>
      </PageContent>
    </PageContainer>
  );
};

Sales.getLayout = DashboardLayout;

export default Sales;
