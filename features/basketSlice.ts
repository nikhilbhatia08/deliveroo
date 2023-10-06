import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state

type Basket = {
    id: string,
    name: string,
    price: number,
    short_description: string,
    image: string,
}

interface CounterState {
  items: Array<Basket>
}

// Define the initial state using that type
const initialState: CounterState = {
items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Basket>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<Basket>) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id)
      state.items = [...state.items];
      if(index >= 0) {
        state.items.splice(index, 1);
      }
      else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as its not in basket`);
      }
       // state.items = state.items.filter((item) => item.id !== action.payload.id)
     },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBasketItems = (state: any) => state.basket.items

export const selectBasketItemsWithId = (state: RootState, id:string) => state.basket.items.filter((item) => item.id === id)

export const getCartState = createSelector(
    (state: RootState, id: string) => state.basket.items.filter((item) => item.id === id),
    (basket) => basket
);

export const getCartItemsCount = createSelector(
    (state: RootState) => state.basket.items,
    (basket) => basket.length
);

export const getCartTotal = createSelector(
    (state: RootState) => state.basket.items,
    (basket) => basket.reduce((amount, item) => item.price + amount, 0)
);

export default basketSlice.reducer