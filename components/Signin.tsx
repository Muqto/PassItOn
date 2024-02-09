import {useState} from 'react'
import { StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from '@/components/Themed';


const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style = {styles.container}>
            <View style = {styles.textDiv}>
                <Text style = {styles.text}>Sign in</Text>
            </View>
            <View>
                <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined"
                style={styles.input}
                />
                <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                mode="outlined"
                style={styles.input}
                />
                <View style = {styles.buttonDiv}>
                    <Button mode="contained" style={styles.button}>
                        Sign In
                    </Button>
                </View>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    text: {
        fontSize: 30,
    },

    textDiv: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50
    },

    input: {
      marginBottom: 10,
    },

    buttonDiv: {
      marginTop: 10,
      alignItems: 'center',
    },

    button: {
      width: '100%',
      borderRadius: 5
    },
  });
export default Signin