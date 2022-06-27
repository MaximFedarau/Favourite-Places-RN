//Types
import { ReactElement } from "react";

//React Native
import {View, Text} from "react-native"

export default function AddPlace():ReactElement {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{color: 'white'}}>Add Place</Text>
    </View>
}