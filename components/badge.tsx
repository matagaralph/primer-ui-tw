import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Link from 'next/link';

const colors = {
  red: 'tw:bg-red-500/15 tw:text-red-700 tw:group-data-hover:bg-red-500/25 tw:dark:bg-red-500/10 tw:dark:text-red-400 tw:dark:group-data-hover:bg-red-500/20',
  orange:
    'tw:bg-orange-500/15 tw:text-orange-700 tw:group-data-hover:bg-orange-500/25 tw:dark:bg-orange-500/10 tw:dark:text-orange-400 tw:dark:group-data-hover:bg-orange-500/20',
  amber:
    'tw:bg-amber-400/20 tw:text-amber-700 tw:group-data-hover:bg-amber-400/30 tw:dark:bg-amber-400/10 tw:dark:text-amber-400 tw:dark:group-data-hover:bg-amber-400/15',
  yellow:
    'tw:bg-yellow-400/20 tw:text-yellow-700 tw:group-data-hover:bg-yellow-400/30 tw:dark:bg-yellow-400/10 tw:dark:text-yellow-300 tw:dark:group-data-hover:bg-yellow-400/15',
  lime: 'tw:bg-lime-400/20 tw:text-lime-700 tw:group-data-hover:bg-lime-400/30 tw:dark:bg-lime-400/10 tw:dark:text-lime-300 tw:dark:group-data-hover:bg-lime-400/15',
  green:
    'tw:bg-green-500/15 tw:text-green-700 tw:group-data-hover:bg-green-500/25 tw:dark:bg-green-500/10 tw:dark:text-green-400 tw:dark:group-data-hover:bg-green-500/20',
  emerald:
    'tw:bg-emerald-500/15 tw:text-emerald-700 tw:group-data-hover:bg-emerald-500/25 tw:dark:bg-emerald-500/10 tw:dark:text-emerald-400 tw:dark:group-data-hover:bg-emerald-500/20',
  teal: 'tw:bg-teal-500/15 tw:text-teal-700 tw:group-data-hover:bg-teal-500/25 tw:dark:bg-teal-500/10 tw:dark:text-teal-300 tw:dark:group-data-hover:bg-teal-500/20',
  cyan: 'tw:bg-cyan-400/20 tw:text-cyan-700 tw:group-data-hover:bg-cyan-400/30 tw:dark:bg-cyan-400/10 tw:dark:text-cyan-300 tw:dark:group-data-hover:bg-cyan-400/15',
  sky: 'tw:bg-sky-500/15 tw:text-sky-700 tw:group-data-hover:bg-sky-500/25 tw:dark:bg-sky-500/10 tw:dark:text-sky-300 tw:dark:group-data-hover:bg-sky-500/20',
  blue: 'tw:bg-blue-500/15 tw:text-blue-700 tw:group-data-hover:bg-blue-500/25 tw:dark:text-blue-400 tw:dark:group-data-hover:bg-blue-500/25',
  indigo:
    'tw:bg-indigo-500/15 tw:text-indigo-700 tw:group-data-hover:bg-indigo-500/25 tw:dark:text-indigo-400 tw:dark:group-data-hover:bg-indigo-500/20',
  violet:
    'tw:bg-violet-500/15 tw:text-violet-700 tw:group-data-hover:bg-violet-500/25 tw:dark:text-violet-400 tw:dark:group-data-hover:bg-violet-500/20',
  purple:
    'tw:bg-purple-500/15 tw:text-purple-700 tw:group-data-hover:bg-purple-500/25 tw:dark:text-purple-400 tw:dark:group-data-hover:bg-purple-500/20',
  fuchsia:
    'tw:bg-fuchsia-400/15 tw:text-fuchsia-700 tw:group-data-hover:bg-fuchsia-400/25 tw:dark:bg-fuchsia-400/10 tw:dark:text-fuchsia-400 tw:dark:group-data-hover:bg-fuchsia-400/20',
  pink: 'tw:bg-pink-400/15 tw:text-pink-700 tw:group-data-hover:bg-pink-400/25 tw:dark:bg-pink-400/10 tw:dark:text-pink-400 tw:dark:group-data-hover:bg-pink-400/20',
  rose: 'tw:bg-rose-400/15 tw:text-rose-700 tw:group-data-hover:bg-rose-400/25 tw:dark:bg-rose-400/10 tw:dark:text-rose-400 tw:dark:group-data-hover:bg-rose-400/20',
  zinc: 'tw:bg-zinc-600/10 tw:text-zinc-700 tw:group-data-hover:bg-zinc-600/20 tw:dark:bg-white/5 tw:dark:text-zinc-400 tw:dark:group-data-hover:bg-white/10',
};

type BadgeProps = { color?: keyof typeof colors };

export function Badge({
  color = 'zinc',
  className,
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'tw:inline-flex tw:items-center tw:gap-x-1.5 tw:rounded-md tw:px-1.5 tw:py-0.5 tw:text-sm/5 tw:font-medium tw:sm:text-xs/5 tw:forced-colors:outline',
        colors[color]
      )}
    />
  );
}

export const BadgeButton = forwardRef(function BadgeButton(
  {
    color = 'zinc',
    className,
    children,
    ...props
  }: BadgeProps & { className?: string; children: React.ReactNode } & (
      | Omit<Headless.ButtonProps, 'as' | 'className'>
      | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
    ),
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    'tw:group tw:relative tw:inline-flex tw:rounded-md tw:focus:outline-hidden tw:data-focus:outline-2 tw:data-focus:outline-offset-2 tw:data-focus:outline-blue-500'
  );

  return 'href' in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <Badge color={color}>{children}</Badge>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <Badge color={color}>{children}</Badge>
    </Headless.Button>
  );
});
