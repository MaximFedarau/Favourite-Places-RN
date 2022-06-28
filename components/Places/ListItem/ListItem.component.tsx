//Types
import { ReactElement } from "react";
import { Place } from "../../../constants/types";
import { NavigationProps } from "../../../constants/constants";

//Constants
import { styles } from "./ListItem.styles";
import { SCREEN_NAMES } from "../../../constants/constants";

//React Native
import { View, Pressable, Text, Image } from 'react-native'

//React Navigation
import {useNavigation} from "@react-navigation/native";

//Interface for Props
interface ListItemProps {
    children: Place,
}

export default function ListItem({children: place}:ListItemProps): ReactElement {
  const navigation = useNavigation<NavigationProps>();

  function onPressItemHandler() {
    navigation.navigate(SCREEN_NAMES.DETAILS, {placeId: place.id});
  }

  return <Pressable onPress={onPressItemHandler} style={({pressed}) => [styles.container, pressed ? styles.pressed : {} ]}>
    <Image source={{uri: place.imageUri}} style={styles.image} />
    <View style={styles.textContainer}>
    <Text style={styles.title}>{place.title}</Text>
    <Text style={styles.address}>{place.address}</Text>
    </View>
  </Pressable>
}