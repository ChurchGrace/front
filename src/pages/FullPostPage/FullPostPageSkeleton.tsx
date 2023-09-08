import { Skeleton } from '@mui/material';
import { FullPostImg, FullPostTextContent } from './FullPostPageStyled';

const FullPostPageSkeleton = () => {
  return (
    <div>
      <FullPostImg>
        <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '100%', transform: 'none' }} />
      </FullPostImg>
      <FullPostTextContent>
        <Skeleton
          sx={{ bgcolor: 'grey.700', width: '100%', height: '70px', marginBottom: '10px', transform: 'none' }}
        />
        <Skeleton
          sx={{ bgcolor: 'grey.700', width: '100%', height: '450px', marginBottom: '20px', transform: 'none' }}
        />
        <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '100px', transform: 'none' }} />
      </FullPostTextContent>
    </div>
  );
};

export default FullPostPageSkeleton;
