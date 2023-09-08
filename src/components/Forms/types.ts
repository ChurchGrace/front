import { ActionCreator, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { StatusEnum } from '../../types/shared';
import { CreateThunk, DeleteThunk, PatchThunk, TSendData } from '../../types/thunkFactory';

export interface ITextEditorProps {
  text: string;
  setText: (text: string) => void;
}

export interface IUploadImgProps {
  formData: FormData;
  imgName: string;
  isCancel?: boolean;
  itemStatus: StatusEnum;
  inputName: string;
}

export interface IReplaceImgProps {
  formStatus?: StatusEnum;
  updateImg: (inputName: string, file: File, photoId: string) => void;
  photoId?: string;
  inputName: string;
  imgName: string;
  initImgUrl?: string;
}

export interface IFormControllProps {
  formError: string;
  formStatus: StatusEnum | undefined;
  saveFn?: () => void;
  deleteFn?: () => void;
  btnsStatus?: boolean;
}

export interface IEditForm {
  id: string;
  itemStatus: StatusEnum | undefined;
  patchThunk: PatchThunk;
  changeStatus: ActionCreatorWithPayload<{
    id: string;
  }>;
  showImg?: {
    imgName: string;
    inputName: 'imgMain' | 'imgCover' | 'imgs';
    url: string | undefined;
    img: string | undefined;
  }[];
  formError: string;
}

export interface IStandartEditFormProps extends IEditForm {
  textItem?: string;
  titleItem?: string;
  btnsStatus?: boolean;
  deleteThunk?: DeleteThunk;
}

export interface ISocailEditFormProps extends IEditForm {
  titleItem: string;
  urlItem: string;
  btnsStatus?: boolean;
  deleteThunk?: DeleteThunk;
}

export interface IFooterEditFormProps extends IEditForm {
  titleItem: string;
  textItem: string;
  bottomTextItem: string;
  btnsStatus?: boolean;
  deleteThunk?: DeleteThunk;
}

export interface IInfoEditFormProps extends IEditForm {
  textItem: string;
  titleItem: string;
  textBtnItem: string;
  subTitleItem: string;
  btnsStatus?: boolean;
  deleteThunk?: DeleteThunk;
}

export interface ISliderFormProps extends IEditForm {
  textItem: string;
  titleItem: string;
  subTitleItem: string;
  btnsStatus?: boolean;
  deleteThunk?: DeleteThunk;
}

export interface IPastorsEditFormProps extends IEditForm {
  nameFiled: string;
  btnsStatus: boolean;
  surname: string;
  job: string;
  deleteThunk?: DeleteThunk;
}

export interface ITimeEventEditFormProps extends IEditForm {
  deleteThunk: DeleteThunk;
  timeItem: string;
  eventItem: string;
  btnsStatus: boolean;
}

export interface IEditFormGeneralProps extends IEditForm {
  hideBtns?: boolean;
  btnsStatus?: boolean;
  inputsFormData?: TSendData;
  deleteThunk?: DeleteThunk;
  inputs?: { str: string; setVal: (val: string) => void; formDataKey: string | undefined; label: string }[];
}

export interface ICreateForm {
  formStatus: StatusEnum;
  formError: string;
  showImg?: { imgName: string; inputName: 'imgMain' | 'imgCover' | 'imgs'; optional?: boolean }[];
}

export interface ICreateFormGeneralProps extends ICreateForm {
  inputs: { str: string; setVal: (val: string) => void; formDataKey: string | undefined; label: string }[];
  saveFn?: () => void;
  formData?: FormData;
}

export interface ICreateFormProps extends Required<ICreateForm> {
  photoErrorAction?: ActionCreator<{ type: string }>;
  createThunk: CreateThunk;
  isSocial?: boolean;
}

export interface ITimeEventsFormProps extends ICreateForm {
  photoErrorAction?: ActionCreator<{ type: string }>;
  createThunk: CreateThunk;
}
