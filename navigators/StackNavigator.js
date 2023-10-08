import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';



//스크린
import Main from '../screens/Main';
import Prediction from '../screens/Prediction'
import UserCamera from '../screens/UserCamera';
import UserInput from '../screens/UserInput';


const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Main'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Main' component={Main}/>
            <Stack.Screen name='UserCamera' component={UserCamera} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='Prediction' component={Prediction} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='UserInput' component={UserInput} options={{unmountOnBlur: true}}/>
        </Stack.Navigator>
    )
}


export default StackNavigator;