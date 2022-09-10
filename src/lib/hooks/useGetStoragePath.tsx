import React, { FC } from "react";
import { supabase } from "src/lib/supabase/supabase";

type Props = {
  buckets: string;
  folder: string;
};
export const useGetStoragePath = (
  buckets: string,
  folder: string
): string | Error | null => {
  const { publicURL, error } = supabase.storage
    .from(buckets)
    .getPublicUrl(folder);
  if (publicURL) return publicURL;
  return error;
};
