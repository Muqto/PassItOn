import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import { FlatList } from "react-native-gesture-handler";
import { ListCard } from "./Card/ListCard";
import { colors } from "../../../Colors/Colors";
import { styles } from "./Style";
import { ActivityIndicator } from "react-native-paper";
import { useBottomSheet } from "./Hooks";

export const BottomSheetComponent = () => {
  const { snapPoints, donations, isDonLoading, loadDonations, hasMoreDon } =
    useBottomSheet();
  
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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

  const keyExtractor = useCallback((item) => item._id, []);

  // Does not trigger as of yet for some reason.
  const handleRefresh = async () => {
    console.log("Pull-to-refresh triggered.");
    setIsRefreshing(true);
    // Reset the bottom sheet's donations
    // Assuming loadDonations handles resetting
    await loadDonations();
    setIsRefreshing(false);
  };

  console.log("Donations loaded in BottomSheet:", donations);

  return (
    <BottomSheet snapPoints={snapPoints}>
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.topButtons}>
          <Text style={{ fontSize: 24, fontWeight: "300", marginBottom: 10 }}>
            Explore nearby
          </Text>
        </View>
    
        <FlatList
          data={donations}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={
            !isDonLoading && (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: colors.primaryPurple, fontSize: 16 }}>
                  No donations available nearby.
                </Text>
              </View>
            )
          }
          ListFooterComponent={
            isDonLoading ? (
              <ActivityIndicator
                size={"large"}
                color={colors.lightPurple}
                style={{ marginBottom: 15 }}
              />
            ) : null
          }
        />
      </BottomSheetView>
    </BottomSheet>
  );
};
