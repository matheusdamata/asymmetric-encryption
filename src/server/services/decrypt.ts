import { env } from '@/server/env'
import forge from 'node-forge'

export class Decrypt {
  decryptData(data: string): string {
    try {
      if (!data) throw new Error('Data is required')

      const privateKeySingleLine = env.PRIVATE_KEY
      const privateKeyPem = `-----BEGIN PRIVATE KEY-----\n${privateKeySingleLine}\n-----END PRIVATE KEY-----`
      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)

      const encryptedData = forge.util.decode64(data)
      const decryptedData = privateKey.decrypt(encryptedData, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      })

      return decryptedData
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error decrypting data: ${error.message}`)

      throw new Error('An unexpected error occurred')
    }
  }
}
