import { PostgrestError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { supabase } from "src/lib/supabase/supabase";

type Member = {
  id: number;
  name: string;
  position: "役員" | "リーダー" | "一般";
  email: string;
};

type Error = {
  error: PostgrestError | null | unknown;
};

type Result = Member[] | Error;

export const useGetAllMembers = async () => {
  const [result, setResult] = useState<Result>([]);
  const { data, error } = await supabase.from<Member>("member").select();
  try {
    if (data) {
      setResult(data);
    }

    if (!data || error) {
      setResult({ error });
    }
  } catch (error) {
    setResult({ error });
  }

  return result;
};
