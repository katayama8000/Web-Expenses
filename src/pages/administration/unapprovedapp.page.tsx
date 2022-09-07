import { Button, Card, Grid, Group, Modal } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "@pages/_layout";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { CommonApplication } from "@component/application/application";
import { supabase } from "src/lib/supabase/supabase";
import { useGetUnApprovedApplication } from "@hooks/administration/useGetUnApprovedApplication";

const UnApproved = () => {
  let today = new Date();
  const [id, setId] = useState<number>(0);
  const [modalId, setModalId] = useState<number>(0);
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [openedDenialReason, setOpenedDenialReason] = useState<boolean>(false);
  const { application } = useGetUnApprovedApplication();

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
        showNotification({
          disallowClose: true,
          title: "経費申請",
          message: "承認しました",
          color: "teal",
          icon: <IconCheck size={18} />,
        });
      }
    } catch (e) {
      console.error(e);
    }
    setOpenedApplication(false);
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
      >
        <div>
          <Card p="lg" radius="md" withBorder>
            <Text mt="sm" color="dimmed" size="sm">
              <Grid className="px-6 py-3">
                <Grid.Col span={6}>
                  <div>{application[modalId]?.payfor}</div>
                  <div>{application[modalId]?.purpose}</div>
                  <div>{application[modalId]?.detail}</div>
                  <div>{application[modalId]?.categoryOfCost}</div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div>{application[modalId]?.inside}</div>
                  <div>{application[modalId]?.outside}</div>
                  <div>
                    {dayjs(application[modalId]?.paidDate).format("YYYY/MM/DD")}
                  </div>
                  <div>{application[modalId]?.cost}円</div>
                </Grid.Col>
              </Grid>
              <Text component="span" inherit color="blue"></Text>
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
    </div>
  );
};

UnApproved.getLayout = DashboardLayout;
export default UnApproved;
