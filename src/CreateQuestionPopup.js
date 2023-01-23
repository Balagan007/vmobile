import React from 'react';
import './App.css';
import SimpleSelect from './SimpleSelect';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import List from 'react-list-select';
import { useAlert } from 'react-alert';


export default function CreateQuestionPopup(props) {
    const alert = useAlert();
    const [category, setCategory] = React.useState("");
    const [question, setQuestion] = React.useState("");
    const [choiceA, setChoiceA] = React.useState([]);
    const [choiceB, setChoiceB] = React.useState([]);
    const [choiceC, setChoiceC] = React.useState([]);
    const [choiceD, setChoiceD] = React.useState([]);
    const [answer, setAnswer] = React.useState("");
    const [error , setError] = React.useState("");
    const categoryList = props.categories;
    //console.log(DataService.getAllQuizes());
    let newQuestion = {
        "question":"",
        "choice1":[],
        "choice2":[],
        "choice3":[],
        "choice4":[],
        "answer":"",
        "id":"",
        "category":""
    };

    const validateAndSetAnswer = (answerChoice) =>{
        if ((answerChoice != "") && (answerChoice.toUpperCase() != "A") && (answerChoice.toUpperCase() != "B") && (answerChoice.toUpperCase() != "C") && (answerChoice.toUpperCase() != "D")){
            alert.show("Please enter a valid choice. Available options are A,B,C,D");
            setAnswer("");
        } else {
            setAnswer(answerChoice.toUpperCase());
        }
    }

    return(
        <>
        <div style={{background:"lightgrey", height:"100%"}}>
        <div className="App-row" style={{maxHeight:"8vh"}}>
    <div className="App-column" style={{
        width: "15%" ,display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)", fontWeight:"bold"
      }}>Category</div>
    <div className="App-column" style={{
        width: "35%" , justifyContent:"left", alignItems:"left"
      }}>
      <SimpleSelect  setSelectedValue={setCategory} list={categoryList} defaultValue={categoryList[0]}/>
    </div>
    </div>
            <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center", color:"rgb(30,144,255)",fontWeight:"bold"}}>Question: <span style={{color:"red"}}>{error}</span></div>
        <textarea
       style={{alignItems:"left",height:"10vh",margin:"1.5%" ,width:"80%", borderRadius:"2%/10%"}} onChange={(event)=> {setQuestion(event.target.value)}}
    />
    </div>
    <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)",fontWeight:"bold"}}>Choice A: <span style={{color:"red"}}>{error}</span></div>
    <textarea 
       style={{alignItems:"left",height:"5vh", margin:"1.5%", width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceA([event.target.value])}}
     
    />
    </div>
    <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)",fontWeight:"bold"}}>Choice B: <span style={{color:"red"}}>{error}</span></div>
    <textarea 
       style={{alignItems:"left",height:"5vh", margin:"1.5%", width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceB([event.target.value])}}
     
    />
    </div>
    <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)",fontWeight:"bold"}}>Choice C: <span style={{color:"red"}}>{error}</span></div>
    <textarea 
       style={{alignItems:"left",height:"5vh", margin:"1.5%",width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceC([event.target.value])}}
     
    />
    </div><div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)",fontWeight:"bold"}}>Choice D: <span style={{color:"red"}}>{error}</span></div>
    <textarea 
       style={{alignItems:"left",height:"5vh",margin:"1.5%", width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceD([event.target.value])}}
     
    />
    </div><div className="App-row">
                <div className="App-column" style={{width:"40%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)",fontWeight:"bold"}}>Answer: <span style={{color:"red"}}>{error}</span></div>
    <textarea 
       style={{alignItems:"left",height:"5vh",margin:"1.5%", width:"50%", borderRadius:"2%/25%"}} value={answer} onChange={(event)=> {validateAndSetAnswer(event.target.value)}}
     
    />
    </div>
    <button style={{width:"25%", padding: "1vh", background:"rgb(30,144,255)", color:"white", border:"none", margin:"3%"}} onClick={async ()=>{
        if(question == "" | choiceA.length == 0 | choiceB.length == 0 | choiceC.length == 0 | choiceD.length == 0 | answer == ""){
            setError("*");
        }
        else {
        newQuestion.question = question;
        newQuestion.choice1 = choiceA;
        newQuestion.choice2 = choiceB;
        newQuestion.choice3 = choiceC;
        newQuestion.choice4 = choiceD;
        newQuestion.answer = (answer == "A") ? choiceA[0] : ((answer == "B") ? choiceB[0] : ((answer == "C")? choiceC[0] : choiceD[0]))
        newQuestion.category = category;
        newQuestion.id = "question-"+ Date.now().toString();
        console.log(newQuestion);
        await DataService.createQuestion(newQuestion);
        props.list.push(newQuestion);
        props.setList(props.list);
        props.handleClose();
        setError("");
    }
    }}> Add </button>
        </div>
        </>
    )
}