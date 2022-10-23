
export interface LoginState {
    loading: boolean;
    access_token: string | undefined,
    refresh_token: string | undefined,
}

export interface LoginParams {
    username: string;
    password: string,
}
