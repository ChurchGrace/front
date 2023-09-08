import { useEffect } from 'react';
import { Skeleton } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { StatusEnum } from '../../types/shared';
import TextInfo from '../../components/TextInfo';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { Container } from '../../components/Shared';
import { opacityAnimation } from '../../utils/animationSettings';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPastors, selectPastorsStatus } from '../../app/slices/pastorsSlice';
import { getPastors } from '../../app/thunks/pastorsThunk';
import PageError from '../../components/PageError';
import { Pastor, PastorDescr, PastorPhoto, Pastors, PastorsBlock } from './PastorPageStyled';

const PastorsPage = () => {
  const pastors = useAppSelector(selectPastors);
  const pastorsStatus = useAppSelector(selectPastorsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getPastors({ limit: 6 }));
  }, [dispatch]);

  const createPastors = () => {
    if (pastorsStatus === StatusEnum.LOADED) {
      if (pastors.length) {
        return pastors.map((pastor) => {
          return (
            <Pastor key={pastor._id} initial='hidden' whileInView='visible' variants={opacityAnimation}>
              <PastorPhoto>
                <LazyLoadImage src={pastor.imgMain?.url} effect='blur' />
              </PastorPhoto>
              <PastorDescr>
                <h2>
                  {pastor.name} {pastor.surname}
                </h2>
                <h2>{pastor.job}</h2>
              </PastorDescr>
            </Pastor>
          );
        });
      } else {
        return <TextInfo text='У нас пока нет служителей, свяжитесь с нами, если вы хотите им стать! 😃' />;
      }
    } else {
      return [...new Array(3)].map((_, i) => {
        return (
          <Pastor key={i} initial='hidden' whileInView='visible' variants={opacityAnimation}>
            <PastorPhoto>
              <Skeleton
                variant='rectangular'
                sx={{
                  bgcolor: 'grey.700',
                  width: '100%',
                  height: '100%',
                  transform: 'none',
                }}
              />
            </PastorPhoto>
            <PastorDescr>
              <Skeleton
                sx={{
                  bgcolor: 'grey.700',
                  width: '100%',
                  height: '120px',
                  transform: 'none',
                }}
              />
            </PastorDescr>
          </Pastor>
        );
      });
    }
  };

  return (
    <>
      <PromoSectionComponent title='Пастора' itemStatus={pastorsStatus} />
      <Pastors>
        <Container>
          <PastorsBlock>{createPastors()}</PastorsBlock>
        </Container>
      </Pastors>
      {pastorsStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default PastorsPage;
