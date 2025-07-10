import { Box, Spinner } from '@primer/react';
import { useQuery } from '@tanstack/react-query';
import smoastersApi from '@/lib/http';

interface Statistics {
  parcels_shipped: number;
  total_items_sold: number;
  shipping_costs: number;
  packaging_material: number;
  pick_and_pack: number;
}

const LABELS: Record<keyof Statistics, string> = {
  parcels_shipped: 'Parcels Shipped',
  total_items_sold: 'Items Sold',
  shipping_costs: 'Shipping Costs',
  packaging_material: 'Packaging Material',
  pick_and_pack: 'Pick and Pack',
};

const CURRENCY_KEYS = ['shipping_costs', 'packaging_material', 'pick_and_pack'];

function StatsCard() {
  const {
    data = {} as Statistics,
    isLoading,
    isError,
  } = useQuery<Statistics>({
    queryKey: ['statistics'],
    queryFn: () =>
      smoastersApi.get<Statistics>('/statistics').then((res) => res.data),
  });

  if (isLoading) {
    return <Spinner size='large' />;
  }

  if (isError) {
    return <p className='tw:text-red-500'>Failed to load stats</p>;
  }

  return (
    <>
      {Object.entries(LABELS).map(([key, label]) => {
        const value = (data as any)[key];
        const formatted = CURRENCY_KEYS.includes(key)
          ? `€${value?.toLocaleString() ?? '-'}`
          : (value?.toLocaleString?.() ?? '-');

        return (
          <Box
            key={key}
            sx={{
              overflow: 'hidden',
              borderRadius: '8px',
              borderColor: 'border.default',
              borderWidth: 1,
              borderStyle: 'solid',
              paddingX: '16px',
              paddingY: '12px',
              boxShadow: 'shadow.small',
              marginBottom: '12px',
            }}
          >
            <dt className='tw:truncate tw:text-sm tw:font-medium tw:text-[var(--fgColor-default)]'>
              {label}
            </dt>
            <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
              {formatted}
            </dd>
          </Box>
        );
      })}
    </>
  );
}

export default StatsCard;
