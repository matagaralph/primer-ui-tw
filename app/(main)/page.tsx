import StatsCard from '@/components/card';
import { OverView } from './overview';

export default function IndexPage() {
  return (
    <>
      <main className='tw:mx-auto tw:max-w-7xl tw:px-4 tw:py-8 tw:sm:px-6'>
        <div className='tw:!mt-4 tw:!mb-8 tw:grid tw:grid-cols-1 tw:gap-5 tw:sm:grid-cols-3 tw:lg:grid-cols-4'>
          <StatsCard />
        </div>
        <OverView />
      </main>
    </>
  );
}
