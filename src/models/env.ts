import { z } from 'zod';

export const environmentEnumSchema = z.enum(['development', 'production']);

export type Environment = z.infer<typeof environmentEnumSchema>;
