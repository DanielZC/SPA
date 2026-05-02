import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Za-z ]+$/, {
        message: "Invalid string: must contains letter",
      })
      .min(4)
      .max(40)
      .trim(),
    email: z
      .string()
      .min(4)
      .regex(z.regexes.email, { message: "Invalid email" })
      .max(40)
      .trim(),
    password: z
      .string()
      .min(4)
      .max(40)
      .regex(/^[A-Za-z0-9*.]+$/, {
        message: "Invalid string: must contains letter or numbers",
      })
      .trim(),
    password_confirmation: z
      .string()
      .min(4)
      .max(40)
      .regex(/^[A-Za-z0-9*.]+$/, {
        message: "Invalid string: must contains letter or numbers",
      })
      .trim(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type RegisterFormSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(4)
    .regex(z.regexes.email, { message: "Invalid email" })
    .max(40)
    .trim(),
  password: z
    .string()
    .min(4)
    .max(40)
    .regex(/^[A-Za-z0-9*.]+$/, {
      message: "Invalid string: must contains letter or numbers",
    })
    .trim(),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
