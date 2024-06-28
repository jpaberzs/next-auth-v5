'use client';

import * as z from 'zod';
import React from 'react';
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
import { LoginSchema } from '@/schemas';
import ErrorForm from '@/components/error-form';
import SuccessForm from '@/components/success-form';

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSumbit = (values: z.infer<typeof LoginSchema>) => {
    console.log('onSumbit: ', values);
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
            <FormItem>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="john.doe@example.com" />
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
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          </div>
          <ErrorForm message="Invalid credentials" />
          <SuccessForm message="Email sent!" />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
