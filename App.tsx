import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen';
import {TailwindProvider} from 'tailwindcss-react-native'
import RestaurantScreen from './Screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store'
import BasketScreen from './Screens/BasketScreen';
import PreparingOrderScreen from './Screens/PreparingOrderScreen';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
      <stack.Navigator>
        <stack.Screen name="Home" component={HomeScreen}/>
        <stack.Screen name="restaurant" component={RestaurantScreen}/>
        <stack.Screen name="Basket" component={BasketScreen}
          options={{presentation: 'modal', headerShown: false}}
        />
        <stack.Screen name='preparingOrderScreen' 
          options={{presentation: 'modal', headerShown: false}}
          component={PreparingOrderScreen}
        />
      </stack.Navigator>
      </TailwindProvider>
    
      </Provider>
      </NavigationContainer>
  );
}

