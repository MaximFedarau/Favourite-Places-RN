//Types
import React,{ ReactElement } from "react";
import { LocationCoords } from "../../../constants/types";
import { NavigationProps } from "../../../constants/constants";

//Constants
import { styles } from "./LocationPicker.styles";

//Components
import Button from "../Button/Button.component";

//Expo
import * as Location from 'expo-location';
import {Ionicons} from '@expo/vector-icons';

//React Native
import { View, Alert, Text } from 'react-native'

//React Navigation
import {useNavigation} from "@react-navigation/native"

//React Native Maps
import MapView, {Marker} from 'react-native-maps';

export default function LocationPicker(): ReactElement {

  const navigation = useNavigation<NavigationProps>();

  const [pickedLocation, setPickedLocation] = React.useState<LocationCoords | null>(null);  

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
        setPickedLocation({lat: position.coords.latitude, lng: position.coords.longitude});
    }

  function selectCoordsHandler() {
    navigation.navigate("Map")
  }  

  return <View>
    {pickedLocation ? <View style={styles.mapPreview}><MapView style={styles.image} initialRegion={{
        longitude: pickedLocation.lng,
        latitude: pickedLocation.lat,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
    }} scrollEnabled={false} showsBuildings showsCompass showsIndoors>
      <Marker title="Picked Location" coordinate={{
          longitude: pickedLocation.lng,
          latitude: pickedLocation.lat,}} />
      </MapView></View> : <View style={styles.noLocationContainer}>
            <Ionicons name="location" size={64} color="white" />
            <Text style={styles.noLocationText}>No location was selected.</Text>
        </View>}
    <View style={styles.actions}>
        <Button onPress={findUserHandler}>Find me</Button>
        <Button onPress={selectCoordsHandler}>Select</Button>
    </View>
  </View>
}