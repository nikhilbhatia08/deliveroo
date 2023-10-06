import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { urlFor } from '../sanity'
import {PlusCircleIcon, MinusCircleIcon, PlusIcon} from 'react-native-heroicons/outline'
import { DispatchProp, useDispatch, useSelector } from 'react-redux'
import { selectBasketItems } from '../features/basketSlice'
import { addToBasket, removeFromBasket, getCartState } from '../features/basketSlice'
import { RootState } from '../store'
import { useAppDispatch } from '../hooks'
import { rootCertificates } from 'tls'

type propTypes = {
    id: string, 
    name: string,
    short_description : string,
    price: number,
    image: string
}

type BasketItem = {
    id: string, 
    name: string,
    short_description : string,
    price: number,
    image: string,
}

const DishRow = (props: propTypes) => {
    const [isPressed, setPressed] = React.useState(false)
    const select = useSelector((state: RootState) => getCartState(state, props.id)) as BasketItem[];
    const dispatch = useDispatch();
    const add_To_Basket = () => {
        //console.log({id: props.id, name: props.name, price: props.price, short_description: props.short_description, image: props.image})
        dispatch(addToBasket({id: props.id, name: props.name, price: props.price, short_description: props.short_description, image: props.image}))
    }
    const remove_from_basket = () => {
        if(!(select.length > 0)) {
            return ;
        }
        dispatch(removeFromBasket({id: props.id, name: props.name,  price: props.price, short_description: props.short_description, image: props.image}))
    }    
    //console.log(select.length)
  return (
    <>
    
    <TouchableOpacity onPress={() => {setPressed(!isPressed)}} className='bg-white border-t border-gray-200 p-4'>
        <View className='flex-row'>
            <View className='flex-1 pr-2'>
                <Text className='text-lg mb-1'>{props.name}</Text>
                <Text className='text-gray-400'>{props.short_description}</Text>
                <Text>${props.price}</Text>
            </View>
        <View>
            <Image 
                style={{borderWidth: 1, borderColor: 'black'}}
                source={{
                uri: urlFor(props.image).url()
            }}
            className='h-20 w-20 bg-gray-300 p-4'
            />
        </View>
       </View>
      
    </TouchableOpacity>
    {isPressed && (
        <View className='bg-white px-4'>
            <View className='flex-row items-center space-x-2 py-3'>
                <TouchableOpacity onPress={remove_from_basket}>
                    <MinusCircleIcon size={40} color={select.length > 0 ? "#00CCBB" : "gray"}/>
                </TouchableOpacity>
                <Text>{select.length}</Text>
                <TouchableOpacity onPress={add_To_Basket}>
                    <PlusCircleIcon size={40} color="#00CCBB"/>
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  )
}

export default DishRow