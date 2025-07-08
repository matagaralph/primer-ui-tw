"use client";
import { Button, Text } from "@primer/react";
import { useTheme } from "next-themes";

export default function IndexPage() {
  const { setTheme } = useTheme();
  return (
    <>
      <header className="tw:border-b tw:border-default tw:h-14"></header>
      <main className="tw:max-w-7xl tw:pt-8 tw:mx-auto tw:px-4 tw:sm:px-6">
        <Text className="mt-1">
          This is combination of GitHub Primer UI and TailwindCSS v4.
        </Text>
        <div className="tw:flex tw:items-center tw:gap-3.5">
          <Button variant="primary" onClick={() => setTheme("dark")}>
            Dark
          </Button>
          <Button onClick={() => setTheme("light")}>Light</Button>
        </div>
      </main>
    </>
  );
}
