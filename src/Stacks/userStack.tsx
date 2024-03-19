import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from '../Components/Tabs/TabNavigation';
import { useEffect } from 'react';
import useAuthentication from '../Hooks/Authetication';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/user/selectors';
import { addTokenToAPI, getUser } from '../api/userApi';
import { addUserAction } from '../store/user/slice';
import { firebase_auth } from '../config/firebase';

const Stack = createNativeStackNavigator();
export default function UserStack() { 
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        // if user does not exist in redux store it means that we have signed in through session
        // so populate the redux store once we sign in through user session
        if (!user._id) {
            const fetchUserInfo = async () => {
                addTokenToAPI(await firebase_auth.currentUser?.getIdToken() as string)
                const res = await getUser()
                dispatch(addUserAction(res.data))
            }
            fetchUserInfo()
        }
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}