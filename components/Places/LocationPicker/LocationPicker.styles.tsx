//React Native
import { StyleSheet } from 'react-native'

//Constants
import { PRIMARY_500 } from '../../../constants/colors';

export const styles = StyleSheet.create({
    mapPreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      overflow: 'hidden',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    noLocationContainer: {
        marginVertical: 12,
        width: "100%", 
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noLocationText: {
        fontSize: 18,
        color: 'white',
    }
  });
  