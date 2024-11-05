import { StyleSheet } from "react-native";

export const SettingsStyle = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#87CEEB',
      },

      welcome: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 200,
        
      },

      description: {
        fontSize: 18,
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#E1BEE7',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        margin: 5,
        marginLeft: 0,
        marginRight: 0
    },

    buttonText: {
        color: '#0000FF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    cardButton: {
        margin: 5,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: '#87CEEB'
    }
      
})