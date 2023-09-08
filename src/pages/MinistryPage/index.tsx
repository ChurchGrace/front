import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPosts } from '../../app/thunks/postsThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { selectMinistries, selectMinistriesStatus } from '../../app/slices/ministrySlice';
import { getMinistries } from '../../app/thunks/ministryThunk';
import { selectPosts } from '../../app/slices/postsSlice';
import PageError from '../../components/PageError';
import { StatusEnum } from '../../types/shared';
import { selectNavigation } from '../../app/slices/navigationSlice';
import AboutSection from './AboutSection';

const MinistryPage = () => {
  const { url } = useParams();
  const ministriesLinks = useAppSelector(selectNavigation);
  const [ministry] = useAppSelector(selectMinistries);
  const ministryStatus = useAppSelector(selectMinistriesStatus);
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getMinistries({ url }));
  }, [dispatch, url]);

  useEffect(() => {
    if (!posts.length) {
      void dispatch(getPosts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {ministryStatus === StatusEnum.LOADED && !ministry ? (
        <Navigate to={'/'} />
      ) : (
        <>
          <PromoSectionComponent
            itemStatus={ministryStatus}
            background={ministry?.imgCover.url}
            title={ministry?.title}
          />
          <AboutSection
            ministriesLinks={ministriesLinks}
            ministryStatus={ministryStatus}
            ministry={ministry}
            posts={posts}
          />
        </>
      )}
      {ministryStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default MinistryPage;
