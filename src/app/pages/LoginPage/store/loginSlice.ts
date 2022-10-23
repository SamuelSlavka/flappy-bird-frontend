import { RootState } from '@app/store';
import { client } from '../../../api/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginParams, LoginState } from './loginModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState ={
    loading: false,
    access_token: '',
    refresh_token: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.access_token = '';
            state.refresh_token = '';
            state.loading = false;
            toast.success("Logout successfull", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.access_token = action.payload.access_token ?? '';
            state.refresh_token = action.payload.refresh_token ?? '';
            state.loading = false;
            toast.success("Login successfull", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
        })
        builder.addCase(login.rejected, (state) => {
            state.access_token = '';
            state.loading = false;
            toast.error("Login failed", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
        })
    }
});

export default loginSlice.reducer;

export const login = createAsyncThunk<
    LoginState,
    LoginParams
    >('login', async (creadentials) => {
        const response = await client.post('auth/login', creadentials);
        return response.data
    }
)

export const selectJwt = (state: RootState) =>
    state.login.access_token;

export const selectIsLoading = (state: RootState) =>
    state.login.loading;

