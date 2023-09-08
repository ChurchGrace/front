import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';

export const MinistryCardText = styled.div`
  padding: 20px 30px;
  @media (max-width: 1200px) {
    padding: 20px 30px;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
  h2 {
    font-size: 25px;
    margin: 0;
    font-weight: 900;
    text-transform: uppercase;
    transition: all 0.3s;
    margin-bottom: 10px;
    @media (max-width: 1200px) {
      font-size: 20px;
    }
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  p {
    font-weight: 400;
    font-size: 16px;
    color: #121212;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  a {
    color: #486581;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

export const MinistryCardImg = styled.div`
  border-radius: 12px 12px 0 0;
  position: relative;
  overflow: hidden;
  img {
    filter: grayscale(100%);
    transition: 0.3s all;
  }
`;

export const MinistryCard = styled(motion.div)`
  background-color: #f5f7fa;
  border-radius: 15px;
  box-shadow: 0px 9px 0px -2px #486581;
  &:hover {
    h2 {
      color: #486581;
    }
    img {
      filter: grayscale(0%);
      rotate: 5deg;
      scale: 1.2;
    }
  }
`;

export const OurMinistrySection = styled.div`
  padding: 120px 0;
`;
