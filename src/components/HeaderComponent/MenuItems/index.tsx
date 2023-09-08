import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown';
import { IMenuItemsProps } from '../types';
import { cutString } from '../../../utils/htmlParse';
import { ArrowStyled, MenuItemsStyled } from './MenuItemsStyled';

const MenuItems = ({ items, depthlevel }: IMenuItemsProps) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);

  const closeDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 576) {
      const handler = (event: MouseEvent | TouchEvent) => {
        if (dropdown && ref.current && !ref.current.contains(event.target as Node)) {
          setDropdown(false);
        }
      };
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
      return () => {
        document.removeEventListener('mousedown', handler);
        document.removeEventListener('touchstart', handler);
      };
    }
  }, [dropdown]);

  const onMouseEnter = () => {
    if (window.innerWidth > 1180) {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth > 1180) {
      setDropdown(false);
    }
  };

  return (
    <MenuItemsStyled onClick={closeDropdown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
      {items.submenu?.length ? (
        <>
          <button
            className={items.className}
            type='button'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((dropdownPrev) => !dropdownPrev)}>
            {depthlevel > 0 && window.innerWidth < 960 ? null : depthlevel > 0 && window.innerWidth > 960 ? (
              <span>&raquo;</span>
            ) : (
              <ArrowStyled />
            )}
            {items.title}
          </button>
          <Dropdown dropdown={dropdown} submenus={items.submenu} depthlevel={depthlevel} />
        </>
      ) : (
        <NavLink to={items.url!}> {cutString(items.title, 15)}</NavLink>
      )}
    </MenuItemsStyled>
  );
};

export default MenuItems;
