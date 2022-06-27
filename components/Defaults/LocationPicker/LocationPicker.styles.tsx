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
      backgroundColor: PRIMARY_500,
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
  });
  