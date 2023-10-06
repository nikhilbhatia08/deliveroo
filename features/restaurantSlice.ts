import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state

type Restaurant = {
    id: string,
        imgUrl: string,
        title: string,
        rating: number,
        genre: string,
        address: string,
        short_description: string,
        dishes: [],
        long: number,
        lat: number
}

interface CounterState {
  Restaurant: Restaurant
}

// Define the initial state using that type
const initialState: CounterState = {
  Restaurant: {
    id: "",
        imgUrl: "",
        title: "",
        rating: 0,
        genre: "",
        address: "",
        short_description: "",
        dishes: [],
        long: 0,
        lat: 0
  }
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRestaurant: (state: any, action: PayloadAction<Restaurant>) => {
      state.Restaurant = action.payload;
    }
  },
})

export const { setRestaurant } = restaurantSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRestaurant = (state: any) => state.restaurant.Restaurant
export default restaurantSlice.reducer