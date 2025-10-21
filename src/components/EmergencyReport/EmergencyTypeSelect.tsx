import React, { forwardRef } from 'react';

interface EmergencyTypeSelectProps {
  error?: string;
}

const emergencyTypes = [
  { value: 'burst-water-pipe', label: 'Burst water pipe' },
  { value: 'injury-to-guest', label: 'Injury to guest' },
  { value: 'party-at-listing', label: 'Party at my listing!' },
];

const EmergencyTypeSelect = forwardRef<HTMLSelectElement, EmergencyTypeSelectProps>(
  ({ error, ...props }, ref) => {
    return (
      <div>
        <select
          ref={ref}
          {...props}
          className={`
            w-full px-4 py-3 rounded-lg border-2
            ${error ? 'border-red-500' : 'border-purple-400'}
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            text-gray-900 bg-white cursor-pointer
            transition-all
          `}
          defaultValue=""
        >
          <option value="" disabled>
            Type of emergency
          </option>
          {emergencyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

EmergencyTypeSelect.displayName = 'EmergencyTypeSelect';

export default EmergencyTypeSelect;
