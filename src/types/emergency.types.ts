export interface Booking {
  id: string;
  listingName: string;
  listingId: string;
  checkIn: Date;
  checkOut: Date;
}

export interface EmergencyReport {
  reservationId: string;
  emergencyType: EmergencyType;
  description: string;
  photos: File[];
}

export type EmergencyType =
  | 'burst-water-pipe'
  | 'injury-to-guest'
  | 'party-at-listing'
  | '';

export interface EmergencyFormData {
  reservation?: Booking;
  emergencyType: EmergencyType;
  description: string;
  photo1?: File;
  photo2?: File;
}

export interface EmergencyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmergencyReport) => Promise<void>;
  userBookings?: Booking[];
  isAuthenticated: boolean;
}
