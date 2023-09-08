import { StatusEnum } from './shared';

export interface IPastor {
  _id: string;
  imgMain: {
    img: string;
    url: string;
  };
  surname: string;
  name: string;
  job: string;
  itemStatus?: StatusEnum;
}

export const isPastor = (data: unknown): data is IPastor => {
  return (data as IPastor)?.job !== undefined;
};
