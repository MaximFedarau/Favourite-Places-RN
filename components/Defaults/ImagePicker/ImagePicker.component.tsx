//Types
import React,{ ReactElement } from "react";

//Constants
import { styles } from "./ImagePicker.styles";

//Components
import Button from "../Button/Button.component";

//Expo
import * as ExpoImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';

//React Native
import { View,  Alert, Image, Text } from 'react-native'

export default function ImagePicker():ReactElement {

    const [image, setImage] = React.useState<string | null>(null);

    const [cameraPermission, requestPermission] = ExpoImagePicker.useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermission?.status === ExpoImagePicker.PermissionStatus.UNDETERMINED) {
            const response = await requestPermission();

            return response.granted;
        }

        if (cameraPermission?.status === ExpoImagePicker.PermissionStatus.DENIED) {
            Alert.alert("Insufficient permissions", "You need to grant camera permissions to use this app. Please go to settings and grant permissions.")
            return false;
        }
        
        return true;
    }

    async function takeImageHandler() {
        const status = await verifyPermissions();
        if (!status) return;
        const image = await ExpoImagePicker.launchCameraAsync({
            allowsEditing: true, 
            aspect: [16, 9], 
            quality: 0.5});
        if (!image.cancelled) setImage(image.uri)
    }

    return <View style={styles.container}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <View style={styles.noImageContainer}>
            <Ionicons name="camera" size={64} color="white" />
            <Text style={styles.noImageText}>No image was selected.</Text>
        </View> }
        <Button onPress={takeImageHandler}>Select photo</Button>
    </View>
}