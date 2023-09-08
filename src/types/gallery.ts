import { StatusEnum } from './shared';

export interface IGallery {
  imgMain?: {
    url: string;
    img: string;
  };
  _id: string;
  itemStatus: StatusEnum;
}

export const isGallery = (data: unknown): data is IGallery => {
  return (data as IGallery)?._id !== undefined;
};
