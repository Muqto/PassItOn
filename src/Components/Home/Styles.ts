import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    homePage: {
        marginLeft: 20,
        marginRight: 20,
        flex: 1
      },

    title:{
        marginTop: 100,
        alignItems: "center",
        marginBottom: 25
      },

    titleText: {
        fontSize: 25,
        fontWeight: "bold"
      },
    
      switchTab: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
        
      },
      donationsDiv: {
        marginBottom: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderBottomWidth:4,
        borderBottomColor: "#6B6BE1",
      },

      reservationsDiv: {
        marginBottom: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderBottomWidth:4,
        borderBottomColor: "#6B6BE1",
      },

      switchTabText1: {
        fontSize: 17,
        fontWeight: "500",
        
      },

      switchTabText2: {
        fontSize: 17,
        fontWeight: "500"
      },

      activeDonations: {
        marginBottom: 30
      },

      activeDonationsText: {
        fontSize: 25,
        fontWeight: "bold"
      },

      donationsText: {
        color: "#6B6BE1"
      },

      bodyContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: "#F7F7FF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      },

      cardContainer: {
        width: "100%",
        height: 140,
        backgroundColor: "#F7F7FF",
        borderRadius: 10,
        marginBottom: 25,
        padding: 15
      },

      cardImage: {
        width: 100,
        height: 100,
        backgroundColor: "black",
        borderRadius: 20
      },

      cardDesc: {      
        marginLeft: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      },

      itemNameText: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 2
      },

      pickUpText: {
        fontWeight: "700",
        fontSize: 13
      },

      pickUpTimeText: {
        color: "#6B6BE1"
      },

      categoryText: {
        fontSize: 13,
        fontWeight: "100"
      },

      detailsButton: {
        marginTop: 9,
        backgroundColor: "#EEEEEE",  
        width: "50%",
        alignItems: "center",
        borderRadius: 10,
        padding: 3
      },

      detailsText: {
        fontSize: 12,
        fontWeight: "bold"
      },
      
      postButton: {
        backgroundColor: "#6B6BE1",
        borderRadius: 5,
        marginBottom: 50,
      },

      postText: {
        fontSize: 17
      }
      
    
})

export default styles