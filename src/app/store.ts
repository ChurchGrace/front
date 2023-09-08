import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import posts from './slices/postsSlice';
import ministry from './slices/ministrySlice';
import slider from './slices/sliderSlice';
import events from './slices/eventsSlice';
import contactPage from './slices/contactPageSlice';
import sections from './slices/sectionsSlice';
import contactBlocks from './slices/contactBlocksSlice';
import pastors from './slices/pastorsSlice';
import history from './slices/historySlice';
import navigation from './slices/navigationSlice';
import sermons from './slices/sermonsSlice';
import gallery from './slices/gallerySlice';
import social from './slices/socialSlice';
import footer from './slices/footerSlice';

export const store = configureStore({
  reducer: {
    posts,
    ministry,
    slider,
    events,
    sections,
    contactPage,
    contactBlocks,
    pastors,
    history,
    navigation,
    sermons,
    gallery,
    social,
    footer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
