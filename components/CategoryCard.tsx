import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

type propTypes = {
    imgUrl: string,
    Title: string,
}

const CategoryCard = (props: propTypes) => {
  return (
    <TouchableOpacity className='relative mr-2'>
      <Image 
        source={{
            uri: props.imgUrl,
        }}
        className='h-20 w-20 rounded-sm'
      />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{props.Title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard