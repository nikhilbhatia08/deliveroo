import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getCartItemsCount, getCartTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

type p = {
    [x: string]: any;
}

const BasketIcon = () => {
    const items = useSelector((state: RootState) => getCartItemsCount(state));
    const navigation = useNavigation<p>();
    const basketTotal = useSelector((state: RootState) => getCartTotal(state));
    if(items === 0)return null;
  return (
    <View className='absolute w-full z-50 bottom-10'>
      <TouchableOpacity onPress={()=>{navigation.navigate("Basket")}} className='flex-row justify-center space-x-14 p-4 items-center mx-5 rounded-lg bg-[#00CCBB]'>
        <Text className='text-white text-lg bg-[#01A296] rounded-md py-1 px-2 font-extrabold'>{items}</Text>
        <Text className='text-white text-lg font-extrabold'>View Basket</Text>
        <Text className='text-white text-lg font-extrabold'>${basketTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon