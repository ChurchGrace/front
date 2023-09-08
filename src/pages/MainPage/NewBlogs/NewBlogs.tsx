import EventNoteIcon from '@mui/icons-material/EventNote';
import { Autoplay } from 'swiper';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from '@mui/material';
import { selectPostStatus, selectPosts } from '../../../app/slices/postsSlice';
import { useAppSelector } from '../../../app/hooks';
import { Container } from '../../../components/Shared';
import { StatusEnum } from '../../../types/shared';
import { cutString } from '../../../utils/htmlParse';
import { BlogItem, BlogItemInfo, BlogItemsWrapper } from './NewBlogsStyled';

const NewBlogs = () => {
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostStatus);

  const createNewBlogs = () => {
    if (postsStatus === StatusEnum.LOADED) {
      if (!posts.length) {
        return <div style={{ margin: '50px 0' }}></div>;
      } else {
        return posts.map((post) => {
          return (
            <SwiperSlide key={post._id}>
              <BlogItem>
                <EventNoteIcon sx={{ fontSize: 50 }} />
                <BlogItemInfo>
                  <h3>{cutString(post.title, 18)}</h3>
                  <NavLink to={`/blog/${post.url}`}>Читать полностью</NavLink>
                </BlogItemInfo>
              </BlogItem>
            </SwiperSlide>
          );
        });
      }
    } else {
      return [...new Array(3)].map((_, i) => (
        <SwiperSlide key={i}>
          <Skeleton variant='rectangular' sx={{ bgcolor: 'grey.900', height: '100px', borderRadius: '15px' }} />
        </SwiperSlide>
      ));
    }
  };
  return (
    <Container>
      <BlogItemsWrapper>
        <Swiper
          rewind
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            320: {
              centeredSlides: false,
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              centeredSlides: false,
              slidesPerView: 1,
              spaceBetween: 40,
            },
            769: {
              centeredSlides: false,
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1200: {
              centeredSlides: false,
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1400: {
              centeredSlides: false,
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          slidesPerView={3}
          spaceBetween={40}
          modules={[Autoplay]}>
          {createNewBlogs()}
        </Swiper>
      </BlogItemsWrapper>
    </Container>
  );
};

export default NewBlogs;
