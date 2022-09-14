import { DashboardLayout } from "@pages/_layout";
import { Button, Grid, LoadingOverlay, Modal } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { supabase } from "src/lib/supabase/supabase";
import { CommonApplication } from "@component/application/application";
import { useGetIsApprovedApplication } from "@hooks/application/useGetIsApprovedApplication";
import { toast } from "@lib/function/toast";
import { DetailModal } from "@component/modal/detailModal";

const Approved = () => {
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [openedBeforeApproved, setOpenBeforeApproved] =
    useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [modalId, setModalId] = useState<number>(0);
  const { application, isLoading } = useGetIsApprovedApplication(true);

  const handleWatchDetail = useCallback(async (id: number, index: number) => {
    setId(id);
    setModalId(index);
    setOpenedApplication(true);
  }, []);

  const handleIsApprovedFalse = async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .update([{ isApproved: false }])
        .match({ id: id });

      if (!data || error) {
        console.error(error);
        return;
      }

      if (data) {
        setOpenedApplication(false);
        toast("経費申請", "承認を取り消しました", "teal");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetBeforeApproved = useCallback(
    (id: number) => {
      setId(id);
      setOpenBeforeApproved(true);
    },
    [setId, setOpenBeforeApproved]
  );

  useEffect(() => {
    //getApplication();
    const subscription = supabase
      .from("application")
      .on("UPDATE", (payload) => {
        //getApplication();
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <PageContainer title="過去の申請書">
        <Grid>
          {application.length === 0 ? (
            <div className="p-3 text-bold text-3xl m-auto mt-10">
              過去の申請書はありません
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
                    handleSetBeforeApproved={handleSetBeforeApproved}
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
      <Modal
        opened={openedBeforeApproved}
        onClose={() => setOpenBeforeApproved(false)}
        centered
        title="慎重に確認してください"
        classNames={{
          header: "text-center text-blue-400",
        }}
      >
        <div>
          <Button
            color="primary"
            onClick={() => handleIsApprovedFalse()}
            size="sm"
            variant="outline"
          >
            未承認に戻す
          </Button>
        </div>
      </Modal>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </div>
  );
};

Approved.getLayout = DashboardLayout;
export default Approved;
