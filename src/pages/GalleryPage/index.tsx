import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Skeleton } from '@mui/material';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { ButtonStyled, Container } from '../../components/Shared';
import TextInfo from '../../components/TextInfo';
import { scaleBlockAnimation } from '../../utils/animationSettings';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGallery, selectGalleryPages, selectGalleryStatus } from '../../app/slices/gallerySlice';
import { getGallery } from '../../app/thunks/galleryThunk';
import { StatusEnum } from '../../types/shared';
import PageError from '../../components/PageError';
import { ButtonWrapper, Gallery, GalleryPhoto, GalleryWrapper } from './GalleryPageStyled';

const GalleryPage = () => {
  const galleryStatus = useAppSelector(selectGalleryStatus);
  const gallery = useAppSelector(selectGallery);
  const galleryPages = useAppSelector(selectGalleryPages);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const onClickLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    void dispatch(getGallery({ page, limit: 10 }));
  }, [dispatch, page]);

  const createContent = () => {
    if (galleryStatus === StatusEnum.LOADED) {
      if (gallery.length) {
        return gallery.map((galleryItem) => {
          return (
            <motion.div key={galleryItem._id} initial='hidden' whileInView='visible' variants={scaleBlockAnimation}>
              <GalleryPhoto>
                <PhotoView src={galleryItem?.imgMain?.url}>
                  <img loading='lazy' src={galleryItem?.imgMain?.url} />
                </PhotoView>
              </GalleryPhoto>
            </motion.div>
          );
        });
      } else {
        return <TextInfo text='У нас пока нет фото, но очень скоро появятся! 😊' />;
      }
    } else {
      return [...new Array(10)].map((_, i) => {
        return (
          <div key={i}>
            <GalleryPhoto>
              <Skeleton
                sx={{
                  bgcolor: 'grey.700',
                  width: '100%',
                  height: '100%',
                  transform: 'none',
                  borderRadius: '25px',
                }}
              />
            </GalleryPhoto>
          </div>
        );
      });
    }
  };

  return (
    <>
      <PromoSectionComponent itemStatus={galleryStatus} title='Галлерея' />

      <Gallery>
        <Container>
          <GalleryWrapper>
            <PhotoProvider>{createContent()}</PhotoProvider>
          </GalleryWrapper>
          {galleryPages !== page && (
            <ButtonWrapper>
              <ButtonStyled onClick={onClickLoadMore} size='large' variant='contained'>
                Загрузить еще
              </ButtonStyled>
            </ButtonWrapper>
          )}
        </Container>
      </Gallery>
      {galleryStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default GalleryPage;
