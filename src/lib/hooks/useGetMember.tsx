import { useGetUserId } from "@hooks/useGetUserId";
import React, { useState } from "react";
import { supabase } from "src/lib/supabase/supabase";

type Member = {
  id: number;
  name: string;
  position: "役員" | "リーダー" | "一般";
  email: string;
};

export const useGetMember = async () => {
  const [member, setMember] = useState<Member>();
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
