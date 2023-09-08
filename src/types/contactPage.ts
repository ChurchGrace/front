import { IContactBlock } from './contactBlock';
import { StatusEnum } from './shared';

export interface IContactPage {
  _id: string;
  text: string;
  imgMain: {
    img: string;
    url: string;
  };
  imgCover: {
    img: string;
    url: string;
  };
  blocks: IContactBlock[];
  itemStatus?: StatusEnum;
}

export const isContactPage = (data: unknown): data is IContactPage => {
  return (data as IContactPage)?.text !== undefined;
};
