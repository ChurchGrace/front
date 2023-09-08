import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../../types/shared';
import { RootState } from '../store';
import { isDocuments } from '../../types/thunkFactory';
import { IHistory, isHistory } from '../../types/history';
import { createHistory, deleteHistory, getHistory, patchHistory } from '../thunks/historyThunk';

const historyAdapter = createEntityAdapter<IHistory>({
  selectId: (data) => data._id,
});

export const historySlice = createSlice({
  name: 'history',
  initialState: historyAdapter.getInitialState({
    createHistoryStatus: StatusEnum.LOADED,
    historyStatus: StatusEnum.LOADING,
    historyError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updateHistoryStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      historyAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
    setHistoryPhotosError: (state) => {
      state.createHistoryStatus = StatusEnum.ERROR;
      state.historyError = 'Загрузите все фото';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      state.historyStatus = StatusEnum.LOADING;
    });
    builder.addCase(getHistory.fulfilled, (state, { payload }) => {
      if (isDocuments<IHistory[]>(payload)) {
        historyAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.historyStatus = StatusEnum.LOADED;
    });
    builder.addCase(getHistory.rejected, (state) => {
      state.historyStatus = StatusEnum.ERROR;
    });
    builder.addCase(createHistory.pending, (state) => {
      state.createHistoryStatus = StatusEnum.LOADING;
    });
    builder.addCase(createHistory.fulfilled, (state, { payload }) => {
      state.createHistoryStatus = StatusEnum.LOADED;
      if (isHistory(payload)) {
        historyAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createHistory.rejected, (state, { payload }) => {
      state.createHistoryStatus = StatusEnum.ERROR;
      if (typeof payload === 'string') {
        state.historyError = payload;
      }
    });
    builder.addCase(patchHistory.fulfilled, (state, { payload }) => {
      if (isHistory(payload)) {
        historyAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchHistory.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      historyAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.historyError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deleteHistory.fulfilled, (state, { payload }) => {
      if (isHistory(payload)) {
        historyAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deleteHistory.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      historyAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.historyError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updateHistoryStatus, setHistoryPhotosError } = historySlice.actions;
export default historySlice.reducer;

export const { selectAll: selectHistory } = historyAdapter.getSelectors((state: RootState) => state.history);

export const selectHistoryStatus = (state: RootState) => state.history.historyStatus;
export const selectCreateHistoryStatus = (state: RootState) => state.history.createHistoryStatus;
export const selectHistoryError = (state: RootState) => state.history.historyError;
export const selectHistoryPages = (state: RootState) => state.history.totalPages;
export const selectHistoryBtnsStatus = (state: RootState) => state.history.btnsStatus;
