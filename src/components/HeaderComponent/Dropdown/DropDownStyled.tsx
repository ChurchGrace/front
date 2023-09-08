import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { IDropdownProps } from '../types';

export const DropDownStyled = styled(motion.ul)`
  display: ${(props: Omit<IDropdownProps, 'submenus'>) => (props.dropdown ? 'block' : 'none')};
  position: absolute;
  left: ${(props: Omit<IDropdownProps, 'submenus'>) => (props.depthlevel > 1 ? '100%' : 'auto')};
  top: ${(props: Omit<IDropdownProps, 'submenus'>) => (props.depthlevel > 1 ? '-7px' : 'auto')};
  z-index: 999999;
  min-width: 150px;
  padding: 16px 16px 16px 16px;
  list-style: none;
  background-color: #212121;
  border-radius: 0.5rem;
  @media (max-width: 576px) {
    position: static !important;
    left: 0 !important;
    top: 0 !important;
    padding-bottom: 0px;
    background-color: transparent;
  }
  a {
    display: block;
    color: #ffff;
    font-size: 14px;
    margin-bottom: 7px;
    font-weight: 700;
    text-decoration: none;
    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
`;
