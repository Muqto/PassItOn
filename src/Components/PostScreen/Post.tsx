import { View } from "react-native";
import DonatePage from "./DonatePage";
import styles from "./Styles";
const Post = () => {
  return (
    <View style={styles.postPageContainer}>
      <View style={styles.postHeader}>

      </View>
      <DonatePage/>
    </View>
  );
};

export default Post;
