import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({

    content: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#87CEEB',
    },
    
    view: {
        width: '80%'
    },

    cardTitle: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 24,
    },

    input: {
        backgroundColor: 'transparent',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        margin: 5,
        marginLeft: 0,
        marginRight: 0
    },

    cardButton: {
        margin: 5,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: '#E1BEE7',
        color: 'black'
    },
    forgotPassword: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline',
      },
      
    
})