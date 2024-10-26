import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try{

        console.log('Seeding database');

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id:1,
                title:'Francais',
                isArabic: false,
                imageSrc:'/es.svg'
            },
            {
                id:2,
                title:'French',
                isArabic: false,
                imageSrc:'/fr.svg'
            },
            {
                id:3,
                title:'Italian',
                isArabic: false,
                imageSrc:'/it.svg'
            },
            {
                id:4,
                title:'Croatian',
                isArabic: false,
                imageSrc:'/hr.svg'
            }
        ]);


    await db.insert(schema.units).values([
        {
            id: 1,
            courseId: 1,
            isArabic:false,
            title: 'Unit 1',
            description: 'Les champs lexicaux',
            order: 1,
        }
    ]);


    await db.insert(schema.lessons).values([
        {
            id:1,
            isArabic:false,
            unitId: 1,
            title: 'Les champs lexicaux',
            order:1
        },
        {
            id:2,
            isArabic:false,
            unitId: 1,
            title: 'verbs',
            order:2
        },
        {
            id:3,
            isArabic:false,
            unitId: 1,
            title: 'adjectifs',
            order:3
        },
        {
            id:4,
            isArabic:false,
            unitId: 1,
            title: 'verbs',
            order:4
        },
        {
            id:5,
            isArabic:false,
            unitId: 1,
            title: 'verbs',
            order:5
        }

       
    ]);

    await db.insert(schema.challenges).values([


        {
            id: 1,
            lessonId: 1,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: true,
            order: 1,
            titleChallenge: 'Leçon 1 : Introduction aux Champs Lexicaux',
            question: "Aujourd'hui, nous allons découvrir ce que sont les champs lexicaux. Imaginez des groupes de mots qui parlent tous de la même chose. Prêts à apprendre et à jouer avec les mots ? Allons-y !",
            teacherReaction: '/teach.svg'
            

        },
        {
            id: 2,
            lessonId: 1,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 2,
            question: 'Un champ lexical est un groupe de mots qui se rapportent à une même idée ou un même thème. Ces mots peuvent être des noms, des adjectifs, des verbes, des adverbes, mais ils partagent tous un lien sémantique. Identifier les champs lexicaux dans un texte aide à comprendre le sujet principal abordé.',
            note: 'EXPLICATION',
            teacherReaction: '/teach.svg'
            

        },
        {
            id: 3,
            lessonId: 1,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 3,
            question: "En préparant leur examen, Rachad et ses amis ont remarqué des mots liés à la mort dans un texte. Ces mots appartiennent au champ lexical de la mort.",
            note: 'EXAMPLE',
            teacherReaction: '/teach.svg',
        },
        {
            id: 4,
            lessonId: 1,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 4,
            question: ' Quel est le champ lexical des mots suivants : douleur, chagrin, souffrance ?',
            note: 'QUIZ',
            
        },
        {
            id: 5,
            lessonId: 1,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 5,
            question: 'Identifiez le champ lexical dominant dans cette phrase : "Le jardin est rempli de fleurs colorées et parfumées.',
            note: 'QUIZ',

        },



       
       

       
    ]);



     
    await db.insert(schema.challengeOptions).values([
        {
            id: 1,
            challengeId: 4,
            isArabic: false,
            correct: false,
            text: 'La joie',

        },
        {
            id: 2,
            challengeId: 4,
            isArabic: false,
            correct: true,
            text: 'La tristesse',
        },
        {
            id: 3,
            challengeId: 4,
            isArabic: false,
            correct: false,
            text: 'La nature',
        }
    ]);

    

    await db.insert(schema.challengeOptions).values([
        {
            id: 4,
            challengeId: 5,
            isArabic: false,
            correct: false,
            text: 'La ville',

        },
        {
            id: 5,
            challengeId: 5,
            isArabic: false,
            correct: false,
            text: 'La guerre',
        },
        {
            id: 6,
            challengeId: 5,
            isArabic: false,
            correct: true,
            text: 'La nature',
        }
    ]);


   

  


    await db.insert(schema.challenges).values([
        {
            id: 6,
            lessonId: 2,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: true,
            order: 6,
            titleChallenge: 'Leçon 2 : Catégories de Mots dans un Champ Lexical',
            question: "Dans cette leçon, nous allons voir les différentes sortes de mots qui composent un champ lexical : synonymes, mots de la même famille et mots du même domaine. C’est comme organiser une équipe ! Prêts à commencer ?",
            teacherReaction: '/teach.svg'
        },

        {
            id: 7,
            lessonId: 2,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 7,
            question: "Les champs lexicaux sont constitués de différents types de mots :",
            note: 'EXPLICATION',
            teacherReaction: '/teach.svg'
        },

        {
            id: 8,
            lessonId: 2,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 8,
            question: "Synonymes : Mots ayant un sens similaire.",
            note: '1- Synonymes',
            teacherReaction: '/one.svg'
        },


        {
            id: 10,
            lessonId: 2,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 10,
            question: "Mots de la même famille : Mots dérivés d'un même radical.",
            note: '2- Mots de la même famille',
            teacherReaction: '/two.svg'
        },

        {
            id: 11,
            lessonId: 2,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 11,
            question: "Mots du même domaine : torture, privation, condamnation, peine capitale",
            note: '3- Mots du même domaine',
            teacherReaction: '/three.svg'
        },

        {
            id: 12,
            lessonId: 2,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 12,
            question: "Le champ lexical de « la peine » :",
            a: '- Synonymes : délit, tourment, chagrin, malheur.',
            b: '- Mots de la même famille : pénible, punition.',
            c: '- Mots du même domaine : torture, privation, condamnation, peine capitale.',
            note: 'EXEMPLE',
            teacherReaction: '/teach.svg'
        },

        {
            id: 13,
            lessonId: 2,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 13,
            question: 'Quel type de mot est "tourment" dans le champ lexical de « la peine » ?',
            note: 'QUIZ',

        },

        {
            id: 14,
            lessonId: 2,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 14,
            question: 'Pénible" dans le champ lexical de « la peine » est un :',
            note: 'QUIZ',

        },

        {
            id: 15,
            lessonId: 2,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 15,
            question: 'Quel type de mot est "privation" dans le champ lexical de « la peine » ?',
            note: 'QUIZ',

        },

  
       
    ]); 



    await db.insert(schema.challengeOptions).values([
        {
            id: 7,
            challengeId: 13,
            isArabic: false,
            correct: true,
            text: 'Synonyme',

        },
        {
            id: 8,
            challengeId: 13,
            isArabic: false,
            correct: false,
            text: 'Mot de la même famille',
        },
        {
            id: 9,
            challengeId: 13,
            isArabic: false,
            correct: false,
            text: 'Mot du même domaine',
        }
    ]);


    await db.insert(schema.challengeOptions).values([
        {
            id: 10,
            challengeId: 14,
            isArabic: false,
            correct: false,
            text: 'Synonyme',

        },
        {
            id: 11,
            challengeId: 14,
            isArabic: false,
            correct: false,
            text: 'Mot du même domaine',
            
        },
        {
            id: 12,
            challengeId: 14,
            isArabic: false,
            correct: true,
            text: 'Mot de la même famille',
            
        }
    ]);


    await db.insert(schema.challengeOptions).values([
        {
            id: 13,
            challengeId: 15,
            isArabic: false,
            correct: true,
            text: 'Mot du même domaine',
            

        },
        {
            id: 14,
            challengeId: 15,
            isArabic: false,
            correct: false,
            text: 'Mot de la même famille',
        },
        {
            id: 15,
            challengeId: 15,
            isArabic: false,
            correct: false,
            text: 'Synonyme',
        }
    ]);

    

    
    await db.insert(schema.challenges).values([

        {
            id: 16,
            lessonId: 3,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: true,
            order: 16,
            titleChallenge: 'Leçon 3 : Identification des Champs Lexicaux',
            question: "nous allons apprendre à repérer les champs lexicaux dans un texte. C’est un peu comme chercher des indices dans une enquête. Prêts à jouer les détectives des mots ? C’est parti !",
            teacherReaction: '/teach.svg'
        },

        {
            id: 17,
            lessonId: 3,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 17,
            question: "Pour identifier un champ lexical dans un texte, suivez ces étapes :",
            note: 'EXPLICATION',
            teacherReaction: '/teach.svg'
        },

        {
            id: 18,
            lessonId: 3,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 18,
            question: "Lire attentivement le texte.",
            note: 'Première étape',
            teacherReaction: '/one.svg'
        },


        {
            id: 19,
            lessonId: 3,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 19,
            question: "Repérer les mots-clés qui semblent liés par le sens.",
            note: 'Deuxième étape',
            teacherReaction: '/two.svg'
        },

        {
            id: 20,
            lessonId: 3,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 20,
            question: "Classer les mots selon leur relation thématique.",
            note: 'Troisième étape',
            teacherReaction: '/three.svg'
        },

        {
            id: 21,
            lessonId: 3,
            isArabic:false,
            type: 'LESSON',
            isFirstUnit: false,
            order: 21,
            question: "Nommer le champ lexical en fonction des mots regroupés.",
            note: 'Quatrième Étape',
            teacherReaction: '/four.svg'
        },



        {
            id: 22,
            lessonId: 3,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 22,
            question: 'Identifiez le champ lexical : "Les vagues frappaient le rivage tandis que les marins préparaient leur bateau pour la pêche."',
            note: 'QUIZ',

        },

        {
            id: 23,
            lessonId: 3,
            isArabic:false,
            type: 'ASSIST',
            isFirstUnit: false,
            order: 23,
            question: 'Identifiez le champ lexical : "Les élèves travaillent dur pour réussir leurs examens."',
            note: 'QUIZ',

        },

        

  
       
    ]); 


    await db.insert(schema.challengeOptions).values([
        {
            id: 16,
            challengeId: 22,
            isArabic: false,
            correct: false,
            text: 'La montagne',
            

        },
        {
            id: 17,
            challengeId: 22,
            isArabic: false,
            correct: false,
            text: 'La guerre',
        },
        {
            id: 18,
            challengeId: 22,
            isArabic: false,
            correct: true,
            text: 'La mer',
        }
    ]);




    await db.insert(schema.challengeOptions).values([
        {
            id: 19,
            challengeId: 23,
            isArabic: false,
            correct: true,
            text: "L'école",
            

        },
        {
            id: 20,
            challengeId: 23,
            isArabic: false,
            correct: false,
            text: 'La nourriture',
        },
        {
            id: 21,
            challengeId: 23,
            isArabic: false,
            correct: false,
            text: 'Les vacances',
        }
    ]);


    
    

        console.log('Seeding Finished');

    } catch(error){

        console.log(error);
        throw new Error('Failed to seed the database');
    }


   

}

main();