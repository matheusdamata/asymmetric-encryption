import Image from 'next/image'
import { Logo } from './components/Logo'

import ProductImage from '@/app/assets/hero-image.png'
import { Input } from './components/Input'

export default function Home() {
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

        <div className="flex flex-col w-full px-4">
          <Input.Root>
            <Input.Label text="Número do cartão" />
            <Input.Input value="1234 5678 1234 5678" />
          </Input.Root>
        </div>

        <div className="flex flex-row gap-2 px-4">
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
          <button className="font-medium bg-rose-500 px-4 py-2 rounded-md hover:bg-rose-600 transition-all duration-300">
            Comprar Agora
          </button>

          <p className="text-gray-400 text-xs">
            Pagamento seguro através do Mercado Pago
          </p>
        </div>
      </div>
    </main>
  )
}
