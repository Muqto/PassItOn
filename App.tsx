import { StyleSheet, View, Text } from "react-native";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function TabOneScreen() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "SignIn">
        <Stack.Screen name="SignIn" component={Signin} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});