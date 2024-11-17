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

export const deleteItemReducer = (state: ItemsState, action: PayloadAction<string>) => {
    state.items = state.items.filter(item => item._id !== action.payload)
    state.itemsIds = state.itemsIds.filter(item => item._id !== action.payload)
}

export const updateItemStatusReducer = (state: ItemsState, action: PayloadAction<{ itemId: string, itemStatus: number }>) => {
    state.items = state.items.map(item => {
        if (item._id === action.payload.itemId) {
            item.itemStatus = action.payload.itemStatus
        }
        return item
    })
}

export const updateTransactionStatusReducer = (state: ItemsState, action: PayloadAction<{ itemId: string, transactionStatus: number }>) => {
    state.items = state.items.map(item => {
        if (item._id === action.payload.itemId) {
            item.reservationInfo.transactionStatus = action.payload.transactionStatus
        }
        return item
    })
}