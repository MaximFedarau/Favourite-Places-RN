//Types
import React, { ReactElement } from "react";
import { LocationCoords } from "../../constants/types";
import {NavigationProps} from "../../constants/constants"

//Constants
import { styles } from "./Map.styles";
import { SCREEN_NAMES } from "../../constants/constants";

//Expo
import { Ionicons } from "@expo/vector-icons";

//React Native
import { Alert } from 'react-native'

//React Navigation
import { useNavigation } from "@react-navigation/native";

//React Native Maps
import MapView, {MapEvent, Marker} from 'react-native-maps';

export default function Map(): ReactElement {

  const navigation = useNavigation<NavigationProps>();

  const [pickedLocation, setPickedLocation] = React.useState<LocationCoords | null>(null);  

  function onCoordsSelectHandler(event: MapEvent<{}>) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setPickedLocation({ lat: lat, lng: lng });
  } 

  const saveSelectedCoords = React.useCallback(() => {
    if (!pickedLocation?.lat || !pickedLocation?.lng) {
      Alert.alert("Please select a location on the map.")
      return;
    }
    navigation.navigate(SCREEN_NAMES.ADD_PLACE, {location: pickedLocation})
  },[pickedLocation]) 

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => {
        return <Ionicons name="save" size={24} color={tintColor} onPress={saveSelectedCoords} />
      }
    })
  },[saveSelectedCoords])

  return <MapView style={styles.container} initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }} onPress={onCoordsSelectHandler}>
    {pickedLocation && <Marker title="Picked Location" coordinate={{
        latitude: pickedLocation?.lat,
        longitude: pickedLocation?.lng,
    }} />}
  </MapView>
}