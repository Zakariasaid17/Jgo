import {  Create, TextField, SimpleForm, required, TextInput, ReferenceField, NumberInput, ReferenceInput, BooleanInput } from "react-admin";

export const LessonCreate = () => {

    return( 
    <Create>
        <SimpleForm >
            <TextInput label='Title'  source="title" validate={[required()]} />
            <ReferenceInput source="unitId" reference="units"  />
            <BooleanInput source="isArabic" validate={[required()]}/>
            <NumberInput label='Order' source='order' validate={[required()]} />

        
        </SimpleForm>
    </Create>
    )
}