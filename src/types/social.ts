import { StatusEnum } from './shared';

export interface ISocial {
  _id: string;
  title: string;
  url: string;
  imgMain?: {
    img: string;
    url: string;
  };
  itemStatus?: StatusEnum;
}

export const isSocial = (data: unknown): data is ISocial => {
  return (data as ISocial)?.title !== undefined;
};
