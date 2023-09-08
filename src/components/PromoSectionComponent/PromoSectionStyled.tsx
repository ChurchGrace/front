import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export const PromoSection = styled.section`
  position: relative;
  margin-top: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background: ${({ url }: { url?: string }) =>
    url
      ? `center center/cover no-repeat url(${url});`
      : 'center center/cover no-repeat url(https://images.unsplash.com/photo-1476214211866-f4af317fc977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80);'}
  background-color: #102a43;
  background-blend-mode: soft-light;
  @media (max-width: 576px) {
    min-height: 350px;
  }
  h1 {
    margin-top: 10px;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 900;
    @media (max-width: 576px) {
      font-size: 30px;
    }
  }
`;

export const PromoWave = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  svg {
    position: relative;
    display: block;
    width: calc(130% + 1.3px);
    height: 226px;
    @media (max-width: 576px) {
      height: 140px;
    }
  }
  .shape-fill {
    fill: #121212;
  }
`;

export const BreadcrumbsStyled = styled(Breadcrumbs)`
  color: #fff;
  div {
    color: #d8fd92;
  }
  a {
    color: #ffff;
    text-decoration: none;
  }
`;

export const PromoSectionText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 530px;
  padding: 0 15px;
  text-align: center;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    max-width: 290px;   
`;
