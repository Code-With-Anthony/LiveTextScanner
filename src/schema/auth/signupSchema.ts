import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(3, { message: "Last name is required" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;