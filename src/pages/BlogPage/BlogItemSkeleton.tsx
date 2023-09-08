import { CardActions, CardContent, Skeleton } from '@mui/material';
import { BlockText } from '../MinistryPage/AboutSection/AboutSectionStyled';

const BlogItemSkeleton = () => {
  return (
    <>
      <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '150px', transform: 'none' }} />
      <CardContent>
        <BlockText gutterBottom variant='h5'>
          <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', transform: 'none' }} />
        </BlockText>
        <BlockText variant='body2' color='text.secondary'>
          <Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '100px', transform: 'none' }} />
        </BlockText>
      </CardContent>
      <CardActions
        sx={{
          paddingLeft: '16px',
          paddingBottom: '16px',
        }}>
        <Skeleton sx={{ bgcolor: 'grey.700', width: '120px', height: '20px', transform: 'none' }} />
      </CardActions>
    </>
  );
};

export default BlogItemSkeleton;
