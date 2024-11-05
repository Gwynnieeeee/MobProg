import { StyleSheet } from "react-native";

export const RegisterStyle = StyleSheet.create({

    view: {
        padding: 15,
        paddingTop: 0
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

    buttonText: {
        color: '#E1BEE7',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    content: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%'
    },

    input: {
        backgroundColor: 'transparent',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },

    cardTitle: {
        color: 'rgb(101, 37, 131)',
        textAlign: 'center',
        fontSize: 24,
    },

    cardButton: {
        margin: 5,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: '#E1BEE7',
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 15,
    }
})