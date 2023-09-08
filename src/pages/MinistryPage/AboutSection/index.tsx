import parse from 'html-react-parser';
import { nanoid } from '@reduxjs/toolkit';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Container } from '../../../components/Shared';
import { scaleBlockAnimation, opacityAnimation, textLeftAnimation } from '../../../utils/animationSettings';
import { cutString, stripHtml } from '../../../utils/htmlParse';
import { StatusEnum } from '../../../types/shared';
import {
  AboutMinistry,
  AboutMinistryAside,
  AboutMinistryAsideBlock,
  AboutMinistryAsideBlog,
  AboutMinistryAsideLinks,
  AboutMinistryContent,
  AboutMinistryMainPhoto,
  AboutMinistryPhoto,
  AboutMinistryPhotos,
  AboutMinistryText,
  AboutMinistryWrapper,
  BlockText,
  ButtonStyled,
} from './AboutSectionStyled';
import MinistrySkeleton from './Skeleton';
import { IMinistryAboutSectionProps } from './types';

const AboutSection = ({ ministry, ministryStatus, ministriesLinks, posts }: IMinistryAboutSectionProps) => {
  return (
    <AboutMinistry>
      <Container>
        {ministryStatus === StatusEnum.LOADED ? (
          <AboutMinistryWrapper>
            <AboutMinistryContent>
              <AboutMinistryMainPhoto>
                <motion.img
                  initial='hidden'
                  whileInView='visible'
                  variants={scaleBlockAnimation}
                  src={ministry?.imgMain?.url}
                />
              </AboutMinistryMainPhoto>

              <AboutMinistryText initial='hidden' whileInView='visible' variants={textLeftAnimation}>
                {parse(ministry.text)}
              </AboutMinistryText>

              <AboutMinistryPhotos initial='hidden' whileInView='visible' variants={scaleBlockAnimation}>
                <PhotoProvider>
                  {ministry.imgs.map(({ url }) => {
                    return (
                      <PhotoView key={nanoid()} src={url}>
                        <AboutMinistryPhoto>
                          <LazyLoadImage src={url} effect='blur' />
                        </AboutMinistryPhoto>
                      </PhotoView>
                    );
                  })}
                </PhotoProvider>
              </AboutMinistryPhotos>
            </AboutMinistryContent>

            <AboutMinistryAside initial='hidden' whileInView='visible' variants={opacityAnimation}>
              <AboutMinistryAsideLinks>
                <h3>Служения</h3>
                <ul>
                  {ministriesLinks.map((item) => {
                    if (item.title === 'Служение' && item?.submenu) {
                      return item.submenu.map((submenu) => {
                        return (
                          <li key={nanoid()}>
                            <NavLink to={submenu.url}>{submenu.title}</NavLink>
                          </li>
                        );
                      });
                    }
                  })}
                </ul>
              </AboutMinistryAsideLinks>
              <AboutMinistryAsideBlog>
                <h3>Блог</h3>
                {posts.slice(0, 3).map((post) => {
                  return (
                    <AboutMinistryAsideBlock key={post._id}>
                      {post?.imgMain?.url && <CardMedia component='img' height='125' image={post?.imgMain?.url} />}
                      <CardContent>
                        <BlockText gutterBottom variant='h5'>
                          {cutString(post.title, 15)}
                        </BlockText>
                        <BlockText variant='body2' color='text.secondary'>
                          {stripHtml(post.text)}
                        </BlockText>
                      </CardContent>
                      <CardActions
                        sx={{
                          paddingLeft: '16px',
                        }}>
                        <NavLink to={`/blog/${post.url}`}>
                          <ButtonStyled size='small'>Читать далее</ButtonStyled>
                        </NavLink>
                      </CardActions>
                    </AboutMinistryAsideBlock>
                  );
                })}
              </AboutMinistryAsideBlog>
            </AboutMinistryAside>
          </AboutMinistryWrapper>
        ) : (
          <MinistrySkeleton />
        )}
      </Container>
    </AboutMinistry>
  );
};

export default AboutSection;
