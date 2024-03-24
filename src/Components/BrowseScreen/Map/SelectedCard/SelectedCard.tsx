import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ListCard } from '../../BottomSheet/Card/ListCard';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../../../../Colors/Colors';
import {styles as listCardStyle} from '../../BottomSheet/Card/Styles'
type SelectedCardProps = {
  itemName: string,
  itemType: string,
  distance: number,
}
export const SelectedCard = (props: SelectedCardProps) => {
  return (
    <View style = {styles.container}>
        <View style={styles.subContainer}>
        <View style = {styles.image}></View>
        <View style = {listCardStyle.textContainer}>
          <Text style={listCardStyle.itemText}>{props.itemName}</Text>
          <Text style={listCardStyle.categText}>{props.itemType}</Text>
        </View>
        <View style = {listCardStyle.end}>
          <View style = {listCardStyle.kmView}>
            <Text  style={listCardStyle.kmText}>{`${props.distance.toFixed(1)}km`}</Text>
          </View>
          <View>
            <FontAwesomeIcon size={20} icon={faLocationDot} color={colors.primaryPurple}/>
          </View>
        </View>
        
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    position: 'absolute',
    zIndex: 3,
    top: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
      height: 80,
      padding: 6,
      width: "90%",
      paddingLeft: 15,
      paddingRight: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.ultraLightPurple,
      borderRadius: 15,
      borderWidth: 0.8,
      borderColor: colors.primaryPurple
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: colors.primaryPurple,
    borderRadius: 10
  },

});