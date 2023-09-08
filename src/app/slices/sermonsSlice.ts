import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../../types/shared';
import { RootState } from '../store';
import { getSermons } from '../thunks/sermonsThunk';
import { IVideos } from '../../types/youTube';

const sermonsAdapter = createEntityAdapter<IVideos>({
  selectId: (data) => data.id,
});

export const sermonsSlice = createSlice({
  name: 'sermons',
  initialState: sermonsAdapter.getInitialState({
    sermonsStatus: StatusEnum.LOADING,
    sermonsError: '',
    totalResults: 0,
    nextPage: '',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSermons.pending, (state) => {
      state.sermonsStatus = StatusEnum.LOADING;
    });
    builder.addCase(getSermons.fulfilled, (state, { payload }) => {
      if (payload) {
        sermonsAdapter.addMany(state, payload.items);
        state.nextPage = payload.nextPageToken;
        state.totalResults = payload.pageInfo.totalResults;
      }
      state.sermonsStatus = StatusEnum.LOADED;
    });
    builder.addCase(getSermons.rejected, (state) => {
      state.sermonsStatus = StatusEnum.ERROR;
    });
  },
});

export default sermonsSlice.reducer;

export const { selectAll: selectSermons } = sermonsAdapter.getSelectors((state: RootState) => state.sermons);

export const selectSermonsStatus = (state: RootState) => state.sermons.sermonsStatus;
export const selectSermonsNextPageToken = (state: RootState) => state.sermons.nextPage;
export const selectSermonsResults = (state: RootState) => state.sermons.totalResults;
