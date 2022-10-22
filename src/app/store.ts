import { configureStore } from '@reduxjs/toolkit';
import lunchReducer from './pages/LunchPage/store/lunchSlice';
import restaurantReducer from './pages/LunchPage/store/restaurantSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'restaurant',
  storage
}

const restaurantPeristReducer = persistReducer(persistConfig, restaurantReducer);

const store = configureStore({
  reducer: {
    lunch: lunchReducer,
    restaurant: restaurantPeristReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
