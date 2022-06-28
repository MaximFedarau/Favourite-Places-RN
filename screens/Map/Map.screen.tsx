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
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

//React Native Maps
import MapView, {MapEvent, Marker} from 'react-native-maps';

export default function Map(): ReactElement {

  type RouteProps = RouteProp<{[SCREEN_NAMES.MAP]?: {intialLocation?: LocationCoords}}>

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const [pickedLocation, setPickedLocation] = React.useState<LocationCoords | null>(null);  

  function onCoordsSelectHandler(event: MapEvent<{}>) {

    if (route.params) {
      return;
    }

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
    if (route.params) {
      setPickedLocation(route.params.intialLocation!);
      return;
    }
    navigation.setOptions({
      headerRight: ({tintColor}) => {
        return <Ionicons name="save" size={24} color={tintColor} onPress={saveSelectedCoords} />
      }
    })
  },[saveSelectedCoords])

  const region = {
    latitude: route.params ? route.params.intialLocation?.lat! : 37.78825,
    longitude: route.params ? route.params.intialLocation?.lng! : -122.4324,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0221,
  }

  return <MapView style={styles.container} initialRegion={region} onPress={onCoordsSelectHandler} scrollEnabled={!route.params}>
    {pickedLocation && <Marker draggable={!route.params} title="Picked Location" coordinate={{
        latitude: pickedLocation?.lat,
        longitude: pickedLocation?.lng,
    }} />}
  </MapView>
}