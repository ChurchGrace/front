import { IMinistry } from '../../../types/ministry';
import { INavigation } from '../../../types/navigation';
import { IPost } from '../../../types/posts';
import { StatusEnum } from '../../../types/shared';

export interface IMinistryAboutSectionProps {
  ministriesLinks: INavigation[];
  ministry: IMinistry;
  posts: IPost[];
  ministryStatus: StatusEnum;
}
