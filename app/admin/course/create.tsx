import {  Create, TextField, SimpleForm, required, TextInput, BooleanInput } from "react-admin";

export const CourseCreate = () => {

    return( 
    <Create>
        <SimpleForm >
            <TextInput label='Id'  source="id" validate={[required()]} />
            <TextInput label='Title'  source="title" validate={[required()]} />
            <BooleanInput label='IsArabic' source='isArabic' validate={[required()]}/>
            <TextInput label='Image'  source="imageSrc" validate={[required()]} />

        
        </SimpleForm>
    </Create>
    )
}