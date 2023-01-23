import React from 'react';
import './App.css';
import SelectClass from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import List from 'react-list-select';
import QuizEditStatus from './QuizEditStatus';
import Popup from './PopUp';
import EditQuiz from './EditQuiz';
import { useAlert } from 'react-alert'

export default function QuizPopUp(props) {
    const alert = useAlert();
    let selectedQuestions = [];
    const [isOpen, setIsOpen] = React.useState(false);
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
      };
      

function comp(question) {
    return (
        <div style={{border:"0.5px solid grey", textAlign:"left", marginLeft:"3%", padding:"1vh", marginTop:"1%", borderRadius:"2%/10%",  lineHeight: "200%", background:"white"}}>
            <div style={{textAlign:"right", color:"rgb(30,144,255)"}}>{question.category}</div>
            <div>
            Question: {question.question}
            </div>
            <div style={{marginLeft:"10%"}}>
            <div>A.{question.choice1}</div>
            <div>B.{question.choice2}</div>
            <div>C.{question.choice3}</div>
            <div>D.{question.choice4}</div>
            </div>
        </div>
    )
}
    
let comps = [];
props.data.questions.forEach(question =>{comps.push(comp(question))})

    return(
        <>
     <div style={{background:"lightgray", height:"80vh"}}> 
    <div style={{fontWeight:"bold",color:"rgb(30,144,255)", paddingTop:"1vh"}}>{props.selectedQuiz}</div>
    <div style={{marginTop:"1vh"}}>Questions</div>
    <div style={{background:"lightgray", height:"63vh", marginLeft:"5%", marginRight:"5%",marginBottom:"1vh", borderRadius:"2%/4%", overflow:"scroll", padding:"1vh"}}>
         <div style={{ overflow:"scroll"}}>
        <div className="questions-menu" >
        <ul>
            {comps.map(item =><li>{item}</li>)}
        </ul>
  </div>
  </div>
    </div>
    <button style={{width:"20%", padding:"1vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none",margin:"1vh"}} onClick={()=>{
        if(Object.keys(props.data.assignedEntities).length != 0){
            alert.show("Quiz has already been assigned. Do you want to rename and create a new quiz?", {
                closeCopy: "No",
                actions: [
                    {
                      copy: "Yes",
                      onClick: () => {props.toggleEditQuizPopup();props.setName("");props.handleClose()}
                    },
                  ],
            })
        } else{
        props.toggleEditQuizPopup();props.setName(props.selectedQuiz);props.handleClose()}}}> Edit Quiz </button>
    <button style={{width:"20%", padding:"1vh", fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none",margin:"1vh"}} onClick={()=>{
        togglePopup()}}> Edit/View Status </button>
        <button style={{width:"20%", padding:"1vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none", margin:"1vh"}} onClick={()=>{
        props.handleClose()}}> Close </button>
        </div> 
        {isOpen && <Popup
      content={<QuizEditStatus data={props.data} selectedQuiz={props.selectedQuiz} setRefresh={props.setRefresh} refresh={props.refresh}/>}
      handleClose={() => {togglePopup();props.setQuizRefresh(!props.quizRefresh);}}
    />} 
    
    </>
    )
}