import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductContainer, SellerContainer} from '@/Containers';
import ListProductContainer from '@/Containers/ListProductContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={SellerContainer}
        options={{
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductContainer}
        options={{
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="wallet-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="List Product"
        component={ListProductContainer}
        options={{
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
