import EmiCalculator from '@/components/calculators/EmiCalculator';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Bike EMI Calculator India',
  description: 'Calculate your monthly bike loan EMI, total interest and total payable amount.',
  alternates: { canonical: '/bike-emi-calculator/' },
};
export default function Page() {
  return (
  <>
      <PageHero eyebrow="Free tool" lines={['Bike EMI', <em key="c" className="hl">calculator.</em>]}>
        Estimate your monthly payment before you visit the showroom.
      </PageHero>
      <div className="container pad-b"><EmiCalculator /></div>
    </>
  );
}