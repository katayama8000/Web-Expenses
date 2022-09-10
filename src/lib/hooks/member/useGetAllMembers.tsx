import { PostgrestError } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { MemberModel } from "@type/index";

type Error = {
  error: PostgrestError | null | unknown;
};

type Result = {
  AllMembers: MemberModel[];
};

export const useGetAllMembers = (): Result => {
  const [AllMembers, setAllMembers] = useState<MemberModel[]>([]);

  const getAllMembers = async () => {
    const { data, error } = await supabase.from<MemberModel>("member").select();
    try {
      if (data) {
        setAllMembers(data);
      }

      if (!data || error) {
        console.error(error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return { AllMembers };
};
