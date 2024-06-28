import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ErrorFormProps {
  message?: string;
}

const ErrorForm = ({ message }: ErrorFormProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 test-sm text-destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      {message}
    </div>
  );
};

export default ErrorForm;
