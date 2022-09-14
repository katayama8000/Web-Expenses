import { Button, Card, Grid, Group, Image, Modal, Text } from "@mantine/core";
import { ApplicationModel } from "@type/application.model";
import dayjs from "dayjs";
import React from "react";
import { FC } from "react";

type Props = {
  openedDetail: boolean;
  setOpenedDetail: React.Dispatch<React.SetStateAction<boolean>>;
  application: ApplicationModel[];
  modalId: number;
  handleApprove?: () => Promise<void>;
  handleDenial?: () => void;
};

export const DetailModal: FC<Props> = ({
  openedDetail,
  setOpenedDetail,
  application,
  modalId,
  handleApprove,
  handleDenial,
}) => {
  return (
    <>
      <Modal
        opened={openedDetail}
        onClose={() => setOpenedDetail(false)}
        title="慎重に確認してください"
        size="lg"
      >
        <div>
          <Card p="lg" radius="md" withBorder className="w-[550px]">
            <Text mt="sm" color="dimmed" size="sm">
              <div>
                <Grid className="px-6 py-3 font-bold text-xl text-black">
                  <Grid.Col span={6}>
                    <div className="truncate">
                      {application[modalId]?.payfor}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.purpose}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.detail}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.categoryOfCost}
                    </div>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <div className="truncate">
                      {application[modalId]?.inside}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.outside}
                    </div>
                    <div className="truncate">
                      {dayjs(application[modalId]?.paidDate).format(
                        "YYYY/MM/DD"
                      )}
                    </div>
                    <div className="truncate">
                      {application[modalId]?.cost}円
                    </div>
                  </Grid.Col>
                </Grid>
                <Image
                  src={application[modalId]?.receipt}
                  alt="receipt"
                  fit="contain"
                  radius="md"
                  className="border-2 border-gray-300 rounded-md"
                />
              </div>
            </Text>
          </Card>
          <Group position="center" className="mt-3">
            {handleApprove && handleDenial ? (
              <>
                <Button onClick={handleApprove} color="blue" size="lg">
                  承認
                </Button>
                <Button onClick={handleDenial} color="red" size="lg">
                  否認
                </Button>
              </>
            ) : null}
          </Group>
        </div>
      </Modal>
    </>
  );
};
