import { db } from '@/lib/db';

export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.resetPasswordToken.findFirst({ where: { email } });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.resetPasswordToken.findUnique({ where: { token } });

    return passwordResetToken;
  } catch {
    return null;
  }
};
