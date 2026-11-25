import FuelCalculator from '@/components/calculators/FuelCalculator';
import PageHero from '@/components/PageHero';
export const metadata = {
  title: 'Bike FuelCalculator India',
  description: 'Estimate your bike fuel expenses instantly.',
  alternates: { canonical: '/fuel-cost-calculator/' },
};
export default function Page() {
  return (
  

     <>
      <PageHero eyebrow="Fuel cost" lines={['Bike EMI', <em key="c" className="hl">calculator.</em>]}>
        Estimate your bike's fuel expenses instantly.
      </PageHero>
      <div className="container pad-b"><FuelCalculator /></div>
    </>
  );
}