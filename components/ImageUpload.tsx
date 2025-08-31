import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert("Please upload an image file (png, jpg, etc.).");
      }
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  return (
    <div 
        className={`w-full max-w-2xl mx-auto h-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white/50'}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer text-center">
        <UploadIcon className={`w-16 h-16 mb-4 transition-colors ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
        <h3 className="text-2xl font-semibold text-gray-700">Upload an image</h3>
        <p className="mt-2 text-gray-500">Drag and drop a file here or click to browse</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
      </label>
    </div>
  );
};
