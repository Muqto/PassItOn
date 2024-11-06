import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../../../../Colors/Colors';
import {styles as listCardStyle} from '../../BottomSheet/Card/Styles'
import { useNavigation, NavigationProp } from '@react-navigation/native';

type SelectedCardProps = {
  itemId?: string,
  itemName?: string,
  itemType?: string,
  distance?: number,
  imageDownloadUrl: string | undefined,
}

export const SelectedCard = ({itemId, itemName, itemType, distance, imageDownloadUrl}:SelectedCardProps) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const handlePress = () => {
    navigation.navigate('DonationFocus', { itemId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
        <View style={styles.subContainer}>
        <View style = {styles.image}>
        {imageDownloadUrl ? (
            <Image
              source={{ uri: imageDownloadUrl}}
              style={styles.cardImage}
            />
          ) : (
            <View >
            </View>
          )}
        </View>
        <View style = {listCardStyle.textContainer}>
          <Text style={listCardStyle.itemText}>{itemName}</Text>
          <Text style={listCardStyle.categText}>{itemType}</Text>
        </View>
        <View style = {listCardStyle.end}>
          <View style = {listCardStyle.kmView}>
            <Text  style={listCardStyle.kmText}>{`${distance?.toFixed(1)}km`}</Text>
          </View>
          <View>
            <FontAwesomeIcon size={20} icon={faLocationDot} color={colors.primaryPurple}/>
          </View>
        </View>
        
      </View>
    </TouchableOpacity>
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
  // imagePlaceholder: {
  //   color: "#808080",
  //   fontSize: 14,
  // },
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
  imageContent: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightPurple,
  },
});