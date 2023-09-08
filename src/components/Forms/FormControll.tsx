import { FormEditorSubmitStyled, FormEditorSubmitWrapperStyled } from '../Shared';
import { StatusEnum } from '../../types/shared';
import SnackbarComponent from '../Snackbar';
import { IFormControllProps } from './types';

const FormButtons = ({ formError, formStatus, saveFn, deleteFn, btnsStatus }: IFormControllProps) => {
  return (
    <>
      <FormEditorSubmitWrapperStyled>
        {saveFn && (
          <FormEditorSubmitStyled
            loading={formStatus === StatusEnum.LOADING}
            disabled={formStatus === StatusEnum.LOADING || btnsStatus}
            onClick={saveFn}
            color='success'
            variant='contained'>
            Сохранить
          </FormEditorSubmitStyled>
        )}
        {deleteFn && (
          <FormEditorSubmitStyled
            loading={formStatus === StatusEnum.LOADING}
            disabled={formStatus === StatusEnum.LOADING || btnsStatus}
            onClick={deleteFn}
            color='error'
            variant='contained'>
            Удалить
          </FormEditorSubmitStyled>
        )}
      </FormEditorSubmitWrapperStyled>
      {formStatus === StatusEnum.ERROR && formError && <SnackbarComponent formError={formError} />}
    </>
  );
};

export default FormButtons;
