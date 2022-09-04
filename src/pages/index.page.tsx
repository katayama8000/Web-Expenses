/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Stack,
  TextInput,
  Group,
  Grid,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";
import { PageContent } from "src/component/PageContent";
import { PageContainer } from "src/component/PageContainer";
import { showNotification } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { DropZone } from "./dropzone";
import { IconX } from "@tabler/icons";
import { supabase } from "src/lib/supabase/supabase";
import { useGetUserId } from "@hooks/useGetUserId";
import { toast } from "src/lib/function/toast";
import type { MemberModel, ApplicationModel } from "@type/index";

type ApplicationProps = {
  id?: number;
  payfor: string;
  purpose: string;
  detail: string;
  categoryOfCost: string;
  inside: string;
  outside: string;
  paidDate: Date | null;
  cost: number;
  userID?: string;
};

const categoryOfCost: { value: string; label: string }[] = [
  { value: "厚生費", label: "厚生費" },
  { value: "発送費用", label: "発送費用" },
  { value: "交際費", label: "交際費" },
  { value: "会議費", label: "会議費" },
  { value: "交通費", label: "交通費" },
  { value: "通信費", label: "通信費" },
  { value: "消耗品費", label: "消耗品費" },
];

const Index: CustomNextPage = () => {
  const [receipt, setReceipt] = useState<File | undefined>();
  const [member, setMember] = useState<MemberModel>();

  const userId = useGetUserId();

  const form = useForm({
    initialValues: {
      payfor: "",
      purpose: "",
      detail: "",
      categoryOfCost: "",
      inside: "",
      outside: "",
      paidDate: null,
      cost: 0,
    },
  });

  const handleDelete = useCallback(() => {
    setReceipt(undefined);
  }, []);

  const handleSubmit = useCallback(
    async (value: ApplicationProps) => {
      if (!receipt) {
        showNotification({
          title: "エラー",
          message: "領収書をアップロードしてください",
          color: "red",
          icon: <IconX size={18} />,
        });
        return;
      }
      try {
        const { data, error } = await supabase
          .from<ApplicationProps>("application")
          .insert([
            {
              payfor: value.payfor,
              purpose: value.purpose,
              detail: value.detail,
              categoryOfCost: value.categoryOfCost,
              inside: value.inside,
              outside: value.outside,
              paidDate: value.paidDate,
              cost: value.cost,
              //name: member?.name,
              userID: member?.userID,
            },
          ]);
        if (!data || error) {
          showNotification({
            title: "エラー",
            message: "申請書の登録に失敗しました",
            color: "red",
            icon: <IconX size={18} />,
          });
          return;
        }
        if (data) {
          handleStoreReceipt(data[0].id!);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [receipt, member]
  );

  const handleStoreReceipt = useCallback(
    async (id: number) => {
      const { data, error } = await supabase.storage
        .from("application")
        .upload(`receipt/${id}`, receipt!);

      console.log(data, error);
      toast("成功", "申請書を登録しました", "teal");
    },
    [receipt]
  );

  const getUser = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from<MemberModel>("member")
        .select()
        .match({ userID: userId });
      console.log(data, error);
      if (!data || error) {
        console.error(error);
        return;
      }
      if (data) {
        setMember(data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <PageContainer title="経費申請">
      <Stack spacing="xl">
        <PageContent className="w-[600px] m-auto">
          <Group position="right" className="px-6">
            名前:
            <span className="underline underline-offset-2">{member?.name}</span>
          </Group>
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
                      placeholder="費用分類"
                      data={categoryOfCost}
                      {...form.getInputProps("categoryOfCost")}
                      size="md"
                    />
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    required
                    placeholder="誰(社内)"
                    {...form.getInputProps("inside")}
                    className="my-4"
                    size="md"
                  />
                  <TextInput
                    required
                    placeholder="誰(社外)"
                    {...form.getInputProps("outside")}
                    className="my-4"
                    size="md"
                  />
                  <DatePicker
                    size="md"
                    placeholder="支払日"
                    {...form.getInputProps("paidDate")}
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
              <DropZone receipt={receipt} setReceipt={setReceipt} />
              <Group position="right" mt="md">
                <Button color="violet" onClick={() => handleStoreReceipt(1)}>
                  領収書を保存(開発中のみ)
                </Button>
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
