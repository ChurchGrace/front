import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { textLeftAnimation } from '../../utils/animationSettings';
import { ITimeEvent } from '../../types/timeEvents';
import { TimeLineDescr, TimeLineText, TimelineItemMotion } from './TimeLineStyled';

const TimelineItemComponent = ({ timeEvent }: { timeEvent: ITimeEvent }) => {
  return (
    <TimelineItemMotion initial='hidden' whileInView='visible' variants={textLeftAnimation}>
      <TimelineOppositeContent>
        <TimeLineText>{timeEvent.time}</TimeLineText>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot sx={{ background: '#d3cec4' }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimeLineDescr>{timeEvent.event}</TimeLineDescr>
      </TimelineContent>
    </TimelineItemMotion>
  );
};

export default TimelineItemComponent;
