'use client'

import Image from 'next/image'
import { Logo } from './components/Logo'

import ProductImage from '@/app/assets/hero-image.png'
import { Input } from './components/Input'
import { CheckoutProps } from '@/@types/checkout'
import React from 'react'

export default function Home() {
  async function encryptData(data: CheckoutProps) {
    const response = await fetch('/crypto/public.pem')
    const publicKeyPem = await response.text()

    const publicKeyBase64 = publicKeyPem
      .replace('-----BEGIN PUBLIC KEY-----\n', '')
      .replace('\n-----END PUBLIC KEY-----', '')
      .trim()

    const encodedPublicKey = window.btoa(publicKeyBase64)

    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(encodedPublicKey))
      throw new Error('Invalid public key')

    const publicKeyBuffer = Uint8Array.from(atob(publicKeyBase64), (c) =>
      c.charCodeAt(0),
    ).buffer

    const publicKey = await window.crypto.subtle.importKey(
      'spki',
      publicKeyBuffer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['encrypt'],
    )

    const textEncoder = new TextEncoder().encode(JSON.stringify(data))
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      textEncoder,
    )
    const base64EncryptedData = btoa(
      String.fromCharCode(...new Uint8Array(encryptedData)),
    )

    return base64EncryptedData
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      card_number: '1234 5678 1234 5678',
      card_name: 'Matheus Da Mata',
      card_security_code: '1234',
    }

    try {
      const encryptedData = await encryptData(data)
      console.log('encryptedData', encryptedData)

      await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ data: encryptedData }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 items-center w-[450px] bg-slate-100 rounded-lg p-4 text-white shadow-xl">
        <div className="flex w-full justify-between items-end border-b-2 pb-2">
          <Logo />
          <h1 className="font-bold text-lg text-zinc-800">
            Realize seu pagamento
          </h1>
          {/* Pedido #20745 */}
        </div>

        <Image className="w-[350px] h-auto" alt="" src={ProductImage} />

        <form className="px-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <Input.Root>
              <Input.Label text="Número do cartão" />
              <Input.Input value="1234 5678 1234 5678" />
            </Input.Root>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <Input.Root>
                <Input.Label text="Nome" />
                <Input.Input value="Matheus Da Mata" />
              </Input.Root>
            </div>

            <div className="flex flex-col w-[55%]">
              <Input.Root>
                <Input.Label text="Código de Segurança" />
                <Input.Input value="1234" />
              </Input.Root>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            <button
              className="w-full font-medium bg-rose-500 px-4 py-2 rounded-md hover:bg-rose-600 transition-all duration-300"
              type="submit"
            >
              Comprar Agora
            </button>

            <p className="text-gray-400 text-xs">
              Pagamento seguro através do Mercado Pago
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
