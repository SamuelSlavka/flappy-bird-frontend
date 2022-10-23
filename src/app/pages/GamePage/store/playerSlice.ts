import { RootState } from '@app/store';
import { client } from '../../../api/client';
import {
    createEntityAdapter, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PlayerModel, PlayerState, UpdatePlayerModel, ValidationErrors } from './playerModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const playerAdapter = createEntityAdapter<PlayerModel>({
    selectId: (player) => player.id,
    sortComparer: (a, b) => a.player_name.localeCompare(b.player_name),
})

const initialState: PlayerState = playerAdapter.getInitialState({
    loading: false,
});

export const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPlayers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
            state = playerAdapter.upsertMany(state, action.payload);
            state.loading = false;
        })

        builder.addCase(upsertPlayer.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(upsertPlayer.fulfilled, (state, action) => {
            state = playerAdapter.upsertOne(state, action.payload);
            state.loading = false;
        })

        builder.addCase(removePlayer.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removePlayer.fulfilled, (state, action) => {
            state = playerAdapter.removeOne(state, action.payload.id);
            state.loading = false;
        })
    }
});

export const {
    selectById: selectPlayerById,
  } = playerAdapter.getSelectors((state: RootState) => state.player)

export default playerSlice.reducer;

export const fetchAllPlayers = createAsyncThunk<PlayerModel[]>(
    'players/fetch',
    async () => {
        const response = await client.get('players');
        return response.data
    }
)

export const upsertPlayer = createAsyncThunk<
    PlayerModel,
    { id: string } & Partial<PlayerModel>
    >(
    'players/add',
    async (playerData) => {
        const response = await client.post('players', playerData);
        return response.data
    }
)

export const removePlayer = createAsyncThunk<
    PlayerModel,
    { id: string }
    >(
    'players/remove',
    async (thunkAPI) => {
        const response = await client.delete('players', {thunkAPI});
        return response.data
    }
)

export const selectPlayerEntities = (state: RootState) =>
    state.player.entities;


export const selectPlayers = createSelector(
    selectPlayerEntities,
    (entities) => {
        const keys = Object.keys(entities);
        return keys.map((key) => {
            return { id: key, ...entities[key] };
        });
    }
);
