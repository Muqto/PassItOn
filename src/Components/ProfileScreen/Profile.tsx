import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import useAuthentication from '../../Hooks/Authentication';
import { userDonationsSelector, userSelector } from '../../store/user/selectors';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ navigation }) => {
  const { logout } = useAuthentication();
  const user = useSelector(userSelector);
  const completedDonations = useSelector(userDonationsSelector).filter((donation) => Number(donation.reservationInfo.transactionStatus) >= 2);
  const numberOfItemsDonated = completedDonations.length;
  const uniqueUsersHelped = new Set(
    completedDonations.map((donation) => donation.reservationInfo.userId)
  ).size;
  return (
    <View style={styles.container}>
      {/* Profile Picture and Name */}
      <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 30, marginTop: 20}}>Profile</Text>
      <View style={styles.profileHeader}>
        <Image
          // source={require('../../../assets/images/def_user.png')} // Replace with user image URL
          source={require('../../../assets/images/the-rock.png')} // Replace with user image URL
          style={styles.profileImage}
        />
        <View style={{marginLeft: 20}}>
        <Text style={styles.profileName}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Impact Section */}
      <Text style={{fontSize: 20, width: "100%", marginLeft: 30, fontWeight: '500', color: '#000'}}>Impact</Text>
      <View style={styles.impactContainer}>
        <View style={styles.impactItem}>
          <Text style={styles.impactNumber}>{numberOfItemsDonated}</Text>
          <Text style={styles.impactLabel}>{numberOfItemsDonated > 1 ? 'Items donated' : 'Item donated'}</Text>
        </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactNumber}>{uniqueUsersHelped}</Text>
            <Text style={styles.impactLabel}>{uniqueUsersHelped > 1 ? 'Users helped' : 'User helped'}</Text>
          </View>
      </View>

      {/* User Actions */}
      <View style={{marginTop: 20}}>
      <Pressable style={styles.actionItem} onPress={() => navigation.navigate('History')}>
        <Text style={styles.actionText}>History</Text>
        <FontAwesomeIcon icon={faChevronRight} size={20} />
      </Pressable>
      <Pressable style={styles.actionItem} onPress={() => navigation.navigate('SendFeedback')}>
        <Text style={styles.actionText}>Send Feedback</Text>
        <FontAwesomeIcon icon={faChevronRight} size={20} />
      </Pressable>
      </View>
      {/* Logout Button */}
      <Button mode="outlined" style={styles.logoutButton} onPress={logout}>
        LOGOUT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: '100%',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    width: '90%',
    marginVertical: 10,
  },
  impactContainer: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 20,
    marginBottom: 20,
    marginLeft: 30,
    gap: 10,
  },
  impactItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  impactLabel: {
    fontSize: 18,
    color: '#666',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 20,
  },
  actionText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
  },
});

export default Profile;
