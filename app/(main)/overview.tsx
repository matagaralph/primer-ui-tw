'use client';

import { Badge } from '@/components/badge';
import { formatDateYMD } from '@/lib';
import smoastersApi from '@/lib/http';
import { Column, DataTable, Table } from '@primer/react/experimental';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

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
    header: 'Sales',
    field: 'sales',
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

export function OverView() {
  const {
    data: shipments = [],
    isError,
    error,
    isLoading,
  } = useQuery<ShopwareShipments[], Error>({
    queryKey: ['shops'],
    queryFn: () =>
      smoastersApi
        .get<ShopwareShipments[]>('/fufillments/shopware')
        .then((res) => res.data),
  });

  const pageSize = 15;
  const [pageIndex, setPageIndex] = useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows: ShopwareShipments[] = shipments.slice(start, end);

  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className=''>
      <Table.Container>
        {isLoading && (
          <Table.Skeleton
            aria-labelledby='shipments loading'
            rows={15}
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
  );
}
