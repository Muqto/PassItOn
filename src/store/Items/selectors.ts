import { RootState } from "../store";

export const itemCoordsSelector = (state: RootState) => state.items.itemsIds
export const itemsSelector = (state: RootState) => state.items.items
export const itemStartIndexSelector = (state: RootState) => state.items.startIndex