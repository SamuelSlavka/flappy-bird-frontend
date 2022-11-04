import { RootState } from '@app/store/store';
import { client } from '../../../api/client';
import { ClosestQuery, PlayerModel, PlayerState } from './playerModel';
import { Paginate } from '../../../store/models';
import { createEntityAdapter, createAsyncThunk, createSlice, PayloadAction, EntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { PaginationQuery } from '../../../api/models';
import { toast } from 'react-toastify';

const playerAdapter: EntityAdapter<PlayerModel> = createEntityAdapter<PlayerModel>({
    selectId: (player) => player.id,
    sortComparer: (a, b) => +b.record - +a.record,
})

const initialState: PlayerState = playerAdapter.getInitialState({
    page: 0,
    total: 0,
    loading: false,
    bestPlay: {name: '', record: '0'},
    closestPlayer: undefined
});

export const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        setPage: (state: PlayerState, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page;
        },
        setBestPlay: (state: PlayerState, action: PayloadAction<{ name?: string, record: number }>) => {
            state.bestPlay.name = action.payload.name ? action.payload.name : state.bestPlay.name;
            state.bestPlay.record = (action.payload.record > +(state.bestPlay.record ?? 0)) ? action.payload.record.toString() : state.bestPlay.record;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
            state = playerAdapter.setAll(state, action.payload.results);
            state.total = action.payload.total;
            state.loading = false;
        })

        builder.addCase(getClosestPlayer.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getClosestPlayer.fulfilled, (state, action) => {
            state.closestPlayer = action.payload;
            state.loading = false;
        })

        builder.addCase(upsertPlayer.fulfilled, (state, action) => {
            state = playerAdapter.upsertOne(state, action.payload);
            state.bestPlay.id = action.payload.id;
            toast.success("Edit successfull", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
            state.loading = false;
        })

        builder.addCase(deletePlayer.fulfilled, (state, action) => {
            state = playerAdapter.removeOne(state, action.payload.id);
            toast.success("Delete successfull", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
            state.loading = false;
        })
        
        builder.addMatcher(isAnyOf (upsertPlayer.rejected, deletePlayer.rejected), (state) => {
            toast.error("Action failed", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
            state.loading = false;
        })

        builder.addMatcher(isAnyOf (getClosestPlayer.rejected, fetchAllPlayers.rejected), (state) => {
            state.loading = false;
        })

        builder.addMatcher(isAnyOf (upsertPlayer.pending, fetchAllPlayers.pending, deletePlayer.pending), (state) => {
            state.loading = true;
        })
    }
});

export const { setPage, setBestPlay } = playerSlice.actions;

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

export const getClosestPlayer = createAsyncThunk<
    PlayerModel,
    ClosestQuery
    >(
    'players/closest',
    async (query) => {
        var queries = query.record ? `record=${query.record}` : '';
        const response = await client.get(`players/closest?${queries}`);
        return response.data
    }
)

export const upsertPlayer = createAsyncThunk<
    PlayerModel,
    { player: Partial<PlayerModel>, page?: number, limit?: number }
    >(
    'players/add',
    async ({player, page, limit}, {dispatch}) => {
        const {id, ...body} = player
        var response;
        if(player.id) {
            response = await client.post(`players/${player.id}`, body);
        } else {
            response = await client.post(`players`, body);
        }
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

export const selectBestPlay = (state: RootState) =>
    {return {
        name: state.player.bestPlay.name, 
        record: state.player.bestPlay.record,
        id: state.player.bestPlay.id
    }}

export const selectPage = (state: RootState) =>
    state.player.page;

export const selectClosestPlayer = (state: RootState) =>
    state.player.closestPlayer;

export const selectTotalItems = (state: RootState) =>
    state.player.total;

const playerSelectors = playerAdapter.getSelectors();

export const selectAllPlayers = (state: RootState) => playerSelectors.selectAll(state.player)
