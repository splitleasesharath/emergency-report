import React, { useState } from 'react';
import EmergencyReportModal from './components/EmergencyReport/EmergencyReportModal';
import { useEmergencyReport } from './hooks/useEmergencyReport';
import { Booking } from './types/emergency.types';
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submitEmergencyReport } = useEmergencyReport();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual auth state

  // Mock bookings data - replace with actual API call
  const userBookings: Booking[] = [
    {
      id: '1',
      listingName: 'Cozy Downtown Apartment',
      listingId: 'listing-1',
      checkIn: new Date('2024-01-15'),
      checkOut: new Date('2024-01-20'),
    },
    {
      id: '2',
      listingName: 'Beachfront Villa',
      listingId: 'listing-2',
      checkIn: new Date('2024-02-01'),
      checkOut: new Date('2024-02-07'),
    },
    {
      id: '3',
      listingName: 'Mountain Retreat Cabin',
      listingId: 'listing-3',
      checkIn: new Date('2024-03-10'),
      checkOut: new Date('2024-03-15'),
    },
  ];

  const handleSubmit = async (data: any) => {
    try {
      await submitEmergencyReport(data);
      alert('Emergency report submitted successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Failed to submit emergency report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Emergency Report Component Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Click the button below to test the emergency report modal
        </p>
        <div className="space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            Report Emergency
          </button>
          <div className="flex items-center justify-center gap-4 mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAuthenticated}
                onChange={(e) => setIsAuthenticated(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700">Authenticated User</span>
            </label>
          </div>
        </div>
      </div>

      <EmergencyReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        userBookings={userBookings}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

export default App;
