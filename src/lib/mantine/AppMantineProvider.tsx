import type { FC, ReactNode } from "react";
import { MantineProvider, createEmotionCache } from "@mantine/core";

const myCache = createEmotionCache({ key: "mantine" });

export const AppMantineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider
      emotionCache={myCache}
      withGlobalStyles
      withNormalizeCSS
      theme={{ loader: "bars" }}
    >
      {children}
    </MantineProvider>
  );
};
