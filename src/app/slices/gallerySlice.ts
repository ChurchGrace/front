import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { isDocuments } from '../../types/thunkFactory';
import { IGallery, isGallery } from '../../types/gallery';
import { deleteImg, getGallery, uploadImg } from '../thunks/galleryThunk';

const galleryAdapter = createEntityAdapter<IGallery>({
  selectId: (data) => data._id,
});

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: galleryAdapter.getInitialState({
    galleryStatus: StatusEnum.LOADING,
    uploadImgStatus: StatusEnum.LOADED,
    galleryError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updateImgStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      galleryAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
    setGalleryPhotosError: (state) => {
      state.uploadImgStatus = StatusEnum.ERROR;
      state.galleryError = 'Загрузите все фото';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGallery.pending, (state) => {
      state.galleryStatus = StatusEnum.LOADING;
    });
    builder.addCase(getGallery.fulfilled, (state, { payload }) => {
      if (isDocuments<IGallery[]>(payload)) {
        galleryAdapter.addMany(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.galleryStatus = StatusEnum.LOADED;
    });
    builder.addCase(getGallery.rejected, (state) => {
      state.galleryStatus = StatusEnum.ERROR;
    });
    builder.addCase(uploadImg.pending, (state) => {
      state.uploadImgStatus = StatusEnum.LOADING;
    });
    builder.addCase(uploadImg.fulfilled, (state, { payload }) => {
      state.uploadImgStatus = StatusEnum.LOADED;
      if (isGallery(payload)) {
        galleryAdapter.setOne(state, payload);
      }
    });
    builder.addCase(uploadImg.rejected, (state, { payload }) => {
      state.uploadImgStatus = StatusEnum.ERROR;
      if (typeof payload === 'string') {
        state.galleryError = payload;
      }
    });
    builder.addCase(deleteImg.fulfilled, (state, { payload }) => {
      if (isGallery(payload)) {
        galleryAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deleteImg.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      galleryAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.galleryError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updateImgStatus, setGalleryPhotosError } = gallerySlice.actions;
export default gallerySlice.reducer;

export const { selectAll: selectGallery } = galleryAdapter.getSelectors((state: RootState) => state.gallery);

export const selectGalleryStatus = (state: RootState) => state.gallery.galleryStatus;
export const selectUploadImgStatus = (state: RootState) => state.gallery.uploadImgStatus;
export const selectGalleryError = (state: RootState) => state.gallery.galleryError;
export const selectGalleryPages = (state: RootState) => state.gallery.totalPages;
export const selectGalleryBtnsStatus = (state: RootState) => state.gallery.btnsStatus;
