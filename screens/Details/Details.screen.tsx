//Types
import React, { ReactElement } from "react";
import { Place } from "../../constants/types";
import { NavigationProps } from "../../constants/constants";

//Constants
import { getInfoById } from "../../utils/db";
import { SCREEN_NAMES } from "../../constants/constants";
import { styles } from "./Detail.styles";

//Components
import Button from "../../components/Defaults/Button/Button.component";

//React Native
import { ScrollView ,View, Text, Image } from 'react-native'

//React Navigation
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

export default function Details(): ReactElement {

  type RouteProps = RouteProp<{[SCREEN_NAMES.DETAILS]?: {placeId?: string}}>

  const route = useRoute<RouteProps>();
  const navigator = useNavigation<NavigationProps>();

  const [place, setPlace] = React.useState<Place | null>(null);

  React.useEffect(() => {
    if (route.params) {
        getInfoById(route.params.placeId!).then((res) => {
            setPlace(res);
            navigator.setOptions({
              title: res.title,
            })
        }).catch((err) => {
            console.log(err);
        })
    }
  },[])  

  function onMapPressHandler() {
    navigator.navigate(SCREEN_NAMES.MAP, {
      intialLocation: place?.location!,
    });
  }

  return <ScrollView style={styles.container}>
    <Image source={{uri: place?.imageUri }} style={styles.image} />
    <View style={styles.actionsContainer}>
      <Text style={styles.address}>{place?.address}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={onMapPressHandler}>Show on Map</Button>
      </View>
    </View>
  </ScrollView>
}