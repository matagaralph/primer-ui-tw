'use client';
import {
  AppsIcon,
  BookIcon,
  GearIcon,
  InboxIcon,
  PackageIcon,
  QuestionIcon,
  SearchIcon,
  SignOutIcon,
  TagIcon,
} from '@primer/octicons-react';
import {
  ActionList,
  ActionMenu,
  Avatar,
  IconButton,
  PageHeader,
  TextInput,
  UnderlineNav,
} from '@primer/react';
import { StoreIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import AppLogoIcon from './app-logo-icon';

const navItems = [
  { href: '/', label: 'Overview', icon: BookIcon },
  {
    href: '/products',
    label: 'Products',
    icon: TagIcon,
  },
  { href: '/shops', label: 'Shops', icon: () => <StoreIcon size={16} /> },
  { href: '/settings', label: 'Settings', icon: GearIcon },
];

export default function AppNavbar() {
  const pathname = usePathname();
  console.log(pathname);

  const currentHref =
    navItems.find((item) => pathname === item.href)?.href ??
    navItems.find((item) => pathname.startsWith(item.href) && item.href !== '/')
      ?.href ??
    '/';
  return (
    <header className='tw:bg-muted tw:dark:bg-default'>
      <PageHeader
        sx={{
          paddingTop: '16px',
          marginX: '16px',
        }}
      >
        <PageHeader.TitleArea>
          <PageHeader.LeadingVisual>
            <AppLogoIcon className='tw:size-6' />
          </PageHeader.LeadingVisual>
          <PageHeader.Title>Smoasters</PageHeader.Title>
        </PageHeader.TitleArea>

        <PageHeader.Actions>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TextInput
              leadingVisual={SearchIcon}
              placeholder='Type to search'
              sx={{ minWidth: '272px' }}
            />

            <IconButton icon={QuestionIcon} aria-label='Help' />
            <IconButton icon={InboxIcon} aria-label='Notifications' />
            <ActionMenu>
              <ActionMenu.Anchor>
                <Avatar
                  src='https://avatars.githubusercontent.com/u/1?v=4'
                  size={28}
                />
              </ActionMenu.Anchor>
              <ActionMenu.Overlay>
                <ActionList showDividers>
                  <ActionList.Item
                    onSelect={() => {
                      alert('Item one clicked');
                    }}
                  >
                    <ActionList.LeadingVisual>
                      <AppsIcon />
                    </ActionList.LeadingVisual>
                    Dashboard
                  </ActionList.Item>
                  <ActionList.Item
                    variant='danger'
                    onSelect={() => {
                      alert('Item three clicked');
                    }}
                  >
                    <ActionList.LeadingVisual>
                      <SignOutIcon />
                    </ActionList.LeadingVisual>
                    Log out
                  </ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </div>
        </PageHeader.Actions>
      </PageHeader>
      <UnderlineNav aria-label='Navigation links'>
        {navItems.map(({ href, label, icon: Icon }) => (
          <UnderlineNav.Item
            key={href}
            href={href}
            icon={Icon}
            aria-current={href === currentHref ? 'page' : undefined}
          >
            {label}
          </UnderlineNav.Item>
        ))}
      </UnderlineNav>
    </header>
  );
}
