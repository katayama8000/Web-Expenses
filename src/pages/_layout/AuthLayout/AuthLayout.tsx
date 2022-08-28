import { Center, Container } from "@mantine/core";
import type { CustomLayout } from "next";
import { useIsLoggedIn } from "src/lib/hooks/useIsLoggedIn";

import { LayoutErrorBoundary } from "../LayoutErrorBoundary";

export const AuthLayout: CustomLayout = (page) => {
  useIsLoggedIn();
  return (
    <Center
      sx={(theme) => ({
        minHeight: "100vh",
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Container size="xs" sx={{ width: 480, paddingBottom: 16 }}>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </Container>
    </Center>
  );
};
