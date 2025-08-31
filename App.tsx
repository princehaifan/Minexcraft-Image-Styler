import React, { useState, useCallback, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { EditorLayout } from './components/EditorLayout';
import { MyStyles } from './components/MyStyles';
import { Feed } from './components/Feed';
import { Saved } from './components/Saved';
import { Shared } from './components/Shared';
import { Toast } from './components/Toast';
import { generateStyledImage } from './services/geminiService';
import { toBase64 } from './utils/imageUtils';
import type { Style, CustomStyle } from './types';
import { STYLES } from './constants';

export type View = 'editor' | 'feed' | 'my-styles' | 'saved' | 'shared';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('editor');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([]);
  const [customStyles, setCustomStyles] = useState<CustomStyle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      const savedStyles = localStorage.getItem('minexcraft_custom_styles');
      if (savedStyles) {
        setCustomStyles(JSON.parse(savedStyles));
      }
    } catch (err) {
      console.error("Failed to load custom styles from localStorage", err);
    }
  }, []);

  const updateCustomStyles = (newStyles: CustomStyle[]) => {
    setCustomStyles(newStyles);
    try {
      localStorage.setItem('minexcraft_custom_styles', JSON.stringify(newStyles));
    } catch (err) {
      console.error("Failed to save custom styles to localStorage", err);
    }
  };

  const handleStyleSelect = (style: Style) => {
    setSelectedStyles(prev =>
      prev.find(s => s.name === style.name)
        ? prev.filter(s => s.name !== style.name)
        : [...prev, style]
    );
  };
  
  const handleGenerate = useCallback(async () => {
    if (!uploadedFile || selectedStyles.length === 0) {
      setError("Please upload an image and select at least one style.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const { base64, mimeType } = await toBase64(uploadedFile);
      const styleNames = selectedStyles.map(s => s.name);
      const newImageBase64 = await generateStyledImage(base64, mimeType, styleNames);
      setGeneratedImageUrl(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile, selectedStyles]);

  const handleImageUpload = (file: File) => {
    setUploadedFile(file);
    setGeneratedImageUrl(null);
    setError(null);
  }

  const handleApplyCustomStyle = (styleNames: string[]) => {
    const stylesToApply = STYLES.filter(style => styleNames.includes(style.name));
    setSelectedStyles(stylesToApply);
    setCurrentView('editor');
  };
  
  const hideToast = () => setToast(null);

  const handleSaveCustomStyle = (name: string, stylesToSave: Style[]) => {
    if (customStyles.some(cs => cs.name.toLowerCase() === name.toLowerCase())) {
      setToast({
        message: `A style named "${name}" already exists.`,
        type: 'error',
      });
      return false;
    }
    const newCustomStyle: CustomStyle = {
      name,
      styles: stylesToSave.map(s => s.name),
    };
    updateCustomStyles([...customStyles, newCustomStyle]);
    setToast({
      message: `Style combination "${name}" saved!`,
      type: 'success',
    });
    return true;
  };

  const handleDeleteCustomStyle = (name: string) => {
    if (window.confirm(`Are you sure you want to delete the custom style "${name}"?`)) {
      const newStyles = customStyles.filter(cs => cs.name !== name);
      updateCustomStyles(newStyles);
    }
  };

  const handleClearSelectedStyles = () => {
    setSelectedStyles([]);
  };


  const renderContent = () => {
    switch (currentView) {
      case 'my-styles':
        return <MyStyles 
          customStyles={customStyles}
          onApplyCustomStyle={handleApplyCustomStyle}
          onDeleteCustomStyle={handleDeleteCustomStyle}
        />;
      case 'feed':
        return <Feed />;
      case 'saved':
        return <Saved />;
      case 'shared':
        return <Shared />;
      case 'editor':
      default:
        return (
          <EditorLayout
            uploadedFile={uploadedFile}
            generatedImageUrl={generatedImageUrl}
            isLoading={isLoading}
            onImageUpload={handleImageUpload}
            styles={STYLES}
            selectedStyles={selectedStyles}
            onStyleSelect={handleStyleSelect}
            onGenerate={handleGenerate}
            onSaveCombination={handleSaveCustomStyle}
            onClearSelection={handleClearSelectedStyles}
            isGenerating={isLoading}
            canGenerate={!!uploadedFile && selectedStyles.length > 0}
            error={error}
          />
        );
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800 font-sans antialiased">
      <TopBar currentView={currentView} onNavChange={setCurrentView} />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default App;