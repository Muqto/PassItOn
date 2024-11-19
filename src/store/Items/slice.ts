import { createAction, createSlice } from "@reduxjs/toolkit"
import { Item } from "../user/slice"
import { addItemCoordsReducer, deleteItemReducer, updateItemStatusReducer, updateTransactionStatusReducer } from "./reducers"
import { LatLng } from "react-native-maps"


export interface ItemCoord {
    _id: string,
    location: LatLng,
    distance: number,
    isRequest: boolean,
    isSelected?: boolean,
    transactionStatus: number,
    userId: string

}
export interface ItemsState {
    itemsIds: ItemCoord[],
    items: Item[],
    startIndex: number

}

const initialItemsState: ItemsState = {
    itemsIds: [],
    items: [],
    startIndex: 0
}

export const clearItemsCoordsAction = createAction('items/clearItemsCoords');

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItemsState,
    reducers: {
      addItemsCoordsAction: addItemCoordsReducer,
      deleteItemAction: deleteItemReducer,
      updateItemStatusAction: updateItemStatusReducer,
      updateTransactionStatusAction: updateTransactionStatusReducer
    },
    extraReducers: (builder) => {
        builder.addCase(clearItemsCoordsAction, (state) => {
            state.itemsIds = [];
        });
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addItemsCoordsAction, deleteItemAction, updateItemStatusAction, updateTransactionStatusAction } = itemsSlice.actions
  
  export default itemsSlice.reducer