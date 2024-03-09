import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addUserReducer } from './reducers'

export interface LocationState {
    lattitude: Number,
    longitude: Number,
    geoHash: String
}

export interface Reservation {
    userId: String,
    isReserved: Boolean, 
    startTime: String,
    expirationTime: String,
    pickUpDate: String 
}

export interface Item {
    itemName: String,
    itemType: String,
    description: String,
    postedTime: String,
    expirationTime: String,
    itemStatus: Number,
    location: LocationState
    reservationInfo: Reservation
}

export interface UserState {
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  rating: Number,
  donations: Item[]
  reservations: Item[]
}

const initialUserState: UserState = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    rating: 0,
    donations: [],
    reservations: []
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUserAction: addUserReducer
  },
})

// Action creators are generated for each case reducer function
export const { addUserAction } = userSlice.actions

export default userSlice.reducer