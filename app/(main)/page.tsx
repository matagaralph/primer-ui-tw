'use client';

import { Badge } from '@/components/badge';
import StatsCard from '@/components/card';
import { formatDateYMD } from '@/lib';
import { Column, DataTable, Table } from '@primer/react/experimental';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import xior from 'xior';

const usage = {
  database: {
    total: {
      rows_read: 124,
      rows_written: 98,
      storage_bytes: 52428800, // 50 MB
      bytes_synced: 26214400, // 25 MB
    },
  },
};

const columns: Column<ShopwareShipments>[] = [
  {
    header: 'Order Number',
    field: 'associatedOrderNumber',
    rowHeader: true,
    sortBy: 'alphanumeric',
  },
  {
    header: 'Date Placed',
    field: 'createdAt',
    renderCell: (row) => formatDateYMD(row.createdAt),
    sortBy: 'datetime',
  },
  {
    header: 'Tracking Link',
    field: 'trackingCode',
    renderCell: (row) => {
      return row.trackingLink ? (
        <Link
          target='_blank'
          className='tw:text-[var(--fgColor-link)]'
          href={row.trackingLink}
        >
          {row.trackingCode}
        </Link>
      ) : (
        'N/A'
      );
    },
  },
  {
    header: 'Shipping Method',
    field: 'shippingMethod',
  },
  {
    header: 'State',
    field: 'orderState',
    renderCell: (row) =>
      row.orderState === 'completed' ? (
        <Badge color='green'>{row.orderState}</Badge>
      ) : row.orderState === 'in_progress' ? (
        <Badge color='yellow'>{row.orderState}</Badge>
      ) : (
        <Badge color='red'>{row.orderState}</Badge>
      ),
  },
  {
    header: 'Latest Shipping Date',
    field: 'shippingDateLatest',
    renderCell: (row) => formatDateYMD(row.shippingDateLatest),
  },
];

export default function IndexPage() {
  const {
    data: shipments = [],
    isError,
    error,
    isLoading,
  } = useQuery<ShopwareShipments[], Error>({
    queryKey: ['shops'],
    queryFn: () =>
      xior
        .get<
          ShopwareShipments[]
        >('https://smoasters.coffeeannan.com/api/fufillments/shopware')
        .then((res) => res.data),
  });

  const pageSize = 15;
  const [pageIndex, setPageIndex] = useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows: ShopwareShipments[] = shipments.slice(start, end);

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:py-8 tw:sm:px-6'>
        <div className='tw:!mt-4 tw:!mb-8 tw:grid tw:grid-cols-1 tw:gap-5 tw:sm:grid-cols-3 tw:lg:grid-cols-4'>
          <StatsCard usage={usage} />
        </div>
        <div className=''>
          <Table.Container>
            {isLoading && (
              <Table.Skeleton
                aria-labelledby='shipments loading'
                rows={10}
                columns={columns}
              />
            )}
            {shipments && (
              <>
                <DataTable data={rows} columns={columns} />
                <Table.Pagination
                  aria-label='Pagination for shipments'
                  pageSize={pageSize}
                  totalCount={shipments.length}
                  onChange={({ pageIndex }) => {
                    setPageIndex(pageIndex);
                  }}
                />
              </>
            )}
          </Table.Container>
        </div>
      </main>
    </>
  );
}
