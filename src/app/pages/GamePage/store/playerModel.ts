import { EntityState } from "@reduxjs/toolkit";

export interface PlayerState extends EntityState<PlayerModel> {
    page: number,
    page_total: number,
    total: number,
    loading: boolean;
}

export interface PlayerModel {
    id: string,
    name: string,
    record: string,
}

export interface UpdatePlayerModel {
    player: PlayerModel,
    success: boolean,
}

export interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}