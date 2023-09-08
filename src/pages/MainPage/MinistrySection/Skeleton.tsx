import { Skeleton } from '@mui/material';
import { MinistryCard, MinistryCardImg, MinistryCardText } from '../../../components/Ministry/MinistryStyled';
import { scaleBlockAnimation } from '../../../utils/animationSettings';

export const MinistryCardSkeleton = () => {
  return (
    <MinistryCard initial='hidden' whileInView='visible' variants={scaleBlockAnimation} viewport={{ amount: 0.4 }}>
      <MinistryCardImg>
        <Skeleton sx={{ bgcolor: 'grey.700', height: '250px', transform: 'none' }} />
      </MinistryCardImg>
      <MinistryCardText>
        <Skeleton sx={{ bgcolor: 'grey.700', transform: 'none', marginBottom: '15px', width: '250px' }} />
        <Skeleton sx={{ bgcolor: 'grey.700', height: '290px', transform: 'none', marginBottom: '10px' }} />
        <Skeleton sx={{ bgcolor: 'grey.700', transform: 'none', width: '120px' }} />
      </MinistryCardText>
    </MinistryCard>
  );
};
