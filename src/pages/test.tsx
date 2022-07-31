import { Button } from "@mantine/core";
import { DashboardLayout } from "src/layout";
import { supabase } from "src/lib/supabase/supabase";
import { state } from "src/lib/state/state";
import { useAtom } from "jotai";

export function Test() {
  const [data, setData] = useAtom(state);
  const handleTest = async () => {
    const { data, error } = await supabase
      .from("test")
      .insert([{ name: "test" }]);

    console.log(data, error);
  };
  return (
    <div>
      <div>aaa</div>
      <div>
        {data.map((item) => (
          <div key={item.name}>{item.name}</div>
        ))}
      </div>
      <Button onClick={handleTest}>test</Button>
    </div>
  );
}

Test.getLayout = DashboardLayout;

export default Test;
