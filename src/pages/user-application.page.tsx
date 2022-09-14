/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, LoadingOverlay } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "@pages/_layout";
import { CommonApplication } from "@component/application/application";
import { useGetApplication } from "@hooks/application/useGetApplication";
import { DetailModal } from "@component/modal/detailModal";
const Application = () => {
  const [modalId, setModalId] = useState<number>(0);
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const { application, getApplication, isLoading } = useGetApplication();

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

  const handleWatchDetail = useCallback(async (id: number, index: number) => {
    //setId(id);
    setModalId(index);
    setOpenedApplication(true);
  }, []);

  return (
    <div>
      <PageContainer title="過去の申請書類">
        <Grid>
          {application.length === 0 ? (
            <div className="p-3 text-bold text-3xl m-auto mt-10">
              申請書はありません
            </div>
          ) : (
            application.map((item, index) => {
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
                    handleWatchDetail={() => handleWatchDetail(item.id, index)}
                  />
                </Grid.Col>
              );
            })
          )}
        </Grid>
      </PageContainer>
      <DetailModal
        openedDetail={openedApplication}
        setOpenedDetail={setOpenedApplication}
        application={application}
        modalId={modalId}
      />
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </div>
  );
};

Application.getLayout = DashboardLayout;
export default Application;
