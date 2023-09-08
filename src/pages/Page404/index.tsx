import { NavLink } from 'react-router-dom';
import { ButtonStyled } from '../../components/Shared';
import {
  Page404IconStyled,
  Page404SubtitleStyled,
  Page404TextStyled,
  Page404TitleStyled,
  Page404WrapperStyled,
} from './Page404Styled';

const Page404 = () => {
  return (
    <>
      <Page404WrapperStyled>
        <Page404IconStyled>😲</Page404IconStyled>
        <Page404TitleStyled>404!</Page404TitleStyled>
        <Page404SubtitleStyled>Страница не найдена</Page404SubtitleStyled>
        <Page404TextStyled>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, error! Voluptatem officiis maiores amet quos
          tempora ut ducimus accusantium, aperiam cupiditate porro voluptatum numquam debitis ratione non neque beatae
          itaque!
        </Page404TextStyled>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <NavLink to={`/`}>
            <ButtonStyled sx={{ color: '#ffff' }} size='large'>
              На главную
            </ButtonStyled>
          </NavLink>
        </div>
      </Page404WrapperStyled>
      <svg
        style={{ width: '100%', position: 'absolute', left: '0', right: '0', top: '0px' }}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'>
        <path
          fill='#f5f7fa'
          fillOpacity='1'
          d='M0,224L288,32L576,128L864,32L1152,288L1440,288L1440,0L1152,0L864,0L576,0L288,0L0,0Z'></path>
      </svg>
    </>
  );
};

export default Page404;
