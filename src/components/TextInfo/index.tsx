import { TextInfoStyled } from './TextInfoStyled';

const TextInfo = ({ text }: { text: string }) => {
  return (
    <TextInfoStyled align='center' sx={{ fontSize: '25px', color: '#ffff' }}>
      {text}
    </TextInfoStyled>
  );
};

export default TextInfo;
