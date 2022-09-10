import React from "react";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";
import { Grid } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { PageContainer } from "@component/PageContainer";
import { PageContent } from "@component/PageContent";

const items: JSX.Element[] = [
  { title: "受注", href: "sales/order" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Order: CustomNextPage = () => {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
      <PageContainer title="営業">
        <PageContent>
          <Grid>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6}>
              <div className="flex justify-center"></div>
            </Grid.Col>
          </Grid>
        </PageContent>
      </PageContainer>
    </>
  );
};

Order.getLayout = DashboardLayout;
export default Order;
