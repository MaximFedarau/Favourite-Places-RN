//Types
import React,{ ReactElement } from "react";
import { LocationCoords } from "../../../constants/types";
import { NavigationProps } from "../../../constants/constants";
import { SCREEN_NAMES } from "../../../constants/constants";

//Constants
import { styles } from "./LocationPicker.styles";

//Components
import Button from "../../Defaults/Button/Button.component";

//Expo
import * as Location from 'expo-location';
import {Ionicons} from '@expo/vector-icons';

//React Native
import { View, Alert, Text } from 'react-native'

//React Navigation
import {useNavigation, useRoute, useIsFocused, RouteProp} from "@react-navigation/native"

//React Native Maps
import MapView, {Marker} from 'react-native-maps';

//Interface for Props
interface LocationPickerProps {
  formAction?: (location?: LocationCoords) => void;
}

export default function LocationPicker({formAction}:LocationPickerProps): ReactElement {

  type LocationPickerRouteProp = RouteProp<{[SCREEN_NAMES.ADD_PLACE]: {location:LocationCoords}}>;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<LocationPickerRouteProp>();
  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = React.useState<LocationCoords | null>(null); 

  React.useEffect(() => {
    if (isFocused && route.params) {
      setPickedLocation(route.params.location);
      if (formAction) formAction(route.params.location);
    }
  },[isFocused])
 

  const [status, requestPermission] = Location.useForegroundPermissions();

  async function getPermission() {
    if (status?.status === Location.PermissionStatus.UNDETERMINED) {
        const response = await requestPermission();

        return response.granted;
    }

    if (status?.status === Location.PermissionStatus.DENIED) {
        Alert.alert("Insufficient permissions", "You need to grant location permissions to use this app. Please go to settings and grant permissions.")
        return false;
    }
    
    return true;
  }  

  async function findUserHandler() {
        const status = await getPermission();
        if (!status) return;
        const position = await Location.getCurrentPositionAsync();
        setPickedLocation({lat: position.coords.latitude, lng: position.coords.longitude});
        if (formAction) formAction({lat: position.coords.latitude, lng: position.coords.longitude});
    }

  function selectCoordsHandler() {
    navigation.navigate(SCREEN_NAMES.MAP)
  }  

  return <View>
    {pickedLocation ? <View style={styles.mapPreview}><MapView style={styles.image} region={{
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