import { StatusEnum } from './shared';

export interface IContactBlock {
  _id: string;
  text: string;
  title: string;
  imgMain: {
    img: string;
    url: string;
  };
  itemStatus?: StatusEnum;
}

export const isContactBlock = (data: unknown): data is IContactBlock => {
  return (data as IContactBlock)?.title !== undefined;
};
