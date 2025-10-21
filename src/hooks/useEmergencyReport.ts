import { useState } from 'react';
import axios from 'axios';
import { EmergencyReport } from '../types/emergency.types';

export const useEmergencyReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitEmergencyReport = async (data: EmergencyReport) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('reservationId', data.reservationId);
      formData.append('emergencyType', data.emergencyType);
      formData.append('description', data.description);

      data.photos.forEach((photo, index) => {
        formData.append(`photo${index + 1}`, photo);
      });

      const response = await axios.post('/api/emergency-reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit report');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitEmergencyReport,
    isSubmitting,
    error,
  };
};
