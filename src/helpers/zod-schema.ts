import {z} from 'zod';

export const emailSchema = (emptyMessage: string) =>
  z
    .string()
    .min(1, {message: emptyMessage})
    .email({message: 'Please enter a valid email address.'});

export const phoneNumberSchema = (emptyMessage: string) =>
  z
    .string()
    .min(1, {
      message: emptyMessage,
    })
    .refine(val => val.length === 11, {
      message: 'Phone number must be 11 digits.',
    });

export const stringSchema = (emptyMessage: string) =>
  z.string().min(1, {
    message: emptyMessage,
  });

export const passwordSchema = (emptyMessage?: string) =>
  z
    .string()
    .min(1, {
      message: emptyMessage ?? 'Please enter your password',
    })
    .min(6, {message: 'Password must be at least 6 characters long.'})
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine(val => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter.',
    })
    .refine(val => /\d/.test(val), {
      message: 'Password must contain at least one number.',
    })
    .refine(val => /[@$!%*?&#]/.test(val), {
      message: 'Password must contain at least one special character.',
    });
