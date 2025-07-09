import { Box } from '@primer/react';

export interface Usage {
  database: {
    total: {
      rows_read: number;
      rows_written: number;
      storage_bytes: number;
      bytes_synced: number;
    };
  };
}

function StatsCard() {
  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: '8px',
          borderColor: 'border.default',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingX: '16px',
          paddingY: '12px',
          boxShadow: 'shadow.small',
        }}
      >
        <dt className='tw:truncate tw:text-sm tw:font-medium tw:text-[var(--fgColor-default)]'>
          Orders Received
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          45
        </dd>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: '8px',
          borderColor: 'border.default',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingX: '16px',
          paddingY: '12px',
          boxShadow: 'shadow.small',
        }}
      >
        <dt className='tw:truncate tw:text-sm tw:font-medium tw:text-[var(--fgColor-default)]'>
          Shipping Costs
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          $1,020
        </dd>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: '8px',
          borderColor: 'border.default',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingX: '16px',
          paddingY: '12px',
          boxShadow: 'shadow.small',
        }}
      >
        <dt className='tw:truncate tw:text-sm tw:font-medium tw:text-[var(--fgColor-default)]'>
          Parcels Shipped
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          44
        </dd>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: '8px',
          borderColor: 'border.default',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingX: '16px',
          paddingY: '12px',
          boxShadow: 'shadow.small',
        }}
      >
        <dt className='tw:truncate tw:text-sm tw:font-medium tw:text-[var(--fgColor-default)]'>
          Pending
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          01
        </dd>
      </Box>
    </>
  );
}

export default StatsCard;
