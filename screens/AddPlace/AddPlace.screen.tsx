//Types
import React,{ ReactElement } from "react";
import { LocationCoords } from "../../constants/types";

//Constants
import { styles } from "./AddPlace.styles";
import { addPlaceFormValidationSchema } from "../../constants/validationSchemas";

//Components
import FormField from "../../components/Defaults/FormField/FormField.component";
import ImagePicker from "../../components/Places/ImagePicker/ImagePicker.component";
import LocationPicker from "../../components/Places/LocationPicker/LocationPicker.component";
import Button from "../../components/Defaults/Button/Button.component";

//React Native
import {View, ScrollView, Text} from "react-native"

//Formik
import { Formik } from "formik";

const formInitialValues = {
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


    function handleFormSubmit(value: any) {
        console.log(value);
        console.log(selectedImage);
        console.log(selectedLocation);
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