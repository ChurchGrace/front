import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const InfoSectionStyled = styled.section`
  width: 100%;
  min-height: 500px;
  background: ${({ url }: { url: string }) => `center center/cover no-repeat url(${url});`}
  background-attachment: fixed;
  background-blend-mode: soft-light;
  background-color: #102a43;
  padding: 70px 0;
`;

export const InfoSectionText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 450px;
  p {
    margin-top: 10px;
    color: #ffff;
    font-size: 18px;
    font-weight: 700;
    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
`;
