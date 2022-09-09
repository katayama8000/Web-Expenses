import { PageContainer } from "@component/PageContainer";
import { PageContent } from "@component/PageContent";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";
import { PieChart } from "./piechart";
import { Grid } from "@mantine/core";

const Sales: CustomNextPage = () => {
  return (
    <PageContainer title="営業">
      <PageContent>
        <Grid>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}>
            <div className="flex justify-center">
              <PieChart width={230} height={230} />
            </div>
          </Grid.Col>
        </Grid>
      </PageContent>
    </PageContainer>
  );
};

Sales.getLayout = DashboardLayout;
export default Sales;
