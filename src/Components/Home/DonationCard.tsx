import React from 'react'
import { View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import styles from './Styles';
import { DonationProps } from './Types';

const DonationCard = ({itemName, expirationTime, itemType}: DonationProps) => {
  return (
    <View style = {styles.cardContainer}>
        <View style = {styles.bodyContainer}>
            <View style = {styles.cardImage}>

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