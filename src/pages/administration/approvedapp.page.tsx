import { DashboardLayout } from "@pages/_layout";
import { Button, Grid, Modal } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { supabase } from "src/lib/supabase/supabase";
import { CommonApplication } from "@component/application/application";
import { useGetApprovedApplication } from "@hooks/administration/useGetApprovedApplication";

const Approved = () => {
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { application } = useGetApprovedApplication();

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

  const handleSetBeforeApproved = useCallback(
    (id: number) => {
      setId(id);
      setOpenedApplication(true);
    },
    [setId, setOpenedApplication]
  );

  useEffect(() => {
    //getApplication();
    const subscription = supabase
      .from("application")
      .on("UPDATE", (payload) => {
        //getApplication();
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
                  receipt={item.receipt}
                  userID={item.userID}
                  handleSetBeforeApproved={handleSetBeforeApproved}
                />
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
