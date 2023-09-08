import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import Navbar from '../Navbar';
import { useAppSelector } from '../../../app/hooks';
import { selectNavigationStatus } from '../../../app/slices/navigationSlice';
import { StatusEnum } from '../../../types/shared';
import { HeaderWrapper, MenuIconStyled, Overlay, HeaderStyled, HeaderLogo } from './HeaderStyled';

const Header = () => {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const navigationStatus = useAppSelector(selectNavigationStatus);

  useEffect(() => {
    window.addEventListener('orientationchange', () => {
      setMenu(false);
    });
    if (menu && window.innerWidth < 576) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menu]);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const onClickOverlay = () => {
    if (menu) {
      setMenu(false);
    }
  };

  return (
    <>
      {navigationStatus === StatusEnum.LOADED ? (
        <HeaderStyled>
          <HeaderWrapper>
            <Overlay menu={menu} onClick={onClickOverlay} />
            <NavLink to='/'>
              <HeaderLogo>
                <img src='/logo_ehb.png' />
              </HeaderLogo>
            </NavLink>
            <MenuIconStyled onClick={() => setMenu(true)} />
            <Navbar menu={menu} setMenu={setMenu} />
          </HeaderWrapper>
        </HeaderStyled>
      ) : (
        <Skeleton
          variant='rectangular'
          sx={{
            bgcolor: 'grey.900',
            position: 'fixed',
            zIndex: '200',
            height: '110px',
            width: '100%',
            top: '0',
            transform: 'none',
          }}
        />
      )}
    </>
  );
};

export default Header;
