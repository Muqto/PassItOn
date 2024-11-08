import { createSlice } from "@reduxjs/toolkit"
import { Item } from "../user/slice"
import { addItemCoordsReducer, deleteItemReducer, updateItemStatusReducer } from "./reducers"
import { LatLng } from "react-native-maps"
import { updateItemStatus } from "../../api/userApi"

export interface ItemCoord {
    _id: string,
    location: LatLng,
    distance: number,
    isRequest: boolean,
    isSelected?: boolean,
    itemStatus: number,
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

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItemsState,
    reducers: {
      addItemsCoordsAction: addItemCoordsReducer,
      deleteItemAction: deleteItemReducer,
      updateItemStatusAction: updateItemStatusReducer
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addItemsCoordsAction, deleteItemAction, updateItemStatusAction } = itemsSlice.actions
  
  export default itemsSlice.reducer