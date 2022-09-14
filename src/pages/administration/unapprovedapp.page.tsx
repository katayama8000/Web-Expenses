import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "@pages/_layout";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { CommonApplication } from "@component/application/application";
import { supabase } from "src/lib/supabase/supabase";
import { toast } from "@lib/function/toast";
import { useGetIsApprovedApplication } from "@hooks/application/useGetIsApprovedApplication";
import { DetailModal } from "@component/modal/detailModal";

const UnApproved = () => {
  const [id, setId] = useState<number>(0);
  const [modalId, setModalId] = useState<number>(0);
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [openedDenialReason, setOpenedDenialReason] = useState<boolean>(false);
  const { application, isLoading } = useGetIsApprovedApplication(false);

  const handleApprove = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .update([{ isApproved: true }])
        .match({ id: id });

      if (!data || error) {
        console.error(error);
        return;
      }

      if (data) {
        toast("経費申請", "承認しました", "teal");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setOpenedApplication(false);
    }
  }, [id]);

  const handleDenial = useCallback(() => {
    setOpenedApplication(false);
    setOpenedDenialReason(true);
  }, []);

  const handleWatchDetail = useCallback(async (id: number, index: number) => {
    setId(id);
    setModalId(index);
    setOpenedApplication(true);
  }, []);

  useEffect(() => {
    //getApplication();
    const subscription = supabase
      .from("application")
      .on("UPDATE", (payload) => {
        //getApplication();
        console.log("Change received!!!!", payload);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <PageContainer title="未承認の申請書類">
        <Grid>
          {application.length === 0 ? (
            <div className="p-3 text-bold text-3xl m-auto mt-10">
              未承認の申請書はありません
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
        handleApprove={handleApprove}
        handleDenial={handleDenial}
      />
      <Modal
        opened={openedDenialReason}
        onClose={() => setOpenedDenialReason(false)}
        title="否認"
      >
        否認した理由を、Teams等で連絡してください。
      </Modal>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </div>
  );
};

UnApproved.getLayout = DashboardLayout;
export default UnApproved;
