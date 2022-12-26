import { configureStore } from '@reduxjs/toolkit';

import playerReducer from '../pages/GamePage/store/playerSlice';
import loginReducer from '../pages/LoginPage/store/loginSlice';
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
    key: 'player',
    storage,
};

const playerPeristReducer = persistReducer(persistConfig, playerReducer);

const store = configureStore({
    reducer: {
        player: playerPeristReducer,
        login: loginReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
