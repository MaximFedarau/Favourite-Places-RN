//React Native
import { StyleSheet } from 'react-native'

//Constants
import { PRIMARY_500 } from '../../../constants/colors'

export const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: PRIMARY_500,
        flexDirection: 'row',

    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: PRIMARY_500,
    },
    contained: {
        backgroundColor: PRIMARY_500,
    },
    containedText: {
        color: 'white'
    }
})