'use client';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/chart';

export const description = 'A simple area chart';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export default function IndexPage() {
  return (
    <>
      <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:pt-8 tw:sm:px-6'>
        <div className=''>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              <Area
                dataKey='desktop'
                type='natural'
                fill='var(--color-desktop)'
                fillOpacity={0.4}
                stroke='var(--color-desktop)'
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </main>
    </>
  );
}
