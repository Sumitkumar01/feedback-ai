import { z } from 'zod';

export const singUpSchema = z.object({
    identifier: z.string(),
    password: z.string(),
});