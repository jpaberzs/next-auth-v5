import React from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

interface SuccessFormProps {
  message?: string;
}

const SuccessForm = ({ message }: SuccessFormProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 test-sm text-emerald-500">
      <CheckCircledIcon className="w-4 h-4" />
      {message}
    </div>
  );
};

export default SuccessForm;
