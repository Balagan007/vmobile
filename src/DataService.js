import {data }from './dummyData';
import './quizes.json';
import firebaseSystem from './firebase.config';
import firebase from 'firebase';
const fs = require('fs');


const db = firebaseSystem.db;
export default class DataService {
    
    static formatdate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month<10){
            month = '0'+ month;
        }
        if(day<10){
            day = '0'+ day;
        }
        return year+"-"+month+"-"+day;
    }
    static async getDashboardData(prof) {
        let fetchResult = {"classes":[], "students":{}, "curriculum":[]};
        const response=db.collection('Institution').doc("lecat");
        //const curriculum = await response.get();
        //const classes=await response.collection("Class").get();
        //const students = await response.collection("Student").get();
        let [curriculum, classes, students] = await Promise.all([response.get(),response.collection("Class").get(),response.collection("Student").get()]);
        fetchResult.curriculum = curriculum.data();
        classes.docs.forEach(item=>{
            fetchResult.classes.push({"id":item.id, "data":item.data()})
        });
        
        let result = {};
        fetchResult.classes.forEach(each =>{
            students.docs.forEach(item =>{
                if(each.data.student.includes(item.id)){
                    if(result[each.id]) {
                        result[each.id].push({"id":item.id,"data":item.data()})
                    } else {
                        result[each.id]=[{"id":item.id,"data":item.data()}]
                    }
                }
            })
        })
        fetchResult.students = result;
        console.log(fetchResult);
        return fetchResult;
        //return [{"id":"class 1", "data":{"quizes":["quiz 1"], "exams":["exam 1"]}}];
    }

    static async getStudentsData(prof) {
        let fetchResult = {"classes":[], "studentsByClass":{}, "curriculum":[], "students":[]};
        const response=db.collection('Institution').doc("lecat");
        const curriculum = await response.get();
        const classes=await response.collection("Class").get();
        const students = await response.collection("Student").get();
        fetchResult.curriculum = curriculum.data();
        classes.docs.forEach(item=>{
            fetchResult.classes.push({"id":item.id, "data":item.data()})
        });
        
        let result = {};
        fetchResult.classes.forEach(each =>{
            students.docs.forEach(item =>{
                if(each.data.student.includes(item.id)){
                    if(result[each.id]) {
                        result[each.id].push({"id":item.id,"data":item.data()})
                    } else {
                        result[each.id]=[{"id":item.id,"data":item.data()}]
                    }
                }
            })
        });
        students.docs.forEach(item =>{
            fetchResult.students.push({"id":item.id, "data":item.data()})
        });
        fetchResult.studentsByClass = result;
        console.log(fetchResult);
        return fetchResult;
    }

    static async getQuizesData(prof) {
        let fetchResult = {"classes":[], "studentsByClass":{}, "quizes":[], "students":[]};
        const response=db.collection('Institution').doc("lecat");
        const quizes = await response.collection("Quiz").get();
        const classes=await response.collection("Class").get();
        const students = await response.collection("Student").get();
        
        quizes.docs.forEach(item =>{
            fetchResult.quizes.push({"id":item.id, "data": item.data()});
        })
        classes.docs.forEach(item=>{
            fetchResult.classes.push({"id":item.id, "data":item.data()})
        });
        
        let result = {};
        fetchResult.classes.forEach(each =>{
            students.docs.forEach(item =>{
                if(each.data.student.includes(item.id)){
                    if(result[each.id]) {
                        result[each.id].push({"id":item.id,"data":item.data()})
                    } else {
                        result[each.id]=[{"id":item.id,"data":item.data()}]
                    }
                }
            })
        });
        students.docs.forEach(item =>{
            fetchResult.students.push({"id":item.id, "data":item.data()})
        });
        fetchResult.studentsByClass = result;
        console.log(fetchResult);
        return fetchResult;
    }

    static async getQuestionBankData(prof) {
        let fetchResult = {};
        const response=db.collection('Institution').doc("lecat");
        const questions = await response.collection("QuestionBank").get();
        
        questions.docs.forEach(item =>{
            let data = item.data();
            if (fetchResult[data.category]){
                fetchResult[data.category].push(data);
            } else {
                fetchResult[data.category] = [data];
            }
        })
        
        console.log(fetchResult);
        return fetchResult;
    }

    static async postCreateClassData(className,students){
        let result = await db.collection("Institution").doc("lecat").collection("Class").doc(className).set({
            student: students,
            quiz: [],
            name: className
        })
        .then((data) => {
            console.log("Document successfully written!");
            return "successfully created";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            return "error";
        });

        return result;
    }

    static async getClass(className){
        let result = await db.collection("Institution").doc("lecat").collection("Class").doc(className).get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return "exist";
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return "No suh class exist";
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return "error"
        });
        return result;
    }


    static async getQuiz(quizName){
        let result = await db.collection("Institution").doc("lecat").collection("Quiz").doc(quizName).get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return "Does not exist";
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return "error"
        });
        return result;
    }

    static async getQuizDetailsForStudent(quizName, student){
        let result = await db.collection("Institution").doc("lecat").collection("Student").doc(student).collection("Quiz").doc(quizName).get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return "Does not exist";
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return "error"
        });
        return result;
    }

    static async getCategories(){
        let result = await db.collection("Institution").doc("lecat").get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                let chapters = Object.keys(doc.data().chapters);
                chapters.splice(chapters.indexOf("total"), 1);
                let categories = [];
                chapters.map(each => {
                    categories.push(each.substr(0,1).toUpperCase() + each.substr(1))
                })
                return categories;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return "Does not exist";
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return "error"
        });
        return result;
    }


    static async getClassesWithQuiz(quiz){
        let result = [];
        let querySnapshot = await db.collection("Institution").doc("lecat").collection("Class")
        .where("quiz","array-contains",quiz)
        .get();
        querySnapshot.forEach(doc=>{
            result.push({"id":doc.id, "data":doc.data()});
        })
        return result;
    }

    static async getClassesAndStudentsWithOutQuiz(quiz, entityList){
        let allClassesQuery = db.collection("Institution").doc("lecat").collection("Class");
        let allStudentsQuery = db.collection("Institution").doc("lecat").collection("Student");
        let [allClassesResult , allStudentsResult] = await Promise.all([allClassesQuery.get(), allStudentsQuery.get()]);
        let allClasses = [];
        let studentsInClassWithQuiz = [];
        let allStudents = [];
        allClassesResult.docs.forEach(doc =>{
            allClasses.push(doc.id);
            if(entityList.includes(doc.id)){
                studentsInClassWithQuiz = studentsInClassWithQuiz.concat(doc.data().student);
            }
        })
        
        allStudentsResult.docs.forEach(doc =>{
            allStudents.push(doc.id);
        })
        let studentOutsideClassWithQuiz = allStudents.filter(each => entityList.includes(each));
        let studentsWithQuiz = studentsInClassWithQuiz.concat(studentOutsideClassWithQuiz);
        let classesWithoutQuiz = allClasses.filter(each => !entityList.includes(each));
        let classesWithQuiz = allClasses.filter(each => entityList.includes(each));
        
        let studentsWithoutQuiz = allStudents.filter(each => !studentsWithQuiz.includes(each))
        let result = {"classes": classesWithoutQuiz, "students":studentsWithoutQuiz, "assignedClasses":classesWithQuiz, "assignedStudents":studentsWithQuiz};
        return result;
    }

    static async getExamsData(prof) {
        let fetchResult = [];
        const response=db.collection('Institution').doc("m70F4eUDZSuagZvvox7J").collection("Professor").doc(prof).collection("Class");
        const data=await response.get();
        data.docs.forEach(item=>{
            fetchResult.push({"id":item.id, "data":item.data()})
        });
        
        return fetchResult;
    }

    static async editQuizStatus(quiz,entity,date){
        let studentList = [];
        let details = await db.collection("Institution").doc("lecat").collection("Class").doc(entity).get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return {};
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return "error"
        });
        
        if (Object.keys(details).length != 0){
            studentList = details.student;
        } else {
            studentList = [entity]
        }
        let propertyToBeUpdated = "assignedEntities."+entity;
        let expiryDate = date != null? firebase.firestore.Timestamp.fromDate(date) : null;
        let quizUpdate = await db.collection("Institution").doc("lecat").collection("Quiz").doc(quiz).update({
            [propertyToBeUpdated]: expiryDate
        })
        .then((data) => {
            console.log("Document successfully written!");
            return "successfully created";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            return "error";
        });
        let studentUpdatePath = db.collection("Institution").doc("lecat").collection("Student");
        let studentUpdate = await Promise.all(studentList.map(async (each)=>{
            let eachUpdate = await studentUpdatePath.doc(each).collection("Quiz").doc(quiz).update({
                "expiry date": expiryDate,
                "date": date != null ? this.formatdate(date):"No End Date",
                "type": date != null ?"Scheduled" : "Self Paced"
            }).then((data) => {
                console.log("Document successfully written!");
                return "successfully created";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                return "error";
            })
        }))
        return studentUpdate;
    }

    static async assignQuiz(quiz, entityList, entityType, expiry) {
        let dbpath = db.collection("Institution").doc("lecat");
        let studentList = [];
        console.log(entityList);
        if(entityType == "class"){
            let classDetails = await dbpath.collection("Class")
            .where("name", "in" , entityList).get();
            
            classDetails.docs.forEach(doc => {
                console.log(doc.data);
                studentList = studentList.concat(doc.data().student);
            })
            await Promise.all(entityList.map(async (each) => {
                dbpath.collection("Class").doc(each).update({
                    quiz:firebase.firestore.FieldValue.arrayUnion(quiz)
                })
            }))
            console.log(studentList)
        } else {
            studentList = entityList;
        }
        console.log(studentList);
        let quizDetails = await dbpath.collection("Quiz").doc(quiz).get()
        .then(doc=>{
            return doc.data();
        })
        let studentUpdate;
        if(expiry != null) {
            let propertiesToUpdate = {};
            entityList.forEach(each => propertiesToUpdate[each] = firebase.firestore.Timestamp.fromDate(expiry));
            Object.keys(quizDetails.assignedEntities).forEach(each =>{
                propertiesToUpdate[each] = quizDetails.assignedEntities[each];
            })
            console.log(propertiesToUpdate)
            await dbpath.collection("Quiz").doc(quiz)
            .update({assignedEntities : propertiesToUpdate});
            quizDetails["type"] = "Scheduled";
            quizDetails["date"] = this.formatdate(expiry);
            quizDetails["expiry date"] = firebase.firestore.Timestamp.fromDate(expiry);
            quizDetails["status"] = "Active";
            delete quizDetails.assignedEntities;
            console.log(quizDetails);
            await Promise.all(studentList.map(async (student) => {
                dbpath.collection("Student").doc(student).collection("Quiz").doc(quiz).set(quizDetails)
                .then((data) => {
                    console.log("Document successfully written!");
                    return "successfully created";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return "error";
                })
            }))
        } else {
            let propertiesToUpdate = {};
            entityList.forEach(each => propertiesToUpdate[each] = null);
            Object.keys(quizDetails.assignedEntities).forEach(each =>{
                propertiesToUpdate[each] = quizDetails.assignedEntities[each];
            })
            await dbpath.collection("Quiz").doc(quiz)
            .update({assignedEntities : propertiesToUpdate});
            quizDetails["type"] = "Self Paced";
            quizDetails["date"] = "No End Date";
            quizDetails["status"] = "Active";
            delete quizDetails.assignedEntities;
            console.log(quizDetails);
            await Promise.all(studentList.map(async (student) => {
                dbpath.collection("Student").doc(student).collection("Quiz").doc(quiz).set(quizDetails)
                .then((data) => {
                    console.log("Document successfully written!");
                    return "successfully created";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return "error";
                })
            }))
        }
        

    }

    static async createQuiz(quizName , duration , questions) {
        let dbpath = db.collection("Institution").doc("lecat");
        let quiz = await dbpath.collection("Quiz").doc(quizName).set({
            "name": quizName,
            "duration": duration,
            "questions": questions,
            "assignedEntities": [],
            "numberOfQuestions":questions.length
        }).then(data => {
            console.log("created successfully");
            return "success"
        }).catch((error)=>{
            return error;
        });
        return quiz;
    }

    static async createQuestion(question) {
        let result = db.collection("Institution").doc("lecat").collection("QuestionBank").doc(question.id).set(question)
        .then(data => {
            console.log("successfully created");
            return "success"
        }).catch(error => {
            console.log("error" + error);
            return "error"
        });
        return result;
    }

    static async deleteQuiz(quiz) {
        let result = db.collection("Institution").doc("lecat").collection("Quiz").doc(quiz).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        return result;
    }

    static async reassignQuiz(quiz, name, entityList, entityType, expiry) {
        let dbpath = db.collection("Institution").doc("lecat");
        let studentList = [];
        console.log(entityList);
        if(entityType == "class"){
            let classDetails = await dbpath.collection("Class")
            .where("name", "in" , entityList).get();
            
            classDetails.docs.forEach(doc => {
                console.log(doc.data);
                studentList = studentList.concat(doc.data().student);
            })
            await Promise.all(entityList.map(async (each) => {
                dbpath.collection("Class").doc(each).update({
                    quiz:firebase.firestore.FieldValue.arrayUnion(quiz)
                })
            }))
            console.log(studentList)
        } else {
            studentList = entityList;
        }
        console.log(studentList);
        let quizDetails = await dbpath.collection("Quiz").doc(quiz).get()
        .then(doc=>{
            return doc.data();
        })
        let studentUpdate;
        if(expiry != null) {
            let propertiesToUpdate = {};
            entityList.forEach(each => propertiesToUpdate[each] = firebase.firestore.Timestamp.fromDate(expiry));
            Object.keys(quizDetails.assignedEntities).forEach(each =>{
                if(!propertiesToUpdate[each]){
                    propertiesToUpdate[each] = quizDetails.assignedEntities[each];
                    }
            })
            console.log(propertiesToUpdate)
            await dbpath.collection("Quiz").doc(quiz)
            .update({assignedEntities : propertiesToUpdate});
            quizDetails["type"] = "Scheduled";
            quizDetails["date"] = this.formatdate(expiry);
            quizDetails["expiry date"] = firebase.firestore.Timestamp.fromDate(expiry);
            quizDetails["status"] = "Active";
            delete quizDetails.assignedEntities;
            console.log(quizDetails);
            await Promise.all(studentList.map(async (student) => {
                dbpath.collection("Student").doc(student).collection("Quiz").doc(name).set(quizDetails)
                .then((data) => {
                    console.log("Document successfully written!");
                    return "successfully created";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return "error";
                })
            }))
        } else {
            let propertiesToUpdate = {};
            entityList.forEach(each => propertiesToUpdate[each] = null);
            Object.keys(quizDetails.assignedEntities).forEach(each =>{
                if(!propertiesToUpdate[each]){
                propertiesToUpdate[each] = quizDetails.assignedEntities[each];
                }
            })
            await dbpath.collection("Quiz").doc(quiz)
            .update({assignedEntities : propertiesToUpdate});
            quizDetails["type"] = "Self Paced";
            quizDetails["date"] = "No End Date";
            quizDetails["status"] = "Active";
            delete quizDetails.assignedEntities;
            console.log(quizDetails);
            await Promise.all(studentList.map(async (student) => {
                dbpath.collection("Student").doc(student).collection("Quiz").doc(quiz).set(quizDetails)
                .then((data) => {
                    console.log("Document successfully written!");
                    return "successfully created";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return "error";
                })
            }))
        }
        

    }
     static async modifyClass(className, studentList){
         let result = await db.collection("Institution").doc("lecat").collection("Class").doc(className).update({
             student:studentList
         }).then(data => {
             console.log("successfully updated");
             return "success"
         }).catch(error => {
             return "error"
         });
         return result;

     }
    static getClasses(prof){
        return Object.keys(data);
    };
    static getQuizes(className){
        return Object.keys(data[className]["quizes"]);
    };
    static getExams(className){
        return Object.keys(data[className]["exams"]);
    };
    static getCurriculumProgress(className){
        return data[className]["curriculum"];
    };
    static getQuizCompletionDetails(className, quiz){
        return data[className]["quizes"][quiz];
    }
    static getExamCompletionDetails(className, exam){
        return data[className]["exams"][exam];
    }
    static getAllQuizes(){
        let quizes;
        fs.readFileSync('./quizes.json', 'utf8',(err, data)=>{
            if(err) {
                return [];
            } else {
                quizes = data;
            }
        });
        return quizes;
    }
}
