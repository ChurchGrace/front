import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';

export const MenuIconStyled = styled(MenuIcon)`
  display: none;
  color: #ffff;
  font-size: 55px;
  @media (max-width: 576px) {
    display: block;
    order: 3;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 992px) {
    flex-direction: column;
  }
  @media (max-width: 576px) {
    flex-direction: row;
  }
`;

export const Overlay = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
    position: absolute;
    background-color: rgb(51, 78, 104, 0.5);
    top: 0px;
    right: ${({ menu }: { menu: boolean }) => (menu ? '0' : '-100%')};
    width: 100%;
    height: 100vh;
    tansition: 0.3s all;
  }
`;

export const HeaderStyled = styled.header`
  position: fixed;
  z-index: 200;
  padding: 20px 70px 5px 70px;
  top: 0;
  height: 110px;
  width: 100%;
  background-color: #121212;
  @media (max-width: 1200px) {
    padding: 20px 20px 5px 20px;
  }
  @media (max-width: 992px) {
    padding: 25px 20px 10px 20px;
    height: 155px;
  }
  @media (max-width: 576px) {
    height: 110px;
  }
`;

export const HeaderUl = styled.ul`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  list-style-type: none;
  @media (max-width: 992px) {
    margin-top: 15px;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    position: absolute;
    width: 70%;
    height: 100vh;
    z-index: 99999;
    right: ${({ menu }: { menu: boolean }) => (menu ? '0' : '-100%')};
    transition: 0.3s all;
    left: auto;
    top: 0;
    background-color: #212121;
    overflow-y: scroll;
    padding: 120px 30px 50px 30px;
    align-items: center;
    margin-top: 0px;
  }
  & > li > button {
    border: none;
    background-color: transparent;
    text-transform: uppercase;
    color: #ffff;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    @media (max-width: 1200px) {
      font-size: 16px;
      padding: 0;
    }
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 576px) {
      font-size: 18px;
    }
  }
  & > li {
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-left: 15px;
    }
    @media (max-width: 576px) {
      margin-left: 0px;
      text-align: left;
      width: 100%;
      margin-bottom: 20px;
      border-bottom: 1px solid #fff;
    }
  }
  & > li > a {
    text-decoration: none;
    color: #ffff;
    font-size: 18px;
    font-weight: 700;
    @media (max-width: 1200px) {
      font-size: 16px;
    }
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 576px) {
      font-size: 18px;
    }
  }
`;

export const HeaderLogo = styled.div`
  width: 315px;
  height: 70px;
  @media (max-width: 576px) {
    width: 200px;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
