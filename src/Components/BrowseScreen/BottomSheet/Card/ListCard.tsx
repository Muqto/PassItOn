import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { colors } from "../../../../Colors/Colors";
import { styles } from "./Styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface ListCardProps {
  itemId?: string;
  itemName?: string;
  itemType?: string;
  distance?: number;
  imageDownloadUrl?: string;
}

const ListCardComponent = ({
  itemId,
  itemName,
  itemType,
  distance,
  imageDownloadUrl,
}: ListCardProps) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const handlePress = () => {
    navigation.navigate("DonationFocus", { itemId });
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View>
        {imageDownloadUrl ? (
          <Image source={{ uri: imageDownloadUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}></View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{itemName.length > 25 ? itemName.substring(0, 25) + "..." : itemName}</Text>
        <Text style={styles.categText}>{itemType}</Text>
      </View>
      <View style={styles.end}>
        <View style={styles.kmView}>
          <Text style={styles.kmText}>{`${distance?.toFixed(1)}km`}</Text>
        </View>
        <View>
          <FontAwesomeIcon
            size={20}
            icon={faLocationDot}
            color={colors.primaryPurple}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ListCard = React.memo(ListCardComponent);
