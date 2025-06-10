'use client'
import { Trek, TreksPage } from '@/payload-types'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {}

const Treks = ({ treksSetting, treks }: { treksSetting: TreksPage; treks: Trek[] }) => {
  return (
    <section id="treks" className="mt-32 md:mt-48">
      <h2 className="text-3xl font-bold text-center mb-8 mt-4">
        {treksSetting.treks_page_heading}
      </h2>
      <EmblaCarousel options={OPTIONS} treks={treks} treksSetting = {treksSetting} />
    </section>
  )
}

export default Treks
