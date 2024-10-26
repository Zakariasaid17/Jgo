import {  Create, TextField, SimpleForm, required, TextInput, ReferenceField, NumberInput, ReferenceInput, SelectInput, BooleanInput, Edit } from "react-admin";

export const ChallengeEdit = () => {

    return( 
    <Edit>
        <SimpleForm >
            
            <TextInput label='Id'  source="id" validate={[required()]} />
            <NumberInput label='Order' source='order' validate={[required()]} />
            <ReferenceInput source="lessonId" reference="lessons"  />
            <BooleanInput label='IsFirstUnit' source="isFirstUnit" validate={[required()]} />
            <SelectInput 
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
             validate={[required()]}
            />
            <TextInput label='TitleChallenge' source="titleChallenge" />
            <TextInput label='Question'  source="question" validate={[required()]} />
            <TextInput label='Sousquestion' source='sousQuestion'/>
            <TextInput label='One' source='one'/>
            <TextInput label='Two' source='two'/>
            <TextInput label='Three' source='three'/>
            <TextInput label='Four' source='four'/>
            <TextInput label='Five' source='five'/>
            <TextInput label='Six' source='six'/>
            <TextInput label='Sousquestiontwo' source='sousQuestionTwo'/>
            <TextInput label='One2' source='one2'/>
            <TextInput label='Two2' source='two2'/>
            <TextInput label='Three2' source='three2'/>
            <TextInput label='Four2' source='four2'/>
            <TextInput label='Five2' source='five2'/>
            <TextInput label='Six2' source='six2'/>
            <TextInput label='Exemple' source='example' />
            <TextInput label='Sousexemple' source='sousExemple'/>
            <TextInput label='A' source="a"/>
            <TextInput label='B' source="b"/>
            <TextInput label='C' source="c"/>
            <TextInput label='D' source="d"/>
            <TextInput label='E' source="e"/>
            <TextInput label='F' source="f"/>
            <TextInput label='AiImage' source='aiImage'/>
            <TextInput label='Example2' source='example2'/>
            <TextInput label='Sousexemple2' source='sousExemple2'/>
            <TextInput label='A2' source="a2"/>
            <TextInput label='B2' source="b2"/>
            <TextInput label='C2' source="c2"/>
            <TextInput label='D2' source="d2"/>
            <TextInput label='E2' source="e2"/>
            <TextInput label='F2' source="f2"/>
            <TextInput label='ExempleImage' source="exempleImage"/>
            <TextInput label='ExempleImage2' source="exempleImage2"/>
            <TextInput label='Aretenir' source="aretenir"/>
            <TextInput label='RetenirA' source="retenirA"/>
            <TextInput label='RetenirB' source="retenirB"/>
            <TextInput label='RetenirC' source="retenirC"/>
            <TextInput label='RetenirD' source="retenirD"/>
            <TextInput label='ProfReaction' source="profReaction"/>
            <BooleanInput label='IsArabic' source='isArabic' validate={[required()]} />
            <TextInput label='Note' source="note"/>
            <TextInput label='TeacherReaction' source="teacherReaction"/>
            <TextInput label='video' source="video"/>
            

        
        </SimpleForm>
    </Edit>
    )
}