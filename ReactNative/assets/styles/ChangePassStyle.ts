import { StyleSheet } from "react-native";

export const ChangePassStyle = StyleSheet.create({
    
    container: {
        flex: 1,
        width:'90%'
      },

      content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
        justifyContent: 'center',
        
      },

      card: {
        padding: 20,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#E1BEE7',
      },

      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: 'black',
      },

      input: {
        marginBottom: 16,
        backgroundColor: 'transparent',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: 'bold'
      },

      buttonContainer: {
        marginTop: 20,
        backgroundColor: '#87CEEB',
      },

      cancelButton: {
        marginTop: 10,
        backgroundColor: '#87CEEB',
      },
      
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

})