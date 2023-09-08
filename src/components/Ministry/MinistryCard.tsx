import { NavLink } from 'react-router-dom';
import { scaleBlockAnimation } from '../../utils/animationSettings';
import { IMinistry } from '../../types/ministry';
import { stripHtml } from '../../utils/htmlParse';
import { MinistryCard, MinistryCardImg, MinistryCardText } from './MinistryStyled';

const MinistryCardComponent = ({ ministry }: { ministry: IMinistry }) => {
  return (
    <MinistryCard initial='hidden' whileInView='visible' variants={scaleBlockAnimation} viewport={{ amount: 0.4 }}>
      <MinistryCardImg>
        <img loading='lazy' src={ministry.imgMain.url || ''} />
      </MinistryCardImg>
      <MinistryCardText>
        <h2>{ministry.title}</h2>
        <p>{stripHtml(ministry.text)}</p>
        <NavLink to={`/ministry/${ministry.url}`}>Читать далее</NavLink>
      </MinistryCardText>
    </MinistryCard>
  );
};

export default MinistryCardComponent;
