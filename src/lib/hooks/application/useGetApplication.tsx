import { useGetStoragePath } from "@hooks/useGetStoragePath";
import { useGetUserId } from "@hooks/member/useGetUserId";
import { ApplicationModel } from "@type/application.model";
import { UseApplicationModel } from "@type/index";
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";

export const useGetApplication = (): UseApplicationModel => {
  const [application, setApplication] = useState<ApplicationModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ApplicationStoragePath = useGetStoragePath("application", "receipt");
  const userID = useGetUserId();
  const getApplication = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from<ApplicationModel>("application")
        .select("*")
        .match({ userID: userID });

      if (!data || error) {
        console.error(error);
      }

      if (data) {
        const app = data.map((application) => {
          application.receipt =
            ApplicationStoragePath! + "/" + String(application.id);
          return application;
        });
        setApplication(app);
      } else {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  return { application, getApplication, isLoading };
};
