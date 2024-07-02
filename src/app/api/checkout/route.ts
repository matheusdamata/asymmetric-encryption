import { checkoutBodySchema } from '@/server/schemas/checkout-schema'
import { Decrypt } from '@/server/services/decrypt'

export async function POST(req: Request) {
  const { data } = checkoutBodySchema.parse(await req.json())

  const decrypt = new Decrypt()

  const decryptedData = decrypt.decryptData(data)

  console.log('decryptedData', JSON.parse(decryptedData))

  return Response.json({ message: 'success' })
}
