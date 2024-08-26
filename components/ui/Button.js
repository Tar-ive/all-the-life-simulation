import React from 'react';

export const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-block px-6 py-3 font-bold text-white bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-gray-700 ${className}`}
      style={{
        isolation: 'isolate',
      }}
    >
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute inset-0 z-0 bg-gray-600 transition-transform duration-300 ease-in-out transform translate-y-full"
        style={{
          content: "''",
        }}
      />
      <style jsx>{`
        button:hover span:last-child {
          transform: translateY(0);
        }
      `}</style>
    </button>
  );
};