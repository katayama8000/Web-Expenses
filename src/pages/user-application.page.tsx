/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mantine/core";
import React, { useCallback } from "react";
import { PageContainer } from "src/component/PageContainer";
import { DashboardLayout } from "src/pages/_layout";
import { useEffect } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { useState } from "react";
import { CommonApplication } from "@component/application/application";

type ApplicationProps = {
  id: number;
  payfor: string;
  purpose: string;
  detail: string;
  categoryOfCost: string;
  inside: string;
  outside: string;
  paidDate: Date;
  cost: number;
  isApproved: boolean;
};
const Application = () => {
  const [application, setApplication] = useState<ApplicationProps[]>([]);

  const getApplication = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from<ApplicationProps>("application")
        .select();
      console.log(data, error);
      if (!data || error) {
        console.error(error);
        return;
      }

      if (data) {
        console.log(data);
        setApplication(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getApplication();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .delete()
        .match({
          id: id,
        });
      console.log(data, error);
      if (!data || error) {
        return;
      }

      if (data) {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleEdit = async (id: number) => {
    try {
      const { data, error } = await supabase.from("application").update({
        id: id,
      });
      if (!data || error) {
        return;
      }
      if (data) {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <PageContainer title="過去の申請書類">
        <Grid>
          {application.map((item) => {
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
