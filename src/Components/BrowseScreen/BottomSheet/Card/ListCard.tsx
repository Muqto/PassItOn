import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Text, Image } from 'react-native'
import { colors } from '../../../../Colors/Colors'
import { styles } from './Styles'

type ListCardProps = {
  itemName: string,
  itemType: string,
  distance: number,
  imageDownloadUrl: string,
}

export const ListCard = (props: ListCardProps) => {

  return (
    <View style={styles.itemContainer}>
        <View>
        {
          props.imageDownloadUrl !== undefined ? 
              <Image source={{uri: props.imageDownloadUrl}} style={styles.image}/> :
          <View style = {styles.imagePlaceholder}></View>
        }
        </View>
        <View style = {styles.textContainer}>
          <Text style={styles.itemText}>{props.itemName}</Text>
          <Text style={styles.categText}>{props.itemType}</Text>
        </View>
        <View style = {styles.end}>
          <View style = {styles.kmView}>
            <Text  style={styles.kmText}>{`${props.distance?.toFixed(1)}km`}</Text>
          </View>
          <View>
            <FontAwesomeIcon size={20} icon={faLocationDot} color={colors.primaryPurple}/>
          </View>
        </View>
      </View>
  )
}