//Types
import { ReactElement } from "react";

//Expo
import * as ExpoImagePicker from 'expo-image-picker';

//React Native
import { View, Button, Alert } from 'react-native'

export default function ImagePicker():ReactElement {
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
        console.log(image);
    }

    return <View>
        <View>
            </View> 
        <Button title="Select photo" onPress={takeImageHandler} />
    </View>
}