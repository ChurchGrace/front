import styled from '@emotion/styled/macro';

export const FooterStyled = styled.div`
  padding: 35px 0;
  @media (max-width: 992px) {
    padding: 50px 0;
  }
  @media (max-width: 768px) {
    padding: 30px 0;
  }
  min-height: 400px;
  background: ${({ img }: { img: string }) => `center center/cover no-repeat url(${img})`};
  background-blend-mode: multiply;
  background-color: #102a43;
`;

export const FooterWrapper = styled.div`
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FooterBlock = styled.div`
  max-width: 350px;
  justify-content: space-between;
  @media (max-width: 992px) {
    margin-bottom: 12px;
  }
  &:nth-of-type(1) {
    @media (max-width: 992px) {
      margin-bottom: 30px;
    }
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #fff;
    font-weight: 900;
    text-transform: uppercase;
    @media(max-width: 992px) {
     text-align: center;
    }
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
  p {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    @media(max-width: 992px) {
      text-align: center;
     }
     @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  ul {
    padding: 0;
    list-style-type: none;
  }
  li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    a {
        margin-left: 8px;
        color: #ffff;
        text-decoration: none;
      }
    }
  }
`;

export const FooterBottom = styled.div`
  padding: 20px 0 20px 70px;
  background-color: #323f4b;
  min-height: 60px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 20px;
  }
  h4 {
    margin: 0;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }
`;

export const FooterSocialIcon = styled.div`
  width: 30px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
