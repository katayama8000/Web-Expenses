/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mantine/core";
import React, { useCallback } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "src/pages/_layout";
import { useEffect } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { useState } from "react";
import { CommonApplication } from "@component/application/application";
import { useGetApplicationStoragePath } from "@hooks/useGetApplicationStoragePath";

import type { ApplicationModel } from "@type/index";
const Application = () => {
  const [application, setApplication] = useState<ApplicationModel[]>([]);
  const ApplicationStoragePath = useGetApplicationStoragePath();

  const getApplication = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from<ApplicationModel>("application")
        .select();
      if (!data || error) {
        console.error(error);
        return;
      }

      if (data) {
        console.log(data);

        ApplicationStoragePath.then((url) => {
          if (typeof url === "string") {
            const app = data.map((application) => {
              application.receipt = url! + "/" + String(application.id);
              return application;
            });
            console.log("ここがみたい", app);
            setApplication(app);
          } else {
            console.error(url);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getApplication();
  }, []);

  // const handleDelete = useCallback(async (id: number) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("application")
  //       .delete()
  //       .match({
  //         id: id,
  //       });
  //     console.log(data, error);
  //     if (!data || error) {
  //       return;
  //     }

  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // const handleEdit = async (id: number) => {
  //   try {
  //     const { data, error } = await supabase.from("application").update({
  //       id: id,
  //     });
  //     if (!data || error) {
  //       return;
  //     }
  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <PageContainer title="過去の申請書類">
        <Grid>
          {application &&
            application.map((item) => {
              return (
                <Grid.Col span={4} key={item.id}>
                  <CommonApplication
                    id={item.id}
                    payfor={item.payfor}
                    purpose={item.purpose}
                    detail={item.detail}
                    categoryOfCost={item.categoryOfCost}
                    inside={item.inside}
                    outside={item.outside}
                    paidDate={item.paidDate}
                    cost={item.cost}
                    isApproved={item.isApproved}
                    receipt={item.receipt}
                    userID={item.userID}
                  />
                </Grid.Col>
              );
            })}
        </Grid>
      </PageContainer>
    </div>
  );
};

Application.getLayout = DashboardLayout;
export default Application;
