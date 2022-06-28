//React Native
import { StyleSheet } from "react-native";

//Constants
import { PRIMARY_500 } from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_500,
        marginVertical: 12,
        width: '100%',
        borderRadius: 6,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 100,
    },
    pressed: {
        opacity: 0.9,
    },
    image: {
        height: '100%',
        width: 100,
    },
    textContainer: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    address: {
        fontSize: 14,
    }
})