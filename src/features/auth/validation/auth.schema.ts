import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Step 1: Personal Info Schema
export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Full Name is required (minimum 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit mobile number'),
  dob: z.string().min(1, 'Please select your Date of Birth'),
});

// Step 2: Academic Info Schema
export const academicInfoSchema = z.object({
  usn: z.string().min(5, 'Valid USN is required (e.g. 1VA21CS001)'),
  branch: z.string().min(1, 'Please select or enter your Engineering Branch'),
  scheme: z.string().min(1, 'Please select your VTU Scheme'),
});

// Step 3: Password Schema
export const finalizePasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Full Combined Registration Schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  dob: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  usn: z.string().optional(),
  branch: z.string().min(1, 'Please select your branch'),
  scheme: z.string().min(1, 'Please select your VTU scheme'),
});

export const manualRegisterSchema = z
  .object({
    name: z.string().min(2, 'Full Name is required (minimum 2 characters)'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type AcademicInfoFormData = z.infer<typeof academicInfoSchema>;
export type FinalizePasswordFormData = z.infer<typeof finalizePasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ManualRegisterFormData = z.infer<typeof manualRegisterSchema>;

