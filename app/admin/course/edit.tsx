import {  Create, TextField, SimpleForm, required, TextInput, Edit, BooleanInput } from "react-admin";

export const CourseEdit = () => {

    return( 
    <Edit>
        <SimpleForm >
            <TextInput label='Id'  source="id" validate={[required()]} />
            <TextInput label='Title'  source="title" validate={[required()]} />
            <BooleanInput label='IsArabic' source='isArabic' validate={[required()]}/>
            <TextInput label='Image'  source="imageSrc" validate={[required()]} />

        
        </SimpleForm>
    </Edit>
    )
}