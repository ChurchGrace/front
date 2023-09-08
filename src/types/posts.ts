import { StatusEnum } from './shared';

export interface IPost {
  _id: string;
  text: string;
  title: string;
  imgMain?: {
    img: string;
    url: string;
  };
  url: string;
  createdAt: string;
  itemStatus?: StatusEnum;
}

export const isPost = (data: unknown): data is IPost => {
  return (data as IPost)?.text !== undefined;
};
