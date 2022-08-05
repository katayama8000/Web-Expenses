import { Button, Card, Grid, Group, Modal } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "src/layout";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

const Admin = () => {
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

  return (
    <div>
      <PageContainer title="未承認申請書">
        <Grid>
          {dummy.map((item) => {
            return (
              <Grid.Col span={4} key={item}>
                <Card
                  shadow="sm"
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
      <Group position="center">
        <Button onClick={() => setOpenedApplication(true)}>Open Modal</Button>
      </Group>
    </div>
  );
};

Admin.getLayout = DashboardLayout;
export default Admin;
