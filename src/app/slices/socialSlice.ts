import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { isDocuments } from '../../types/thunkFactory';
import { createSocial, deleteSocial, getSocial, patchSocial } from '../thunks/socialThunk';
import { ISocial, isSocial } from '../../types/social';

const socialAdapter = createEntityAdapter<ISocial>({
  selectId: (data) => data._id,
});

export const socialSlice = createSlice({
  name: 'social',
  initialState: socialAdapter.getInitialState({
    socialStatus: StatusEnum.LOADING,
    createSocialStatus: StatusEnum.LOADED,
    socialError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updateSocialStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      socialAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
    setSocialPhotosError: (state) => {
      state.createSocialStatus = StatusEnum.ERROR;
      state.socialError = 'Загрузите все фото';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSocial.pending, (state) => {
      state.socialStatus = StatusEnum.LOADING;
    });
    builder.addCase(getSocial.fulfilled, (state, { payload }) => {
      if (isDocuments<ISocial[]>(payload)) {
        socialAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.socialStatus = StatusEnum.LOADED;
    });
    builder.addCase(getSocial.rejected, (state) => {
      state.socialStatus = StatusEnum.ERROR;
    });
    builder.addCase(createSocial.pending, (state) => {
      state.createSocialStatus = StatusEnum.LOADING;
    });
    builder.addCase(createSocial.fulfilled, (state, { payload }) => {
      state.createSocialStatus = StatusEnum.LOADED;
      if (isSocial(payload)) {
        socialAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createSocial.rejected, (state, action) => {
      state.createSocialStatus = StatusEnum.ERROR;
      if (typeof action.payload === 'string') {
        state.socialError = action.payload;
      }
    });
    builder.addCase(patchSocial.fulfilled, (state, { payload }) => {
      if (isSocial(payload)) {
        socialAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchSocial.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      socialAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.socialError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deleteSocial.fulfilled, (state, { payload }) => {
      if (isSocial(payload)) {
        socialAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deleteSocial.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      socialAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.socialError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updateSocialStatus, setSocialPhotosError } = socialSlice.actions;
export default socialSlice.reducer;

export const { selectAll: selectSocial } = socialAdapter.getSelectors((state: RootState) => state.social);

export const selectSocialStatus = (state: RootState) => state.social.socialStatus;
export const selectCreateSocialStatus = (state: RootState) => state.social.createSocialStatus;
export const selectSocialError = (state: RootState) => state.social.socialError;
export const selectSocialPages = (state: RootState) => state.social.totalPages;
export const selectSocialBtnsStatus = (state: RootState) => state.social.btnsStatus;
