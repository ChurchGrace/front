import { Skeleton } from '@mui/material';
import BlogItemSkeleton from '../../BlogPage/BlogItemSkeleton';
import { opacityAnimation, scaleBlockAnimation } from '../../../utils/animationSettings';
import {
  AboutMinistryAside,
  AboutMinistryAsideBlock,
  AboutMinistryAsideBlog,
  AboutMinistryAsideLinks,
  AboutMinistryContent,
  AboutMinistryMainPhoto,
  AboutMinistryPhoto,
  AboutMinistryPhotos,
  AboutMinistryWrapper,
} from './AboutSectionStyled';

const MinistrySkeleton = () => {
  return (
    <AboutMinistryWrapper>
      <AboutMinistryContent>
        <AboutMinistryMainPhoto>
          <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '100%', transform: 'none' }} />
        </AboutMinistryMainPhoto>
        <Skeleton
          sx={{
            bgcolor: 'grey.700',
            width: '100%',
            height: '90px',
            marginTop: '15px',
            marginBottom: '10px',
            transform: 'none',
          }}
        />
        <Skeleton
          sx={{
            bgcolor: 'grey.700',
            width: '100%',
            height: '450px',
            marginBottom: '10px',
            transform: 'none',
          }}
        />
        <AboutMinistryPhotos initial='hidden' whileInView='visible' variants={scaleBlockAnimation}>
          {[...new Array(3)].map((_, i) => {
            return (
              <AboutMinistryPhoto key={i}>
                <Skeleton
                  sx={{
                    bgcolor: 'grey.700',
                    width: '100%',
                    height: '100%',
                    transform: 'none',
                  }}
                />
              </AboutMinistryPhoto>
            );
          })}
        </AboutMinistryPhotos>
      </AboutMinistryContent>
      <AboutMinistryAside initial='hidden' whileInView='visible' variants={opacityAnimation}>
        <AboutMinistryAsideLinks>
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '170px',
              height: '30px',
              transform: 'none',
              marginBottom: '20px',
            }}
          />
          <ul>
            {[...new Array(3)].map((_, i) => {
              return (
                <li key={i}>
                  <Skeleton
                    sx={{
                      bgcolor: 'grey.700',
                      width: '120px',
                      height: '30px',
                      transform: 'none',
                      marginBottom: '20px',
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </AboutMinistryAsideLinks>
        <AboutMinistryAsideBlog>
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '70px',
              height: '30px',
              transform: 'none',
              marginBottom: '20px',
            }}
          />
          {[...new Array(3)].map((_, i) => {
            return (
              <AboutMinistryAsideBlock key={i}>
                <BlogItemSkeleton />
              </AboutMinistryAsideBlock>
            );
          })}
        </AboutMinistryAsideBlog>
      </AboutMinistryAside>
    </AboutMinistryWrapper>
  );
};

export default MinistrySkeleton;
