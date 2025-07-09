'use client';

import { DataTable, Table } from '@primer/react/experimental';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import xior from 'xior';

export default function ShipmentsPage() {
  const {
    data: shipments = [], // fallback to empty array to avoid undefined errors
    isError,
    error,
    isLoading,
  } = useQuery<Shipment[], Error>({
    queryKey: ['shops'],
    queryFn: () =>
      xior
        .get<Shipment[]>('https://smoasters.coffeeannan.com/api/fufillments')
        .then((res) => res.data),
  });

  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows: Shipment[] = shipments.slice(start, end);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:pt-8 tw:sm:px-6'>
      <Table.Container>
        <DataTable
          aria-labelledby='repositories-default'
          data={rows}
          columns={[
            {
              header: 'Shipment ID',
              field: 'id',
              rowHeader: true,
              sortBy: 'alphanumeric',
            },
            {
              header: 'Order Number',
              field: 'order_number',
            },
            {
              header: 'Carrier',
              field: 'carrier',
              sortBy: 'alphanumeric',
            },
            {
              header: 'Market',
              field: 'market',
            },
            {
              header: 'Package Weight',
              field: 'package_weight',
              sortBy: 'alphanumeric',
            },
            {
              header: 'Tracking Number',
              field: 'tracking_number',
            },
            {
              header: 'Package Number',
              field: 'package_number',
            },
          ]}
        />
        <Table.Pagination
          aria-label='Pagination for Repositories'
          pageSize={pageSize}
          totalCount={shipments.length}
          onChange={({ pageIndex }) => {
            setPageIndex(pageIndex);
          }}
        />
      </Table.Container>
    </main>
  );
}
