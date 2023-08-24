import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import Appi from '../screens/cameraVideo';
import { TakePhoto } from '../screens/cameraImage';
import { Userpage } from '../screens/user';
import { Follows } from '../screens/following';


const Tab = createBottomTabNavigator();
const CameraStack = createNativeStackNavigator();
function CameraStackScreen({ navigation, route }) {

    return (
        <CameraStack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                headerShown: false
            }}
            initialRouteName="Camera"
        >
            <CameraStack.Screen
                name="Camera"
                component={Appi}
            />
              <CameraStack.Screen
                name="CameraPhoto"
                component={TakePhoto}
            />
        </CameraStack.Navigator>
    );
}
export default function MainTab(props){

    return (

        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Userpage') {
                            iconName = !focused ? 'account' : 'account-outline';
                        }

                        // You can return any component that you like here!
                        return (
                            <MaterialCommunityIcons name={iconName} size={24} color={'black'} />
                        );
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <>
                    <Tab.Screen
                        name="Userpage"
                        component={Userpage}

                    />
                    <Tab.Screen
                        name="Following"
                        component={Follows}
                        options={{
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' },
                          }}
                    />
                    <Tab.Screen
                        name="Appi"
                        component={CameraStackScreen}
                        options={{
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' },
                          }}
                    />
                </>

            </Tab.Navigator>
        </NavigationContainer>
    );
};
