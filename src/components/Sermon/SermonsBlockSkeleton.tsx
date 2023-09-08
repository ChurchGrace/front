import { Skeleton } from '@mui/material';
import { SermonsText } from './SermonsBlockStyled';

const SermonsBlockSkeleton = () => {
  return (
    <>
      <Skeleton
        sx={{
          bgcolor: 'grey.700',
          width: '100%',
          height: '150px',
          transform: 'none',
          borderRadius: '25px 25px 0 0',
        }}
      />
      <SermonsText>
        <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '50px', transform: 'none' }} />
      </SermonsText>
    </>
  );
};

export default SermonsBlockSkeleton;
