import type { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/_layout";
import { PageContainer } from "@component/PageContainer";
import { PageContent } from "@component/PageContent";
import { Avatar, Button, Modal } from "@mantine/core";
import { useGetMember } from "@hooks/member/useGetMember";
import { useGetUserId } from "@hooks/member/useGetUserId";
import { AiTwotoneSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase/supabase";
import { useGetStoragePath } from "@hooks/useGetStoragePath";
import { toast } from "@lib/function/toast";

const Account: CustomNextPage = () => {
  const userID = useGetUserId();
  const { member } = useGetMember(userID!);
  const [opened, setOpened] = useState<boolean>(false);
  const [image, setImage] = useState<File | undefined>();
  const [path, setPath] = useState<string>("");
  const AccountStoragePath = useGetStoragePath("account", "avatar");
  console.log(AccountStoragePath);
  AccountStoragePath! + "/" + userID;

  const habdleStoreAvatar = async () => {
    if (image && userID) {
      const { data, error } = await supabase.storage
        .from("account")
        .upload(`avatar/${userID}`, image, {
          upsert: true,
        });

      console.log(data);

      if (error) {
        console.log(error);
      }
    } else {
      toast("error", "画像が選択されていません", "red");
    }
  };

  useEffect(() => {
    setPath(AccountStoragePath! + "/" + userID);
  }, [AccountStoragePath, userID]);

  return (
    <>
      <PageContainer title="アカウント">
        <div className="px-10">
          <div className="flex ">
            <Avatar src={path} radius="xl" size="lg" />
            <div>{member?.name}</div>
          </div>
          <Button
            leftIcon={<AiTwotoneSetting />}
            color="cyan"
            onClick={() => setOpened(true)}
          >
            個人情報編集
          </Button>
        </div>
      </PageContainer>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="個人情報編集"
      >
        <Avatar src={path} radius="xl" size="lg" />
        <input
          type="file"
          accept={"image/jpeg image/png"}
          onChange={(e) => {
            console.log(e.target.files?.[0]);
            setImage(e.target.files?.[0]);
          }}
        />
        <Button color="cyan" onClick={() => habdleStoreAvatar()}>
          変更
        </Button>
      </Modal>
    </>
  );
};

Account.getLayout = DashboardLayout;
export default Account;
