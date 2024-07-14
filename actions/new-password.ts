'use server';

import * as z from 'zod';
import bcrypt from 'bcrypt';

import { NewPasswordSchema } from '@/schemas';
import { getPasswordTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) return { error: 'Missing token!', success: '' };

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields) return { error: 'Invalid field!', success: '' };

  if (!validatedFields.data?.password) return { error: 'Invalid password!', success: '' };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordTokenByToken(token);

  if (!existingToken) return { error: 'Invalid token!', success: '' };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: 'Token has expired!', success: '' };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: 'Email does not exist', success: '' };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.resetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return { error: '', success: 'Password updated!' };
};
