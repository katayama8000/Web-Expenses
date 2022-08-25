import { DashboardLayout } from "src/pages/_layout";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconDots, IconArrowBackUp } from "@tabler/icons";
import { supabase } from "src/lib/supabase/supabase";
import { CommonApplication } from "@component/application/application";

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

const Approved = () => {
  const [application, setApplication] = useState<ApplicationProps[]>([]);
  let today = new Date();
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

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
        showNotification({
          disallowClose: true,
          title: "経費申請",
          message: "未承認に戻しました",
          color: "teal",
          icon: <IconCheck size={18} />,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getApplication = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .filter("isApproved", "in", '("true")');
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
  }, []);

  const handleSetBeforeApproved = useCallback(
    (id: number) => {
      setId(id);
      setOpenedApplication(true);
    },
    [setId, setOpenedApplication]
  );

  useEffect(() => {
    getApplication();
    const subscription = supabase
      .from("application")
      .on("UPDATE", (payload) => {
        getApplication();
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
          {application.map((item) => {
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
                  handleSetBeforeApproved={handleSetBeforeApproved}
                />
                {/* <Card withBorder shadow="sm" radius="md">
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
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon>
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            icon={<IconArrowBackUp className="text-red-500" />}
                            onClick={() => handleSetBeforeApproved(item.id)}
                          >
                            承認前に戻す
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>

                  <div className="hover:opacity-70 cursor-pointer">
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
                </Card> */}
              </Grid.Col>
            );
          })}
        </Grid>
      </PageContainer>
      <Modal
        opened={openedApplication}
        onClose={() => setOpenedApplication(false)}
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
    </div>
  );
};

Approved.getLayout = DashboardLayout;
export default Approved;
