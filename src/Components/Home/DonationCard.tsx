import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import styles from './Styles';
import { DonationProps } from './Types';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from './DonationDetails';
import { getUserById } from '../../api/userApi';

const DonationCard = ({itemName, expirationTime, itemType, itemStatus, userId, description}: DonationProps) => {
    const navigation = useNavigation(); // access navigation
    const getUserName = async () => {
        const user = await getUserById({id: userId});
        return `${user.data.firstName} ${user.data.lastName}`;
      }
    const fullName = getUserName();
  return (
    <View style = {styles.cardContainer}>
        <View style = {styles.bodyContainer}>
            <View style = {styles.cardImage}>

            </View>
            <View style = {styles.cardDesc}>
                <View>
                    <Text style = {styles.itemNameText}>{itemName}</Text>
                    <Text style = {styles.pickUpText}>Pickup: <Text style = {styles.pickUpTimeText}>{formatDate(expirationTime)}</Text></Text>
                    <Text style = {styles.categoryText}>{itemType}</Text>
                </View>
                <View style={styles.details}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('DonationDetails', { itemName, expirationTime, itemType, description, userId, itemStatus })}
            >
              <Text style={styles.detailsText}>Details</Text>
            </TouchableOpacity>
          </View>
            </View>
        </View>
    </View>
  )
}

export default DonationCard