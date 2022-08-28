import type { CustomNextPage } from "next";
import { Button, Group, Stack } from "@mantine/core";
import { DashboardLayout } from "src/pages/_layout";
import { PageContent } from "src/component/PageContent";
import { PageContainer } from "src/component/PageContainer";
import { supabase } from "src/lib/supabase/supabase";

const Settings: CustomNextPage = () => {
  return (
    <PageContainer
      title="設定"
      items={[
        { label: "ダミー", href: "#" },
        { label: "パンくず", href: "#" },
        { label: "リスト", href: "#" },
      ]}
    >
      <Button
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error(error);
          } else {
            window.alert("ログアウトしました");
          }
        }}
      >
        ログアウト
      </Button>
      <Stack spacing="xl">
        <PageContent outerTitle title="Foo!">
          Foo
        </PageContent>
        <Group grow>
          <PageContent title="Bar!">Bar</PageContent>
          <PageContent title="Baz!">Baz</PageContent>
        </Group>
      </Stack>
    </PageContainer>
  );
};

Settings.getLayout = DashboardLayout;

export default Settings;
