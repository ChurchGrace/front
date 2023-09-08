/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import { useMemo } from 'react';
import { useAppDispatch, useFormInfo } from '../../app/hooks';
import { FormEditorImgWrapperStyled } from '../../pages/Dashboard/DashboardStyled';
import { FormEditorFieldStyled } from '../Shared';
import { ReplaceImgComponent } from './ReplaceImg';
import { TextEditorComponent } from './TextEditor';
import FormButtons from './FormControll';
import {
  IEditFormGeneralProps,
  IFooterEditFormProps,
  IInfoEditFormProps,
  IPastorsEditFormProps,
  ISliderFormProps,
  ISocailEditFormProps,
  IStandartEditFormProps,
  ITimeEventEditFormProps,
} from './types';

export const EditForm = ({
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  inputsFormData,
  inputs,
  hideBtns,
  btnsStatus,
}: IEditFormGeneralProps) => {
  const photosformData = useMemo(() => new FormData(), []);
  const dispatch = useAppDispatch();

  const onClickDelete = () => {
    if (deleteThunk) {
      dispatch(changeStatus({ id }));
      void dispatch(deleteThunk(id));
    }
  };

  const onClickUpdate = () => {
    if (inputsFormData) {
      dispatch(changeStatus({ id }));
      void dispatch(patchThunk({ sendData: inputsFormData, id }));
    }
  };

  const onClickUpdateImg = (inputName: string, file: File, photoId?: string) => {
    if (photosformData) {
      if (photoId) {
        photosformData.append('photoId', photoId);
      }
      photosformData.append(inputName, file);
      dispatch(changeStatus({ id }));
      void dispatch(patchThunk({ sendData: photosformData, id }));
    }
  };

  return (
    <>
      {showImg && (
        <FormEditorImgWrapperStyled>
          {showImg.map((item, i) => {
            return (
              <ReplaceImgComponent
                key={i}
                updateImg={onClickUpdateImg}
                inputName={item.inputName}
                imgName={item.imgName}
                initImgUrl={item.url}
                photoId={item.img}
                formStatus={itemStatus}
              />
            );
          })}
        </FormEditorImgWrapperStyled>
      )}

      {inputs?.map((input, i) => {
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
      {!hideBtns && (
        <>
          {deleteThunk ? (
            <FormButtons
              saveFn={onClickUpdate}
              formError={formError}
              formStatus={itemStatus}
              deleteFn={onClickDelete}
              btnsStatus={btnsStatus}
            />
          ) : (
            <FormButtons saveFn={onClickUpdate} formError={formError} formStatus={itemStatus} btnsStatus={btnsStatus} />
          )}
        </>
      )}
    </>
  );
};

export const WithStandartEditForm = ({
  textItem,
  titleItem,
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: IStandartEditFormProps) => {
  const inputsFormData = useMemo(() => new FormData(), []);
  const title = useFormInfo({
    formData: inputsFormData,
    label: 'Заголовок',
    formDataKey: 'title',
    initParams: titleItem,
  });

  const text = useFormInfo({
    formData: inputsFormData,
    label: 'Текст',
    formDataKey: 'text',
    initParams: textItem,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      deleteThunk={deleteThunk}
      formError={formError}
      inputs={[title, text]}
      inputsFormData={inputsFormData}
      itemStatus={itemStatus}
      id={id}
      showImg={showImg}
      btnsStatus={btnsStatus}
    />
  );
};

export const WithSocialEditForm = ({
  titleItem,
  urlItem,
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: ISocailEditFormProps) => {
  const inputsFormData = useMemo(() => new FormData(), []);
  const title = useFormInfo({
    formData: inputsFormData,
    label: 'Заголовок',
    formDataKey: 'title',
    initParams: titleItem,
  });

  const url = useFormInfo({
    formData: inputsFormData,
    label: 'Url',
    formDataKey: 'url',
    initParams: urlItem,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      deleteThunk={deleteThunk}
      formError={formError}
      inputs={[title, url]}
      inputsFormData={inputsFormData}
      itemStatus={itemStatus}
      id={id}
      showImg={showImg}
      btnsStatus={btnsStatus}
    />
  );
};

export const WithFooterEditForm = ({
  textItem,
  titleItem,
  bottomTextItem,
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: IFooterEditFormProps) => {
  const inputsFormData = useMemo(() => new FormData(), []);

  const text = useFormInfo({
    formData: inputsFormData,
    label: 'Текст',
    formDataKey: 'text',
    initParams: textItem,
  });

  const title = useFormInfo({
    formData: inputsFormData,
    label: 'Заголовок',
    formDataKey: 'title',
    initParams: titleItem,
  });

  const bottomText = useFormInfo({
    formData: inputsFormData,
    label: 'Текст Внизу',
    formDataKey: 'bottomText',
    initParams: bottomTextItem,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      deleteThunk={deleteThunk}
      formError={formError}
      inputs={[title, bottomText, text]}
      inputsFormData={inputsFormData}
      itemStatus={itemStatus}
      id={id}
      showImg={showImg}
      btnsStatus={btnsStatus}
    />
  );
};

export const WithInfoEditForm = ({
  textItem,
  titleItem,
  textBtnItem,
  subTitleItem,
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: IInfoEditFormProps) => {
  const inputsFormData = useMemo(() => new FormData(), []);

  const title = useFormInfo({
    formData: inputsFormData,
    label: 'Заголовок',
    formDataKey: 'title',
    initParams: titleItem,
  });

  const subTitle = useFormInfo({
    formData: inputsFormData,
    label: 'Подзаголовок',
    formDataKey: 'subtitle',
    initParams: subTitleItem,
  });

  const text = useFormInfo({
    formData: inputsFormData,
    label: 'Текст',
    formDataKey: 'text',
    initParams: textItem,
  });

  const btnText = useFormInfo({
    formData: inputsFormData,
    label: 'Текст Кнопки',
    formDataKey: 'textBtn',
    initParams: textBtnItem,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      deleteThunk={deleteThunk}
      formError={formError}
      inputs={[title, subTitle, btnText, text]}
      inputsFormData={inputsFormData}
      itemStatus={itemStatus}
      id={id}
      showImg={showImg}
      btnsStatus={btnsStatus}
    />
  );
};

export const WithSliderEditForm = ({
  textItem,
  titleItem,
  subTitleItem,
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: ISliderFormProps) => {
  const inputsFormData = useMemo(() => new FormData(), []);

  const title = useFormInfo({
    formData: inputsFormData,
    label: 'Заголовок',
    formDataKey: 'title',
    initParams: titleItem,
  });

  const subTitle = useFormInfo({
    formData: inputsFormData,
    label: 'Подзаголовок',
    formDataKey: 'subtitle',
    initParams: subTitleItem,
  });

  const text = useFormInfo({
    formData: inputsFormData,
    label: 'Текст',
    formDataKey: 'text',
    initParams: textItem,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      deleteThunk={deleteThunk}
      formError={formError}
      inputs={[title, subTitle, text]}
      inputsFormData={inputsFormData}
      itemStatus={itemStatus}
      id={id}
      showImg={showImg}
      btnsStatus={btnsStatus}
    />
  );
};

export const WithPastorsEditForm = ({
  nameFiled,
  surname,
  job,
  id,
  itemStatus,
  showImg,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: IPastorsEditFormProps) => {
  const inputsFormData = useMemo(() => new FormData(), []);
  const nameInput = useFormInfo({
    formData: inputsFormData,
    label: 'Имя',
    formDataKey: 'name',
    initParams: nameFiled,
  });

  const surnameInput = useFormInfo({
    formData: inputsFormData,
    label: 'Фамилию',
    formDataKey: 'surname',
    initParams: surname,
  });

  const jobInput = useFormInfo({
    formData: inputsFormData,
    label: 'Должность',
    formDataKey: 'job',
    initParams: job,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      deleteThunk={deleteThunk}
      formError={formError}
      inputs={[nameInput, surnameInput, jobInput]}
      inputsFormData={inputsFormData}
      itemStatus={itemStatus}
      id={id}
      showImg={showImg}
      btnsStatus={btnsStatus}
    />
  );
};

export const WithTimeEditForm = ({
  timeItem,
  eventItem,
  id,
  itemStatus,
  patchThunk,
  deleteThunk,
  formError,
  changeStatus,
  btnsStatus,
}: ITimeEventEditFormProps) => {
  const time = useFormInfo({
    label: 'Заголовок',
    formDataKey: 'time',
    initParams: timeItem,
  });

  const event = useFormInfo({
    label: 'Текст',
    formDataKey: 'event',
    initParams: eventItem,
  });

  return (
    <EditForm
      changeStatus={changeStatus}
      patchThunk={patchThunk}
      formError={formError}
      inputs={[time, event]}
      deleteThunk={deleteThunk}
      itemStatus={itemStatus}
      inputsFormData={{ time: time.str, event: event.str }}
      id={id}
      btnsStatus={btnsStatus}
    />
  );
};
