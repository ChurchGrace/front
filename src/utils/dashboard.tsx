import { CircularProgress } from '@mui/material';
import { StatusEnum } from '../types/shared';
import PageError from '../components/PageError';

export const showFormContent = (status: StatusEnum, Component: React.ReactNode) => {
  if (status === StatusEnum.LOADED) {
    return Component;
  } else {
    return (
      <>
        <div style={{ position: 'relative', height: '100vh' }}>
          <CircularProgress
            sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>
        {status === StatusEnum.ERROR && (
          <PageError
            sx={{
              position: 'fixed',
              bottom: '0',
              zIndex: 99999,
              width: '100%',
              background: 'rgb(22, 11, 11)',
              color: 'rgb(244, 199, 199)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        )}
      </>
    );
  }
};
