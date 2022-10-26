import { RootState } from '@app/store/store';
import { client } from '../../../api/client';
import { PlayerModel, PlayerState } from './playerModel';
import { Paginate } from '../../../store/models';
import { createEntityAdapter, createAsyncThunk, createSlice, PayloadAction, EntityAdapter } from '@reduxjs/toolkit';
import { PaginationQuery } from '../../../api/models';
import { toast } from 'react-toastify';

const playerAdapter: EntityAdapter<PlayerModel> = createEntityAdapter<PlayerModel>({
    selectId: (player) => player.id,
    sortComparer: (a, b) => +b.record - +a.record,
})

const initialState: PlayerState = playerAdapter.getInitialState({
    page: 0,
    page_total: 0,
    total: 0,
    loading: false,
});

export const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        setPage: (state: PlayerState, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPlayers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
            state = playerAdapter.setAll(state, action.payload.results);
            state.total = action.payload.total;
            state.page_total = action.payload.page_total;
            state.loading = false;
        })

        builder.addCase(upsertPlayer.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(upsertPlayer.fulfilled, (state, action) => {
            state = playerAdapter.upsertOne(state, action.payload);
            toast.success("Edit successfull", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
            state.loading = false;
        })

        builder.addCase(deletePlayer.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deletePlayer.fulfilled, (state, action) => {
            state = playerAdapter.removeOne(state, action.payload.id);
            toast.success("Delete successfull", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
            state.loading = false;
        })
    }
});

export const { setPage } = playerSlice.actions;

export const {
    selectById: selectPlayerById,
  } = playerAdapter.getSelectors((state: RootState) => state.player)

export default playerSlice.reducer;

export const fetchAllPlayers = createAsyncThunk<
    Paginate<PlayerModel>,
    Partial<PaginationQuery>
    >(
    'players/fetch',
    async (query) => {
        var queries = query.page ? `page=${query.page}` : '';
        queries += query.limit ? `&limit=${query.limit}` : '';
        const response = await client.get(`players?${queries}`);
        return response.data
    }
)

export const upsertPlayer = createAsyncThunk<
    PlayerModel,
    { player: Partial<PlayerModel>, page?: number, limit?: number }
    >(
    'players/add',
    async ({player, page, limit}, {dispatch}) => {
        const response = await client.post('players', player);
        dispatch(fetchAllPlayers({page, limit}))
        return response.data
    }
)

export const deletePlayer = createAsyncThunk<
    PlayerModel,
    { id: string, page?: number, limit?: number }
    >(
    'players/remove',
    async ({id, page, limit}, {dispatch}) => {
        const response = await client.delete(`players/${id}`, {});
        dispatch(fetchAllPlayers({page, limit}))
        return response.data
    }
)

export const selectPage = (state: RootState) =>
    state.player.page;

export const selectTotalItems = (state: RootState) =>
    state.player.total;

const playerSelectors = playerAdapter.getSelectors();

export const selectAllPlayers = (state: RootState) => playerSelectors.selectAll(state.player)
