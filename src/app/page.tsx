import Header from '@/components/Header';
import JobListings from '@/components/JobListings';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <JobListings />
    </div>
  );
}
