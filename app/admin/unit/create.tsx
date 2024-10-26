import {  Create, TextField, SimpleForm, required, TextInput, ReferenceField, NumberInput, ReferenceInput, BooleanInput } from "react-admin";

export const UnitCreate = () => {

    return( 
    <Create>
        <SimpleForm >
            <TextInput label='Title'  source="title" validate={[required()]} />
            <TextInput label='Description'  source="description" validate={[required()]} />
            <BooleanInput source="isArabic" validate={[required()]}/>
            <ReferenceInput source="courseId" reference="courses"  />
            <NumberInput label='Order' source='order' validate={[required()]} />

        
        </SimpleForm>
    </Create>
    )
}