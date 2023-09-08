import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { createEvent, deleteEvent, getEvents, patchEvent } from '../thunks/eventsThunk';
import { ITimeEvent, isTimeEvent } from '../../types/timeEvents';
import { isDocuments } from '../../types/thunkFactory';

const eventsAdapter = createEntityAdapter<ITimeEvent>({
  selectId: (data) => data._id,
});

export const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState({
    eventsStatus: StatusEnum.LOADING,
    createEventStatus: StatusEnum.LOADED,
    eventsError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updateEventStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      eventsAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state) => {
      state.eventsStatus = StatusEnum.LOADING;
    });
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      if (isDocuments<ITimeEvent[]>(payload)) {
        eventsAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.eventsStatus = StatusEnum.LOADED;
    });
    builder.addCase(getEvents.rejected, (state) => {
      state.eventsStatus = StatusEnum.ERROR;
    });
    builder.addCase(createEvent.pending, (state) => {
      state.createEventStatus = StatusEnum.LOADING;
    });
    builder.addCase(createEvent.fulfilled, (state, { payload }) => {
      state.createEventStatus = StatusEnum.LOADED;
      if (isTimeEvent(payload)) {
        eventsAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.createEventStatus = StatusEnum.ERROR;
      if (typeof action.payload === 'string') {
        state.eventsError = action.payload;
      }
    });
    builder.addCase(patchEvent.fulfilled, (state, { payload }) => {
      if (isTimeEvent(payload)) {
        eventsAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchEvent.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      eventsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.eventsError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deleteEvent.fulfilled, (state, { payload }) => {
      if (isTimeEvent(payload)) {
        eventsAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deleteEvent.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      eventsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.eventsError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updateEventStatus } = eventsSlice.actions;
export default eventsSlice.reducer;

export const { selectAll: selectEvents } = eventsAdapter.getSelectors((state: RootState) => state.events);

export const selectEventsStatus = (state: RootState) => state.events.eventsStatus;
export const selectCreateEventStatus = (state: RootState) => state.events.createEventStatus;
export const selectEventsError = (state: RootState) => state.events.eventsError;
export const selectEventPages = (state: RootState) => state.events.totalPages;
export const selectEventBtnsStatus = (state: RootState) => state.events.btnsStatus;
