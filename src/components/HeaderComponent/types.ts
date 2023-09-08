import { INavigation } from '../../types/navigation';

export interface INavbarProps {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMenuItemsProps {
  items: INavigation;
  depthlevel: number;
}

export interface IDropdownProps {
  submenus: INavigation['submenu'];
  dropdown: boolean;
  depthlevel: number;
}
