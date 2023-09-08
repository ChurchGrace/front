import { Skeleton } from '@mui/material';
import { opacityAnimation } from '../../../utils/animationSettings';
import { AboutPhoto, AboutText, AboutWrapper } from './AboutSectionStyled';

export const AboutSectionSkeleton = () => {
  return (
    <AboutWrapper>
      <AboutPhoto>
        <Skeleton variant='rectangular' sx={{ bgcolor: 'grey.700', width: '100%', height: '100%' }} />
      </AboutPhoto>
      <AboutText initial='hidden' whileInView='visible' variants={opacityAnimation}>
        <Skeleton variant='rectangular' sx={{ bgcolor: 'grey.700', width: '80%', marginBottom: '15px' }} />
        <Skeleton variant='rectangular' sx={{ bgcolor: 'grey.700', width: '75%', marginBottom: '15px' }} />
        <Skeleton
          variant='rectangular'
          sx={{ bgcolor: 'grey.700', width: '120px', height: '2px', marginBottom: '20px' }}
        />
        <Skeleton
          variant='rectangular'
          sx={{ bgcolor: 'grey.700', width: '100%', height: '300px', marginBottom: '25px' }}
        />
        <Skeleton variant='rectangular' sx={{ bgcolor: 'grey.700', width: '120px', height: '40px' }} />
      </AboutText>
    </AboutWrapper>
  );
};
