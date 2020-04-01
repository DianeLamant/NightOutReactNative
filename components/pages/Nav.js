import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from '../pages/Home';
import Map from '../pages/Map';
import Favorite from '../pages/Favorite';

const Tab = createMaterialBottomTabNavigator();

export default function Nav({ navigation }) {

    return <Tab.Navigator
            shifting={true}
            sceneAnimationEnabled={false}
            activeColor="lightblue"
            inactiveColor="lightgrey"
            barStyle={{ backgroundColor: 'white' }}
            >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                tabBarIcon: 'home',
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                tabBarIcon: 'map-search',
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                tabBarIcon: 'heart',
                }}
            />
        </Tab.Navigator>
}
