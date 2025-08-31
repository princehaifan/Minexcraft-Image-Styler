import React from 'react';
import type { CustomStyle } from '../types';

interface CustomStyleCardProps {
  name: string;
  styles: string[];
  onUse: (styles: string[]) => void;
  onDelete: (name: string) => void;
}

const CustomStyleCard: React.FC<CustomStyleCardProps> = ({ name, styles, onUse, onDelete }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
    <h3 className="text-lg font-bold text-gray-800">{name}</h3>
    <p className="text-sm text-gray-500 mt-1">Combination of:</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {styles.map(style => (
        <span key={style} className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded-full">
          {style}
        </span>
      ))}
    </div>
    <div className="mt-4 flex gap-2">
      <button 
        className="flex-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 rounded-md transition-colors"
        onClick={() => onUse(styles)}
      >
        Use Style
      </button>
      <button 
        className="text-sm bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-md transition-colors"
        onClick={() => onDelete(name)}
      >
        Delete
      </button>
    </div>
  </div>
);

interface MyStylesProps {
  customStyles: CustomStyle[];
  onApplyCustomStyle: (styleNames: string[]) => void;
  onDeleteCustomStyle: (name: string) => void;
}

export const MyStyles: React.FC<MyStylesProps> = ({ customStyles, onApplyCustomStyle, onDeleteCustomStyle }) => {
  return (
    <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-white h-full">
      <div className="max-w-7xl mx-auto">
        <header className="pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">My Styles</h1>
          <p className="mt-1 text-gray-500">
            Manage your saved style combinations. These can be used in any new project.
          </p>
        </header>

        <section className="mt-6">
          {customStyles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {customStyles.map(style => (
                <CustomStyleCard 
                  key={style.name} 
                  name={style.name} 
                  styles={style.styles}
                  onUse={onApplyCustomStyle}
                  onDelete={onDeleteCustomStyle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <h2 className="text-xl font-medium text-gray-700">No Custom Styles Saved</h2>
              <p className="mt-2 text-gray-500">
                Go to the editor, select two or more styles, and click "Save Combination" to create one.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
