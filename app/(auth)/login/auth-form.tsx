"use client";

import { Button, Checkbox, FormControl, TextInput } from "@primer/react";

export default function AuthForm() {
  return (
    <form className="tw:flex tw:flex-col tw:gap-6">
      <div className="tw:grid tw:gap-6">
        <div className="tw:grid tw:gap-2">
          <FormControl required>
            <FormControl.Label>Email address</FormControl.Label>
            <TextInput
              block
              type="email"
              tabIndex={1}
              autoComplete="email"
              placeholder="someone@example.com"
            />
          </FormControl>
        </div>
        <div className="tw:grid tw:gap-2">
          <FormControl required>
            <FormControl.Label>Password</FormControl.Label>
            <TextInput
              block
              type="password"
              tabIndex={1}
              autoComplete="current-password"
              placeholder="Password"
            />
          </FormControl>
        </div>
        <div className="tw:flex tw:items-center tw:space-x-3">
          <FormControl>
            <Checkbox value="default" tabIndex={3} />
            <FormControl.Label>Remember me</FormControl.Label>
          </FormControl>
        </div>
        <Button variant="primary">Continue with email</Button>
      </div>
    </form>
  );
}
