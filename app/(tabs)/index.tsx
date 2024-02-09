import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Signin from '@/components/Signin';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Signin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
