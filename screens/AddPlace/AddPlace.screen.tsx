//Types
import React,{ ReactElement } from "react";
import { LocationCoords, AddPlaceForm } from "../../constants/types";

//Constants
import { styles } from "./AddPlace.styles";
import { addPlaceFormValidationSchema } from "../../constants/validationSchemas";

//Components
import FormField from "../../components/Defaults/FormField/FormField.component";
import ImagePicker from "../../components/Places/ImagePicker/ImagePicker.component";
import LocationPicker from "../../components/Places/LocationPicker/LocationPicker.component";
import Button from "../../components/Defaults/Button/Button.component";

//Expo
import * as Location from 'expo-location';

//React Native
import {View, ScrollView, Text} from "react-native"

//Formik
import { Formik } from "formik";

const formInitialValues:AddPlaceForm = {
    title: '',

}

export default function AddPlace():ReactElement {

    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = React.useState<LocationCoords | null>(null);

    function handleImagePicked(image?:string) {
        if (image) setSelectedImage(image);
    }

    function handleLocationPicked(location?:LocationCoords) {
        if (location) setSelectedLocation(location);
    }


    async function handleFormSubmit(value: AddPlaceForm) {
        const addressOptions = await Location.reverseGeocodeAsync({latitude: selectedLocation?.lat!, longitude: selectedLocation?.lng!});
        const address = `${addressOptions[0].city}, ${addressOptions[0].region}, ${addressOptions[0].country}`;
        console.log(address);
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