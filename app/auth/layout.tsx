import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex items-center justify-center bg-sky-500 py-4">{children}</div>
  );
};

export default AuthLayout;
