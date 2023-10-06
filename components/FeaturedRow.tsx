import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import SanityClient from '../sanity'
type propTypes = {
    id: string,
    title: string,
    description: string,
}

type restaurant = {
    _id: string,
    name: string,
    short_description: string,
    dishes: Array<any>,
    image: string,
    type: {
        name: string
    },
    lat: Number,
    long: Number
}

const FeaturedRow = (props: propTypes) => {

  const [restaurants, setRestaurants] = React.useState<restaurant[]>([])
  useEffect(()=>{
    SanityClient.fetch(`
    *[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
          ...,
          dishes[]->,
        type->{
          name
        }
      }
    }[0]
    `, {id: props.id}).then(data => {
      setRestaurants(data?.restaurants)
      //console.log(data._id)
    })
  }, [])

  //console.log(restaurants)

  return (
    <View>
      <View className="flex-row mt-4 justify-between px-4 items-center">
        <Text className="font-bold text-lg">{props.title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>
      <Text className="text-xs text-gray-500 px-4">{props.description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
         {/* Restaurant cards */}
         {restaurants.map((restaurant, index) => {
          //console.log(restaurant._id)
          //console.log(props.id)
            return (
              <RestaurantCard 
                  key={index}
                  id={restaurant._id}
                  imgUrl={restaurant.image}
                  title ={restaurant.name} rating={4.5} genre={restaurant.type?.name} address="123 Main St"
                  short_description={restaurant.short_description} dishes={restaurant.dishes} long={restaurant.long} lat={restaurant.lat}
              />
            )
         })}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow