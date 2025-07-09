'use client';
import { exportToCSV } from '@/lib';
import smoastersApi from '@/lib/http';
import { DownloadIcon, SearchIcon } from '@primer/octicons-react';
import { Button, TextInput } from '@primer/react';
import { Column, DataTable, Table } from '@primer/react/experimental';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

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
    renderCell: (row) =>
      row.sales <= 0 ? (
        <span className='tw:text-[var(--fgColor-danger)]'>{row.sales}</span>
      ) : (
        <span>{row.sales}</span>
      ),
    sortBy: 'basic',
  },
  {
    header: 'Stock Available',
    field: 'availableStock',
    sortBy: 'basic',
    renderCell: (row) =>
      row.sales <= 0 ? (
        <span className='tw:text-[var(--fgColor-danger)]'>
          {row.availableStock}
        </span>
      ) : (
        <span>{row.availableStock}</span>
      ),
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
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 25;

  const {
    data: products = [],
    isError,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ['shops'],
    queryFn: () =>
      smoastersApi.get<Product[]>('/shopware/products').then((res) => res.data),
  });

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return products.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(searchLower);

      const skuMatch = product.manufacturerNumber
        ?.toLowerCase()
        .includes(searchLower);

      return nameMatch || skuMatch;
    });
  }, [products, searchTerm]);

  // Reset pagination when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPageIndex(0);
  };

  // Paginate filtered results
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows = filteredProducts.slice(start, end);

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:py-14 tw:pt-8 tw:sm:px-6'>
      <div className='tw:mb-4 tw:flex tw:items-center tw:gap-3'>
        <div className='tw:flex-1'>
          <TextInput
            placeholder='Find a product by name, sku...'
            leadingVisual={SearchIcon}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
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
        <Button
          variant='primary'
          onClick={() => {
            exportToCSV(filteredProducts);
            toast.success('Inventory quantities have finished exporting.');
          }}
          trailingVisual={DownloadIcon}
          disabled={filteredProducts.length === 0}
        >
          Export CSV
        </Button>
      </div>

      {searchTerm && (
        <div className='tw:text-muted tw:mb-3 tw:text-sm'>
          Found {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}

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
              totalCount={filteredProducts.length}
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
