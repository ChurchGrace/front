import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IMinistry, isMinistry } from '../../types/ministry';
import { createMinistry, deleteMinistry, getMinistries, patchMinistry } from '../thunks/ministryThunk';
import { StatusEnum } from '../../types/shared';
import { RootState } from '../store';
import { isDocuments } from '../../types/thunkFactory';

const ministryAdapter = createEntityAdapter<IMinistry>({
  selectId: (data) => data._id,
});

export const ministrySlice = createSlice({
  name: 'ministry',
  initialState: ministryAdapter.getInitialState({
    createMinistryStatus: StatusEnum.LOADED,
    ministriesStatus: StatusEnum.LOADING,
    ministryError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updateMinistrySatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      ministryAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
    setMinistryPhotosError: (state) => {
      state.createMinistryStatus = StatusEnum.ERROR;
      state.ministryError = 'Загрузите все фото';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMinistries.pending, (state) => {
      state.ministriesStatus = StatusEnum.LOADING;
    });
    builder.addCase(getMinistries.fulfilled, (state, { payload }) => {
      if (isDocuments<IMinistry[]>(payload)) {
        ministryAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.ministriesStatus = StatusEnum.LOADED;
    });
    builder.addCase(getMinistries.rejected, (state) => {
      state.ministriesStatus = StatusEnum.ERROR;
    });
    builder.addCase(createMinistry.pending, (state) => {
      state.createMinistryStatus = StatusEnum.LOADING;
    });
    builder.addCase(createMinistry.fulfilled, (state, { payload }) => {
      state.createMinistryStatus = StatusEnum.LOADED;
      if (isMinistry(payload)) {
        ministryAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createMinistry.rejected, (state, { payload }) => {
      state.createMinistryStatus = StatusEnum.ERROR;
      if (typeof payload === 'string') {
        state.ministryError = payload;
      }
    });
    builder.addCase(patchMinistry.fulfilled, (state, { payload }) => {
      if (isMinistry(payload)) {
        ministryAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchMinistry.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      ministryAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.ministryError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deleteMinistry.fulfilled, (state, { payload }) => {
      if (isMinistry(payload)) {
        ministryAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deleteMinistry.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      ministryAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.ministryError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updateMinistrySatus, setMinistryPhotosError } = ministrySlice.actions;
export default ministrySlice.reducer;

export const { selectAll: selectMinistries, selectById: selectMinistryById } = ministryAdapter.getSelectors(
  (state: RootState) => state.ministry,
);

export const selectMinistriesStatus = (state: RootState) => state.ministry.ministriesStatus;
export const selectCreateMinistryStatus = (state: RootState) => state.ministry.createMinistryStatus;
export const selectMinistryError = (state: RootState) => state.ministry.ministryError;
export const selectMinistryPages = (state: RootState) => state.ministry.totalPages;
export const selectMinistryBtnsStatus = (state: RootState) => state.ministry.btnsStatus;
