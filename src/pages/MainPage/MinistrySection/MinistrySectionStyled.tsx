import styled from '@emotion/styled';
import { Swiper } from 'swiper/react';

export const MinistrySlider = styled(Swiper)`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  .swiper-slide {
    background-position: center;
    background-size: cover;
    height: auto;
    img {
      object-fit: cover;
      display: block;
      border-radius: 15px 15px 0 0;
      width: 100%;
      height: 300px;
      filter: grayscale(50%);
      @media (max-width: 768px) {
        height: 250px;
      }
    }
  }
`;
