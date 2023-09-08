import { StatusEnum } from './shared';
import { ISocial } from './social';

export interface IFooter {
  _id: string;
  text: string;
  bottomText: string;
  title: string;
  imgCover: {
    img: string;
    url: string;
  };
  social: ISocial[];
  itemStatus?: StatusEnum;
}

export const isFooter = (data: unknown): data is IFooter => {
  return (data as IFooter)?.bottomText !== undefined;
};
