//Types
import { ReactElement } from "react";

//Constants
import { styles } from "./LocationPicker.styles";

//Components
import Button from "../Button/Button.component";

//Expo
import * as Location from 'expo-location';

//React Native
import { View, Alert } from 'react-native'

export default function LocationPicker(): ReactElement {

  const [status, requestPermission] = Location.useForegroundPermissions();

  async function getPermission() {
    if (status?.status === Location.PermissionStatus.UNDETERMINED) {
        const response = await requestPermission();

        return response.granted;
    }

    if (status?.status === Location.PermissionStatus.DENIED) {
        Alert.alert("Insufficient permissions", "You need to grant camera permissions to use this app. Please go to settings and grant permissions.")
        return false;
    }
    
    return true;
  }  

  async function findUserHandler() {
        const status = await getPermission();
        if (!status) return;
        const position = await Location.getCurrentPositionAsync();
        console.log(position)
    }

  function selectCoordsHandler() {
    console.log("Select coords");
  }  

  return <View>
    <View></View>
    <View style={styles.actions}>
        <Button onPress={findUserHandler}>Find me</Button>
        <Button onPress={selectCoordsHandler}>Select</Button>
    </View>
  </View>
}