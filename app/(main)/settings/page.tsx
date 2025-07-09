'use client';
import { Heading, SegmentedControl } from '@primer/react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { setTheme } = useTheme();
  return (
    <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:pt-8 tw:sm:px-6'>
      <Heading variant='small'>Your Account</Heading>
      <div className='tw:mt-4 tw:border-b tw:border-default' />
      <div className=''>
        <SegmentedControl aria-label='File view'>
          <SegmentedControl.Button
            onClick={() => setTheme('dark')}
            defaultSelected
          >
            Light
          </SegmentedControl.Button>
          <SegmentedControl.Button>Dark</SegmentedControl.Button>
          <SegmentedControl.Button>Sytem</SegmentedControl.Button>
        </SegmentedControl>
      </div>
    </main>
  );
}
