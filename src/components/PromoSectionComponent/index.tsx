import { NavLink } from 'react-router-dom';
import { textRightAnimation } from '../../utils/animationSettings';
import { StatusEnum } from '../../types/shared';
import PromoSectionSkeleton from './PromoSectionSkeleton';
import { BreadcrumbsStyled, PromoSection, PromoSectionText, PromoWave } from './PromoSectionStyled';
import { IPromoSectionProps } from './types';

import 'react-photo-view/dist/react-photo-view.css';

const PromoSectionComponent = ({
  title,
  background,
  breadcrumbs,
  itemStatus = StatusEnum.LOADED,
}: IPromoSectionProps) => {
  return (
    <>
      {itemStatus === StatusEnum.LOADED ? (
        <PromoSection url={background}>
          <PromoSectionText
            initial='hidden'
            whileInView='visible'
            variants={textRightAnimation}
            viewport={{ once: true }}>
            {breadcrumbs && (
              <BreadcrumbsStyled aria-label='breadcrumb'>
                {breadcrumbs.map((breadcrumb, i) => {
                  return (
                    <NavLink to={breadcrumb.link} key={i}>
                      {breadcrumb.title}
                    </NavLink>
                  );
                })}
              </BreadcrumbsStyled>
            )}
            <h1>{title}</h1>
          </PromoSectionText>

          <PromoWave>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
              <path
                d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
                className='shape-fill'></path>
            </svg>
          </PromoWave>
        </PromoSection>
      ) : (
        <PromoSectionSkeleton />
      )}
    </>
  );
};

export default PromoSectionComponent;
