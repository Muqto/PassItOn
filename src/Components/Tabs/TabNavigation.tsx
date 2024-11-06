import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Home from '../Home/Home';
import Post from '../PostScreen/Post';
import Browse from '../BrowseScreen/Browse';
import Chat from '../ChatScreen/Chat';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faAdd, faHome, faLocationDot, faComments} from '@fortawesome/free-solid-svg-icons/';
import { faComments as faCommentsOutlined} from '@fortawesome/free-regular-svg-icons/';
import Profile from '../ProfileScreen/Profile';
import { colors } from '../../Colors/Colors';

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();  
    return (
        <Tab.Navigator initialRouteName="Home" 
            screenOptions={ ({route}) => ({
                headerShown: false,
                tabBarIcon: ({color}) => {
                    let rn = route.name;
                    const sz = 23;
                    switch (rn){
                        case "Home":
                            return <FontAwesomeIcon color={color} size={sz} icon={ faHome }/>
                        case "Post":
                            return <FontAwesomeIcon color={color} size={sz} icon={ faAdd }/>
                        case "Browse":
                            return <FontAwesomeIcon color={color} size={sz} icon={ faLocationDot }/>
                        case "Chat":
                            return <FontAwesomeIcon color={color} size={sz} icon={ faCommentsOutlined } />
                        case "Profile":
                            return <FontAwesomeIcon color={color} size={sz} icon={ faUser }/>
                    }
                },
                tabBarActiveTintColor: colors.primaryPurple,
                tabBarInactiveTintColor: "#8B8D92",
                tabBarLabelStyle: {paddingBottom: 5, fontSize: 13},
                tabBarStyle: {padding: 10, height: 100}
            })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Post" component={Post}/>
            <Tab.Screen name="Browse" component={Browse}/>
            <Tab.Screen name="Chat" component={Chat}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

export default TabNavigation