/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MinistryPage from './pages/MinistryPage';
import PastorsPage from './pages/PastorsPage';
import GalleryPage from './pages/GalleryPage';
import HistoryPage from './pages/HistoryPage';
import BlogPage from './pages/BlogPage';
import ContactsPage from './pages/ContactsPage';
import SermonsPage from './pages/SermonsPage';
import FullPostPage from './pages/FullPostPage';
import Layout from './pages/Layout';
import DrawerComponent from './pages/Dashboard/Drawer';
import BlogForms from './pages/Dashboard/Forms/BlogFroms';
import MinistryForms from './pages/Dashboard/Forms/MinistryForms';
import SliderForms from './pages/Dashboard/Forms/SliderForms';
import TimeEventForms from './pages/Dashboard/Forms/TimeEventForms';
import SectionsForms from './pages/Dashboard/Forms/SectionsForms';
import ContactBlockForms from './pages/Dashboard/Forms/ContactBlockForms';
import ContactPageForm from './pages/Dashboard/Forms/ContactPageForm';
import PastorsForms from './pages/Dashboard/Forms/PastorsForm';
import HistoryForms from './pages/Dashboard/Forms/HistoryForms';
import GalleryForm from './pages/Dashboard/Forms/GalleryForm';
import Page404 from './pages/Page404';
import ResetPassword from './pages/Auth/ResetPassword';
import Login from './pages/Auth/Login';
import ForgetPassword from './pages/Auth/ForgetPassword';
import SocialForms from './pages/Dashboard/Forms/SocialForms';
import FooterForms from './pages/Dashboard/Forms/FooterForms';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'react-lazy-load-image-component/src/effects/blur.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/ministry/:url',
        element: <MinistryPage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
      {
        path: '/blog',
        element: <BlogPage />,
      },
      {
        path: '/blog/:url',
        element: <FullPostPage />,
      },
      {
        path: '/pastors',
        element: <PastorsPage />,
      },
      {
        path: '/sermons',
        element: <SermonsPage />,
      },
      {
        path: '/gallery',
        element: <GalleryPage />,
      },
      {
        path: '/contacts',
        element: <ContactsPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgetPassword',
    element: <ForgetPassword />,
  },
  {
    path: '/resetPassword/:token',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <DrawerComponent />,
    children: [
      {
        path: '/dashboard/blog',
        element: <BlogForms />,
      },
      {
        path: '/dashboard/ministries',
        element: <MinistryForms />,
      },
      {
        path: '/dashboard/slider',
        element: <SliderForms />,
      },
      {
        path: '/dashboard/timeEvents',
        element: <TimeEventForms />,
      },
      {
        path: '/dashboard/sections',
        element: <SectionsForms />,
      },
      {
        path: '/dashboard/contactBlocks',
        element: <ContactBlockForms />,
      },
      {
        path: '/dashboard/contactPage',
        element: <ContactPageForm />,
      },
      {
        path: '/dashboard/history',
        element: <HistoryForms />,
      },
      {
        path: '/dashboard/pastors',
        element: <PastorsForms />,
      },
      {
        path: '/dashboard/social',
        element: <SocialForms />,
      },
      {
        path: '/dashboard/footerInfo',
        element: <FooterForms />,
      },
      {
        index: true,
        element: <GalleryForm />,
      },
    ],
  },
  {
    path: '/*',
    element: <Page404 />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
