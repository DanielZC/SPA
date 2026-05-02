import * as z from "zod";

const status = ["stand by", "active", "done", "cancelled"];
const statusPiece = ["pendding", "done"];

export const projectSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Invalid string: must contains letter",
    })
    .min(4)
    .trim(),
  description: z
    .string()
    .regex(/^[A-Za-z0-9,. ]+$/, {
      message: "Invalid string: must contains letter",
    })
    .min(4)
    .trim(),
  status: z.enum(status),
});

export type ProjectFormSchema = z.infer<typeof projectSchema>;

export const blockSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Invalid string: must contains letter",
    })
    .min(4)
    .trim(),
  description: z
    .string()
    .regex(/^[A-Za-z0-9,. ]+$/, {
      message: "Invalid string: must contains letter",
    })
    .min(4)
    .trim(),
  project_id: z.number(),
});

export type BlockFormSchema = z.infer<typeof blockSchema>;

export const pieceSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Invalid string: must contains letter",
    })
    .min(4)
    .trim(),
  standard_weight: z
    .string()
    .regex(/^[A-Za-z0-9.]+$/, {
      message: "Invalid string: must contains letter",
    })
    .trim(),
  real_weight: z
    .string()
    .regex(/^[A-Za-z0-9.]+$/, {
      message: "Invalid string: must contains letter",
    })
    .trim(),
  block_id: z.number(),
  status: z.enum(statusPiece),
});

export type PieceFormSchema = z.infer<typeof pieceSchema>;
