import React, { useEffect } from 'react';
import { SuccessIcon } from './icons/SuccessIcon';
import { ErrorIcon } from './icons/ErrorIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const typeClasses = {
  success: 'bg-green-600 border-green-700',
  error: 'bg-red-600 border-red-700',
};

const icons = {
  success: <SuccessIcon className="w-6 h-6 text-white flex-shrink-0" />,
  error: <ErrorIcon className="w-6 h-6 text-white flex-shrink-0" />,
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div 
        className={`flex items-center gap-4 p-4 rounded-lg shadow-2xl border text-white ${typeClasses[type]} animate-fade-in-up max-w-sm`}
        role="alert"
        aria-live="assertive"
      >
        {icons[type]}
        <p className="font-medium text-sm">{message}</p>
        <button onClick={onClose} aria-label="Close notification" className="ml-auto p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
