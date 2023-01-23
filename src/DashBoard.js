import React from 'react';
import './App.css';
import Charts from './Charts';
import SimpleSelect from './SimpleSelect';
import SelectClass from './SelectClass';
import Curriculum from './Curriculum';





export default function DashBoard(props) {
    let classList = [];
    let quizes = [];
    let exams = [];
    
    props.data.classes.map(each=>{
        classList.push(each.id);
    })
    const [selectedClass, setSelectedClass] = React.useState(classList[0]);
    
    let seletedClassDetails = props.data.classes.filter(item => item.id == selectedClass)[0].data;
    quizes = seletedClassDetails.quiz;
    //exams = seletedClassDetails.exams;*/
    //quizes = ["quiz 1", "quiz 2"];
    exams = [];
    
    const [selectedQuiz, setSelectedQuiz] = React.useState(quizes[0]);
    
    const [selectedExam, setSelectedExam] = React.useState(exams[0]);
    

    const getCurriculumProgress = (className) =>{
        let total = props.data.curriculum.chapters.total;
        let numberOfStudents = 0;
        let chaptersCompleted = 0;
        props.data.students[className].forEach(each =>{
            chaptersCompleted = chaptersCompleted + each.data.progressScore.total;
            numberOfStudents = numberOfStudents + 1;
        })
        let curriculumPercentage = Math.round((chaptersCompleted/(total*numberOfStudents))*100);
        return curriculumPercentage;
    }

    const getQuizComletionPercentage = (className, quizName) => {
        let totalNumberOfStudents = 0;
        let numberOfStudentsCompleted = 0;
        props.data.students[className].forEach(each => {
            console.log(each.data.quizProgress);
            if(each.data.quizProgress){
            if(each.data.quizProgress[quizName] == "Completed") {
                numberOfStudentsCompleted = numberOfStudentsCompleted + 1;
            }
        }
            totalNumberOfStudents = totalNumberOfStudents + 1;
        })
        let quizCompletion = Math.round((numberOfStudentsCompleted/totalNumberOfStudents)*100);
        return quizCompletion;
    }

    

    
    
   
   

    return(
        <div>
        {true && <>
        <div className="App-row" style={{maxHeight:"8vh"}}>
    <div className="Dashboard-select-label">Class</div>
    <div className="Dashbooard-select-dropdown">
      <SelectClass setSelectedClass={setSelectedClass} list={classList} />
    </div>
    <div className="Dashboard-select-label">Quiz</div>
    <div className="Dashbooard-select-dropdown">
      <SimpleSelect  setSelectedValue={setSelectedQuiz} list={quizes} defaultValue={quizes[0]}/>
    </div>
    <div className="Dashboard-select-label">Exam</div>
    <div className="Dashbooard-select-dropdown">
      <SimpleSelect  setSelectedValue={setSelectedExam} list={exams} defaultValue={exams[0]}/>
    </div>
    </div>
    
    <Charts curriculumProgress={getCurriculumProgress(selectedClass)} quizCompletion={getQuizComletionPercentage(selectedClass, selectedQuiz)} examCompletion={0}/>
    {true && <>
    <Curriculum selectedClass={selectedClass}  data={props.data} />
       </> }
     </>  }
    </div> 
    
    )
}