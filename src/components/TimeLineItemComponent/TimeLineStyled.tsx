import styled from '@emotion/styled';
import TimelineItem from '@mui/lab/TimelineItem';
import { motion } from 'framer-motion';

export const SectionText = styled.p`
  font-size: 20px;
  margin: 0;
  font-weight: 300px;
  margin: 0;
  color: #ffff;
`;

export const TimeLineText = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
`;

export const TimeLineDescr = styled.span`
  color: #9aa5b1;
  font-size: 18px;
  font-weight: 700;
`;

export const TimelineItemMotion = motion(TimelineItem);
