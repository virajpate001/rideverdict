import MaintenanceCalculator from '@/components/calculators/MaintenanceCalculator';
export const metadata = {
  title: 'Bike Maintenance Cost Calculator',
  description: 'Estimate your yearly bike maintenance expenses.',
  alternates: { canonical: '/bike-maintenance-cost-calculator/' },
};
export default function Page() {
  return (
    <div className="container section">
      <h1>Bike Maintenance Cost Calculator</h1>
      <p>Estimate your yearly bike maintenance expenses.</p>
      <MaintenanceCalculator />
    </div>
  );
}