import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const SermonsBlock = styled(motion.div)`
  border-radius: 25px;
  background-color: #212121;
  img {
    border-radius: 25px 25px 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SermonsBlockImg = styled.div`
  position: relative;
  height: 150px;
  &::before {
    content: '';
    position: absolute;
    border-radius: 25px 25px 0 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 22;
    background-color: rgba(16, 42, 67, 0.7);
  }
`;

export const SermonsText = styled.div`
  padding: 20px 27px;
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const SermonsBlockIcon = styled.div`
  z-index: 23;
  position: absolute;
  color: #c0db8e;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
