import { forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ISnackBarProps } from './types';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackbarComponent = ({ formError, color }: ISnackBarProps) => {
  return (
    <Alert severity={color || 'error'} sx={{ width: '100%', marginBottom: '40px' }}>
      {formError}
    </Alert>
  );
};

export default SnackbarComponent;
