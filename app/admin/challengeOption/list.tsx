import { BooleanField, Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from "react-admin";

export const ChallengeOptionList = () => {

    return( 
    <List>
        <Datagrid rowClick='edit'>
            <TextField source='id'/>
            <TextField source="text"/>
            <BooleanField source='isArabic'/>
            <BooleanField source='correct'/>
            <ReferenceField source="challengId" reference="challenges"/>
            <TextField source="imageSrc"/>

     
        </Datagrid>
    </List>
    )
}