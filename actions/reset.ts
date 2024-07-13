'use server';

import * as z from 'zod';

import { getUserByEmail } from './../data/user';
import { ResetSchema } from './../schemas/index';
import { sendPsswordResetEmail } from './../lib/mail';
import { generatePasswordResetToken } from './../lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatesFields = ResetSchema.safeParse(values);

  if (!validatesFields.success) return { error: 'Invalid Email!', success: '' };

  const { email } = validatesFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: 'Email does not exist!', success: '' };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPsswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { error: '', success: 'Reset email sent!' };
};
