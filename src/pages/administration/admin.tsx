import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "src/layout";
import dayjs from "dayjs";
const Admin = () => {
  const dummy: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let today = new Date();
  const todayDate = dayjs(today).format("YYYY-MM-DD");
  const [opened, setOpened] = useState(false);

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
                  onClick={() => setOpened(true)}
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
        opened={opened}
        onClose={() => setOpened(false)}
        title="慎重に確認してください"
      >
        <div>
          <Card p="lg" radius="md" withBorder onClick={() => setOpened(true)}>
            <div>片山</div>
            <div>{todayDate}</div>
            <div>React書籍</div>
            <div>案件学習のため</div>
            <div>本屋</div>
            <div>4000円</div>
          </Card>
          <Group position="center" className="mt-3">
            <Button onClick={() => setOpened(true)} color="blue" size="lg">
              承認
            </Button>
            <Button onClick={() => setOpened(true)} color="red" size="lg">
              否認
            </Button>
          </Group>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </div>
  );
};

Admin.getLayout = DashboardLayout;
export default Admin;

// function Demo() {
//   const [opened, setOpened] = useState(false);

//   return (
//     <>
//       <Modal
//         opened={opened}
//         onClose={() => setOpened(false)}
//         title="Introduce yourself!"
//       >
//         {/* Modal content */}
//       </Modal>

//       <Group position="center">
//         <Button onClick={() => setOpened(true)}>Open Modal</Button>
//       </Group>
//     </>
//   );
// }
