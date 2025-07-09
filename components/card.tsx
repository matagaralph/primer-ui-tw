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

function StatsCard({ usage: { database } }: { usage: Usage }) {
  const { total } = database;
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
          Orders
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          {total.rows_read}
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
          Rows Written
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          {total.rows_written}
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
          Storage
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          {total.storage_bytes / 1024} MB
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
          Storage Synced
        </dt>
        <dd className='tw:mt-1 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-[var(--fgColor-muted)]'>
          {total.bytes_synced / 1024} MB
        </dd>
      </Box>
    </>
  );
}

export default StatsCard;
