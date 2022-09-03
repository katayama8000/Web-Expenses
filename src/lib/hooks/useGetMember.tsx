import { useGetUserId } from "@hooks/useGetUserId";
import React, { useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { MemberModel } from "@type/index";

export const useGetMember = async (): Promise<MemberModel | undefined> => {
  const [member, setMember] = useState<MemberModel>();
  const userId = useGetUserId();
  try {
    const { data, error } = await supabase
      .from("member")
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

  return member;
};
