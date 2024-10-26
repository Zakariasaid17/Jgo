import { BooleanField, Datagrid, List, TextField } from "react-admin";

export const CourseList = () => {

    return( 
    <List>
        <Datagrid rowClick='edit'>
            <TextField source='id'/>
            <TextField source="title"/>
            <BooleanField source='isArabic'/>
            <TextField source='imageSrc'/>

        
        </Datagrid>
    </List>
    )
}