import styled from '@emotion/styled';

export const Page404IconStyled = styled.div`
  font-size: 150px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 110px;
  }
`;

export const Page404WrapperStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 10px;
  position: relative;
  z-index: 20;
  @media (max-width: 992px) {
    max-width: 700px;
  }
  @media (max-width: 768px) {
    max-width: 500px;
  }
`;

export const Page404TextStyled = styled.div`
  font-weight: 400;
  font-size: 25px;
  text-align: center;
  color: rgb(255 202 202);
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 22px;
  }
  @media (max-width: 576px) {
    font-size: 17px;
    padding: 0 11px;
  }
`;

export const Page404TitleStyled = styled.div`
  font-weight: 900;
  font-size: 60px;
  text-align: center;
  color: #f5f7fa;
  text-transform: uppercase;
  @media (max-width: 576px) {
    font-size: 50px;
  }
`;

export const Page404SubtitleStyled = styled.div`
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  color: #c9f798;
  margin-top: 10px;
  text-transform: uppercase;
  @media (max-width: 576px) {
    font-size: 21px;
  }
`;
