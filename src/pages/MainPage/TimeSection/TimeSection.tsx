import Timeline from '@mui/lab/Timeline';
import { useAppSelector } from '../../../app/hooks';
import { selectEvents, selectEventsStatus } from '../../../app/slices/eventsSlice';
import { Container, SectionLableText, SectionTitle, Divider, SectionInfoCentered } from '../../../components/Shared';
import TimelineItemComponent from '../../../components/TimeLineItemComponent';
import { SectionInfoSkeleton } from '../Skeletons';
import { StatusEnum } from '../../../types/shared';
import { SectionTime, TimeLineWrapper } from './TimeSectionStyled';
import { TimeLineSkeleton } from './TimeLineItemSkeleton';

const TimeSection = () => {
  const timeEvents = useAppSelector(selectEvents);
  const timeEventsStatus = useAppSelector(selectEventsStatus);

  const createSection = () => {
    if (timeEventsStatus === StatusEnum.LOADED) {
      return (
        <Container>
          <SectionInfoCentered>
            <SectionLableText>Расписание</SectionLableText>
            <SectionTitle>Расписание событий церкви</SectionTitle>
            <Divider />
          </SectionInfoCentered>
          <TimeLineWrapper>
            <Timeline position='alternate'>
              {timeEvents.map((timeEvent) => {
                return <TimelineItemComponent timeEvent={timeEvent} key={timeEvent._id} />;
              })}
            </Timeline>
          </TimeLineWrapper>
        </Container>
      );
    } else {
      return (
        <Container>
          <SectionInfoCentered>
            <SectionInfoSkeleton />
          </SectionInfoCentered>
          <TimeLineWrapper>
            <Timeline position='alternate'>
              <TimeLineSkeleton />
            </Timeline>
          </TimeLineWrapper>
        </Container>
      );
    }
  };

  return <SectionTime>{createSection()}</SectionTime>;
};

export default TimeSection;
