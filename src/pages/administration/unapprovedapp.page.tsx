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
import { useGetUnApprovedApplication } from "@hooks/application/useGetUnApprovedApplication";
import { toast } from "@lib/function/toast";

const UnApproved = () => {
  const [id, setId] = useState<number>(0);
  const [modalId, setModalId] = useState<number>(0);
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [openedDenialReason, setOpenedDenialReason] = useState<boolean>(false);
  const { application, isLoading } = useGetUnApprovedApplication();

  const handelApprove = useCallback(async () => {
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
        console.log("katayama", data);
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

  const handleDecideApprove = useCallback(async (id: number, index: number) => {
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
          {application.map((item, index) => {
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
                  handleDecideApprove={() =>
                    handleDecideApprove(item.id, index)
                  }
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </PageContainer>

      <Modal
        opened={openedApplication}
        onClose={() => setOpenedApplication(false)}
        title="慎重に確認してください"
        size="lg"
      >
        <div>
          <Card p="lg" radius="md" withBorder className="h-[470px] w-[550px]">
            <Text mt="sm" color="dimmed" size="sm">
              <div>
                <Grid className="px-6 py-3 font-bold text-xl text-black">
                  <Grid.Col span={6}>
                    <div className="truncate">
                      {application[modalId]?.payfor}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.purpose}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.detail}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.categoryOfCost}
                    </div>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <div className="truncate">
                      {application[modalId]?.inside}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.outside}
                    </div>
                    <div className="truncate">
                      {dayjs(application[modalId]?.paidDate).format(
                        "YYYY/MM/DD"
                      )}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.cost}円
                    </div>
                  </Grid.Col>
                </Grid>
                <Image
                  src={application[modalId]?.receipt}
                  alt="receipt"
                  fit="contain"
                  radius="md"
                />
              </div>
            </Text>
          </Card>
          <Group position="center" className="mt-3">
            <Button onClick={handelApprove} color="blue" size="lg">
              承認
            </Button>
            <Button onClick={handleDenial} color="red" size="lg">
              否認
            </Button>
          </Group>
        </div>
      </Modal>
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
