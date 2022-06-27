//Types
import React,{ ReactElement } from "react";

//Constants
import { styles } from "./AddPlace.styles";
import { addPlaceFormValidationSchema } from "../../constants/validationSchemas";
import { SCREEN_NAMES } from "../../constants/constants";
import { LocationCoords } from "../../constants/types";

//Components
import FormField from "../../components/Defaults/FormField/FormField.component";
import ImagePicker from "../../components/Defaults/ImagePicker/ImagePicker.component";
import LocationPicker from "../../components/Defaults/LocationPicker/LocationPicker.component";

//React Native
import {View, ScrollView} from "react-native"

//Formik
import { Formik } from "formik";

const formInitialValues = {
    title: '',

}

export default function AddPlace():ReactElement {


    function handleSubmit(value: any) {
        console.log(value);
    } 

    return <Formik initialValues={formInitialValues} validationSchema={addPlaceFormValidationSchema} onSubmit={handleSubmit}>
        {({ values, handleSubmit, handleChange }) => (
            <ScrollView style={styles.container}>
                <FormField 
                value={values.title} 
                onChangeText={handleChange('title')}
                label='Title'
                placeholder="Enter your title:" />
                <ImagePicker />
                <LocationPicker/>
            </ScrollView>
        )}
    </Formik>
}