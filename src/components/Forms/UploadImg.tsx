import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import AddIcon from '@mui/icons-material/Add';
import { StatusEnum } from '../../types/shared';
import {
  AddPhotoStyled,
  DeleteIconStyled,
  EditIconStyled,
  FormEditorImgStyled,
  FormEditorOptionsStyled,
  FormImgNameStyled,
} from '../../pages/Dashboard/DashboardStyled';
import { IUploadImgProps } from './types';

export const UploadImgComponent = ({ formData, imgName, inputName, itemStatus, isCancel }: IUploadImgProps) => {
  const [imgUrl, setImgUrl] = useState('');
  const inputId = nanoid();

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImgUrl(URL.createObjectURL(files[0]));
      formData.append(inputName, files[0]);
    }
  };

  const onImageCancel = () => {
    setImgUrl('');
    formData.delete(inputName);
  };

  useEffect(() => {
    if (itemStatus === StatusEnum.LOADED) {
      setImgUrl('');
      formData.delete(inputName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemStatus]);

  const onImageReplace = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImgUrl(URL.createObjectURL(files[0]));
      formData.set(inputName, files[0]);
    }
  };

  return (
    <>
      {imgUrl ? (
        <FormEditorImgStyled>
          <img src={imgUrl} loading='lazy' />
          <FormEditorOptionsStyled>
            <input
              accept='image/*'
              onChange={(e) => onImageReplace(e)}
              type='file'
              id={inputId}
              style={{ display: 'none' }}
            />
            {itemStatus !== StatusEnum.LOADING && (
              <>
                {isCancel && <DeleteIconStyled onClick={onImageCancel} />}
                <label htmlFor={inputId}>
                  <EditIconStyled />
                </label>
              </>
            )}
          </FormEditorOptionsStyled>
          <FormImgNameStyled>{imgName}</FormImgNameStyled>
        </FormEditorImgStyled>
      ) : (
        <FormEditorImgStyled>
          <input
            multiple
            accept='image/*'
            onChange={onImageUpload}
            type='file'
            id={inputId}
            style={{ display: 'none' }}
          />
          <AddPhotoStyled htmlFor={inputId}>
            <AddIcon
              sx={{
                fontSize: '90px',
                color: '#424242',
              }}
            />
          </AddPhotoStyled>
          <FormImgNameStyled>{imgName}</FormImgNameStyled>
        </FormEditorImgStyled>
      )}
    </>
  );
};
