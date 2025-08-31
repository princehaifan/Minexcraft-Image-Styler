import React, { useState, useMemo } from 'react';
import type { Style } from '../types';
import { StyleCard } from './StyleCard';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CombineIcon } from './icons/CombineIcon';

interface ControlPanelProps {
  styles: Style[];
  selectedStyles: Style[];
  onStyleSelect: (style: Style) => void;
  onGenerate: () => void;
  onSaveCombination: (name: string, stylesToSave: Style[]) => boolean;
  onClearSelection: () => void;
  isGenerating: boolean;
  generatedImageUrl: string | null;
  canGenerate: boolean;
  error: string | null;
  uploadedFile: File | null;
}

const PrimaryButton: React.FC<{ 
    onClick: () => void; 
    disabled: boolean; 
    children: React.ReactNode;
    title?: string;
}> = ({ onClick, disabled, children, title }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`w-full flex items-center justify-center text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 focus:ring-black'
        }`}
    >
        {children}
    </button>
)

const SecondaryButton: React.FC<{ 
    onClick: () => void; 
    disabled: boolean; 
    children: React.ReactNode;
    isSuccess?: boolean;
}> = ({ onClick, disabled, children, isSuccess }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center text-md font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isSuccess ? 'bg-green-100 text-green-700' :
        disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'
        }`}
    >
        {children}
    </button>
)

export const ControlPanel: React.FC<ControlPanelProps> = ({
  styles,
  selectedStyles,
  onStyleSelect,
  onGenerate,
  onSaveCombination,
  onClearSelection,
  isGenerating,
  generatedImageUrl,
  canGenerate,
  error,
  uploadedFile,
}) => {
  const [activeTab, setActiveTab] = useState('New');
  const [searchTerm, setSearchTerm] = useState('');
  const [isJustSaved, setIsJustSaved] = useState(false);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const allCategories = [...new Set(styles.map(s => s.category))];
    return allCategories.reduce((acc, category) => {
        acc[category] = true; // Default all categories to open
        return acc;
    }, {} as Record<string, boolean>);
  });

  const objectUrl = useMemo(() => uploadedFile ? URL.createObjectURL(uploadedFile) : null, [uploadedFile]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const filteredStyles = useMemo(() => {
    return styles.filter(style =>
      style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      style.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [styles, searchTerm]);
  
  const groupedStyles = useMemo(() => {
    return filteredStyles.reduce((acc, style) => {
      (acc[style.category] = acc[style.category] || []).push(style);
      return acc;
    }, {} as Record<string, Style[]>);
  }, [filteredStyles]);

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `minexcraft-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleSave = () => {
    if (isJustSaved) return;
    const name = prompt("Enter a name for this style combination:");
    if (name && name.trim()) {
      const success = onSaveCombination(name.trim(), selectedStyles);
      if (success) {
        onClearSelection();
        setIsJustSaved(true);
        setTimeout(() => setIsJustSaved(false), 2500);
      }
    }
  };
  
  const getGenerateButtonTooltip = () => {
    if (isGenerating || canGenerate) return undefined;
    const reasons = [];
    if (!uploadedFile) {
      reasons.push("upload an image");
    }
    if (selectedStyles.length === 0) {
      reasons.push("select at least one style");
    }
    if (reasons.length === 0) return undefined;
    return `Please ${reasons.join(' and ')}.`;
  };

  return (
    <div className="w-[400px] h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header Tabs */}
      <div className="p-2 border-b border-gray-200">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              {['New', 'Fine-tune', 'Variate'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    disabled={tab !== 'New'}
                    className={`flex-1 text-center text-sm font-semibold p-2 rounded-md transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-200'} ${tab !== 'New' ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                      {tab}
                  </button>
              ))}
          </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Uploaded Image Section */}
        {objectUrl && (
            <div className="p-4 border-b border-gray-200">
                <p className="text-xs font-semibold text-green-600 uppercase mb-2">Image</p>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <img src={objectUrl} alt="Uploaded preview" className="w-16 h-16 rounded-md object-cover" />
                    <div>
                        <p className="font-semibold text-gray-800">{uploadedFile?.name}</p>
                        <p className="text-sm text-gray-500">Source Image</p>
                    </div>
                </div>
            </div>
        )}

        {/* Style Selection Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-md font-bold text-gray-800">Select Styles</h2>
                <input
                type="text"
                placeholder="Search styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mt-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {Object.entries(groupedStyles).length > 0 ? (
                Object.entries(groupedStyles).map(([category, categoryStyles]) => (
                    <div key={category} className="mb-4">
                    <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
                        aria-expanded={openCategories[category]}
                    >
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{category}</h3>
                        <svg 
                        className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${openCategories[category] ? 'rotate-90' : 'rotate-0'}`}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {openCategories[category] && (
                        <div className="mt-3 grid grid-cols-2 gap-3">
                        {categoryStyles.map(style => (
                            <StyleCard
                            key={style.name}
                            style={style}
                            isSelected={selectedStyles.some(s => s.name === style.name)}
                            onSelect={onStyleSelect}
                            />
                        ))}
                        </div>
                    )}
                    </div>
                ))
                ) : (
                <div className="text-center py-10 px-4">
                    <p className="text-gray-500">No styles found for "{searchTerm}".</p>
                </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="mb-3">
            <div className="flex items-center gap-2">
                {selectedStyles.length > 1 && <CombineIcon className="w-4 h-4 text-gray-500" />}
                <h4 className="text-sm font-medium text-gray-600">Selected Styles:</h4>
            </div>
            <div className="text-sm text-indigo-600 font-medium mt-1 min-h-[20px] break-words">
                {selectedStyles.length > 0 ? selectedStyles.map(s => s.name).join(' + ') : <span className="text-gray-400 font-normal">None</span>}
            </div>
        </div>
        {error && <p className="text-sm text-red-500 mb-3 text-center">{error}</p>}
        <div className="space-y-3">
            <PrimaryButton
                onClick={onGenerate}
                disabled={isGenerating || !canGenerate}
                title={getGenerateButtonTooltip()}
            >
                {isGenerating ? <><SpinnerIcon className="w-6 h-6 mr-2" /> Generating...</> : 'Recraft'}
            </PrimaryButton>
            <div className="grid grid-cols-2 gap-3">
                <SecondaryButton
                    onClick={handleSave}
                    disabled={selectedStyles.length < 2 || isJustSaved}
                    isSuccess={isJustSaved}
                >
                    {isJustSaved ? '✓ Saved!' : 'Save Combination'}
                </SecondaryButton>
                <SecondaryButton
                    onClick={handleDownload}
                    disabled={!generatedImageUrl}
                >
                    Download Image
                </SecondaryButton>
            </div>
        </div>
      </div>
    </div>
  );
};