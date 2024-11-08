import { useCallback } from 'react';
import { View, Text } from 'react-native';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { ListCard } from './Card/ListCard';
import { colors } from '../../../Colors/Colors';
import { styles } from './Style';
import { ActivityIndicator } from 'react-native-paper';
import { useBottomSheet } from './Hooks';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/user/selectors';

export const BottomSheetComponent = () => {
  const {  
    snapPoints, 
    donationsSelected, 
    donations,
    requests, 
    isDonLoading, 
    isReqLoading, 
    setDonationsSelected,
    loadDonations,
    loadRequests 
          } = useBottomSheet()
  const renderItem = useCallback(
    ({ item }) => (
      <ListCard 
        itemId={item._id} 
        itemName={item.itemName} 
        itemType={item.itemType} 
        distance={item.distance} 
        imageDownloadUrl={item.imageDownloadUrl}
        />
    ),
    []
  );
  const user = useSelector(userSelector)
  return (
      <BottomSheet snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          <View style = {styles.topButtons}>
            <TouchableOpacity onPress={() => setDonationsSelected(true)} 
              style = {donationsSelected ? {...styles.topButton1, ...styles.selectedStyle} : {...styles.topButton1, ...styles.unselectedStyle}}>
              <Text style = {donationsSelected ? {...styles.textSelected} : {...styles.textUnselected}}>Nearby donations</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setDonationsSelected(false)} 
              style = {!donationsSelected ? {...styles.topButton2, ...styles.selectedStyle} : {...styles.topButton2, ...styles.unselectedStyle}}>
              <Text style = {!donationsSelected ? {...styles.textSelected} : {...styles.textUnselected}}>Nearby requests</Text>
            </TouchableOpacity>
          </View>
          {donationsSelected ? 
          <FlatList 
            data = {donations && donations.filter(item => 
              item.itemStatus === 1 && item.userId !== user._id
            )} 
            renderItem = {renderItem} 
            onEndReached={loadDonations}
            keyExtractor={(item) => item._id}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator = {false}
            showsVerticalScrollIndicator = {false}
            ListFooterComponent={() => isDonLoading && <ActivityIndicator size={'large'} color={colors.lightPurple}/>}
            ListFooterComponentStyle = {{marginBottom: 15}}
          /> : 
          <FlatList 
          data = {requests} 
          renderItem = {renderItem} 
          keyExtractor={(item) => item._id}
          onEndReached={loadRequests}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator = {false}
          showsVerticalScrollIndicator = {false}
          ListFooterComponent={() => isReqLoading && <ActivityIndicator size={'large'} color={colors.lightPurple}/>}
          ListFooterComponentStyle = {{marginBottom: 15}}
        />
          } 
        </BottomSheetView>
      </BottomSheet>
  );
};

