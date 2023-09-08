import { Pagination } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../../app/hooks';
import { OurMinistrySection } from '../../../components/Ministry/MinistryStyled';
import { Container, Divider, SectionLableText, SectionTitle, SectionInfoCentered } from '../../../components/Shared';
import MinistryCardComponent from '../../../components/Ministry/MinistryCard';
import { selectMinistries, selectMinistriesStatus } from '../../../app/slices/ministrySlice';
import { SectionInfoSkeleton } from '../Skeletons';
import { StatusEnum } from '../../../types/shared';
import { MinistrySlider } from './MinistrySectionStyled';
import { MinistryCardSkeleton } from './Skeleton';

const MinistrySection = () => {
  const ministries = useAppSelector(selectMinistries);
  const ministriesStatus = useAppSelector(selectMinistriesStatus);

  const createMinistries = () => {
    if (ministriesStatus === StatusEnum.LOADED) {
      return ministries.map((ministry) => {
        return (
          <SwiperSlide key={ministry._id}>
            <MinistryCardComponent ministry={ministry} />
          </SwiperSlide>
        );
      });
    } else {
      return [...new Array(4)].map((_, i) => {
        return (
          <SwiperSlide key={i}>
            <MinistryCardSkeleton />
          </SwiperSlide>
        );
      });
    }
  };

  return (
    <OurMinistrySection>
      <Container>
        <SectionInfoCentered>
          {ministriesStatus === StatusEnum.LOADED ? (
            <>
              <SectionLableText>Наши служения</SectionLableText>
              <SectionTitle>Информация о наших служениях</SectionTitle>
              <Divider />
            </>
          ) : (
            <SectionInfoSkeleton />
          )}
        </SectionInfoCentered>
        <MinistrySlider
          breakpoints={{
            320: {
              centeredSlides: true,
              spaceBetween: 40,
              slidesPerView: 1,
            },
            576: {
              centeredSlides: true,
              slidesPerView: 2,
              spaceBetween: 40,
            },
            768: {
              centeredSlides: true,
              slidesPerView: 2,
              spaceBetween: 90,
            },
            992: {
              centeredSlides: true,
              slidesPerView: 2,
              spaceBetween: 90,
            },
            1200: {
              centeredSlides: true,
              slidesPerView: 3,
              spaceBetween: 60,
            },
            1400: {
              centeredSlides: false,
              slidesPerView: 3,
              spaceBetween: 60,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}>
          {createMinistries()}
        </MinistrySlider>
      </Container>
    </OurMinistrySection>
  );
};

export default MinistrySection;
