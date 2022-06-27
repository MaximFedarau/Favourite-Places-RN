//Types
import { ReactElement } from "react";

//Constants
import { styles } from "./AddPlace.styles";
import { addPlaceFormValidationSchema } from "../../constants/validationSchemas";

//Components
import FormField from "../../components/Defaults/FormField/FormField.component";
import ImagePicker from "../../components/Defaults/ImagePicker/ImagePicker.component";

//React Native
import {View, ScrollView} from "react-native"

//Formik
import { Formik } from "formik";

const formInitialValues = {
    title: '',

}

export default function AddPlace():ReactElement {

    function handleSubmit(values:any) {
        console.log(values)
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
            </ScrollView>
        )}
    </Formik>
}