import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';

export const LocalPhoneIconMotion = motion(LocalPhoneIcon);
export const AlternateEmailIconMotion = motion(AlternateEmailIcon);
export const LocationOnIconMotion = motion(LocationOnIcon);

export const TextFieldStyled = styled(TextField)`
  width: 100%;
  .MuiFilledInput-underline {
    margin-bottom: 25px;
    width: 100%;
    background-color: rgb(42 45 49) !important;
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
  textarea {
    min-height: 250px;
    color: #d9e2ec;
  }
  label {
    top: -3px;
    color: #d9e2ec;
  }
  .css-1rgmeur.Mui-focused {
    color: #d9e2ec;
  }
  p {
    margin-top: -13px;
    margin-bottom: 6px;
  }
`;

export const ContactsSection = styled.section`
  padding: 50px 0 70px;
`;

export const ContactsForm = styled.div`
  position: relative;
  z-index: 80;
  background-color: #212121;
  padding-top: 140px;
  display: grid;
  justify-content: center;
  gap: 40px;
  grid-template-columns: 490px 400px;
  grid-template-rows: 520px;
  @media (max-width: 992px) {
    grid-template-columns: 490px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 290px;
    grid-template-rows: 400px;
  }
`;

export const ContactsFormPhoto = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: 992px) {
    order: 1;
  }
  img {
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 100%;
    filter: grayscale(50%);
    object-fit: cover;
  }
`;

export const ContactsMap = styled(motion.div)`
  padding-top: 190px;
  position: relative;
  @media (max-width: 768px) {
    padding-top: 130px;
  }
  iframe,
  span {
    display: block;
    margin: 0 auto;
    width: 890px;
    height: 350px;
    border: none;
    filter: invert(90%) hue-rotate(180deg);
    border-radius: 12px;
    @media (max-width: 992px) {
      width: 700px;
    }
    @media (max-width: 768px) {
      width: 500px;
    }
    @media (max-width: 576px) {
      width: 300px;
    }
  }
`;

export const ContactsBlocks = styled(motion.div)`
  position: relative;
  display: grid;
  gap: 20px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 300px);
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 300px);
  }
  @media (max-width: 768px) {
    grid-template-columns: 300px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 290px;
  }
`;

export const ContactsBlock = styled(motion.div)`
  border-radius: 25px;
  padding: 35px 20px 40px 20px;
  min-height: 250px;
  background-color: rgb(42 45 49);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  text-align: center;
  img {
    width: 50px;
    height: 60px;
    object-fit: contain;
  }
  h3 {
    margin-top: 10px;
    font-weight: 900;
  }
  p {
    margin-top: 10px;
  }
`;

export const ContactsFormFields = styled.form`
  @media (max-width: 992px) {
    order: 2;
  }
`;

export const SubmitButon = styled(LoadingButton)`
  background-color: #102a43;
  &:hover {
    background-color: #243b53;
  }
  &:disabled {
    background-color: rgb(227 227 227 / 58%);
  }
`;

const TiltBase = styled.div`
  z-index: 22;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
`;

export const TiltRightStyled = styled(TiltBase)`
  svg {
    position: relative;
    display: block;
    width: calc(156% + 1.3px);
    height: 150px;
  }
  .shape-fill {
    fill: #121212;
  }
`;

export const TiltLeftStyled = styled(TiltBase)`
  svg {
    position: relative;
    display: block;
    width: calc(169% + 1.3px);
    height: 150px;
    transform: rotateY(180deg);
    @media (max-width: 768px) {
      height: 100px;
    }
  }
  .shape-fill {
    fill: #212121;
  }
`;

export const ContactFormError = styled.p`
  margin-top: 13px;
  color: #d32f2f;
  font-size: 16px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
`;
