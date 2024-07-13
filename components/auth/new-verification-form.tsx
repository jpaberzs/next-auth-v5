'use client';

import { useCallback, useEffect, useState } from 'react';
import CardWrapper from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import ErrorForm from '@/components/error-form';
import SuccessForm from '@/components/success-form';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!');
      return;
    }
    console.log(token);

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Failed to confirm verification!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Cofirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login">
      <div className="flex items-center flex-col gap-y-4 w-full justify-center">
        {!success && !error && <BeatLoader />}
        <ErrorForm message={error} />
        <SuccessForm message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
