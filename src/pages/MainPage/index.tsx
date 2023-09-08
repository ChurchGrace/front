import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSections } from '../../app/thunks/sectionsThunk';
import { getSlider } from '../../app/thunks/sliderThunk';
import { getEvents } from '../../app/thunks/eventsThunk';
import { getPosts } from '../../app/thunks/postsThunk';
import { getMinistries } from '../../app/thunks/ministryThunk';
import { selectSectionsStatus } from '../../app/slices/sectionsSlice';
import { selectCreateMinistryStatus } from '../../app/slices/ministrySlice';
import { selectSliderStatus } from '../../app/slices/sliderSlice';
import { selectEventsStatus } from '../../app/slices/eventsSlice';
import { selectPostStatus } from '../../app/slices/postsSlice';
import { StatusEnum } from '../../types/shared';
import PageError from '../../components/PageError';
import MinistrySection from './MinistrySection/MinistrySection';
import TimeSection from './TimeSection/TimeSection';
import AboutSection from './AboutSection/AboutSection';
import InfoSection from './InfoSection';
import NewBlogs from './NewBlogs/NewBlogs';
import PromoSection from './PromoSection';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const sectionsError = useAppSelector(selectSectionsStatus);
  const sliderError = useAppSelector(selectSliderStatus);
  const ministryError = useAppSelector(selectCreateMinistryStatus);
  const eventsError = useAppSelector(selectEventsStatus);
  const postsError = useAppSelector(selectPostStatus);
  const showError = [sectionsError, sliderError, ministryError, eventsError, postsError].some(
    (item) => item === StatusEnum.ERROR,
  );

  useEffect(() => {
    void dispatch(getSections());
    void dispatch(getSlider());
    void dispatch(getMinistries());
    void dispatch(getEvents());
    void dispatch(getPosts({ limit: 6 }));
  }, [dispatch]);

  return (
    <>
      {showError && <PageError />}
      <PromoSection />
      <NewBlogs />
      <AboutSection />
      <InfoSection index={1} />
      <TimeSection />
      <InfoSection index={2} />
      <MinistrySection />
    </>
  );
};

export default MainPage;
