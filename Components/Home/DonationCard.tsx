import React from 'react'
import { View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import styles from './Styles';

const DonationCard = () => {
  return (
    <View style = {styles.cardContainer}>
        <View style = {styles.bodyContainer}>
            <View style = {styles.cardImage}>

            </View>
            <View style = {styles.cardDesc}>
                <View>
                    <Text style = {styles.itemNameText}>Item Name</Text>
                    <Text style = {styles.pickUpText}>Pickup: <Text style = {styles.pickUpTimeText}>Someday at 12:00</Text></Text>
                    <Text style = {styles.categoryText}>Category</Text>
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