import React, { useMemo } from 'react';
import { ImageUpload } from './ImageUpload';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { EditAreaIcon } from './icons/EditAreaIcon';
import { RemoveBgIcon } from './icons/RemoveBgIcon';
import { ChangeBgIcon } from './icons/ChangeBgIcon';
import { MockupIcon } from './icons/MockupIcon';
import { VectorIcon } from './icons/VectorIcon';
import { UpscaleIcon } from './icons/UpscaleIcon';
import { UndoIcon } from './icons/UndoIcon';
import { RedoIcon } from './icons/RedoIcon';
import { LayersIcon } from './icons/LayersIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { HelpIcon } from './icons/HelpIcon';


interface CanvasProps {
  uploadedFile: File | null;
  generatedImageUrl: string | null;
  isLoading: boolean;
  onImageUpload: (file: File) => void;
}

const ToolButton: React.FC<{icon: React.ReactNode, label: string, disabled?: boolean}> = ({ icon, label, disabled }) => (
    <button disabled={disabled} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors">
        {icon}
        <span>{label}</span>
    </button>
);

const BottomToolButton: React.FC<{icon: React.ReactNode, label?: string, disabled?: boolean, children?: React.ReactNode}> = ({ icon, label, disabled, children }) => (
    <button disabled={disabled} className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors">
        {icon}
        {label && <span>{label}</span>}
        {children}
    </button>
);

export const Canvas: React.FC<CanvasProps> = ({ uploadedFile, generatedImageUrl, isLoading, onImageUpload }) => {
  const objectUrl = useMemo(() => {
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    return null;
  }, [uploadedFile]);

  const displayUrl = generatedImageUrl || objectUrl;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 relative h-full bg-gray-100">
        {/* Top Toolbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/80 z-20">
            <div className="flex items-center p-1 gap-1">
                <ToolButton icon={<EditAreaIcon className="w-5 h-5"/>} label="Edit area" disabled />
                <ToolButton icon={<RemoveBgIcon className="w-5 h-5"/>} label="Remove bg" disabled />
                <ToolButton icon={<ChangeBgIcon className="w-5 h-5"/>} label="Change bg" disabled />
                <ToolButton icon={<MockupIcon className="w-5 h-5"/>} label="Make Mockup" disabled />
                <ToolButton icon={<VectorIcon className="w-5 h-5"/>} label="Vectorize" disabled />
                <ToolButton icon={<UpscaleIcon className="w-5 h-5"/>} label="Creative Upscale" disabled />
            </div>
        </div>


      <div className="relative w-full h-full flex items-center justify-center">
        {!displayUrl && !isLoading && <ImageUpload onImageUpload={onImageUpload} />}

        {displayUrl && (
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <img
              src={displayUrl}
              alt={generatedImageUrl ? "Generated artwork" : "Uploaded image"}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300 border-4 border-white"
            />
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
            <SpinnerIcon className="w-12 h-12 text-indigo-500" />
            <p className="mt-4 text-lg font-medium text-gray-600">Generating your masterpiece...</p>
            <p className="text-sm text-gray-400">This may take a moment.</p>
          </div>
        )}
      </div>

       {/* Bottom Toolbar */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/80 z-20">
            <div className="flex items-center p-1 gap-1">
                <BottomToolButton icon={<UndoIcon className="w-5 h-5"/>} disabled />
                <BottomToolButton icon={<RedoIcon className="w-5 h-5"/>} disabled />
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <BottomToolButton icon={null} disabled>
                    <span className="font-semibold text-gray-700">60%</span>
                </BottomToolButton>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <BottomToolButton icon={<LayersIcon className="w-5 h-5"/>} disabled />
                <BottomToolButton icon={<HistoryIcon className="w-5 h-5"/>} disabled />
                <BottomToolButton icon={<HelpIcon className="w-5 h-5"/>} disabled />
            </div>
        </div>
    </div>
  );
};