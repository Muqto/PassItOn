import { colors } from "../../../Colors/Colors";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
    },
    topButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 15
    },
    topButton1: {
      backgroundColor: colors.lightUnselected,
      minWidth: '46%',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center"
    }, 
    topButton2: {
      backgroundColor: colors.lightPurple,
      minWidth: '46%',
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center"
    },
  
    selectedStyle: {
      backgroundColor : colors.lightPurple,
      borderWidth: 1,
      borderColor: colors.primaryPurple,
    },
    unselectedStyle: {
      backgroundColor: colors.lightUnselected,
    },
    textSelected: {
      color: colors.primaryPurple
    },
    textUnselected: {
      color: colors.darkUnselected
    }
  });