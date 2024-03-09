import React from 'react'
import { View, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../../Colors/Colors'

const LoadingScreen = () => {
  return (
    <View style = {{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={80} animating={true} color={colors.primaryPurple}/>
    </View>
  )
}

export default LoadingScreen