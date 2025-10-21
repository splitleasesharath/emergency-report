import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReservationSelect from './ReservationSelect';
import EmergencyTypeSelect from './EmergencyTypeSelect';
import ImageUploader from './ImageUploader';
import { EmergencyFormData, Booking } from '../../types/emergency.types';

const emergencySchema = z.object({
  reservation: z.object({
    id: z.string(),
    listingName: z.string(),
  }).optional(),
  emergencyType: z.enum(['burst-water-pipe', 'injury-to-guest', 'party-at-listing'], {
    required_error: 'Please select an emergency type',
  }),
  description: z.string()
    .min(10, 'Please provide at least 10 characters')
    .max(1000, 'Description is too long'),
  photo1: z.instanceof(File).optional(),
  photo2: z.instanceof(File).optional(),
});

interface EmergencyReportFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  userBookings: Booking[];
  isAuthenticated: boolean;
}

const EmergencyReportForm: React.FC<EmergencyReportFormProps> = ({
  onSubmit,
  onCancel,
  userBookings,
  isAuthenticated,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmergencyFormData>({
    resolver: zodResolver(emergencySchema),
  });

  const selectedReservation = watch('reservation');
  const photo1 = watch('photo1');
  const photo2 = watch('photo2');

  const handleFormSubmit = async (data: EmergencyFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        reservationId: data.reservation?.id || '',
        emergencyType: data.emergencyType,
        description: data.description,
        photos: [data.photo1, data.photo2].filter(Boolean) as File[],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* User Info Icon */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {!isAuthenticated && (
          <span className="text-sm text-gray-600">If you're logged out</span>
        )}
      </div>

      {/* Reservation Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reservation
        </label>
        <ReservationSelect
          bookings={userBookings}
          value={selectedReservation}
          onChange={(booking) => setValue('reservation', booking)}
          disabled={!isAuthenticated}
        />
      </div>

      {/* Emergency Type Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type of Emergency *
        </label>
        <EmergencyTypeSelect
          {...register('emergencyType')}
          error={errors.emergencyType?.message}
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          {...register('description')}
          placeholder="Short description of the emergency"
          rows={6}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${errors.description ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            placeholder-gray-400 text-gray-900
            resize-none transition-all
          `}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Image Uploaders */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Photos (Optional)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <ImageUploader
            label="Photo 1"
            onFileSelect={(file) => setValue('photo1', file)}
            currentFile={photo1}
          />
          <ImageUploader
            label="Photo 2"
            onFileSelect={(file) => setValue('photo2', file)}
            currentFile={photo2}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !isAuthenticated}
          className={`
            w-full px-6 py-3.5 rounded-md
            bg-red-600 hover:bg-red-700
            text-white font-medium text-lg
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            shadow-lg hover:shadow-xl
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Report emergency'
          )}
        </button>
      </div>
    </form>
  );
};

export default EmergencyReportForm;
