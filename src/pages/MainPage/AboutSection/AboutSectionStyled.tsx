import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const AboutSectionStyled = styled.section`
  padding-top: 140px;
  padding-bottom: 90px;
`;

export const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 600px;
  column-gap: 50px;
  justify-content: center;
  grid-template-rows: auto;
  @media (max-width: 1200px) {
    grid-template-columns: 400px 350px;
    column-gap: 40px;
  }
  @media (max-width: 993px) {
    grid-template-columns: 400px;
    column-gap: 0px;
    row-gap: 30px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 290px;
  }
`;

export const AboutPhoto = styled.div`
  height: 450px;
  width: 100%;
  @media (max-width: 576px) {
    height: 350px;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const AboutSectionText = styled.p`
  font-size: 20px;
  margin: 0;
  font-weight: 300;
  margin: 0;
  color: #ffff;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
  @media (max-width: 576px) {
    font-size: 16px;
    padding: 0 10px;
  }
`;

export const AboutText = styled(motion.div)`
  @media (max-width: 993px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    margin: 15px 0;
  }
  h2 {
    margin: 10px 0;
  }
`;
