import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/pages/_layout";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "@component/PageContent";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { MemberModel } from "@type/index";

type dataType = {
  value: string;
  label: string;
};

const Key: CustomNextPage = () => {
  const [haveKeyMember, setHaveKeyMember] = useState<MemberModel[]>([]);
  const [selectData, setSelectData] = useState<dataType[]>([]);

  const getHaveKeyMember = async () => {
    const { data, error } = await supabase
      .from<MemberModel>("member")
      .select()
      .eq("isHaveKey", true);
    console.log(data, error);
    try {
      if (data) {
        setHaveKeyMember(data);
        data.map((member) =>
          setSelectData((prev) => [
            ...prev,
            { value: member.name, label: member.name },
          ])
        );
      }

      if (!data || error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getHaveKeyMember();
  }, []);
  return (
    <PageContainer title="鍵保持者">
      <PageContent className="p-3">
        <div className="p-3">
          <div>本社</div>
          <div>開錠</div>
          <div>施錠</div>
        </div>
      </PageContent>
      <PageContent className="p-3">
        <div className="p-3">
          <div>サテライト</div>
          <Select label="開錠" placeholder="Pick one" data={selectData} />
          <Select label="施錠" placeholder="Pick one" data={selectData} />
          <div>開錠</div>
          <div>施錠</div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

Key.getLayout = DashboardLayout;

export default Key;
