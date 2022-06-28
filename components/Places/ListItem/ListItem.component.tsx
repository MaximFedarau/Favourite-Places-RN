//Types
import { ReactElement } from "react";
import { Place } from "../../../constants/types";

//Constants
import { styles } from "./ListItem.styles";

//React Native
import { View, Pressable, Text, Image } from 'react-native'

//Interface for Props
interface ListItemProps {
    children: Place,
}

export default function ListItem({children: place}:ListItemProps): ReactElement {
  console.log(place);
  return <Pressable style={({pressed}) => [styles.container, pressed ? styles.pressed : {} ]}>
    <Image source={{uri: place.imageUri}} style={styles.image} />
    <View style={styles.textContainer}>
    <Text style={styles.title}>{place.title}</Text>
    <Text style={styles.address}>{place.address}</Text>
    </View>
  </Pressable>
}