import { Skeleton } from '@mui/material';

export const SectionInfoSkeleton = () => {
  return (
    <>
      <Skeleton
        variant='rectangular'
        sx={{
          bgcolor: 'grey.700',
          maxWidth: '300px',
          height: '25px',
          margin: '0 auto',
          marginBottom: '15px',
          visibility: 'visible',
        }}
      />
      <Skeleton
        variant='rectangular'
        sx={{
          bgcolor: 'grey.700',
          width: '260px',
          height: '30px',
          margin: '0 auto',
          marginBottom: '15px',
          visibility: 'visible',
        }}
      />
      <Skeleton
        variant='rectangular'
        sx={{
          bgcolor: 'grey.700',
          width: '120px',
          height: '2px',
          margin: '0 auto',
          marginBottom: '20px',
          visibility: 'visible',
        }}
      />
    </>
  );
};
