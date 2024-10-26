import {  Create, TextField, SimpleForm, required, TextInput, ReferenceField, NumberInput, ReferenceInput, SelectInput, BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {

    return( 
    <Create>
        <SimpleForm >
        <TextInput label='Id'  source="id" validate={[required()]} />
            <TextInput label='Text'  source="text" validate={[required()]} />
            <ReferenceInput source="challengeId" reference="challenges"  />
            <BooleanInput label="Is Arabic" source="isArabic" validate={[required()]}/>
            <BooleanInput label='Correct Option' source="correct"/>
            <NumberInput label='Image Url' source='imageSrc'/>

        
        </SimpleForm>
    </Create>
    )
}