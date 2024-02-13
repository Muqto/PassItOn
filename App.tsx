import { StyleSheet, View, Text } from "react-native";
import Signin from "./Components/Signup";
import Signup from "./Components/Signup";

export default function TabOneScreen() {
  return (
    
      <View style = {styles.container}>
        <Signup/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});