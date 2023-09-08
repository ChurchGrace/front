import { StatusEnum } from '../../types/shared';

export interface IPromoSectionProps {
  title: string;
  breadcrumbs?: { link: string; title: string }[];
  background?: string;
  itemStatus: StatusEnum;
}
