import React, { useState, useEffect, useRef } from 'react';
import type { View } from '../App';
import { CreateIcon } from './icons/CreateIcon';
import { FeedIcon } from './icons/FeedIcon';
import { StylesIcon } from './icons/StylesIcon';
import { SavedIcon } from './icons/SavedIcon';
import { SharedIcon } from './icons/SharedIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { UserIcon } from './icons/UserIcon';
import { ExportIcon } from './icons/ExportIcon';
import { ShareIcon } from './icons/ShareIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface TopBarProps {
  currentView: View;
  onNavChange: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <a
    href="#"
    className={`flex items-center w-full space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
      active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);


export const TopBar: React.FC<TopBarProps> = ({ currentView, onNavChange }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNav = (view: View) => {
        onNavChange(view);
        setDropdownOpen(false);
    }
  
    return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 flex-shrink-0 z-30">
        <div className="flex items-center gap-4">
            {/* Navigation Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <UserIcon className="w-6 h-6" />
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                        <div className="px-3 py-2 mb-2">
                            <h1 className="text-xl font-bold text-gray-800 tracking-wider">minexcraft</h1>
                            <p className="text-sm text-gray-500">AI Image Styler</p>
                        </div>
                        <div className="space-y-1">
                            <NavItem icon={<CreateIcon className="w-5 h-5"/>} label="Create New Project" active={currentView === 'editor'} onClick={() => handleNav('editor')} />
                            <NavItem icon={<FeedIcon className="w-5 h-5"/>} label="Feed" active={currentView === 'feed'} onClick={() => handleNav('feed')} />
                            <NavItem icon={<StylesIcon className="w-5 h-5"/>} label="My Styles" active={currentView === 'my-styles'} onClick={() => handleNav('my-styles')} />
                            <NavItem icon={<SavedIcon className="w-5 h-5"/>} label="Saved" active={currentView === 'saved'} onClick={() => handleNav('saved')} />
                            <NavItem icon={<SharedIcon className="w-5 h-5"/>} label="Shared" active={currentView === 'shared'} onClick={() => handleNav('shared')} />
                        </div>
                    </div>
                )}
            </div>

            {/* Other Header Items */}
            <button disabled className="flex items-center gap-2 p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50">
                <PaperAirplaneIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Insert</span>
                <ChevronDownIcon className="w-4 h-4" />
            </button>
            <button disabled className="flex items-center gap-2 p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50">
                <span className="font-medium text-sm">Templates</span>
                <ChevronDownIcon className="w-4 h-4" />
            </button>
        </div>
        <div className="flex items-center gap-2">
            <button disabled className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                <ExportIcon className="w-5 h-5" />
                <span>Export</span>
                <ChevronDownIcon className="w-4 h-4" />
            </button>
            <button disabled className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                <ShareIcon className="w-5 h-5" />
            </button>
            <button disabled className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50">
                <SparklesIcon className="w-5 h-5" />
                <span>Upgrade</span>
            </button>
            <button disabled className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50">
                <UserIcon className="w-6 h-6" />
            </button>
        </div>
    </header>
  );
};
