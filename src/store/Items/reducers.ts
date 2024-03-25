import { PayloadAction } from "@reduxjs/toolkit"
import { ItemCoord, ItemsState } from "./slice"
import { Item } from "../user/slice"

export const addItemCoordsReducer = (state: ItemsState, action: PayloadAction<ItemCoord[]>) => {
    state.itemsIds = [...state.itemsIds, ...action.payload]
}

export const setStartIndexReducer = (state: ItemsState, action: PayloadAction<number>) => {
    state.startIndex = action.payload
}

export const addItems = (state: ItemsState, action: PayloadAction<Item[]>) => {
    state.items = [...state.items, ...action.payload]
}