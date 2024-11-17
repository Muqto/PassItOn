import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const ReportScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
         <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.feedbackPromptText}>
                To report a listing, please contact us at{' '}
                <Text style={styles.feedbackEmailText}>
                passitoncontactmail@gmail.com
                </Text>
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        paddingTop: 48,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
      },
    bodyContainer: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        height: "100%",
        padding: 20,
      },
      feedbackPromptText: {
        marginTop: "70%",
        textAlign: "center",
        fontSize: 15,
      },
      feedbackEmailText: {
        color: "#6B6BE1",
        fontWeight: "600",
      }
});

export default ReportScreen