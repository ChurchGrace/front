import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { SermonsBlockIcon, SermonsBlockImg, SermonsText } from './SermonsBlockStyled';
import { ISermonProps } from './types';

const Sermon = ({ url, title, videoId }: ISermonProps) => {
  return (
    <>
      <a href={`https://www.youtube.com/watch?v=${videoId}`}>
        <SermonsBlockImg>
          <img src={url} />
          <SermonsBlockIcon>
            <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
          </SermonsBlockIcon>
        </SermonsBlockImg>
      </a>
      <SermonsText>
        <h3>{title}</h3>
      </SermonsText>
    </>
  );
};

export default Sermon;
