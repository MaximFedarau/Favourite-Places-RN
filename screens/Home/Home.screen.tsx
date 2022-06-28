//Types
import React, { ReactElement } from "react";
import { Place } from "../../constants/types";

//Constants
import { styles } from "./Home.styles";
import { fetchPlaces } from "../../utils/db";

//Components
import List from "../../components/Places/List/List.component";

//React Native
import { View, Text } from "react-native";

//React Navigation
import { useIsFocused } from "@react-navigation/native";

export default function Home(): ReactElement {
  const [places, setPlaces] = React.useState<Place[]>([]);

  const isFocus = useIsFocused();

  React.useEffect(() => {
    fetchPlaces().then<any,any>((res) => {
      setPlaces(res);
    })
  },[isFocus])


  return <View style={[styles.container, places.length > 0 ? {} : styles.emptyContainer]}>
    {places.length > 0 ? <List>{places}</List> : <Text style={styles.noPlacesText}>No places</Text>}
  </View>
}