import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import useAuthentication from '../../Hooks/Authentication'
const Profile = ({ navigation }) => {
  const { logout } = useAuthentication()
  return (
    <View style = {{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
      <Button onPress={logout}>LOGOUT</Button>
    </View>
  )
}

export default Profile