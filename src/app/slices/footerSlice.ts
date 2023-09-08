import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { isDocument } from '../../types/thunkFactory';
import { getFooter, patchFooter } from '../thunks/footerThunk';
import { IFooter, isFooter } from '../../types/footer';

const footerAdapter = createEntityAdapter<IFooter>({
  selectId: (data) => data._id,
});

export const footerSlice = createSlice({
  name: 'footer',
  initialState: footerAdapter.getInitialState({
    footerStatus: StatusEnum.LOADING,
    footerError: '',
  }),
  reducers: {
    updateFooterStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      footerAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFooter.pending, (state) => {
      state.footerStatus = StatusEnum.LOADING;
    });
    builder.addCase(getFooter.fulfilled, (state, { payload }) => {
      if (isDocument<IFooter>(payload)) {
        footerAdapter.setOne(state, payload.data.document);
      }
      state.footerStatus = StatusEnum.LOADED;
    });
    builder.addCase(getFooter.rejected, (state) => {
      state.footerStatus = StatusEnum.ERROR;
    });
    builder.addCase(patchFooter.fulfilled, (state, { payload }) => {
      if (isFooter(payload)) {
        footerAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
    });
    builder.addCase(patchFooter.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      footerAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.footerError = message;
    });
  },
});

export const { updateFooterStatus } = footerSlice.actions;
export default footerSlice.reducer;

export const { selectAll: selectFooter } = footerAdapter.getSelectors((state: RootState) => state.footer);
export const selectFooterStatus = (state: RootState) => state.footer.footerStatus;
export const selectFooterError = (state: RootState) => state.footer.footerError;
