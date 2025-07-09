"use client";
import {
  FormControl,
  Heading,
  SegmentedControl,
  TextInput,
} from "@primer/react";

export default function SettingsPage() {
  return (
    <main className="tw:max-w-7xl tw:mx-auto tw:px-4 tw:pt-8 tw:sm:px-6">
      <Heading variant="small">Your Account</Heading>
      <div className="tw:mt-4 tw:border-b tw:border-default" />
      <div className="">
        <SegmentedControl aria-label="File view">
          <SegmentedControl.Button defaultSelected>
            Light
          </SegmentedControl.Button>
          <SegmentedControl.Button>Dark</SegmentedControl.Button>
          <SegmentedControl.Button>Sytem</SegmentedControl.Button>
        </SegmentedControl>
      </div>
    </main>
  );
}
