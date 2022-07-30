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
  Select,
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
      payfor: "",
      purpose: "",
      detail: "",
      kind: "",
      in: "",
      out: "",
      date: "",
      cost: null,
    },
  });

  const [file, setFile] = useState<string>();

  const handleDelete = () => {
    setFile(undefined);
  };

  const handleSubmit = (value: any) => {
    console.log(value);
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
                      placeholder="支払先"
                      {...form.getInputProps("payfor")}
                      className="my-4"
                      size="md"
                    />
                    <TextInput
                      required
                      placeholder="目的"
                      {...form.getInputProps("purpose")}
                      className="my-4"
                      size="md"
                    />
                    <TextInput
                      required
                      placeholder="詳細"
                      {...form.getInputProps("detail")}
                      className="my-4"
                      size="md"
                    />
                    <Select
                      placeholder="Pick one"
                      data={[
                        { value: "厚生費", label: "厚生費" },
                        { value: "発送費用", label: "発送費用" },
                        { value: "svelte", label: "交際費" },
                        { value: "vue", label: "会議費" },
                        { value: "svelte", label: "交通費" },
                        { value: "vue", label: "通信費" },
                        { value: "svelte", label: "消耗品費" },
                      ]}
                      {...form.getInputProps("kind")}
                      size="md"
                    />
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    required
                    placeholder="誰(社内)"
                    {...form.getInputProps("in")}
                    className="my-4"
                    size="md"
                  />
                  <TextInput
                    required
                    placeholder="誰(社外)"
                    {...form.getInputProps("out")}
                    className="my-4"
                    size="md"
                  />
                  <DatePicker
                    size="md"
                    placeholder="支払日"
                    {...form.getInputProps("date")}
                  />
                  <NumberInput
                    placeholder="支払金額"
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value!))
                        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "$ "
                    }
                    className="my-4"
                    size="md"
                    hideControls={true}
                    {...form.getInputProps("cost")}
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
