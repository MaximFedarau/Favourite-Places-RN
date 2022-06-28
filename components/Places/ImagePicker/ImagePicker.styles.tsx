//Types
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        marginVertical: 12,
        width: "100%", 
        height: 200
    },
    noImageContainer: {
        marginVertical: 12,
        width: "100%", 
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImageText: {
        fontSize: 18,
        color: 'white',
    }
})