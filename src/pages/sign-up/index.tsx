import type { CustomNextPage } from "next";
import Link from "next/link";
import { AuthLayout } from "src/layout";
import { getPath } from "src/lib/const";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Space,
  Button,
} from "@mantine/core";
import { supabase } from "src/lib/supabase/supabase";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUp: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSignUp = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const { user, session, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (user) {
      console.log(user);
      console.log(user.id);
      alert("メールを送信しました");
      router.push("sign-up/authentication");
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
        新規登録
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        アカウントを既にお持ちですか？
        <Link href={getPath("SIGN_IN")} passHref>
          <Anchor<"a"> size="sm">ログイン</Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
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
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            新規登録
          </Button>
        </form>
      </Paper>
    </>
  );
};

SignUp.getLayout = AuthLayout;

export default SignUp;
