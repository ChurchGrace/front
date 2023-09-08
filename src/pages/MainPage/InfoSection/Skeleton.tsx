import { Skeleton } from '@mui/material';
import { Container } from '../../../components/Shared';
import { SectionInfoSkeleton } from '../Skeletons';

export const InfoSectionSkeleton = () => {
  return (
    <Skeleton
      variant='rectangular'
      sx={{ bgcolor: 'grey.900', maxWidth: '100%', minHeight: '500px', padding: '70px 0', visibility: 'visible' }}>
      <Container>
        <div>
          <SectionInfoSkeleton />
        </div>
        <div>
          <Skeleton
            variant='rectangular'
            sx={{
              bgcolor: 'grey.700',
              maxWidth: '550px',
              height: '280px',
              margin: '0 auto',
              marginBottom: '20px',
              visibility: 'visible',
            }}
          />
          <Skeleton
            variant='rectangular'
            sx={{ bgcolor: 'grey.700', width: '140px', margin: '0 auto', height: '40px', visibility: 'visible' }}
          />
        </div>
      </Container>
    </Skeleton>
  );
};
