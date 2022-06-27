//Types
import { ReactElement } from "react";
import { Place } from "../../../constants/types";

//React Native
import { View, Text } from 'react-native'

//Interface for Props
interface ListItemProps {
    children: Place,
}

export default function ListItem({children: place}:ListItemProps): ReactElement {
  return <View>
    <Text>{place.title}</Text>
  </View>
}