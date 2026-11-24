import EmiCalculator from '@/components/calculators/EmiCalculator';
export const metadata = {
  title: 'Bike EMI Calculator India',
  description: 'Calculate your monthly bike loan EMI, total interest and total payable amount.',
  alternates: { canonical: '/bike-emi-calculator/' },
};
export default function Page() {
  return (
    <div className="container section">
      <h1>Bike EMI Calculator</h1>
      <p>Estimate your monthly payment before you visit the showroom.</p>
      <EmiCalculator />
    </div>
  );
}