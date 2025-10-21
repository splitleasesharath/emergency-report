# Emergency Report Component

A modern, accessible React component for reporting emergencies on the Split Lease platform. Converted from Bubble.io to React with TypeScript, featuring comprehensive validation, beautiful UI, and excellent user experience.

## Features

- ✅ **Modern React + TypeScript** - Type-safe component library
- ✅ **Form Validation** - Using Zod and React Hook Form
- ✅ **Accessible** - Built with Headless UI components
- ✅ **Beautiful UI** - Tailwind CSS with custom styling
- ✅ **Image Upload** - Dual photo upload with preview
- ✅ **Responsive** - Mobile-first design
- ✅ **Loading States** - Smooth transitions and feedback
- ✅ **Error Handling** - Inline validation messages

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Accessible components
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Vite** - Fast build tool

## Installation

```bash
# Clone the repository
git clone https://github.com/splitleasesharath/emergency-report.git

# Navigate to the directory
cd emergency-report

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

### Basic Example

```tsx
import React, { useState } from 'react';
import { EmergencyReportModal } from './components/EmergencyReport';
import { useEmergencyReport } from './hooks/useEmergencyReport';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submitEmergencyReport } = useEmergencyReport();

  const userBookings = [
    {
      id: '1',
      listingName: 'Cozy Downtown Apartment',
      listingId: 'listing-1',
      checkIn: new Date('2024-01-15'),
      checkOut: new Date('2024-01-20'),
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await submitEmergencyReport(data);
      alert('Emergency report submitted!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Report Emergency
      </button>

      <EmergencyReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        userBookings={userBookings}
        isAuthenticated={true}
      />
    </>
  );
}
```

## Component API

### EmergencyReportModal Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Callback when modal closes |
| `onSubmit` | `(data: EmergencyReport) => Promise<void>` | Yes | Callback when form submits |
| `userBookings` | `Booking[]` | No | List of user's bookings/reservations |
| `isAuthenticated` | `boolean` | Yes | Whether user is logged in |

### EmergencyReport Type

```typescript
interface EmergencyReport {
  reservationId: string;
  emergencyType: 'burst-water-pipe' | 'injury-to-guest' | 'party-at-listing';
  description: string;
  photos: File[];
}
```

### Booking Type

```typescript
interface Booking {
  id: string;
  listingName: string;
  listingId: string;
  checkIn: Date;
  checkOut: Date;
}
```

## Project Structure

```
emergency-report/
├── src/
│   ├── components/
│   │   └── EmergencyReport/
│   │       ├── EmergencyReportModal.tsx    # Main modal component
│   │       ├── EmergencyReportForm.tsx     # Form with validation
│   │       ├── ReservationSelect.tsx       # Booking selector
│   │       ├── EmergencyTypeSelect.tsx     # Emergency type dropdown
│   │       ├── ImageUploader.tsx           # Image upload component
│   │       └── index.ts                    # Exports
│   ├── hooks/
│   │   └── useEmergencyReport.ts           # API integration hook
│   ├── types/
│   │   └── emergency.types.ts              # TypeScript definitions
│   ├── utils/
│   │   └── cn.ts                           # Utility functions
│   ├── App.tsx                             # Demo application
│   ├── main.tsx                            # App entry point
│   └── index.css                           # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Customization

### Styling

The component uses Tailwind CSS. You can customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      purple: {
        400: '#9F7AEA',
        500: '#805AD5',
        600: '#6B46C1',
      },
    },
  },
}
```

### API Endpoint

Update the API endpoint in `src/hooks/useEmergencyReport.ts`:

```typescript
const response = await axios.post('/api/emergency-reports', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

### Emergency Types

Add or modify emergency types in `src/components/EmergencyReport/EmergencyTypeSelect.tsx`:

```typescript
const emergencyTypes = [
  { value: 'burst-water-pipe', label: 'Burst water pipe' },
  { value: 'injury-to-guest', label: 'Injury to guest' },
  { value: 'party-at-listing', label: 'Party at my listing!' },
  // Add more types here
];
```

## Validation Rules

- **Emergency Type**: Required field
- **Description**:
  - Minimum 10 characters
  - Maximum 1000 characters
- **Photos**: Optional, accepts image files only
- **Reservation**: Optional (required if authenticated)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub or contact the Split Lease development team.

## Acknowledgments

- Original Bubble.io design by Split Lease team
- Converted to React by Claude Code
- Uses Headless UI for accessibility
- Styled with Tailwind CSS
