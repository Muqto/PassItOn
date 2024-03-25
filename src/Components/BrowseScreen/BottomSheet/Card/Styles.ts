import { StyleSheet } from 'react-native';
import { colors } from '../../../../Colors/Colors';

export const styles = StyleSheet.create({
    itemContainer: {
      height: 80,
      padding: 6,
      paddingLeft: 15,
      paddingRight: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    image: {
      width: 60,
      height: 60,
      backgroundColor: colors.lightPurple,
      borderRadius: 10
    },
    textContainer: {
      marginLeft: 15
    },
  
    itemText: {
      fontWeight: '400',
      fontSize: 16
    },
  
    categText: {
      fontWeight: '300',
      fontSize: 11
    },
    kmText: {
      fontWeight: '300',
    },
    end: {
      marginLeft: 'auto',
      flexDirection: 'row',
      alignItems: 'center'
    },
    kmView: {
      marginRight: 10
    }
  });