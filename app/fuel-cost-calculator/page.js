import FuelCalculator from '@/components/calculators/FuelCalculator';
export const metadata = {
  title: 'Bike FuelCalculator India',
  description: 'Estimate your bike fuel expenses instantly.',
  alternates: { canonical: '/fuel-cost-calculator/' },
};
export default function Page() {
  return (
    <div className="container section">
      <h1>Fuel Cost Calculator</h1>
      <p>Estimate your bike's fuel expenses instantly.</p>
      <FuelCalculator />
    </div>
  );
}