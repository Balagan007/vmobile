import React from 'react';
import './App.css';
import SimpleSelect from './SimpleSelect';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import List from 'react-list-select';
import { useAlert } from 'react-alert';

export default function EditQuestionPopup(props) {
    const alert = useAlert();
    const [category, setCategory] = React.useState(props.question.category);
    const [question, setQuestion] = React.useState(props.question.question);
    const [choiceA, setChoiceA] = React.useState(props.question.choice1);
    const [choiceB, setChoiceB] = React.useState(props.question.choice2);
    const [choiceC, setChoiceC] = React.useState(props.question.choice3);
    const [choiceD, setChoiceD] = React.useState(props.question.choice4);
    
    let categoryList = [];
    categoryList.push(category);
    console.log(props.categories);
    props.categories.forEach(each =>{
        if (each !== category) {
            categoryList.push(each);
        }
    }
    )
    let answerChoice = "";
    if(props.question.answer == choiceA[0]){
        answerChoice = "A";
    } else if (props.question.answer == choiceB[0]){
        answerChoice = "B";
    }else if (props.question.answer == choiceC[0]){
        answerChoice = "C";
    } else {
        answerChoice = "D";
    }
    const [answer, setAnswer] = React.useState(answerChoice);
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
      <SimpleSelect setSelectedValue={setCategory} list={categoryList} defaultValue={category}/>
    </div>
    </div>
            <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Question: </div>
        <textarea defaultValue={props.question["question"]}
       style={{alignItems:"left",height:"10vh",margin:"1.5%" ,width:"80%", borderRadius:"2%/10%"}} onChange={(event)=> {setQuestion([event.target.value])}}
    ></textarea>
    </div>
    <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)", fontWeight:"bold"}}>Choice A: </div>
    <textarea defaultValue={props.question["choice1"]}
       style={{alignItems:"left",height:"5vh", margin:"1.5%", width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceA([event.target.value])}}
     
    ></textarea>
    </div>
    <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)", fontWeight:"bold"}}>Choice B: </div>
    <textarea defaultValue={props.question["choice2"]}
       style={{alignItems:"left",height:"5vh", margin:"1.5%", width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceB([event.target.value])}}
     
    />
    </div>
    <div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)", fontWeight:"bold"}}>Choice C: </div>
    <textarea defaultValue={props.question["choice3"]}
       style={{alignItems:"left",height:"5vh", margin:"1.5%",width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceC([event.target.value])}}
     
    ></textarea>
    </div><div className="App-row">
                <div className="App-column" style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)", fontWeight:"bold"}}>Choice D: </div>
    <textarea defaultValue={props.question["choice4"]}
       style={{alignItems:"left",height:"5vh",margin:"1.5%", width:"80%", borderRadius:"2%/25%"}} onChange={(event)=> {setChoiceD([event.target.value])}}
     
    ></textarea>
    </div><div className="App-row">
                <div className="App-column" style={{width:"40%", display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)", fontWeight:"bold"}}>Answer: </div>
    <textarea defaultValue={answer}
       style={{alignItems:"left",height:"5vh",margin:"1.5%", width:"50%", borderRadius:"2%/25%"}} value={answer} onChange={(event)=> {validateAndSetAnswer(event.target.value)}}
     
    ></textarea>
    </div>
    <button style={{width:"25%", padding: "1vh", background:"rgb(30,144,255)", color:"white", border:"none", margin:"3%"}} onClick={async ()=>{
        props.question.question = question;
        props.question.choice1 = choiceA;
        props.question.choice2 = choiceB;
        props.question.choice3 = choiceC;
        props.question.choice4 = choiceD;
        props.question.answer = (answer == "A") ? choiceA[0] : ((answer == "B") ? choiceB[0] : ((answer == "C")? choiceC[0] : choiceD[0]));
        props.question.category = category;
        console.log(props.question);
        let index = props.list.findIndex((obj => obj.id == props.question.id));
        props.list[index] = props.question;
        await DataService.createQuestion(props.question);
        props.setList(props.list);
        props.handleClose();
    }}> Save </button>
        </div>
        </>
    )
}