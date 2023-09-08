import { useMemo } from 'react';
import { useAppDispatch, useFormInfo } from '../../app/hooks';
import { FormEditorImgWrapperStyled } from '../../pages/Dashboard/DashboardStyled';
import { FormEditorFieldStyled } from '../Shared';
import FormButtons from './FormControll';
import { TextEditorComponent } from './TextEditor';
import { UploadImgComponent } from './UploadImg';
import { ICreateFormGeneralProps, ICreateFormProps, ITimeEventsFormProps } from './types';

const CreateFormGeneral = ({ formStatus, formError, inputs, saveFn, showImg, formData }: ICreateFormGeneralProps) => {
  return (
    <>
      {showImg && formData && (
        <FormEditorImgWrapperStyled>
          {showImg.map((img, i) => {
            if (img.inputName === 'imgs') {
              return [...new Array(3)].map((_, index) => {
                return (
                  <UploadImgComponent
                    key={100 + index}
                    isCancel
                    formData={formData}
                    imgName={img.imgName}
                    inputName={img.inputName}
                    itemStatus={formStatus}
                  />
                );
              });
            }
            return (
              <UploadImgComponent
                key={i}
                isCancel
                formData={formData}
                imgName={img.imgName}
                inputName={img.inputName}
                itemStatus={formStatus}
              />
            );
          })}
        </FormEditorImgWrapperStyled>
      )}

      {inputs.map((input, i) => {
        if (input.formDataKey === 'text') {
          return <TextEditorComponent key={i} text={input.str} setText={(val: string) => input.setVal(val)} />;
        }
        return (
          <FormEditorFieldStyled
            autoComplete='off'
            key={i}
            InputLabelProps={{
              shrink: true,
            }}
            variant='filled'
            label={input.label}
            placeholder={`Введите ${input.label}`}
            value={input.str}
            onChange={(e) => input.setVal(e.target.value)}
          />
        );
      })}
      <FormButtons saveFn={saveFn} formError={formError} formStatus={formStatus} />
    </>
  );
};

export const WithStandartCreateForm = ({
  formStatus,
  formError,
  createThunk,
  showImg,
  photoErrorAction,
  isSocial,
}: ICreateFormProps) => {
  const formData = useMemo(() => new FormData(), []);
  const dispatch = useAppDispatch();
  const title = useFormInfo({
    formData: formData,
    label: 'Заголовок',
    formDataKey: 'title',
    formStatus,
  });

  const text = useFormInfo({
    formData: formData,
    label: 'Текст',
    formDataKey: 'text',
    formStatus,
  });

  const url = useFormInfo({
    formData: formData,
    label: 'URL',
    formDataKey: 'url',
    formStatus,
  });

  const inputs = isSocial ? [title, url] : [title, text];

  const createNew = () => {
    let isAllImgs = false;
    const isImgs = showImg.some((item) => item.inputName === 'imgs');
    const photos = showImg.some((item) => {
      if (formData.get(item.inputName) === null) {
        if (item.optional === undefined) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    if (isImgs) {
      isAllImgs = formData.getAll('imgs').length === 3;
    }

    if (isImgs && isAllImgs && !photos) {
      void dispatch(createThunk(formData));
    } else if (!isImgs && !photos) {
      void dispatch(createThunk(formData));
    } else if (isImgs && photos) {
      if (photoErrorAction) {
        dispatch(photoErrorAction());
      }
    } else if (!isImgs && photos) {
      if (photoErrorAction) {
        dispatch(photoErrorAction());
      }
    }
  };

  return (
    <CreateFormGeneral
      inputs={inputs}
      formStatus={formStatus}
      formError={formError}
      saveFn={createNew}
      showImg={showImg}
      formData={formData}
    />
  );
};

export const WithPastorsCreateForm = ({
  formStatus,
  formError,
  createThunk,
  showImg,
  photoErrorAction,
}: ICreateFormProps) => {
  const formData = useMemo(() => new FormData(), []);
  const dispatch = useAppDispatch();
  const name = useFormInfo({
    formData,
    label: 'Имя',
    formDataKey: 'name',
    formStatus,
  });
  const surname = useFormInfo({
    formData,
    label: 'Фамилию',
    formDataKey: 'surname',
    formStatus,
  });
  const job = useFormInfo({
    formData,
    label: 'Должность',
    formDataKey: 'job',
    formStatus,
  });

  const createNew = () => {
    if (formData.get('imgMain')) {
      void dispatch(createThunk(formData));
    } else {
      if (photoErrorAction) {
        dispatch(photoErrorAction());
      }
    }
  };

  return (
    <CreateFormGeneral
      inputs={[name, surname, job]}
      formStatus={formStatus}
      formError={formError}
      saveFn={createNew}
      showImg={showImg}
      formData={formData}
    />
  );
};

export const WithTimeCreateForm = ({ formStatus, formError, createThunk, showImg }: ITimeEventsFormProps) => {
  const dispatch = useAppDispatch();
  const time = useFormInfo({
    label: 'Заголовок',
    formDataKey: 'time',
    formStatus,
  });

  const event = useFormInfo({
    label: 'Текст',
    formDataKey: 'event',
    formStatus,
  });

  const createNew = () => {
    void dispatch(createThunk({ time: time.str, event: event.str }));
  };

  return (
    <CreateFormGeneral
      inputs={[time, event]}
      formStatus={formStatus}
      formError={formError}
      saveFn={createNew}
      showImg={showImg}
    />
  );
};

export default CreateFormGeneral;
