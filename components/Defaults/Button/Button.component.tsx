//Types
import { ReactElement } from "react";

//Constants
import { styles } from "./Button.styles";

//React Native
import { Pressable, Text } from 'react-native'

//Interface for Props
interface ButtonProps {
    children: string;
    onPress?: () => void;
}

export default function Button({children, onPress}:ButtonProps): ReactElement {
  return <Pressable style={({pressed}) => [styles.button, pressed ? styles.pressed : {}]} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </Pressable>
}