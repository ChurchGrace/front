import { motion } from 'framer-motion';
import { EffectCreative, Autoplay, Pagination } from 'swiper';
import parse, { DOMNode, domToReact } from 'html-react-parser';
import { Skeleton } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../../app/hooks';
import { selectSliderStatus, selectSlides } from '../../../app/slices/sliderSlice';
import { opacityAnimation } from '../../../utils/animationSettings';
import { StatusEnum } from '../../../types/shared';
import { MainPromoSlider, PromoBlock, SlideIcon, SlideImgCover } from './PromoSectionStyled';

const creativeEffect = {
  prev: {
    shadow: true,
    translate: [0, 0, -400],
  },
  next: {
    translate: ['100%', 0, 0],
  },
};
const autoplay = {
  delay: 2500,
  disableOnInteraction: true,
};

const pagination = {
  type: 'progressbar',
} as const;

const modules = [EffectCreative, Autoplay, Pagination];

const PromoSection = () => {
  const slides = useAppSelector(selectSlides);
  const sliderStatus = useAppSelector(selectSliderStatus);
  return (
    <>
      {sliderStatus === StatusEnum.LOADED ? (
        <MainPromoSlider
          effect={'creative'}
          loop={true}
          pagination={pagination}
          autoplay={autoplay}
          creativeEffect={creativeEffect}
          modules={modules}>
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide._id}>
                <PromoBlock initial='hidden' whileInView='visible' viewport={{ once: true }}>
                  <SlideIcon src={slide.imgMain.url} />
                  <motion.h3 variants={opacityAnimation}>{slide.subtitle}</motion.h3>
                  <motion.h2 variants={opacityAnimation}>{slide.title}</motion.h2>
                  {parse(slide.text, {
                    replace: (domNode) => {
                      const elem = domNode as { children: DOMNode[] };
                      return <motion.p variants={opacityAnimation}>{domToReact(elem.children)}</motion.p>;
                    },
                  })}
                </PromoBlock>
                <SlideImgCover src={slide.imgCover.url} />
              </SwiperSlide>
            );
          })}
        </MainPromoSlider>
      ) : (
        <Skeleton
          variant='rectangular'
          sx={{ bgcolor: 'grey.700', top: '110px', width: '100%', height: '650px', position: 'relative' }}
        />
      )}
    </>
  );
};

export default PromoSection;
