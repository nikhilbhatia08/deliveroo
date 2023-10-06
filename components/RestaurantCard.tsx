import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
//import {LocationMarkerIcon} from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

type propTypes = {
    id: string, imgUrl: string, title: string, rating: Number, genre: string, address: string, short_description: string, dishes: Array<string>, long: Number, lat: Number
}
type RestaurantParams = {
    [x: string]: any;
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

const RestaurantCard = (props: propTypes) => {
    const navigation = useNavigation<RestaurantParams>();
    //console.log(props.id)
  return (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate('restaurant', {
                id: props.id,
                imgUrl: props.imgUrl,
                title: props.title,
                rating: props.rating,
                genre: props.genre,
                address: props.address,
                short_description: props.short_description,
                dishes: props.dishes,
                long: props.long,
                lat: props.lat
            } as RestaurantParams)

        }}
    className='bg-white mr-3 rounded-sm'>
        <Image
            source={{
                uri: urlFor(props.imgUrl).url(),
            }}
            className='h-36 w-64 rounded-sm'
        />
        <View className='px-3 pb-4'>
            <Text className='font-bold text-lg pt-2'>{props.title}</Text>
            <View className='flex-row items-center space-x-1'>
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className='text-xs text-gray-500'>
                    <Text className='text-green-500'>{props.rating.toString()}</Text> . {props.genre}
                </Text>
            </View>
            <View className='flex-row items-center space-x-1'>
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className='text-xs text-gray-500'>Nearby {props.address}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard