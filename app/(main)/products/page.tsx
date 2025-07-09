'use client';
import { transactions } from '@/data/transactions';
import { DownloadIcon, SearchIcon } from '@primer/octicons-react';
import { ActionList, ActionMenu, Button, TextInput } from '@primer/react';
import { DataTable, Table } from '@primer/react/experimental';
import { useState } from 'react';

export default function ProductPage() {
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows = transactions.slice(start, end);

  return (
    <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:pt-8 tw:sm:px-6'>
      <div className='tw:mb-4 tw:flex tw:items-center tw:gap-3'>
        {/* Search Input */}
        <div className='tw:flex-1'>
          <TextInput
            placeholder='Find an order...'
            leadingVisual={SearchIcon}
            sx={{
              width: '100%',
              bg: 'canvas.subtle',
              borderColor: 'border.default',
              '&:focus': {
                borderColor: 'accent.emphasis',
                boxShadow: 'inset 0 0 0 1px var(--color-accent-emphasis)',
              },
            }}
          />
        </div>
        <ActionMenu>
          <ActionMenu.Button disabled>Filter by type</ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item
                onSelect={() => {
                  alert('Item one clicked');
                }}
              >
                Not Shipped
              </ActionList.Item>
              <ActionList.Item
                onSelect={() => {
                  alert('Item three clicked');
                }}
              >
                Shipped
              </ActionList.Item>
              <ActionList.Item
                onSelect={() => {
                  alert('Item two clicked');
                }}
              >
                Paid
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
        <Button variant='primary' trailingVisual={DownloadIcon}>
          Export CSV
        </Button>
      </div>
      <Table.Container>
        <DataTable
          aria-labelledby='repositories-default'
          data={rows}
          columns={[
            {
              header: 'Transaction ID',
              field: 'id',
              rowHeader: true,
              sortBy: 'alphanumeric',
            },
            {
              header: 'Company',
              field: 'company',
              sortBy: 'alphanumeric',
            },
            {
              header: 'Share',
              field: 'share',
            },
            {
              header: 'Comission',
              field: 'commission',
              sortBy: 'alphanumeric',
            },
            {
              header: 'Price',
              field: 'price',
            },
            {
              header: 'Quantity',
              field: 'quantity',
            },
            {
              header: 'Net amount',
              field: 'netAmount',
            },
          ]}
        />
        <Table.Pagination
          aria-label='Pagination for Repositories'
          pageSize={pageSize}
          totalCount={transactions.length}
          onChange={({ pageIndex }) => {
            setPageIndex(pageIndex);
          }}
        />
      </Table.Container>
    </main>
  );
}
