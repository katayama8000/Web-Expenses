import { Badge, Grid, Stack } from "@mantine/core";
import React from "react";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "src/component/PageContent";
import { DashboardLayout } from "src/pages/_layout";
import { FC, useEffect } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { useState } from "react";
import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
} from "@mantine/core";
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
const Application = () => {
  const [application, setApplication] = useState<ApplicationProps[]>([]);

  const getApplication = async () => {
    try {
      const { data, error } = await supabase
        .from<ApplicationProps>("application")
        .select();
      console.log(data, error);
      if (!data || error) {
        console.error(error);
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

  const handleDelete = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .delete()
        .match({
          id: id,
        });
      console.log(data, error);
      if (!data || error) {
        return;
      }

      if (data) {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const { data, error } = await supabase.from("application").update({
        id: id,
      });
      if (!data || error) {
        return;
      }
      if (data) {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <PageContainer title="過去の申請書類">
        <Grid>
          {application.map((item) => {
            return (
              <Grid.Col span={4} key={item.id}>
                <Card withBorder shadow="sm" radius="md">
                  <Card.Section withBorder inheritPadding py="xs">
                    <Group position="apart">
                      <Text weight={500}>
                        <div>
                          {item.isApproved === true ? (
                            <Badge
                              color="teal"
                              variant="filled"
                              size="xl"
                              radius="xs"
                            >
                              承認済み
                            </Badge>
                          ) : (
                            <Badge
                              color="yellow"
                              variant="filled"
                              size="xl"
                              radius="xs"
                            >
                              承認前
                            </Badge>
                          )}
                        </div>
                      </Text>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon>
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          {item.isApproved === true ? (
                            <Menu.Item icon={<IconFileZip size={14} />}>
                              Download zip
                            </Menu.Item>
                          ) : (
                            <div>
                              <Menu.Item icon={<IconEye size={14} />}>
                                編集
                              </Menu.Item>
                              <Menu.Item
                                icon={<IconTrash size={14} />}
                                color="red"
                              >
                                削除
                              </Menu.Item>
                            </div>
                          )}
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>

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
                </Card>
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
