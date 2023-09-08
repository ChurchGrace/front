import { StatusEnum } from './shared';

export interface ITimeEvent {
  time: string;
  event: string;
  _id: string;
  itemStatus?: StatusEnum;
}

export const isTimeEvent = (data: unknown): data is ITimeEvent => {
  return (data as ITimeEvent)?.event !== undefined;
};
