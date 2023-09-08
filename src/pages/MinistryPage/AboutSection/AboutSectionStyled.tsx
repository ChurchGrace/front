import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const AboutMinistry = styled.section`
  padding: 80px 0;
  @media (max-width: 576px) {
    padding: 60px 0;
  }
`;

export const AboutMinistryWrapper = styled.div`
  display: grid;
  column-gap: 80px;
  justify-content: center;
  grid-template-columns: 800px 350px;
  @media (max-width: 1400px) {
    grid-template-columns: 700px 350px;
  }
  @media (max-width: 1200px) {
    column-gap: 60px;
    grid-template-columns: 600px 250px;
  }
  @media (max-width: 993px) {
    grid-template-columns: 700px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 500px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 100%;
  }
`;

export const AboutMinistryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AboutMinistryAside = styled(motion.div)`
  display: flex;
  flex-direction: column;
  @media (max-width: 993px) {
    display: none;
  }
  h3 {
    color: #ffff;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 23px;
    margin-bottom: 15px;
  }
`;

export const AboutMinistryPhotos = styled(motion.div)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AboutMinistryPhoto = styled.div`
  margin-top: 30px;
  cursor: pointer;
  width: 250px;
  height: 150px;
  transition: 0.4s all;
  filter: grayscale(50%);
  &:hover {
    filter: grayscale(0%);
  }
  @media (max-width: 1400px) {
    width: 190px;
  }
  @media (max-width: 992px) {
    width: 200px;
  }
  @media (max-width: 768px) {
    width: 150px;
  }
  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
  img {
    border-radius: 25px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AboutMinistryMainPhoto = styled.div`
  width: 100%;
  height: 400px;
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (max-width: 576px) {
    height: 200px;
  }
  img {
    border-radius: 25px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AboutMinistryAsideLinks = styled.div`
  max-width: 250px;
  padding-bottom: 15px;
  border-bottom: 1px solid #fff;
  ul {
    padding-left: 0px;
    list-style-type: none;
    font-size: 20px;
    li {
      margin-bottom: 8px;
    }
  }
  a {
    color: #ffff;
    font-weight: 400;
    text-decoration: none;
  }
`;

export const AboutMinistryText = styled(motion.div)`
  margin-top: 30px;
  color: #ffff;
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 576px) {
    font-size: 16px;
  }
  p {
    margin-top: 10px;
  }
`;

export const AboutMinistryAsideBlog = styled.div`
  margin-top: 25px;
`;

export const AboutMinistryAsideBlock = styled(Card)`
  max-width: 250px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: #102a43;
  color: #ffff;
`;

export const BlockText = styled(Typography)`
  font-family: 'Nunito', sans-serif;
  color: #ffff;
`;

export const ButtonStyled = styled(Button)`
  font-family: 'Nunito', sans-serif;
  color: #e5ee6e;
`;
