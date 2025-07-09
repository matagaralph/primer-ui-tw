'use client';
import { DownloadIcon, SearchIcon } from '@primer/octicons-react';
import { ActionList, ActionMenu, Button, TextInput } from '@primer/react';
import { Column, DataTable, Table } from '@primer/react/experimental';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import xior from 'xior';

const columns: Column<Product>[] = [
  {
    header: 'Name',
    field: 'name',
    sortBy: 'alphanumeric',
    rowHeader: true,
  },
  {
    header: 'SKU',
    field: 'manufacturerNumber',
    sortBy: 'alphanumeric',
  },

  {
    header: 'Sales',
    field: 'sales',
    sortBy: 'basic',
  },
  {
    header: 'Stock Available',
    field: 'availableStock',
  },
  {
    header: 'Product Number',
    field: 'productNumber',
  },
  {
    header: 'Vendor',
    field: 'manufacturer.name',
    renderCell: (row) => (row?.manufacturer ? row.manufacturer.name : 'N/A'),
  },
];

export default function ProductPage() {
  const {
    data: products = [],
    isError,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ['shops'],
    queryFn: () =>
      xior
        .get<
          Product[]
        >('https://smoasters.coffeeannan.com/api/shopware/products')
        .then((res) => res.data),
  });

  const pageSize = 25;
  const [pageIndex, setPageIndex] = useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows = products.slice(start, end);

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:py-14 tw:pt-8 tw:sm:px-6'>
      <div className='tw:mb-4 tw:flex tw:items-center tw:gap-3'>
        {/* Search Input */}
        <div className='tw:flex-1'>
          <TextInput
            placeholder='Find  a product by name, sku...'
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
        <Button>Sync Stocks</Button>
        <Button variant='primary' trailingVisual={DownloadIcon}>
          Export CSV
        </Button>
      </div>
      <Table.Container>
        {isLoading && (
          <Table.Skeleton
            aria-labelledby='shipments loading'
            rows={10}
            columns={columns}
          />
        )}
        {products && (
          <>
            <DataTable data={rows} columns={columns} />
            <Table.Pagination
              aria-label='Pagination for shipments'
              pageSize={pageSize}
              totalCount={products.length}
              onChange={({ pageIndex }) => {
                setPageIndex(pageIndex);
              }}
            />
          </>
        )}
      </Table.Container>
    </main>
  );
}
