import parse, { DOMNode, domToReact } from 'html-react-parser';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Container, SectionLableText, SectionTitle, Divider, SectionInfoCentered } from '../../../components/Shared';
import { textLeftAnimation, textRightAnimation } from '../../../utils/animationSettings';
import { selectSections, selectSectionsStatus } from '../../../app/slices/sectionsSlice';
import { StatusEnum } from '../../../types/shared';
import { InfoSectionStyled, InfoSectionText } from './InfoSectionStyled';
import { InfoSectionSkeleton } from './Skeleton';

const InfoSection = ({ index }: { index: 1 | 2 }) => {
  const infoSection = useAppSelector(selectSections)[index];
  const infoSectionStatus = useAppSelector(selectSectionsStatus);

  const createSection = () => {
    if (infoSectionStatus === StatusEnum.LOADED) {
      return (
        <InfoSectionStyled url={infoSection?.imgCover?.url || ''}>
          <Container>
            {infoSection && (
              <>
                <SectionInfoCentered initial='hidden' whileInView='visible' variants={textRightAnimation}>
                  <SectionLableText>{infoSection.subtitle}</SectionLableText>
                  <SectionTitle>{infoSection.title}</SectionTitle>
                  <Divider />
                </SectionInfoCentered>
                <InfoSectionText>
                  {parse(infoSection.text, {
                    replace: (domNode) => {
                      const elem = domNode as { children: DOMNode[] };
                      return (
                        <motion.p initial='hidden' whileInView='visible' variants={textLeftAnimation}>
                          {domToReact(elem.children)}
                        </motion.p>
                      );
                    },
                  })}
                  <NavLink to={`/${index === 1 ? 'sermons' : 'contacts'}`}>
                    <Button sx={{ mt: '25px' }} variant='contained' color='error' size='large'>
                      {infoSection.textBtn}
                    </Button>
                  </NavLink>
                </InfoSectionText>
              </>
            )}
          </Container>
        </InfoSectionStyled>
      );
    } else {
      return <InfoSectionSkeleton />;
    }
  };

  return <>{createSection()}</>;
};

export default InfoSection;
