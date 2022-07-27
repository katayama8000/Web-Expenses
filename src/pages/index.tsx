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

const Index: CustomNextPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [value, setValue] = useState(0);
  return (
    <PageContainer title="経費申請">
      <Stack spacing="xl">
        <PageContent>
          <div className="px-6">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Grid>
                <Grid.Col span={6}>
                  <div>
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
                  {" "}
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
                    value={value}
                    size="md"
                    hideControls={true}
                    className="my-4"
                    // parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                    // formatter={(value) =>
                    //   !Number.isNaN(parseFloat(value!))
                    //     ? `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    //     : "￥ "
                    // }
                  />
                </Grid.Col>
              </Grid>
              <Group position="right" mt="md">
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
