import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ListCard } from '../../BottomSheet/Card/ListCard';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../../../../Colors/Colors';
import {styles as listCardStyle} from '../../BottomSheet/Card/Styles'
import { Image } from 'expo-image';
type SelectedCardProps = {
  itemName: string,
  itemType: string,
  imageDownloadUrl: string | undefined,
  distance: number,
}
export const SelectedCard = (props: SelectedCardProps) => {
  return (
    <View style = {styles.container}>
        <View style={styles.subContainer}>
        <View style = {styles.image}>
        {props.imageDownloadUrl ? (
            <Image
              source={{ uri: props.imageDownloadUrl}}
              style={styles.cardImage}
            />
          ) : (
            <View >
            </View>
          )}
        </View>
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
  imagePlaceholder: {
    color: "#808080",
    fontSize: 14,
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
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },

});