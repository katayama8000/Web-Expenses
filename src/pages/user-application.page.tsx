/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mantine/core";
import React, { useCallback } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "@pages/_layout";
import { CommonApplication } from "@component/application/application";
import { useGetApplication } from "@hooks/application/useGetApplication";
const Application = () => {
  const { application, getApplication } = useGetApplication();

  // const handleDelete = useCallback(async (id: number) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("application")
  //       .delete()
  //       .match({
  //         id: id,
  //       });
  //     console.log(data, error);
  //     if (!data || error) {
  //       return;
  //     }

  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // const handleEdit = async (id: number) => {
  //   try {
  //     const { data, error } = await supabase.from("application").update({
  //       id: id,
  //     });
  //     if (!data || error) {
  //       return;
  //     }
  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <PageContainer title="過去の申請書類">
        <Grid>
          {application &&
            application.map((item) => {
              return (
                <Grid.Col span={4} key={item.id}>
                  <CommonApplication
                    id={item.id}
                    payfor={item.payfor}
                    purpose={item.purpose}
                    detail={item.detail}
                    categoryOfCost={item.categoryOfCost}
                    inside={item.inside}
                    outside={item.outside}
                    paidDate={item.paidDate}
                    cost={item.cost}
                    isApproved={item.isApproved}
                    receipt={item.receipt}
                    userID={item.userID}
                  />
                </Grid.Col>
              );
            })}
        </Grid>
      </PageContainer>
    </div>
  );
};

Application.getLayout = DashboardLayout;
export default Application;
