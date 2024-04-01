import { createSlice } from "@reduxjs/toolkit"
import { Item } from "../user/slice"
import { addItemCoordsReducer } from "./reducers"
import { LatLng } from "react-native-maps"

export interface ItemCoord {
    _id: string,
    location: LatLng,
    distance: number,
    isRequest: boolean,
    isSelected?: boolean

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
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addItemsCoordsAction } = itemsSlice.actions
  
  export default itemsSlice.reducer