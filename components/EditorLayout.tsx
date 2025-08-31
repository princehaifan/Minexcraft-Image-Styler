import React from 'react';
import { ControlPanel } from './StylePanel';
import { Canvas } from './Editor';
import type { Style } from '../types';

interface EditorLayoutProps {
  uploadedFile: File | null;
  generatedImageUrl: string | null;
  isLoading: boolean;
  onImageUpload: (file: File) => void;
  styles: Style[];
  selectedStyles: Style[];
  onStyleSelect: (style: Style) => void;
  onGenerate: () => void;
  onSaveCombination: (name: string, stylesToSave: Style[]) => boolean;
  onClearSelection: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
  error: string | null;
}

export const EditorLayout: React.FC<EditorLayoutProps> = (props) => {
  return (
    <main className="flex-1 flex h-full overflow-hidden">
      <ControlPanel
        styles={props.styles}
        selectedStyles={props.selectedStyles}
        onStyleSelect={props.onStyleSelect}
        onGenerate={props.onGenerate}
        onSaveCombination={props.onSaveCombination}
        onClearSelection={props.onClearSelection}
        isGenerating={props.isGenerating}
        generatedImageUrl={props.generatedImageUrl}
        canGenerate={props.canGenerate}
        error={props.error}
        uploadedFile={props.uploadedFile}
      />
      <Canvas
        uploadedFile={props.uploadedFile}
        generatedImageUrl={props.generatedImageUrl}
        isLoading={props.isLoading}
        onImageUpload={props.onImageUpload}
      />
    </main>
  );
};