import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';

export const HistorySection = styled.section``;

export const AboutHistorySection = styled.section`
  color: #ffff;
  font-size: 20px;
  font-weight: 400;
  margin: 0 auto;
  h3 {
    font-weight: 900;
    text-align: left;
    font-size: 25px;
    margin-bottom: 7px;
    text-transform: uppercase;
    @media (max-width: 992px) {
      text-align: center;
    }
    @media (max-width: 576px) {
      font-size: 20px;
    }
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    filter: grayscale(70%);
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    @media (max-width: 992px) {
      width: 400px;
      clip-path: polygon(0% 50%, 20% 50%, 20% 0%, 80% 0%, 80% 50%, 100% 50%, 50% 100%);
    }
    @media (max-width: 576px) {
      width: 100%;
      height: 200px;
    }
  }
`;

export const AboutHistoryBlockArrow = styled(motion.div)`
  background-color: #102a43;
  width: 100%;
  height: 400px;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  @media (max-width: 992px) {
    width: 400px;
    clip-path: polygon(0% 50%, 20% 50%, 20% 0%, 80% 0%, 80% 50%, 100% 50%, 50% 100%);
  }
  @media (max-width: 576px) {
    width: 100%;
    height: 200px;
  }
`;

export const AboutHistoryBlockText = styled(motion.div)``;

export const AboutHistoryBlock = styled.div`
  position: relative;
  padding-top: 120px;
  padding-bottom: 50px;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-content: center;
  grid-template-columns: 400px 700px;
  gap: 30px;
  background-color: #212121;
  &:first-of-type {
    padding-top: 50px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 400px 500px;
  }
  @media (max-width: 992px) {
    justify-items: center !important;
    grid-template-columns: 700px !important;
  }
  @media (max-width: 768px) {
    grid-template-columns: 500px !important;
  }
  @media (max-width: 576px) {
    grid-template-columns: 290px !important;
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    @media (max-width: 992px) {
      text-align: center;
    }
    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
  &:nth-of-type(2n + 1) {
    background-color: #121212;
    grid-template-columns: 700px 400px;
    @media (max-width: 1200px) {
      grid-template-columns: 500px 400px;
    }
    .shape-fill {
      fill: #212121;
    }
    img {
      clip-path: polygon(25% 0%, 100% 1%, 100% 100%, 25% 100%, 0% 50%);
      @media (max-width: 992px) {
        width: 400px;
        clip-path: polygon(20% 100%, 20% 50%, 0 50%, 50% 0, 100% 50%, 80% 50%, 80% 100%);
      }
      @media (max-width: 576px) {
        width: 100%;
        height: 200px;
      }
      order: 2;
    }
    ${AboutHistoryBlockArrow} {
      clip-path: polygon(25% 0%, 100% 1%, 100% 100%, 25% 100%, 0% 50%);
      @media (max-width: 992px) {
        width: 400px;
        clip-path: polygon(20% 100%, 20% 50%, 0 50%, 50% 0, 100% 50%, 80% 50%, 80% 100%);
      }
      @media (max-width: 576px) {
        width: 100%;
        height: 200px;
      }
      order: 2;
    }
    ${AboutHistoryBlockText} {
      order: 1;
    }
  }
`;

export const WaveStyled = styled.div`
  z-index: 22;
  position: absolute;
  top: -5px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  svg {
    position: relative;
    display: block;
    width: calc(120% + 1.3px);
    height: 90px;
    transform: rotateY(180deg);
    .shape-fill {
      fill: #121212;
    }
  }
`;
