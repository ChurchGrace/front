import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { ISlider, isSlider } from '../../types/slider';
import { getSlider, patchSlider } from '../thunks/sliderThunk';
import { isDocuments } from '../../types/thunkFactory';

const sliderAdapter = createEntityAdapter<ISlider>({
  selectId: (data) => data._id,
});

export const sliderSlice = createSlice({
  name: 'slider',
  initialState: sliderAdapter.getInitialState({
    sliderStatus: StatusEnum.LOADING,
    sliderError: '',
  }),
  reducers: {
    updateSlideStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      sliderAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSlider.pending, (state) => {
      state.sliderStatus = StatusEnum.LOADING;
    });
    builder.addCase(getSlider.fulfilled, (state, { payload }) => {
      if (isDocuments<ISlider[]>(payload)) {
        sliderAdapter.setAll(state, payload.data.documents);
      }
      state.sliderStatus = StatusEnum.LOADED;
    });
    builder.addCase(getSlider.rejected, (state) => {
      state.sliderStatus = StatusEnum.ERROR;
    });
    builder.addCase(patchSlider.fulfilled, (state, { payload }) => {
      if (isSlider(payload)) {
        sliderAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
    });
    builder.addCase(patchSlider.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      sliderAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.sliderError = message;
    });
  },
});

export const { updateSlideStatus } = sliderSlice.actions;
export default sliderSlice.reducer;

export const { selectAll: selectSlides } = sliderAdapter.getSelectors((state: RootState) => state.slider);

export const selectSliderStatus = (state: RootState) => state.slider.sliderStatus;
export const selectSliderError = (state: RootState) => state.slider.sliderError;
