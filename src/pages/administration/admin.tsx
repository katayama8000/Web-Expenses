import { Button, Card, Grid, Group, Modal } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "src/layout";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { Badge, Stack } from "@mantine/core";
import { PageContent } from "src/component/PageContent";
import { FC, useEffect } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { Text, Menu, ActionIcon, Image, SimpleGrid } from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";

type ApplicationProps = {
  id: number;
  payfor: string;
  purpose: string;
  detail: string;
  categoryOfCost: string;
  inside: string;
  outside: string;
  paidDate: Date;
  cost: number;
  isApproved: boolean;
};

const Admin = () => {
  const [application, setApplication] = useState<ApplicationProps[]>([]);
  let today = new Date();
  const todayDate = dayjs(today).format("YYYY-MM-DD");
  const [id, setId] = useState<number>(0);
  const [modalId, setModalId] = useState<number>(0);
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [openedDenialReason, setOpenedDenialReason] = useState<boolean>(false);

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

  const getApplication = async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .filter("isApproved", "in", '("false")');
      console.log(data, error);
      if (!data || error) {
        return;
      }

      if (data) {
        console.log(data);
        setApplication(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getApplication();
    const subscription = supabase
      .from("application")
      .on("*", (payload) => {
        getApplication();
        console.log("Change received!", payload);
      })
      .subscribe();
  }, []);

  return (
    <div>
      <PageContainer title="未承認の申請書類">
        <Grid>
          {application.map((item, index) => {
            return (
              <Grid.Col span={4} key={item.id}>
                <Card withBorder shadow="sm" radius="md">
                  <Card.Section withBorder inheritPadding py="xs">
                    <Group position="apart">
                      <Text weight={500}>
                        <Badge
                          color="yellow"
                          variant="filled"
                          size="xl"
                          radius="xs"
                        >
                          片山達文
                        </Badge>
                      </Text>
                    </Group>
                  </Card.Section>

                  <div
                    onClick={() => {
                      setId(item.id);
                      setModalId(index);
                      setOpenedApplication(true);
                    }}
                    className="hover:opacity-70 cursor-pointer"
                  >
                    <Text mt="sm" color="dimmed" size="sm">
                      <Grid className="px-6 py-3">
                        <Grid.Col span={6}>
                          <div>{item.payfor}</div>
                          <div>{item.purpose}</div>
                          <div>{item.detail}</div>
                          <div>{item.categoryOfCost}</div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <div>{item.inside}</div>
                          <div>{item.outside}</div>
                          <div>{dayjs(item.paidDate).format("YYYY/MM/DD")}</div>
                          <div>{item.cost}円</div>
                        </Grid.Col>
                      </Grid>
                      <Text component="span" inherit color="blue"></Text>
                    </Text>
                  </div>
                </Card>
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

Admin.getLayout = DashboardLayout;
export default Admin;
