import type { CustomNextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthLayout } from "src/layout";
import { getPath } from "src/lib/const";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Space,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { supabase } from "src/lib/supabase/supabase";

const SignIn: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { pathname, push } = useRouter();
  const signIn = () => {
    router.push(getPath("INDEX"));
  };

  //authの変更を検知
  supabase.auth.onAuthStateChange((_, session) => {
    console.log(session);
    if (session?.user && (pathname === "/sign-in" || pathname === "/sign-up")) {
      push("/");
    } else if (!session?.user && pathname !== "/signup") {
      push("/sign-in");
    }
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const { user, session, error } = await supabase.auth.signIn({
      email: values.email,
      password: values.password,
    });

    if (user) {
      console.log(user);
      console.log(user.id);
      signIn();
    }
    if (session) {
      console.log("session", session);
    }
    if (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        ログイン
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        アカウントをお持ちでないですか？{" "}
        <Link href={getPath("SIGN_UP")} passHref>
          <Anchor<"a"> size="sm">新規登録</Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSignIn(values))}>
          <TextInput
            label="メールアドレス"
            placeholder="test@example.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="パスワード"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Space h="md" />
          <Group position="apart" mt="md">
            <Checkbox label="ログイン状態を保持" />
            <Link href={getPath("FORGOT_PASSWORD")} passHref>
              <Anchor<"a"> size="sm">パスワードをお忘れですか？</Anchor>
            </Link>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            ログイン
          </Button>
        </form>
      </Paper>
    </>
  );
};

SignIn.getLayout = AuthLayout;

export default SignIn;
