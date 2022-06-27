//Types
import React, { ReactElement } from "react";
import { Place } from "../../constants/types";

//Constants
import { styles } from "./Home.styles";

//Components
import List from "../../components/Places/List/List.component";

//React Native
import { View, Text } from "react-native";

export default function Home(): ReactElement {
  const [places, setPlaces] = React.useState<Place[]>([]);
  return <View style={[styles.container, places.length > 0 ? {} : styles.emptyContainer]}>
    {places.length > 0 ? <List>{places}</List> : <Text style={styles.noPlacesText}>No places</Text>}
  </View>
}