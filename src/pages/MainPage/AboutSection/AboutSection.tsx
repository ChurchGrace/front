import parse, { DOMNode, domToReact } from 'html-react-parser';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectSections, selectSectionsStatus } from '../../../app/slices/sectionsSlice';
import { opacityAnimation } from '../../../utils/animationSettings';
import { Divider, SectionLableText, SectionTitle, Container } from '../../../components/Shared';
import { StatusEnum } from '../../../types/shared';
import { AboutPhoto, AboutSectionStyled, AboutSectionText, AboutText, AboutWrapper } from './AboutSectionStyled';
import { AboutSectionSkeleton } from './Skeleton';

const AboutSection = () => {
  const aboutSection = useAppSelector(selectSections)[0];
  const aboutSectionStatus = useAppSelector(selectSectionsStatus);

  const createSection = () => {
    if (aboutSectionStatus === StatusEnum.LOADED) {
      return (
        <AboutWrapper>
          <AboutPhoto>
            <img loading='lazy' src={aboutSection.imgCover.url} />
          </AboutPhoto>
          <AboutText initial='hidden' whileInView='visible' variants={opacityAnimation}>
            <SectionLableText>{aboutSection.subtitle}</SectionLableText>
            <SectionTitle> {aboutSection?.title}</SectionTitle>
            <Divider />
            {parse(aboutSection.text, {
              replace: (domNode) => {
                const elem = domNode as { children: DOMNode[] };
                return <AboutSectionText>{domToReact(elem.children)}</AboutSectionText>;
              },
            })}

            <NavLink to='/history'>
              <Button sx={{ mt: '10px' }} variant='contained' color='error' size='large'>
                {aboutSection.textBtn}
              </Button>
            </NavLink>
          </AboutText>
        </AboutWrapper>
      );
    } else {
      return <AboutSectionSkeleton />;
    }
  };

  return (
    <AboutSectionStyled>
      <Container>{createSection()}</Container>
    </AboutSectionStyled>
  );
};

export default AboutSection;
