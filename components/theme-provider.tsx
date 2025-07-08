"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { ThemeProvider as PrimerThemeProvider, theme } from "@primer/react";
import { useEffect, useState } from "react";
import deepmerge from "deepmerge";

const customTheme = deepmerge(theme, {
  fonts: {
    normal: "Inter-var,InterVariable, Inter, sans-serif",
  },
  fontSizes: {
    0: "14px",
    1: "16px",
    2: "20px",
    3: "24px",
    4: "32px",
    5: "40px",
    6: "48px",
    7: "52px",
  },
});

function PrimerWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
  }, [colorMode]);

  return (
    <PrimerThemeProvider
      colorMode={colorMode}
      theme={customTheme}
      preventSSRMismatch
    >
      {mounted ? children : <></>}
    </PrimerThemeProvider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="data-color-mode" defaultTheme="dark">
      <PrimerWrapper>{children}</PrimerWrapper>
    </NextThemeProvider>
  );
}
