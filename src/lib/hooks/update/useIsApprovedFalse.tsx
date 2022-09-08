import React from "react";
import { supabase } from "src/lib/supabase/supabase";
import { toast } from "@lib/function/toast";

export const useIsApprovedFalse = () => {
  const handleIsApprovedFalse = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .update([{ isApproved: false }])
        .match({ id: id });

      if (!data || error) {
        console.error(error);
        return;
      }

      if (data) {
        //setOpenedApplication(false);
        toast("経費申請", "未承認に戻しました", "teal");
      }
    } catch (e) {
      console.error(e);
    }
  };
};
