//Types
import { ReactElement } from "react";

//Constants
import { styles } from "./FormField.styles";

//React Native
import { TextInput, View, Text, TextInputProps } from 'react-native'

//Interface for Props
interface FormFieldProps extends TextInputProps {
    label?: string;
}

export default function FormField({label, ...props}:FormFieldProps): ReactElement {
    return <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput style={styles.input} {...props} />
    </View>
}