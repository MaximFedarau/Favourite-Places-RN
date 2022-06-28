import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LocationCoords } from "./types";

//Screen Names
export enum SCREEN_NAMES {
    HOME = 'Home',
    ADD_PLACE = 'AddPlace',
    MAP = 'Map',
    DETAILS = 'Details',
}

//Navigation Props
type RootStackParamList = {
    [SCREEN_NAMES.HOME]?: {},
    [SCREEN_NAMES.ADD_PLACE]?: {location: LocationCoords },
    [SCREEN_NAMES.MAP]?: {intialLocation: LocationCoords},
    [SCREEN_NAMES.DETAILS]?: {placeId: string},
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>