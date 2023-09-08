import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

export const CloseIconStyled = styled(CloseIcon)`
  display: none;
  position: absolute;
  font-size: 55px;
  right: 20px;
  top: 30px;
  @media (max-width: 576px) {
    z-index: 99999;
    display: block;
  }
`;
