import { Alert, AlertTitle } from '@mui/material';
import { IPageErrorProps } from './type';

const PageError = ({ sx, text }: IPageErrorProps) => {
  return (
    <Alert
      sx={
        sx || {
          position: 'fixed',
          bottom: '0',
          zIndex: 99999999999,
          width: '100%',
          background: 'rgb(22, 11, 11)',
          color: 'rgb(244, 199, 199)',
        }
      }
      severity='error'>
      <AlertTitle>Ошибка загрузки</AlertTitle>
      {text || 'При загрузке произошла ошибка, информация может отображаться неверно'}
    </Alert>
  );
};

export default PageError;
