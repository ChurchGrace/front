import { StatusEnum } from './shared';

export interface ISection {
  _id: string;
  text: string;
  title: string;
  subtitle: string;
  textBtn: string;
  imgCover: {
    img: string;
    url: string;
  };
  itemStatus?: StatusEnum;
}

export const isSection = (data: unknown): data is ISection => {
  return (data as ISection)?.textBtn !== undefined;
};
