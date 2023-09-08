import { StatusEnum } from './shared';

export interface IHistory {
  imgMain: {
    url: string;
    img: string;
  };
  _id: string;
  text: string;
  title: string;
  itemStatus: StatusEnum;
}

export const isHistory = (data: unknown): data is IHistory => {
  return (data as IHistory)?.text !== undefined;
};
