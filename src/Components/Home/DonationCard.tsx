import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './Styles';
import { DonationProps } from './Types';

const DonationCard = ({itemName, expirationTime, itemType, imageDownloadUrl}: DonationProps) => {

  return (
    <View style = {styles.cardContainer}>
        <View style = {styles.bodyContainer}>
            <View>
            {
                imageDownloadUrl !== undefined ? 
                    <Image source={{uri: imageDownloadUrl}} style={styles.cardImage}/> :
                <View style = {styles.cardImagePlaceholder}></View>
            }
            </View>
            <View style = {styles.cardDesc}>
                <View>
                    <Text style = {styles.itemNameText}>{itemName}</Text>
                    <Text style = {styles.pickUpText}>Pickup: <Text style = {styles.pickUpTimeText}>{expirationTime}</Text></Text>
                    <Text style = {styles.categoryText}>{itemType}</Text>
                </View>
                <View style = {styles.details}>
                    <View style = {styles.detailsButton}>
                        <Text style = {styles.detailsText}>Details</Text>
                    </View>
                    <View></View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default DonationCard