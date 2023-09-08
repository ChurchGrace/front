import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Pastors = styled.section`
  padding: 80px 0 120px 0;
`;

export const PastorsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 310px);
  grid-template-rows: auto;
  gap: 50px;
  justify-content: center;
  justify-items: self-end;
  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fit, 280px);
  }
`;

export const Pastor = styled(motion.div)`
  user-select: none;
  background-color: #857f72;
  box-shadow: #bdbdbd 15px 14px 0px -2px;
  width: 100%;
  &:hover {
    img {
      filter: grayscale(0%);
      scale: (1.1);
    }
  }
  @media (max-width: 576px) {
    box-shadow: #bdbdbd 12px 14px 0px -2px;
  }
`;

export const PastorPhoto = styled.div`
  width: 100%;
  position: relative;
  height: 350px;
  overflow: hidden;
  @media (max-width: 576px) {
    height: 290px;
  }
  img {
    filter: grayscale(45%);
    transition: 0.5s all;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const PastorDescr = styled.div`
  text-align: center;
  padding: 20px 10px;
  color: #fff;
  h2 {
    font-size: 18px;
    font-weight: 700;
  }
  h4 {
    font-size: 16px;
    font-weight: 400;
  }
`;
