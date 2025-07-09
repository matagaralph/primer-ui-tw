'use client';

import {
  Button,
  FormControl,
  Heading,
  SegmentedControl,
  TextInput,
} from '@primer/react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { setTheme } = useTheme();

  return (
    <main className='tw:mx-auto tw:max-w-4xl tw:px-4 tw:pt-8 tw:pb-12 tw:sm:px-6'>
      <section className='tw:mb-12'>
        <Heading as='h2' variant='medium' className='tw:mb-2'>
          Change Password
        </Heading>
        <p className='tw:text-muted tw:text-sm'>
          Update your login credentials.
        </p>
        <div className='tw:mt-4 tw:rounded-md tw:border tw:border-default tw:p-6 tw:shadow-xs'>
          <form onSubmit={(e) => e.preventDefault()} className='tw:space-y-4'>
            <FormControl required>
              <FormControl.Label>Current Password</FormControl.Label>
              <TextInput type='password' block />
            </FormControl>
            <FormControl required>
              <FormControl.Label>New Password</FormControl.Label>
              <TextInput type='password' block />
            </FormControl>
            <FormControl required>
              <FormControl.Label>Confirm New Password</FormControl.Label>
              <TextInput type='password' block />
            </FormControl>
            <Button type='submit' variant='primary' className='tw:mt-2'>
              Save Changes
            </Button>
          </form>
        </div>
      </section>

      <section>
        <Heading as='h2' variant='medium' className='tw:mb-2'>
          Appearance Settings
        </Heading>
        <p className='tw:text-muted tw:text-sm'>Choose your preferred theme.</p>
        <div className='tw:mt-4 tw:rounded-md tw:border tw:border-default tw:p-6 tw:shadow-xs'>
          <SegmentedControl aria-label='Theme selector'>
            <SegmentedControl.Button onClick={() => setTheme('light')}>
              Light
            </SegmentedControl.Button>
            <SegmentedControl.Button onClick={() => setTheme('dark')}>
              Dark
            </SegmentedControl.Button>
          </SegmentedControl>
        </div>
      </section>
    </main>
  );
}
