import { DashboardLayout } from "src/layout";
import { Button, Card, Grid, Modal } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

const Approved = () => {
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
      message: "未承認に戻しました",
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
      <PageContainer title="承認済み申請書">
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
        centered
        title="慎重に確認してください"
        classNames={{
          header: "text-center text-blue-400",
        }}
      >
        <div>
          <Button
            color="primary"
            onClick={handlApprove}
            size="sm"
            variant="outline"
          >
            未承認に戻す
          </Button>
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

Approved.getLayout = DashboardLayout;
export default Approved;
