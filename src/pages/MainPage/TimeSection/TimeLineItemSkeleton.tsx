import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Skeleton, Typography } from '@mui/material';

export const TimeLineSkeleton = () => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography variant='h4'>{<Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '100%' }} />}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot sx={{ background: '#d3cec4' }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant='h4'>{<Skeleton sx={{ bgcolor: 'grey.700', width: '100%', height: '100%' }} />}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
