import {  Create, TextField, SimpleForm, required, TextInput, Edit, NumberInput, ReferenceInput, BooleanField, BooleanInput } from "react-admin";

export const LessonEdit = () => {

    return( 
        <Edit>
        <SimpleForm >
            <TextInput label='Id'  source="id" validate={[required()]} />
            <TextInput label='Title'  source="title" validate={[required()]} />
            <BooleanInput source="isArabic" validate={[required()]}/>
            <ReferenceInput source="unitId" reference="units"  />
            <NumberInput label='Order' source='order' validate={[required()]} />

        
        </SimpleForm>
    </Edit>
    )
}