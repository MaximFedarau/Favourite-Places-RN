import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Screen Names
export enum SCREEN_NAMES {
    HOME = 'Home',
    ADD_PLACE = 'AddPlace',
}

//Navigation Props
type RootStackParamList = {
    [SCREEN_NAMES.HOME]?: {},
    [SCREEN_NAMES.ADD_PLACE]?: {},
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>