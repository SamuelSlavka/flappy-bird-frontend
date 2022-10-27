import { EntityState } from "@reduxjs/toolkit";

export interface PlayerState extends EntityState<PlayerModel> {
    page: number,
    total: number,
    loading: boolean;
    bestPlay: Partial<PlayerModel>
    closestPlayer?: PlayerModel;
}

export interface PlayerModel {
    id: string,
    name: string,
    record: string,
    deletedAt?: string | null,
    rank?: string
}

export interface UpdatePlayerModel {
    player: PlayerModel,
    success: boolean,
}

export interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}

export interface ClosestQuery {
    record: number
}
