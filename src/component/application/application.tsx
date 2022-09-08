import { Badge, Button, Grid, Image } from "@mantine/core";
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
import { supabase } from "src/lib/supabase/supabase";
import { MemberModel } from "@type/index";
import { useGetMember } from "@hooks/useGetMember";

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
  receipt: string;
  userID: string;
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
    userID,
    handleSetBeforeApproved,
    handleDecideApprove,
  }) => {
    const [style, setStyle] = useState<string>("");
    const [approvedStyle, setApprovedStyle] = useState<string>("");
    const { pathname, isReady } = useRouter();
    const { member, getMember } = useGetMember(userID);

    const applicationHeader = useCallback((): JSX.Element | undefined => {
      if (isReady) {
        switch (pathname) {
          //管理者が承認する
          case "/administration/unapprovedapp":
            return (
              <Group position="apart">
                <Text weight={500}>
                  <Badge color="grape" variant="filled" size="xl" radius="xs">
                    {member?.name}
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
                    {member?.name}
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
    }, [isReady, pathname, isApproved, handleSetBeforeApproved, id, member]);

    useEffect(() => {
      if (pathname === "/administration/unapprovedapp" && isReady) {
        setStyle("hover:opacity-70 cursor-pointer");
      }

      // if (pathname === "/administration/approvedapp" && isReady && isApproved) {
      //   setApprovedStyle("hover:opacity-70 cursor-pointer");
      // }
    }, [pathname, isReady, isApproved]);

    return (
      <div>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            {applicationHeader()}
          </Card.Section>

          <div
            onClick={() => {
              pathname === "/administration/unapprovedapp"
                ? handleDecideApprove!(id, index!)
                : alert("hey");
            }}
            className={style}
          >
            {isApproved === true ? (
              <Text mt="sm" color="dimmed" size="sm" className="relative">
                <div className="absolute top-[100px] left-[36px]  text-red-500 z-50 bg-red-200 py-2 px-10 rounded-md origin-center -rotate-12 text-3xl text-bold opacity-90">
                  承認済み
                </div>
                <Grid className="px-3 py-3">
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
                <Image src={receipt} alt="receipt" radius="md" height={150} />
              </Text>
            ) : (
              <Text mt="sm" color="dimmed" size="sm">
                <Grid className="px-3 py-3">
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
                <Image src={receipt} alt="receipt" radius="md" height={150} />
              </Text>
            )}
          </div>
        </Card>
      </div>
    );
  }
);

CommonApplication.displayName = "CommonApplication";
