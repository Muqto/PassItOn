import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import TabNavigation from './Components/Tabs/TabNavigation';

export default function AppWrapped() { 
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "SignIn">
          <Stack.Screen name="SignIn" component={Signin} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}