'use client';
import { CounterLabel } from '@primer/react';
import { DataTable, Table } from '@primer/react/experimental';
import Link from 'next/link';

const shops = [
  {
    id: '1986',
    roaster_name: 'Coffee Annan',
    company: 'Social Ecosystems',
    website: 'https://annan-coffee.myshopify.com',
    platform: 'Shopify',
    status: 'On',
  },
];

export default function ShopsPage() {
  return (
    <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:pt-8 tw:sm:px-6'>
      {/* <PageHeader role="banner" aria-label="connected-shops">
        <PageHeader.TitleArea>
          <PageHeader.Title>Connected Shops</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Description>
          <Text>
            Below is a list of all the shops currently connected to your account
            through our integration.
          </Text>
        </PageHeader.Description>
      </PageHeader> */}
      <Table.Container>
        <DataTable
          data={shops}
          columns={[
            {
              header: 'ID',
              field: 'id',
            },
            {
              header: 'Coffee Roaster',
              field: 'roaster_name',
            },
            {
              header: 'Shop URL',
              field: 'website',
              renderCell: (row) => (
                <Link
                  target='_blank'
                  className='tw:text-[var(--fgColor-link)]'
                  href={row.website}
                >
                  {row.website}
                </Link>
              ),
            },
            {
              header: 'Company',
              field: 'company',
            },
            {
              header: 'Platform',
              field: 'platform',
            },
            {
              header: 'Status',
              field: 'status',
              renderCell: (row) => <CounterLabel>{row.status}</CounterLabel>,
            },
          ]}
        />
      </Table.Container>
    </main>
  );
}
