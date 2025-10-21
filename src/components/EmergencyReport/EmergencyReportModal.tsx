import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import EmergencyReportForm from './EmergencyReportForm';
import { EmergencyReportModalProps } from '../../types/emergency.types';

const EmergencyReportModal: React.FC<EmergencyReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userBookings = [],
  isAuthenticated,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="relative border-b border-gray-100 px-6 py-5">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  <Dialog.Title className="text-2xl font-semibold text-gray-900 pr-8">
                    Please report your emergency with details and photos if possible
                  </Dialog.Title>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  {!isAuthenticated && (
                    <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
                      <p className="text-sm text-amber-800">
                        Please{' '}
                        <a
                          href="/login"
                          className="font-medium underline hover:text-amber-900"
                        >
                          Log In to Continue
                        </a>
                      </p>
                    </div>
                  )}

                  <EmergencyReportForm
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    userBookings={userBookings}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EmergencyReportModal;
