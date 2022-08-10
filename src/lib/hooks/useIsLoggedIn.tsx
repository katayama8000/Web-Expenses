import { useRouter } from "next/router";
import { supabase } from "src/lib/supabase/supabase";

export const useIsLoggedIn = () => {
  const { pathname, push, isReady } = useRouter();
  const isready = isReady;
  if (isready) {
    const user = supabase.auth.user();
    console.log(user);
    if (user && pathname === "/sign-in") {
      push("/");
      //ユーザーがsessionにないとき、新規登録以外はログイン画面に遷移
    } else if (!user && pathname !== "/sign-up") {
      push("/sign-in");
    }
  }
};
