import { StatusEnum } from './shared';

export interface ISlider {
  _id: string;
  text: string;
  title: string;
  subtitle: string;
  imgCover: {
    img: string;
    url: string;
  };
  imgMain: {
    img: string;
    url: string;
  };
  itemStatus?: StatusEnum;
}

export const isSlider = (data: unknown): data is ISlider => {
  return (data as ISlider)?.imgCover !== undefined;
};
