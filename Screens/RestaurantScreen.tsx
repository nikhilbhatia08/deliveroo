import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, StarIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'


type ParamListBase = {
    Restaurant: {
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
}

type RestaurantScreenRouteProp = RouteProp<ParamListBase, 'Restaurant'>

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false
        });
    }, []);
        const {params} = useRoute<RestaurantScreenRouteProp>();
        const dishes = params.dishes as Array<any>;
        useEffect(() => {
            dispatch(setRestaurant(params));
        }, [dispatch]);
        return (
            <>
            <BasketIcon />
            <ScrollView>
                <View className='relative'>
                    <Image
                        source={{ uri: urlFor(params.imgUrl).url()}}
                        className='h-64 w-full bg-gray-300 p-4'
                    />
                </View>
                <TouchableOpacity 
                    onPress={() => {navigation.goBack()}}
                className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
                    <ArrowLeftIcon size={20} color='#00CCBB'/>
                </TouchableOpacity>
                <View className='bg-white pb-28'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold'>{params.title}</Text>
                        <View className='flex-row space-x-2 my-1'>
                            <View className='flex-row items-center space-x-1'>
                                <StarIcon color="green" opacity={0.5} size={22}/>
                                <Text className="text-xs Otext-arav-500">
                                    <Text className="Otext-green-500">{params.rating}</Text> • {params.genre}
                                </Text>
                            </View>
                            <View className='flex-row items-center space-x-1'>
                                <MapPinIcon color="green" opacity={0.5} size={22}/>
                                <Text className="text-xs Otext-arav-500">
                                    <Text className="Otext-green-500">Nearby</Text> • {params.address}
                                </Text>
                            </View>
                        </View>
                        <Text className='text-gray-500 mt-2 pb-4' >{params.short_description}</Text>
                    </View>
                    <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                        <QuestionMarkCircleIcon size={20} opacity={0.6} color='gray'/>
                        <Text className='flex-1 pl-2 text-md font-bold'>Have a food allergy</Text>
                        <ChevronRightIcon size={20} opacity={0.6} color='#00CCBB'/>
                    </TouchableOpacity>
                    <Text className='px-4 pt-6 mb-3 font-bold text-xl'>
                        Menu
                    </Text>
                    {/* dish rows */}
                    {dishes?.map((dish, index) => (
                        <DishRow key={index} id={dish._id} name={dish.name} short_description={dish.short_description} price={dish.price} image={dish.image}/>
                    ))}
                </View>
            </ScrollView>
            </>
        )
}

export default RestaurantScreen