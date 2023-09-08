import { StatusEnum } from '../types/shared';

export const showContent = (status: StatusEnum, Component: JSX.Element, Progress: React.ReactNode) => {
  if (status === StatusEnum.LOADING) {
    return Progress;
  } else {
    return Component;
  }
};
