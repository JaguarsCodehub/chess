import React from 'react';

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className='bg-lime-500 hover:bg-lime-700 text-white font-bold py-4 px-8 rounded'
    >
      {children}
    </button>
  );
};
