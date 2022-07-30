import {
  Button,
  Stack,
  Table,
  TextInput,
  Checkbox,
  Group,
  Box,
  Grid,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import { PageContent } from "src/component/PageContent";
import { PageContainer } from "src/component/PageContainer";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { DropZone } from "src/component/dropzone/dropzone";
import { IconX } from "@tabler/icons";

const Index: CustomNextPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },
  });

  const [file, setFile] = useState<string>();

  const handleDelete = () => {
    setFile(undefined);
  };

  const handleSubmit = (value: any) => {
    if (file === undefined) {
      showNotification({
        title: "エラー",
        message: "領収書をアップロードしてください",
        color: "red",
        icon: <IconX size={18} />,
      });
      return;
    }
    showNotification({
      title: "success",
      message: "Form submitted",
    });
  };
  return (
    <PageContainer title="経費申請">
      <Stack spacing="xl">
        <PageContent className="w-[600px] m-auto">
          <div className="px-6">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Grid>
                <Grid.Col span={6}>
                  <div>
                    <TextInput
                      required
                      placeholder="payfor"
                      {...form.getInputProps("email")}
                      className="my-4"
                      size="md"
                    />
                    <TextInput
                      required
                      placeholder="your@email.com"
                      {...form.getInputProps("email")}
                      className="my-4"
                      size="md"
                    />
                    <TextInput
                      required
                      placeholder="your@email.com"
                      {...form.getInputProps("email")}
                      className="my-4"
                      size="md"
                    />
                    <TextInput
                      required
                      placeholder="your@email.com"
                      {...form.getInputProps("email")}
                      className="my-4"
                      size="md"
                    />
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    required
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                    className="my-4"
                    size="md"
                  />
                  <TextInput
                    required
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                    className="my-4"
                    size="md"
                  />
                  <TextInput
                    required
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                    className="my-4"
                    size="md"
                  />
                  <DatePicker size="md" />
                  <NumberInput
                    defaultValue={1000}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value!))
                        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "$ "
                    }
                    className="my-4"
                    size="md"
                    hideControls={true}
                  />
                </Grid.Col>
              </Grid>
              <DropZone file={file} setFile={setFile} />
              <Group position="right" mt="md">
                <Button color="red" onClick={handleDelete}>
                  領収書を削除
                </Button>
                <Button type="submit">送信</Button>
              </Group>
            </form>
          </div>
        </PageContent>
        <PageContent title="通知">
          <Button onClick={() => showNotification({ message: "成功しました" })}>
            通知を表示
          </Button>
        </PageContent>
      </Stack>
    </PageContainer>
  );
};

Index.getLayout = DashboardLayout;

export default Index;
