import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import TrekCard from './trek-card'
import { Trek, TreksPage } from '@/payload-types'

type PropType = {
  options?: EmblaOptionsType
  treks: Trek[]
  treksSetting: TreksPage
}

const autoplayConfig = Autoplay({
  delay: 4000, // whatever delay you prefer
  stopOnInteraction: false, // ⬅️ keep autoplay alive
})

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, treks, treksSetting } = props
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
              <TrekCard trek={trek} treksSetting={treksSetting} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="embla__controls">
        <div className="embla__buttons " style={{ opacity: treks.length > 1 ? 1 : 0 }}>
          <div className='border-2 border-red-500'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
          </div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
 */}

      <div className="embla__controls">
  
      <div className="embla__controls">
  <div
    className="embla__buttons flex items-center space-x-2 pl-6"
    style={{ opacity: treks.length > 1 ? 1 : 0 }}
  >
    {/* Prev */}
    <div
      className="
        w-14 h-14 
        flex items-center justify-center 
        rounded-full 
    bg-gray-200 
        backdrop-blur-md 
        hover:bg-gray-400
        transition-all
      "
    >
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
    </div>

    {/* Next */}
    <div
      className="
        w-14 h-14 
        flex items-center justify-center 
        rounded-full 
        bg-gray-200
        backdrop-blur-md 
        hover:bg-gray-400
        transition-all
      "
    >
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  </div>
</div>

      </div>
    </section>
  )
}

export default EmblaCarousel
