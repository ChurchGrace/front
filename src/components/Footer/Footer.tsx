import parse from 'html-react-parser';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Skeleton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Container } from '../Shared';
import { useAppSelector } from '../../app/hooks';
import { selectFooter, selectFooterStatus } from '../../app/slices/footerSlice';
import { StatusEnum } from '../../types/shared';
import { FooterBlock, FooterBottom, FooterSocialIcon, FooterStyled, FooterWrapper } from './FooterStyled';

const Footer = () => {
  const [footer] = useAppSelector(selectFooter);
  const footerStatus = useAppSelector(selectFooterStatus);

  return (
    <>
      {footerStatus === StatusEnum.LOADED ? (
        <footer>
          <FooterStyled img={footer.imgCover.url}>
            <Container>
              <FooterWrapper>
                <FooterBlock>
                  <h3>{footer.title}</h3>
                  {parse(footer.text)}
                </FooterBlock>

                <FooterBlock>
                  <h3>Быстрые ссылки</h3>
                  <nav>
                    <ul>
                      <li>
                        <ArrowForwardIosIcon />
                        <NavLink to='/blog'>Блог</NavLink>
                      </li>
                      <li>
                        <ArrowForwardIosIcon />
                        <NavLink to='/history'>История</NavLink>
                      </li>
                      <li>
                        <ArrowForwardIosIcon />
                        <NavLink to='/gallery'>Галерея</NavLink>
                      </li>
                      <li>
                        <ArrowForwardIosIcon />
                        <NavLink to='/sermons'>Проповеди</NavLink>
                      </li>
                      <li>
                        <ArrowForwardIosIcon />
                        <NavLink to='/pastors'>Пастора</NavLink>
                      </li>
                    </ul>
                  </nav>
                </FooterBlock>

                <FooterBlock>
                  <h3>Социальные сети</h3>
                  <ul>
                    {footer.social.map((socialItem, i) => {
                      return (
                        <li key={i}>
                          <FooterSocialIcon>
                            <img loading='lazy' src={socialItem.imgMain?.url} />
                          </FooterSocialIcon>
                          <a href={socialItem.url}>{socialItem.title}</a>
                        </li>
                      );
                    })}
                  </ul>
                </FooterBlock>
              </FooterWrapper>
            </Container>
          </FooterStyled>

          <FooterBottom>
            <h4>{footer.bottomText}</h4>
          </FooterBottom>
        </footer>
      ) : (
        <Skeleton
          sx={{
            bgcolor: 'grey.900',
            height: '400px',
            width: '100%',
            transform: 'none',
          }}
        />
      )}
    </>
  );
};

export default Footer;
