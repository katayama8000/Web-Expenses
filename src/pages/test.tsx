import { Button } from "@mantine/core";
import { DashboardLayout } from "src/layout";
import { supabase } from "src/lib/supabase/supabase";

export function Test() {
  const handleTest = async () => {
    const { data, error } = await supabase
      .from("test")
      .insert([{ name: "test" }]);

    console.log(data, error);
  };
  return (
    <div>
      <div></div>
      <Button onClick={handleTest}>test</Button>
    </div>
  );
}

Test.getLayout = DashboardLayout;

export default Test;
