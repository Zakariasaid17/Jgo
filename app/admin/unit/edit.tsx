import {  Create, TextField, SimpleForm, required, TextInput, Edit, NumberInput, ReferenceInput, BooleanInput } from "react-admin";

export const UnitEdit = () => {

    return( 
        <Edit>
        <SimpleForm >
            <TextInput label='Id'  source="id" validate={[required()]} />
            <TextInput label='Title'  source="title" validate={[required()]} />
            <BooleanInput source="isArabic" validate={[required()]}/>
            <TextInput label='Description'  source="description" validate={[required()]} />
            <ReferenceInput source="courseId" reference="courses"  />
            <NumberInput label='Order' source='order' validate={[required()]} />

        
        </SimpleForm>
    </Edit>
    )
}