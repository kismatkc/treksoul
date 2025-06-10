import Image from 'next/image'
import { Button } from './ui/button'
import { Media, Trek, TreksPage } from '@/payload-types'
import { PriceBadge } from '@/lib/utils'
import { CSSProperties } from 'react'

const TrekCard = ({ trek, treksSetting }: { trek: Trek; treksSetting: TreksPage }) => {
  const heroImage = trek.heroImage as Media

  return (
    <div className="px-6">
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg transition border-[.3px] border-gray-300 ">
      
        <div className="relative w-full h-[500px] ">
          <Image
            src={heroImage.url || ''}
            alt={heroImage.alt}
            fill
            priority={false}
            style={{
              backgroundImage: 'url(/blur.jpg)',
              backgroundSize: 'cover',
            }}
          />
          <div className="absolute text-white flex flex-row gap-x-1 font-black text-xl bottom-1 right-2">
            <span>{PriceBadge({ currency: trek.price.currency, amount: trek.price.amount })}</span>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-2xl pl-4 py-3 ">{trek.name}</h2>
        </div>
        <div className="flex flex-wrap gap-2  pl-3 py-3">
          {trek.highlights.map((hl, i: number) => (
            <span
              key={hl.id ?? i}
              className=" rounded-full font-semibold bg-emerald-100 text-emerald-900 px-6 py-2 whitespace-nowrap"
            >
              {hl.value}
            </span>
          ))}
        </div>

        
        <div
          className="flex items-center  justify-around mb-2"
          style={
            {
              '--trek-card-left-color': treksSetting.treks_card_left_button_color,
              '--trek-card-right-color': treksSetting.treks_card_right_button_color,
            } as CSSProperties
          }
        >
          <Button className=" my-4 text-lg font-bold p-6 bg-[color:var(--trek-card-left-color)]">
            {treksSetting.treks_card_left_button_text}
          </Button>
          <Button className="bg-[#00807A] my-4 text-lg font-bold p-6 bg-[color:var(--trek-card-right-color)]">
            {treksSetting.treks_card_right_button_text}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TrekCard
