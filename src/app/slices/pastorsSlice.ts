import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { IPastor, isPastor } from '../../types/pastors';
import { createPastor, deletePastor, getPastors, patchPastor } from '../thunks/pastorsThunk';
import { isDocuments } from '../../types/thunkFactory';

const pastorsAdapter = createEntityAdapter<IPastor>({
  selectId: (data) => data._id,
});

export const pastorsSlice = createSlice({
  name: 'pastors',
  initialState: pastorsAdapter.getInitialState({
    pastorsStatus: StatusEnum.LOADING,
    createPastorStatus: StatusEnum.LOADED,
    pastorsError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updatePastorStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      pastorsAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
    setPastorsPhotosError: (state) => {
      state.createPastorStatus = StatusEnum.ERROR;
      state.pastorsError = 'Загрузите все фото';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPastors.pending, (state) => {
      state.pastorsStatus = StatusEnum.LOADING;
    });
    builder.addCase(getPastors.fulfilled, (state, { payload }) => {
      if (isDocuments<IPastor[]>(payload)) {
        pastorsAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.pastorsStatus = StatusEnum.LOADED;
    });
    builder.addCase(getPastors.rejected, (state) => {
      state.pastorsStatus = StatusEnum.ERROR;
    });
    builder.addCase(createPastor.pending, (state) => {
      state.createPastorStatus = StatusEnum.LOADING;
    });
    builder.addCase(createPastor.fulfilled, (state, { payload }) => {
      state.createPastorStatus = StatusEnum.LOADED;
      if (isPastor(payload)) {
        pastorsAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createPastor.rejected, (state, action) => {
      state.createPastorStatus = StatusEnum.ERROR;
      if (typeof action.payload === 'string') {
        state.pastorsError = action.payload;
      }
    });
    builder.addCase(patchPastor.fulfilled, (state, { payload }) => {
      if (isPastor(payload)) {
        pastorsAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchPastor.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      pastorsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.pastorsError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deletePastor.fulfilled, (state, { payload }) => {
      if (isPastor(payload)) {
        pastorsAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deletePastor.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      pastorsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.pastorsError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updatePastorStatus, setPastorsPhotosError } = pastorsSlice.actions;
export default pastorsSlice.reducer;

export const { selectAll: selectPastors } = pastorsAdapter.getSelectors((state: RootState) => state.pastors);

export const selectPastorsStatus = (state: RootState) => state.pastors.pastorsStatus;
export const selectCreatePastorStatus = (state: RootState) => state.pastors.createPastorStatus;
export const selectPastorsError = (state: RootState) => state.pastors.pastorsError;
export const selectPastorsPages = (state: RootState) => state.pastors.totalPages;
export const selectPastorsBtnsStatus = (state: RootState) => state.pastors.btnsStatus;
