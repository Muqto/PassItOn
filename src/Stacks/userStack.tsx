import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from '../Components/Tabs/TabNavigation';
import { useEffect, useState } from 'react';
import useAuthentication from '../Hooks/Authetication';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/user/selectors';
import { addTokenToAPI, getItemsByIds, getItemsCoord, getUser } from '../api/userApi';
import { addUserAction, addUserLocationAction, initialUserState, mtlRegionCoord } from '../store/user/slice';
import { firebase_auth } from '../config/firebase';
import { LatLng, Region } from 'react-native-maps';
import * as Location from 'expo-location' 
import { addItemsCoordsAction } from '../store/Items/slice';
import FeedbackScreen from '../Components/Support/FeedbackScreen';
import ReportScreen from '../Components/Support/ReportScreen';

const Stack = createNativeStackNavigator();
export default function UserStack() { 
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    // initial load
    useEffect(() => {
        // if user does not exist in redux store it means that we have signed in through session
        // so populate the redux store once we sign in through user session
        const fetchUserInfo = async () => {
            addTokenToAPI(await firebase_auth.currentUser?.getIdToken() as string)
            const res = await getUser()
            dispatch(addUserAction(res.data))
        }

        // get user location
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
              console.log("Permission required")
              return mtlRegionCoord
            }
            else {
              let currentLocation = await Location.getCurrentPositionAsync({})
              let coordinates = currentLocation.coords
              let currLocation = {
                // latitude: coordinates.latitude,
                // longitude: coordinates.longitude,
                latitude: 45.520564372,
                longitude: -73.56346246,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }  
              dispatch(addUserLocationAction(currLocation))
              return currLocation
            }
        }
        const initialLoad = async () => {
            if (!user._id) {
                // get user info
                await fetchUserInfo()
            }
               
            let location = await getPermissions()
            let loc: LatLng = {
                latitude: location.latitude,
                longitude: location.longitude
            }
            let res = await getItemsCoord(loc)
            const itemCoords = res.data.itemsCoords
            dispatch(addItemsCoordsAction(itemCoords))
        }

        initialLoad()
        
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
                <Stack.Screen name="SendFeedback" component={FeedbackScreen} />
                <Stack.Screen name="ReportListing" component={ReportScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}