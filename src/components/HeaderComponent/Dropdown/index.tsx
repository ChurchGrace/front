import { nanoid } from '@reduxjs/toolkit';
import { AnimatePresence } from 'framer-motion';
import MenuItems from '../MenuItems';
import { IDropdownProps } from '../types';
import { DropDownStyled } from './DropDownStyled';

const Dropdown = ({ submenus, dropdown, depthlevel }: IDropdownProps) => {
  depthlevel = depthlevel + 1;

  return (
    <AnimatePresence>
      {dropdown && (
        <DropDownStyled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={window.innerWidth > 1180 ? { opacity: 0 } : ''}
          depthlevel={depthlevel}
          dropdown={dropdown}>
          {submenus && submenus.map((submenu) => <MenuItems depthlevel={depthlevel} key={nanoid()} items={submenu} />)}
        </DropDownStyled>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
