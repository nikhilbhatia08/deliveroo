import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCartState, getCartTotal, selectBasketItems } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { removeFromBasket } from '../features/basketSlice';
//import restaurant from '../sanity/schemas/restaurant';

const BasketScreen = () => {
    const navigation = useNavigation();
    const select = useSelector((state) => selectRestaurant(state));
    //console.log(select);
    const items = useSelector((state) => selectBasketItems(state)) as any;
    const basketTotal = useSelector((state : any) => getCartTotal(state));
    const [groupedItems, setGroupedItems] = React.useState([]);
    const dispatch = useDispatch();
    //if(items.length === 0)return null;
    useMemo(() => {
      const grouped = items.reduce((results: any, item: any) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {})
      setGroupedItems(grouped);
    }, [items])
    //console.log(groupedItems);
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='bg-gray-100 flex-1'>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{select.title}</Text>
          </View>
          <TouchableOpacity 
            onPress={navigation.goBack}
          className='rounded-full bg-gray-100 absolute top-3 right-5'>
            <XCircleIcon size={30} color='#00CCBB' />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center spac-x-4 px-4 py-3 bg-white my-5'>
          <Image 
            className='h-7 w-7 bg-gray-300 rounded-full p-4'
            source={{uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450l"}}
          />
          <Text className='flex-1 mx-4 font-bold'>Deliver in 50-70 mins</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItems).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-[#00CCBB]'>{items.length} X </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url () }} className="h-12 w-12 rounded-full"/>
                <Text className="flex-1 font-bold">{items[0]?.name}</Text>
                <Text className='text-gray-600'>${items.length * items[0]?.price}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(removeFromBasket({id: key}))
                  }}
                >
                  <Text className='text-[#00CCBB]'>Remove</Text>
                </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>${basketTotal}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>${5.99}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='font-extrabold'>Order Total</Text>
            <Text className='font-extrabold'>${basketTotal + 5.99}</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("preparingOrderScreen")} className='items-center p-4 rounded-lg bg-[#00CCBB]'>
            <Text className='text-white font-extrabold text-lg'>Place Order</Text>
            
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen