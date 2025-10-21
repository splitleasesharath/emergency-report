import React, { useState, useRef } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ImageUploaderProps {
  label: string;
  onFileSelect: (file: File) => void;
  currentFile?: File;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  onFileSelect,
  currentFile,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsLoading(false);
        onFileSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="relative aspect-square cursor-pointer group rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 transition-all overflow-hidden bg-gray-50"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : preview ? (
        <>
          <img
            src={preview}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              Change Photo
            </span>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-purple-600 transition-colors">
          <PhotoIcon className="h-10 w-10 mb-2" />
          <p className="text-xs text-center px-2">
            Click to upload
            <br />
            an image
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
