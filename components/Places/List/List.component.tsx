//Types
import { ReactElement} from "react";
import {Place} from '../../../constants/types'

//Constants
import { styles } from "./List.styles";

//Components
import ListItem from "../ListItem/ListItem.component";

//React Native
import {View, FlatList} from "react-native"

//Interface for Props
interface ListProps {
    children: Place[],
}

export default function List({children}:ListProps):ReactElement {
    return <FlatList style={styles.container} data={children} keyExtractor={(item) => item.id} renderItem={({item}) => <ListItem>{item}</ListItem>} />
}