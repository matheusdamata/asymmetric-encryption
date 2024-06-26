import crypto from 'node:crypto'
import fs from 'node:fs'

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
})

fs.writeFileSync(
  'public.pem',
  publicKey.export({
    type: 'spki',
    format: 'pem',
  }),
)

fs.writeFileSync(
  'private.pem',
  privateKey.export({
    type: 'pkcs8',
    format: 'pem',
  }),
)
