//React Native
import { StyleSheet } from "react-native";

//Constants
import { PRIMARY_400 } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%', 
        height: 300
    },
    actionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
    },
    address: {
        fontSize: 18,
        color: PRIMARY_400,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    buttonContainer: {
        marginVertical: 12,
    }
})