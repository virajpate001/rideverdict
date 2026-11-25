import MaintenanceCalculator from '@/components/calculators/MaintenanceCalculator';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Bike Maintenance Cost Calculator',
  description: 'Estimate your yearly bike maintenance expenses.',
  alternates: { canonical: '/bike-maintenance-cost-calculator/' },
};
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Free tool" lines={['Maintenance', <em key="c" className="hl">calculator.</em>]}>
        Estimate your yearly bike maintenance expenses.
      </PageHero>
      <div className="container pad-b"><MaintenanceCalculator /></div>
    </>
  );
}