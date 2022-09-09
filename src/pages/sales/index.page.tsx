import { PageContainer } from "@component/PageContainer";
import { PageContent } from "@component/PageContent";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";
import { PieChart } from "./piechart";
import { Grid } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";

const items = [
  { title: "Mantine", href: "sales/order" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Sales: CustomNextPage = () => {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
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
    </>
  );
};

Sales.getLayout = DashboardLayout;
export default Sales;
