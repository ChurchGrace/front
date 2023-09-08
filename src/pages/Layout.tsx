import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/HeaderComponent/Header';
import { useAppDispatch } from '../app/hooks';
import { getNavigation } from '../app/thunks/navigationThunk';
import { getFooter } from '../app/thunks/footerThunk';

const Layout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    void dispatch(getNavigation());
    void dispatch(getFooter());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
