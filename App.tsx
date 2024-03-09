import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/Components/Signin/Signin';
import Signup from './src/Components/Signup/Signup';
import TabNavigation from './src/Components/Tabs/TabNavigation';
const Stack = createNativeStackNavigator();
import { store } from "./src/store/store"
import { Provider } from 'react-redux'
export default function TabOneScreen() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "SignIn">
          <Stack.Screen name="SignIn" component={Signin} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
