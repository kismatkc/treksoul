'use client'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Treks = ({}) => {
  return (
    <section id="treks" className="h-screen w-screen">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </section>
  )
}

export default Treks
