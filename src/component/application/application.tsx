import { Badge, Grid, Image } from "@mantine/core";
import React, { memo, useCallback } from "react";
import { FC, useEffect, useState } from "react";
import { Card, Group, Text, Menu, ActionIcon } from "@mantine/core";
import {
  IconArrowBackUp,
  IconDots,
  IconEye,
  IconFileZip,
  IconTrash,
} from "@tabler/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {
  id: number;
  index?: number;
  payfor: string;
  purpose: string;
  detail: string;
  categoryOfCost: string;
  inside: string;
  outside: string;
  paidDate: Date;
  cost: number;
  isApproved: boolean;
  receipt?: string;
  handleSetBeforeApproved?: (id: number) => void;
  handleDecideApprove?: (id: number, index: number) => void;
};

export const CommonApplication: FC<Props> = memo(
  ({
    id,
    index,
    payfor,
    purpose,
    detail,
    categoryOfCost,
    inside,
    outside,
    paidDate,
    cost,
    isApproved,
    receipt,
    handleSetBeforeApproved,
    handleDecideApprove,
  }) => {
    const [style, setStyle] = useState<string>("");
    const { pathname, isReady } = useRouter();

    const applicationHeader = useCallback((): JSX.Element | undefined => {
      if (isReady) {
        switch (pathname) {
          //管理者が承認する
          case "/administration/admin":
            return (
              <Group position="apart">
                <Text weight={500}>
                  <Badge color="grape" variant="filled" size="xl" radius="xs">
                    片山帆乃果
                  </Badge>
                </Text>
              </Group>
            );
            break;
          //承認済み
          case "/administration/approvedapp":
            return (
              <Group position="apart">
                <Text weight={500}>
                  <Badge color="yellow" variant="filled" size="xl" radius="xs">
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
                      onClick={() => handleSetBeforeApproved!(id)}
                    >
                      承認前に戻す
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            );
            break;
          //メンバーの申請書
          case "/user-application":
            return (
              <Group position="apart">
                <Text weight={500}>
                  <div>
                    {isApproved === true ? (
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
                    {isApproved === true ? (
                      <Menu.Item icon={<IconFileZip size={14} />}>
                        Download zip
                      </Menu.Item>
                    ) : (
                      <div>
                        <Menu.Item icon={<IconEye size={14} />}>編集</Menu.Item>
                        <Menu.Item icon={<IconTrash size={14} />} color="red">
                          削除
                        </Menu.Item>
                      </div>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Group>
            );
            break;
          default:
            return <div>error</div>;
            break;
        }
      }
    }, [pathname, isReady, isApproved, id, handleSetBeforeApproved]);

    useEffect(() => {
      if (pathname === "/administration/admin" && isReady) {
        setStyle("hover:opacity-70 cursor-pointer");
      }
    }, [pathname, isReady]);

    return (
      <div>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            {applicationHeader()}
          </Card.Section>

          <div
            onClick={() => {
              pathname === "/administration/admin"
                ? handleDecideApprove!(id, index!)
                : alert("hey");
            }}
            className={style}
          >
            <Text mt="sm" color="dimmed" size="sm">
              <Grid className="px-6 py-3">
                <Grid.Col span={6}>
                  <div className="truncate">{payfor}</div>
                  <div className="truncate">{purpose}</div>
                  <div className="truncate">{detail}</div>
                  <div className="truncate">{categoryOfCost}</div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className="truncate">{inside}</div>
                  <div className="truncate">{outside}</div>
                  <div className="truncate">
                    {dayjs(paidDate).format("YYYY/MM/DD")}
                  </div>
                  <div className="truncate">{cost}円</div>
                </Grid.Col>
              </Grid>
              <Image src={receipt} alt="application" radius="md" height={150} />
            </Text>
          </div>
        </Card>
      </div>
    );
  }
);

CommonApplication.displayName = "CommonApplication";
