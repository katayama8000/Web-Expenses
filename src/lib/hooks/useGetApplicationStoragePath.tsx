import React from "react";
import { supabase } from "src/lib/supabase/supabase";

export const useGetApplicationStoragePath = async (): Promise<
  string | Error | null
> => {
  const { publicURL, error } = supabase.storage
    .from("application")
    .getPublicUrl("receipt");
  if (publicURL) return publicURL;
  return error;
};
