import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AboutMinistryAsideBlock } from '../MinistryPage/AboutSection/AboutSectionStyled';

export const SearchBar = styled(TextField)`
  width: 100%;
  .MuiFilledInput-underline {
    width: 100%;
    background-color: rgb(16 42 67) !important;
    &:before {
      border-bottom: 1px solid #d9e2ec;
    }
    &:hover {
      &:before {
        border-bottom: 1px solid #d9e2ec !important;
      }
    }
    &:after {
      border-bottom: 2px solid #f5d67a;
    }
  }
  input {
    color: #d9e2ec;
  }
  label {
    top: -3px;
    color: #d9e2ec;
  }
  .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: #f5d67a;
  }
`;

export const FormControlStyled = styled(FormControl)`
  width: 100%;
  .MuiInputBase-root.MuiFilledInput-root {
    color: #ffff;
    background-color: rgb(16, 42, 67);
    &:before {
      border-bottom: 1px solid #bcccdc;
    }
    &:hover {
      background-color: rgb(16 42 67);
      &:before {
        border-bottom: 1px solid #d9e2ec;
      }
    }
    &:after {
      border-bottom: 2px solid #f5d67a;
    }
  }
  .MuiFormLabel-root {
    color: #d9e2ec;
  }
  .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: #f5d67a;
  }
`;

export const PaginationStyled = styled(Pagination)`
  li button {
    color: #fff;
  }
  .css-1v2lvtn-MuiPaginationItem-root {
    color: #fff;
  }
  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
    background-color: #102a43;
  }
`;

export const BlogSection = styled.section`
  padding: 60px 0;
  position: relative;
  @media (max-width: 576px) {
    padding: 50px 0;
  }
`;

export const BlogContent = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 70% 30%;
  justify-content: center;
  align-items: start;
  h3 {
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 700;
  }
  @media (max-width: 992px) {
    grid-template-columns: 100%;
    gap: 40px;
  }
`;

export const BlogItems = styled.div`
  display: grid;
  gap: 40px;
  align-items: center;
  align-self: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 270px);
  margin-bottom: 40px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, 250px);
    order: 2;
  }
`;

export const BlogControlls = styled.div`
  display: grid;
  grid-template-columns: 250px;
  justify-content: start;
  align-items: center;
  gap: 45px;
  @media (max-width: 992px) {
    grid-template-columns: 300px;
    justify-content: center;
    order: 1;
  }
  @media (max-width: 576px) {
    grid-template-columns: 250px;
  }
`;

export const BlogPagination = styled.div`
  display: flex;
  justify-content: center;
`;

export const BlogItem = motion(AboutMinistryAsideBlock);
