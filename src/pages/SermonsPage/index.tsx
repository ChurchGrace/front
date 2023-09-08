import { useEffect, useState } from 'react';
import Sermon from '../../components/Sermon';
import { StatusEnum } from '../../types/shared';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { ButtonStyled, Container } from '../../components/Shared';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSermons,
  selectSermonsNextPageToken,
  selectSermonsResults,
  selectSermonsStatus,
} from '../../app/slices/sermonsSlice';
import { getSermons } from '../../app/thunks/sermonsThunk';
import PageError from '../../components/PageError';
import SermonsBlockSkeleton from '../../components/Sermon/SermonsBlockSkeleton';
import { opacityAnimation } from '../../utils/animationSettings';
import { SermonsBlock } from '../../components/Sermon/SermonsBlockStyled';
import TextInfo from '../../components/TextInfo';
import { SermonsButtonWrapper, SermonsSection, SermonsWrapper } from './SermonsPageStyled';

const SermonsPage = () => {
  const sermons = useAppSelector(selectSermons);
  const sermonsStatus = useAppSelector(selectSermonsStatus);
  const sermonsNextPage = useAppSelector(selectSermonsNextPageToken);
  const sermonsTotalResults = useAppSelector(selectSermonsResults);
  const [showBtn, setShowBtn] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getSermons());
  }, [dispatch]);

  useEffect(() => {
    if (sermons.length === sermonsTotalResults || !sermons.length) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [sermons, sermonsTotalResults]);

  const createSermons = () => {
    if (!sermons.length) {
      return (
        <div style={{ gridColumn: '1 / 4', padding: '0 25px' }}>
          <TextInfo text='У нас пока нет проповедей 😔' />;
        </div>
      );
    } else {
      return sermons.map((sermon) => (
        <SermonsBlock key={sermon.id} initial='hidden' whileInView='visible' variants={opacityAnimation}>
          <Sermon
            title={sermon.snippet.title}
            url={sermon.snippet.thumbnails.medium.url}
            videoId={sermon.snippet.resourceId.videoId}
          />
        </SermonsBlock>
      ));
    }
  };

  const createSermonsSkeleton = () => {
    return [...new Array(10)].map((_, i) => (
      <SermonsBlock key={i}>
        <SermonsBlockSkeleton />
      </SermonsBlock>
    ));
  };

  return (
    <>
      <PromoSectionComponent itemStatus={sermonsStatus} title='Проповеди' />
      <SermonsSection>
        <SermonsWrapper>
          {sermonsStatus === StatusEnum.LOADED ? createSermons() : createSermonsSkeleton()}
        </SermonsWrapper>
        <Container>
          {showBtn && sermonsStatus !== StatusEnum.ERROR && (
            <SermonsButtonWrapper>
              <ButtonStyled
                size='large'
                onClick={() => void dispatch(getSermons({ page: sermonsNextPage }))}
                variant='contained'>
                Загрузить еще
              </ButtonStyled>
            </SermonsButtonWrapper>
          )}
        </Container>
      </SermonsSection>
      {sermonsStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default SermonsPage;
