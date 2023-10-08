import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';



//스크린
import Main from '../screens/Main';
import Prediction from '../screens/Prediction'
import UserCamera from '../screens/UserCamera';
import UserInput from '../screens/UserInput';
import ObjectList from '../screens/ObjectList';
import Login from '../screens/Login-Person';
import SignUp from '../screens/SignUp-Person';
import MyPage from '../screens/MyPage';


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
            <Stack.Screen name='ObjectList' component={ObjectList}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='MyPage' component={MyPage}/>
            
        </Stack.Navigator>
    )
}


export default StackNavigator;