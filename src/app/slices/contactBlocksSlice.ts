import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { IContactBlock, isContactBlock } from '../../types/contactBlock';
import {
  createContactBlock,
  deleteContactBlock,
  getContactBlocks,
  patchContactBlock,
} from '../thunks/contactBlockThunk';
import { isDocuments } from '../../types/thunkFactory';

const contactBlocksAdapter = createEntityAdapter<IContactBlock>({
  selectId: (data) => data._id,
});

export const contactBlocksSlice = createSlice({
  name: 'contactBlocks',
  initialState: contactBlocksAdapter.getInitialState({
    contactBlocksStatus: StatusEnum.LOADING,
    createContactBlockStatus: StatusEnum.LOADED,
    contactBlockError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updateContactBlockStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      contactBlocksAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
    setContactBlockPhotoError: (state) => {
      state.createContactBlockStatus = StatusEnum.ERROR;
      state.contactBlockError = 'Загрузите все фото';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactBlocks.pending, (state) => {
      state.contactBlocksStatus = StatusEnum.LOADING;
    });
    builder.addCase(getContactBlocks.fulfilled, (state, { payload }) => {
      if (isDocuments<IContactBlock[]>(payload)) {
        contactBlocksAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.contactBlocksStatus = StatusEnum.LOADED;
    });
    builder.addCase(getContactBlocks.rejected, (state) => {
      state.contactBlocksStatus = StatusEnum.ERROR;
    });
    builder.addCase(createContactBlock.pending, (state) => {
      state.createContactBlockStatus = StatusEnum.LOADING;
    });
    builder.addCase(createContactBlock.fulfilled, (state, { payload }) => {
      state.createContactBlockStatus = StatusEnum.LOADED;
      if (isContactBlock(payload)) {
        contactBlocksAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createContactBlock.rejected, (state, action) => {
      state.createContactBlockStatus = StatusEnum.ERROR;
      if (typeof action.payload === 'string') {
        state.contactBlockError = action.payload;
      }
    });
    builder.addCase(patchContactBlock.fulfilled, (state, { payload }) => {
      if (isContactBlock(payload)) {
        contactBlocksAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchContactBlock.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      contactBlocksAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.contactBlockError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deleteContactBlock.fulfilled, (state, { payload }) => {
      if (isContactBlock(payload)) {
        contactBlocksAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deleteContactBlock.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      contactBlocksAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.contactBlockError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updateContactBlockStatus, setContactBlockPhotoError } = contactBlocksSlice.actions;
export default contactBlocksSlice.reducer;

export const { selectAll: selectContactBlocks } = contactBlocksAdapter.getSelectors(
  (state: RootState) => state.contactBlocks,
);

export const selectContactBlocksStatus = (state: RootState) => state.contactBlocks.contactBlocksStatus;
export const selectCreateContactBlockStatus = (state: RootState) => state.contactBlocks.createContactBlockStatus;
export const selectContactBlockError = (state: RootState) => state.contactBlocks.contactBlockError;
export const selectContactBlocksPages = (state: RootState) => state.contactBlocks.totalPages;
export const selectContactBlocksBtnsStatus = (state: RootState) => state.contactBlocks.btnsStatus;
