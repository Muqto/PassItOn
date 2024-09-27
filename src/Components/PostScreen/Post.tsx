import React, { useState } from "react";
import { Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { colors } from "../../Colors/Colors";
import DonatePage from "./DonatePage";
import RequestPage from "./RequestPage";
import styles from "./Styles";
const Post = () => {
  const [postPageSelection, setPostPageSelection] = useState("donate");
  return (
    <View style={styles.postPageContainer}>
      <View style={styles.postHeader}>
        <SegmentedButtons
          style={styles.donateOrRequestButton}
          value={postPageSelection}
          onValueChange={(value) => setPostPageSelection(value)}
          buttons={[
            {
              value: "donate",
              label: "Donate",
              checkedColor: colors.primaryPurple,
              uncheckedColor: colors.segmentedDeselectedGrey,
            },
            {
              value: "request",
              label: "Request",
              checkedColor: colors.primaryPurple,
              uncheckedColor: colors.segmentedDeselectedGrey,
            },
          ]}
        />
      </View>
      {postPageSelection == "donate" ? <DonatePage /> : <RequestPage />}
    </View>
  );
};

export default Post;
