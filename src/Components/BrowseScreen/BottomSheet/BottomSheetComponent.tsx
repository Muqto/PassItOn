import { useCallback } from 'react';
import { View, Text } from 'react-native';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { ListCard } from './Card/ListCard';
import { colors } from '../../../Colors/Colors';
import { styles } from './Style';
import { ActivityIndicator } from 'react-native-paper';
import { useBottomSheet } from './Hooks';

export const BottomSheetComponent = () => {
  const {  
    snapPoints, 
    donations,
    isDonLoading, 
    loadDonations,
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

  return (
      <BottomSheet snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          <View style = {styles.topButtons}>
              <Text style={{ fontSize: 24, fontWeight: '300', marginBottom: 10}}>Explore nearby</Text>
          </View>

          <FlatList 
            data = {donations} 
            renderItem = {renderItem} 
            onEndReached={loadDonations}
            keyExtractor={(item) => item._id}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator = {false}
            showsVerticalScrollIndicator = {false}
            ListFooterComponent={() => isDonLoading && <ActivityIndicator size={'large'} color={colors.lightPurple}/>}
            ListFooterComponentStyle = {{marginBottom: 15}}
          /> 
          
          
        </BottomSheetView>
      </BottomSheet>
  );
};

