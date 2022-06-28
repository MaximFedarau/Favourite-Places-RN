import * as yup from 'yup';

export const addPlaceFormValidationSchema = yup.object().shape({
    title: yup.string().required("Please, enter your title."),
});