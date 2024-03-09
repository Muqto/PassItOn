import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import useAuthentication from '../../Hooks/Authetication'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/user/selectors'
const Profile = ({ navigation }) => {
  const { logout } = useAuthentication(navigation)
  return (
    <View style = {{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
      <Button onPress={logout}>LOGOUT</Button>
    </View>
  )
}

export default Profile