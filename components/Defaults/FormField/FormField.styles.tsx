//React Native
import { StyleSheet } from 'react-native'

//Constants
import { PRIMARY_100, PRIMARY_400 } from '../../../constants/colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 12,
    },
    input: {
        backgroundColor: PRIMARY_100,
        padding: 8,
        borderRadius: 8,
        marginVertical: 12,
        fontSize: 16,
    },
    label: {
        color: PRIMARY_400,
        fontWeight: 'bold',
        fontSize: 16,
    }
})