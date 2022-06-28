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
    mode?: 'contained' | 'outlined';
    disabled?: boolean;
}

export default function Button({children, onPress, mode, disabled}:ButtonProps): ReactElement {
  return <Pressable disabled={disabled} style={({pressed}) => [styles.button, pressed ? styles.pressed : {}, mode === 'contained' ? styles.contained : {} ]} onPress={onPress}>
    <Text style={[styles.text, mode === "contained" ? styles.containedText : {}]}>{children}</Text>
  </Pressable>
}