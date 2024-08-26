import React from 'react';

export const CardHeader = ({ children, className }) => {
  return (
    <div className={`font-bold text-xl mb-2 p-4 bg-green-100 ${className}`}>
      {children}
    </div>
  );
};