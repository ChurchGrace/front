import { CircularProgress } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { StatusEnum } from '../../types/shared';
import {
  EditIconStyled,
  FormEditorImgStyled,
  FormEditorOptionsStyled,
  FormImgNameStyled,
} from '../../pages/Dashboard/DashboardStyled';
import { IReplaceImgProps } from './types';

export const ReplaceImgComponent = ({
  formStatus,
  updateImg,
  imgName,
  photoId,
  inputName,
  initImgUrl,
}: IReplaceImgProps) => {
  const inputId = nanoid();

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      updateImg(inputName, files[0], photoId || '');
    }
  };

  return (
    <>
      {formStatus === StatusEnum.LOADING ? (
        <CircularProgress
          sx={{
            alignSelf: 'center',
            justifySelf: 'center',
          }}
        />
      ) : (
        <FormEditorImgStyled>
          {initImgUrl && <img src={initImgUrl} loading='lazy' />}
          <FormEditorOptionsStyled>
            <input
              accept='image/*'
              onChange={(e) => onImageChange(e)}
              type='file'
              id={inputId}
              style={{ display: 'none' }}
            />
            <label htmlFor={inputId}>
              <EditIconStyled />
            </label>
          </FormEditorOptionsStyled>
          <FormImgNameStyled>{imgName}</FormImgNameStyled>
        </FormEditorImgStyled>
      )}
    </>
  );
};
