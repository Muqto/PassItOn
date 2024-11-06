import { Text, View, StyleSheet } from 'react-native'
import MapComponent from './Map/Map'
import { BottomSheetComponent } from './BottomSheet/BottomSheetComponent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation, NavigationProp } from '@react-navigation/native';


const Browse = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  return (
    <View style = {{height: "100%", width: "100%"}}>
      <GestureHandlerRootView style = {styles.container}>
        <MapComponent/>
        <BottomSheetComponent/>
      </GestureHandlerRootView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Browse