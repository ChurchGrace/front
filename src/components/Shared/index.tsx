import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    max-width: 992px;
  }
  @media (max-width: 992px) {
    max-width: 768px;
  }
  @media (max-width: 768px) {
    max-width: 576px;
  }
  @media (max-width: 576px) {
    max-width: 300px;
    padding: 0 10px;
  }
`;

export const SectionLableText = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #9fb3c8;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 25px;
  margin: 0;
  font-weight: 900;
  color: #ffff;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SectionInfoCentered = styled(motion.div)`
  margin: 0 auto;
  text-align: center;
  h3 {
    margin-top: 10px;
  }
  div {
    margin: 12px auto;
  }
`;

export const Divider = styled.div`
  width: 120px;
  height: 2px;
  margin-top: 8px;
  background-color: red;
`;

export const FormEditorSubmitStyled = styled(LoadingButton)`
  display: block;
  margin-top: 10px;
  &:disabled {
    background-color: rgb(227 227 227 / 58%);
  }
`;

export const FormEditorSubmitWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  justify-content: center;
  column-gap: 20px;
  margin-bottom: 40px;
`;

export const FormEditorFieldStyled = styled(TextField)`
  width: 100%;
  margin: 15px 0px;
  .MuiFilledInput-underline {
    background-color: #424242 !important;
    border-radius: 0px;
    &:before {
      border-bottom: 1px solid #e9e9e9e9;
    }
    &:hover {
      &:before {
        border-bottom: 1px solid #e9e9e9e9 !important;
      }
    }
    &:after {
      border-bottom: 2px solid #e9e9e9e9;
    }
  }
  input {
    color: #e9e9e9e9;
  }
  label {
    color: #e9e9e9e9;
  }
  .css-1rgmeur.Mui-focused {
    color: #e9e9e9e9;
  }
`;

export const ButtonStyled = styled(Button)`
  background-color: #102a43;
  font-family: 'Nunito', sans-serif;
  &:hover {
    background-color: #243b53;
  }
`;
