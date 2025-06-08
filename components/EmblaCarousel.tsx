import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import TrekCard from './trek-card'
import { Trek } from '@/payload-types'

type PropType = {
  options?: EmblaOptionsType
  treks: Trek[]
}

const autoplayConfig = Autoplay({
  delay: 4000, // whatever delay you prefer
  stopOnInteraction: false, // ⬅️ keep autoplay alive
})

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, treks } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayConfig])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

    resetOrStop()
  }, [])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {treks.map((trek, index) => (
            <div className="embla__slide" key={index}>
              {/* dont use priority true flag it will bypass the lazy loading,optimization techniques only use it for hero images and images hwere i nedd it faster ratehr than optimizaed  */}
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons " style={{ opacity: treks.length > 1 ? 1 : 0 }}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
