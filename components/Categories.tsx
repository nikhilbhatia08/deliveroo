import { ScrollView, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import CategoryCard from './CategoryCard'
import SanityClient, { urlFor } from '../sanity'

export default function Categories() {
  const [categories, setCategories] = React.useState<any[]>([]);
  useEffect(()=>{
    SanityClient.fetch(`
    *[_type == "category"]
    `).then(data => {
      setCategories(data)
    })
  }, [])

  return (
    <ScrollView horizontal
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }}
    showsHorizontalScrollIndicator={false}
    >
      {categories.map((category, index) => {
        return (
          <CategoryCard 
            key={index}
            imgUrl={urlFor(category.image).url()}
            Title={category.name}
          />
        )
      })}
    </ScrollView>

  )
}