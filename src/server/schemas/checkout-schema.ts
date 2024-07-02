import { z } from 'zod'

export const checkoutBodySchema = z.object({
  data: z.string(),
})
