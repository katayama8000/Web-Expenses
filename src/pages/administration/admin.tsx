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
  const dummy: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let today = new Date();
  const todayDate = dayjs(today).format("YYYY-MM-DD");
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [openedDenialReason, setOpenedDenialReason] = useState<boolean>(false);

  const handlApprove = useCallback(() => {
    setOpenedApplication(false);
    showNotification({
      disallowClose: true,
      title: "経費申請",
      message: "承認しました",
      color: "teal",
      icon: <IconCheck size={18} />,
    });
  }, []);

  const handleDenial = useCallback(() => {
    setOpenedApplication(false);
    setOpenedDenialReason(true);
  }, []);

  const getApplication = async () => {
    try {
      const { data, error } = await supabase.from("application").select();
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
  }, []);

  return (
    <div>
      <PageContainer title="未承認の申請書類">
        <Grid>
          {application.map((item) => {
            return (
              <Grid.Col span={4} key={item.id}>
                {item.isApproved === false ? (
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

                    <div onClick={() => setOpenedApplication(true)}>
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
                            <div>
                              {dayjs(item.paidDate).format("YYYY/MM/DD")}
                            </div>
                            <div>{item.cost}円</div>
                          </Grid.Col>
                        </Grid>
                        <Text component="span" inherit color="blue"></Text>
                      </Text>
                    </div>
                  </Card>
                ) : null}
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
          <Card
            p="lg"
            radius="md"
            withBorder
            onClick={() => setOpenedApplication(true)}
          >
            <div>片山</div>
            <div>{todayDate}</div>
            <div>React書籍</div>
            <div>案件学習のため</div>
            <div>本屋</div>
            <div>4000円</div>
          </Card>
          <Group position="center" className="mt-3">
            <Button onClick={handlApprove} color="blue" size="lg">
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
