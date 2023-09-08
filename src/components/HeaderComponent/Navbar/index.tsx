import { nanoid } from '@reduxjs/toolkit';
import MenuItems from '../MenuItems';
import { HeaderUl } from '../Header/HeaderStyled';
import { useAppSelector } from '../../../app/hooks';
import { selectNavigation } from '../../../app/slices/navigationSlice';
import { INavbarProps } from '../types';
import { CloseIconStyled } from './NavbarStyled';

const Navbar = ({ menu, setMenu }: INavbarProps) => {
  const navigation = useAppSelector(selectNavigation);
  return (
    <nav>
      <HeaderUl menu={menu}>
        <CloseIconStyled onClick={() => setMenu(false)} />
        {navigation &&
          navigation.map((menuItem) => {
            const depthLevel = 0;
            return <MenuItems items={menuItem} key={nanoid()} depthlevel={depthLevel} />;
          })}
      </HeaderUl>
    </nav>
  );
};

export default Navbar;
