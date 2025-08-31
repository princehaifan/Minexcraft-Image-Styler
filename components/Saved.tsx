import React from 'react';
import { SavedIcon } from './icons/SavedIcon';

export const Saved: React.FC = () => {
  return (
    <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-white h-full">
      <div className="max-w-7xl mx-auto">
        <header className="pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Saved Projects</h1>
          <p className="mt-1 text-gray-500">
            Your saved projects and generated images will appear here.
          </p>
        </header>

        <section className="mt-6">
          <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <SavedIcon className="w-12 h-12 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-700">Feature Under Development</h2>
            <p className="mt-2 text-gray-500">
              Soon you'll be able to save your work and continue editing later.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
