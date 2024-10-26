import { BooleanField, Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from "react-admin";

export const ChallengeList = () => {

    return( 
    <List >
        <Datagrid rowClick='edit'>
            <TextField source='id'/>
            <TextField source="question"/>
            <TextField source='sousQuestion'/>
            <TextField source='one'/>
            <TextField source='two'/>
            <TextField source='three'/>
            <TextField source='four'/>
            <TextField source='five'/>
            <TextField source='six'/>
            <TextField source='sousQuestionTwo'/>
            <TextField source='one2'/>
            <TextField source='two2'/>
            <TextField source='three2'/>
            <TextField source='four2'/>
            <TextField source='five2'/>
            <TextField source='six2'/>
            <TextField source='example'/>
            <TextField source='sousExemple'/>
            <TextField source="a"/>
            <TextField source="b"/>
            <TextField source="c"/>
            <TextField source="d"/>
            <TextField source="e"/>
            <TextField source="f"/>
            <TextField source='example2'/>
            <TextField source='sousExemple2'/>
            <TextField source="a2"/>
            <TextField source="b2"/>
            <TextField source="c2"/>
            <TextField source="d2"/>
            <TextField source="e2"/>
            <TextField source="f2"/>
            <TextField source='aiImage'/>
            <TextField source="exempleImage"/>
            <TextField source="exempleImage2"/>
            <TextField source='retenir'/>
            <TextField source="retenirA"/>
            <TextField source="retenirB"/>
            <TextField source="retenirC"/>
            <TextField source="retenirD"/>
            <SelectField
             source="type" 
             choices={[
                {
                    id: 'SELECT',
                    name: 'SELECT',
                },
                {
                    id: 'ASSIST',
                    name: 'ASSIST',
                },
                {
                    id: 'LESSON',
                    name: 'LESSON',
                },


             ]}
             />
            <NumberField source="order"/>
            <ReferenceField source="lessonId" reference="lessons"/>
            <TextField source='imageSrc'/>
            <TextField source='titleChallenge'/>
            <BooleanField source="isArabic"/>
            <TextField source='titleChallenge'/>
            <TextField source="teacherReaction"/>
            <TextField source="note"/>
            <TextField source="video"/>
            <BooleanField source='isFirstUnit'/>



        
        </Datagrid>
    </List>
    )
}