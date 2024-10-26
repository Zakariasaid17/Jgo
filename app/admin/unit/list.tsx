import { BooleanField, Datagrid, List, ReferenceField, TextField } from "react-admin";

export const UnitList = () => {

    return( 
    <List>
        <Datagrid rowClick='edit'>
            <TextField source='id'/>
            <TextField source="title"/>
            <BooleanField source="isArabic"/>
            <TextField source="description"/>
            <TextField source="order"/>
            <ReferenceField source="courseId" reference="courses"/>
            <TextField source='imageSrc'/>

        
        </Datagrid>
    </List>
    )
}