import { StatusEnum } from './shared';

export interface IMinistry {
  imgCover: {
    url: string;
    img: string;
  };
  imgMain: {
    url: string;
    img: string;
  };
  _id: string;
  text: string;
  title: string;
  url: string;
  imgs: { url: string; img: string }[];
  itemStatus?: StatusEnum;
}

export const isMinistry = (data: unknown): data is IMinistry => {
  return (data as IMinistry)?._id !== undefined;
};
