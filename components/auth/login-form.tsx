'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoginSchema } from '@/schemas';
import ErrorForm from '@/components/error-form';
import SuccessForm from '@/components/success-form';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || undefined;
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already use with another provider'
      : '';

  const [showTwofactor, setShowTwofactor] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSumbit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data) {
            if (data.error) {
              form.reset();
              if (data.error) setError(data.error);
              if (data.success) setSuccess(data.success);
            }

            if (data.success) {
              form.reset();
              if (data.error) setError(data.error);
              if (data.success) setSuccess(data.success);
            }

            if (data.twoFactor) {
              setShowTwofactor(true);
            }
          }
        })
        .catch(() => setError('Somthing went wrong'));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
          <div className="space-y-4">
            {showTwofactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwofactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john.doe@example.com"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <ErrorForm message={error || urlError} />
          <SuccessForm message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwofactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
