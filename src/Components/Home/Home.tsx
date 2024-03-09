import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DonationCard from './DonationCard'
import { Button } from 'react-native-paper'
import styles from './Styles'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/selectors'
import { useHome } from './Hooks'

const Home = () => {
  // const {userId, firstName, lastName} = route.params
  const [isDonations, setIsDonations] = useState(true);
  const userState = useSelector(userSelector)
  const { donationCardProps } = useHome()
  return (
    <View style = {styles.homePage}>
      <View style = {styles.title}>
        <Text style = {styles.titleText} >Home</Text>  
      </View>
      <View style = {styles.switchTab}>
        
        <TouchableOpacity style = {{...styles.donationsDiv, borderBottomWidth: isDonations ? 4 : 0}} onPress={() => setIsDonations(true)}>
          <Text style = {styles.switchTabText1}>Donations</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style = {{...styles.reservationsDiv, borderBottomWidth: isDonations ? 0 : 4}} onPress={() => setIsDonations(false)}>
          <Text style = {styles.switchTabText2}>Reservations</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.activeDonations}>
        <Text style = {styles.activeDonationsText}>Your active 
          {isDonations ? 
          <Text style = {styles.donationsText}> donations </Text> : 
          <Text style = {styles.donationsText}> reservations </Text>}
          
        </Text>
      </View>
      <View>
        {isDonations ? 
        <View>
          {donationCardProps.map((props, idx) => <DonationCard key={idx} {...props}/>)}
        </View> : 
        <View>
          {/* insert reservations */}
        </View>}
        
      </View>
      <View>
        <Button style = {styles.postButton} mode='contained' onPress = {() => console.log(userState)}>
          {isDonations ? 
          <Text style = {styles.postText}>Post a donation</Text> : 
          <Text style = {styles.postText}>Browse available donations</Text>}
        </Button>
      </View>
      
    </View>
  )
}

export default Home