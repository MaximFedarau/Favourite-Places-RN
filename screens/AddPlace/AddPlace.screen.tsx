//Types
import React,{ ReactElement } from "react";
import { LocationCoords, AddPlaceForm } from "../../constants/types";
import { NavigationProps, SCREEN_NAMES } from "../../constants/constants";

//Constants
import { styles } from "./AddPlace.styles";
import { addPlaceFormValidationSchema } from "../../constants/validationSchemas";
import { insertPlace } from "../../utils/db";

//Components
import FormField from "../../components/Defaults/FormField/FormField.component";
import ImagePicker from "../../components/Places/ImagePicker/ImagePicker.component";
import LocationPicker from "../../components/Places/LocationPicker/LocationPicker.component";
import Button from "../../components/Defaults/Button/Button.component";

//Expo
import * as Location from 'expo-location';

//React Native
import {View, ScrollView, Text, Alert} from "react-native"

//React Navigation
import { useNavigation } from "@react-navigation/native";

//Formik
import { Formik } from "formik";

const formInitialValues:AddPlaceForm = {
    title: '',

}

export default function AddPlace():ReactElement {

    const navigation = useNavigation<NavigationProps>();

    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = React.useState<LocationCoords | null>(null);

    function handleImagePicked(image?:string) {
        if (image) setSelectedImage(image);
    }

    function handleLocationPicked(location?:LocationCoords) {
        if (location) setSelectedLocation(location);
    }


    async function handleFormSubmit(value: AddPlaceForm) {
        if (!selectedImage || !selectedLocation) {
            Alert.alert("You need to select an image and location");
            return;
        }
        const addressOptions = await Location.reverseGeocodeAsync({latitude: selectedLocation?.lat!, longitude: selectedLocation?.lng!});
        const address = `${addressOptions[0].city}, ${addressOptions[0].region}, ${addressOptions[0].country}`;
        insertPlace(value.title, selectedImage!, address, selectedLocation!)
        navigation.navigate(SCREEN_NAMES.HOME);
    } 

    return <Formik initialValues={formInitialValues} validationSchema={addPlaceFormValidationSchema} onSubmit={handleFormSubmit}>
        {({ values, handleSubmit, handleChange, errors }) => (
            <ScrollView style={styles.container}>
                <FormField 
                value={values.title} 
                onChangeText={handleChange('title')}
                label='Title'
                placeholder="Enter your title:" />
                {Object.keys(errors).length > 0 && <Text style={styles.errorText}>{errors ? errors.title : ''}</Text>}
                <ImagePicker formAction={handleImagePicked} />
                <LocationPicker formAction={handleLocationPicked} />
                <View style={styles.submitButtonContainer}>
                    <Button onPress={handleSubmit} mode="contained">Submit</Button>
                </View>
            </ScrollView>
        )}
    </Formik>
}