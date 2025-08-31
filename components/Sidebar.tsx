import React from 'react';
import type { View } from '../App';
import { CreateIcon } from './icons/CreateIcon';
import { FeedIcon } from './icons/FeedIcon';
import { StylesIcon } from './icons/StylesIcon';
import { SavedIcon } from './icons/SavedIcon';
import { SharedIcon } from './icons/SharedIcon';
import { RasterIcon } from './icons/RasterIcon';
import { VectorIcon } from './icons/VectorIcon';

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, disabled, onClick }) => (
  <a
    href="#"
    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={(e) => {
      e.preventDefault();
      if (!disabled && onClick) {
        onClick();
      }
    }}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

interface SidebarProps {
  currentView: View;
  onNavChange: (view: View) => void;
}


export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavChange }) => {
  return (
    <nav className="w-64 bg-gray-900/70 backdrop-blur-sm p-4 flex-shrink-0 flex flex-col justify-between border-r border-gray-700/50">
      <div>
        <div className="px-3 mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wider">minexcraft</h1>
          <p className="text-sm text-gray-500">AI Image Styler</p>
        </div>
        <div className="space-y-2">
          <NavItem icon={<CreateIcon />} label="Create New Project" active={currentView === 'editor'} onClick={() => onNavChange('editor')} />
          <NavItem icon={<FeedIcon />} label="Feed" active={currentView === 'feed'} onClick={() => onNavChange('feed')} />
          <NavItem icon={<StylesIcon />} label="My Styles" active={currentView === 'my-styles'} onClick={() => onNavChange('my-styles')} />
          <NavItem icon={<SavedIcon />} label="Saved" active={currentView === 'saved'} onClick={() => onNavChange('saved')} />
          <NavItem icon={<SharedIcon />} label="Shared" active={currentView === 'shared'} onClick={() => onNavChange('shared')} />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Output Format</h3>
        <NavItem icon={<RasterIcon />} label="Raster" active={true} />
        <NavItem icon={<VectorIcon />} label="Vector" disabled={true} />
      </div>
    </nav>
  );
};