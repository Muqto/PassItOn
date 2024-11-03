import React from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import useAuthentication from '../../Hooks/Authetication'

const Profile = ({navigation}) => {
  const { logout } = useAuthentication()

  return (
    <View style = {{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
      <Button onPress={logout}>LOGOUT</Button>
      <Pressable onPress={() => navigation.navigate('SendFeedback')}>
          <Text style={styles.userActionTitle}>Send Feedback</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  userActionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
  },
});

export default Profile