//Types
import { ReactElement } from "react";

//Constants
import { styles } from "./AddPlace.styles";
import { addPlaceFormValidationSchema } from "../../constants/validationSchemas";

//Components
import FormField from "../../components/Defaults/FormField/FormField.component";

//React Native
import {View, Text} from "react-native"

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
            <View style={styles.container}>
                <FormField 
                value={values.title} 
                onChangeText={handleChange('title')}
                label='Title'
                placeholder="Enter your title:" />
            </View>
        )}
    </Formik>
}