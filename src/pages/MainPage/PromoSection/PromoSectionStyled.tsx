import styled from '@emotion/styled';
import ChurchIcon from '@mui/icons-material/Church';
import SchoolIcon from '@mui/icons-material/School';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { motion } from 'framer-motion';
import { Swiper } from 'swiper/react';

export const PromoBlock = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  @media (max-width: 768px) {
    max-width: 500px;
  }
  @media (max-width: 576px) {
    max-width: 300px;
    padding: 0 15px;
  }
  h3 {
    color: #9fb3c8;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 1.2;
    margin: 5px 0;
    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
  h2 {
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 900;
    line-height: 1.2;
    margin: 5px 0;
    @media (max-width: 576px) {
      font-size: 25px;
    }
  }
  p {
    margin: 10px 0;
    font-weight: 400;
    font-size: 18px;
    @media (max-width: 576px) {
      font-size: 14px;
    }
  }
`;

export const SlideImgCover = styled.img`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: blur(2px) grayscale(20%) brightness(0.5);
  object-fit: cover;
`;

export const SlideIcon = styled.img`
  width: 70px;
  height: 70px;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
`;

export const MainPromoSlider = styled(Swiper)`
  top: 110px;
  width: 100%;
  height: 650px;
  @media (max-width: 576px) {
    height: 500px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }
`;

export const ChurchIconMotion = motion(ChurchIcon);
export const SchoolIconMotion = motion(SchoolIcon);
export const Diversity2IconMotion = motion(Diversity2Icon);
