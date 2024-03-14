import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from '../Components/Tabs/TabNavigation';
import { useEffect } from 'react';
import useAuthentication from '../Hooks/Authetication';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/user/selectors';
import { getUser } from '../api/userApi';
import { addUserAction } from '../store/user/slice';

const Stack = createNativeStackNavigator();
export default function UserStack() { 
    const { getSessionUid } = useAuthentication()
    const user = useSelector(userSelector)
    const dispatch = useDispatch()
    const currentUserUid = getSessionUid()

    useEffect(() => {
        // if user does not exist in redux store it means that we have signed in through session
        // so populate the redux store once we sign in through user session
        if (!user._id) {
            const fetchUserInfo = async () => {
                const res = await getUser({ _id: currentUserUid as String})
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