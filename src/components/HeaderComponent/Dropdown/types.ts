import { INavigation } from '../../../types/navigation';

export interface IDropdownProps {
  submenus: INavigation['submenu'];
  dropdown: boolean;
  depthlevel: number;
}
