import { SafeAreaView, Text, Image, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
//import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native';
import {
    UserIcon, ChevronDownIcon,AdjustmentsHorizontalIcon,MagnifyingGlassCircleIcon
 } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import SanityClient from '../sanity';

// const StyledText = styled(Text);

type category = {
    _id: string,
    name: string,
    short_description: string,
    restaurants: Array<any>
}

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = React.useState<category[]>([]);

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown: false
        });
    }, [])

    useEffect(()=>{
        SanityClient.fetch(
            `*[_type == "featured"]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->{
                    }
                }
            }`
        ).then((data)=>{
            setFeaturedCategories(data);
        });
    }, [])
    //console.log(featuredCategories);
  return (
    <SafeAreaView className='bg-white pt-5'>
        <View className='mt-5'>
        <View className='flex-row pb-3 items-center ml-4 mr-10'>
            <Image 
                source={{
                    uri: 'https://links.papareact.com/wru',
                }}
                className='h-7 w-7 p-4 bg-gray-300 rounded-full'
            />
            <View className='flex-row items-center'>
                <View className='flex-1 ml-4'>
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                    <Text className='font-bold text-xl items-center'>Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon className='place-self-end' size={35} color="#00CCBB" />
            </View>
        </View>
        <View className='flex-row items-center space-x-2 pb-2 mx-4'>
            <View className='flex-row space-x-2 flex-1 bg-gray-200 items-center rounded-md p-3'>
                <MagnifyingGlassCircleIcon color="gray" />
                <TextInput keyboardType='default' className='flex-1' placeholder='Restraunts and cuisines'/>
            </View>
            <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>
        <ScrollView className='bg-gray-100'
            contentContainerStyle = {{
                paddingBottom: 250,
            }}
        >
            <SafeAreaView>
            <Categories />
            {/* Featured */}
            {featuredCategories?.map((category , idx) => {
                return (
                    <FeaturedRow key={category._id} title={category.name}
                        id={category._id}
                        description={category.short_description}
                    />
                )
            })}
            </SafeAreaView>
        </ScrollView>
       </View>
    </SafeAreaView>
  )
}