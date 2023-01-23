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

export default function StudentQuizDetailsPopUp(props) {
    const alert = useAlert();
    let selectedQuestions = [];
    const [isOpen, setIsOpen] = React.useState(false);
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
      };
      

function comp(question, index, status) {
    return (
        <div style={{border:"0.5px solid grey", textAlign:"left", padding:"2vh", marginTop:"1%", borderRadius:"2%/10%",  lineHeight: "200%", background:"white"}}>
            <div style={{textAlign:"right", color:"rgb(30,144,255)"}}>{question.category}</div>
            <div>
            Question: {question.question}
            </div>
            <div style={{marginLeft:"10%"}}>
            <div><span style={{fontWeight:"bold"}}>A.</span>{question.choice1}</div>
            <div><span style={{fontWeight:"bold"}}>B.</span>{question.choice2}</div>
            <div><span style={{fontWeight:"bold"}}>C.</span>{question.choice3}</div>
            <div><span style={{fontWeight:"bold"}}>D.</span>{question.choice4}</div>
            </div>
            <div style={{marginTop:"2vh"}}><span style={{fontWeight:"bold", color:"rgb(30,144,255)"}}>Actual Answer : </span>{question.answer} </div>
            {(status == "Completed") && 
            <div style={{color:(question.answer == props.data.userAnswer[index])? "green" :((props.data.userAnswer[index]=="Not Answered")? "black" : "red")}}><span style={{fontWeight:"bold", color:"rgb(30,144,255)"}}>Student Answer : </span>{props.data.userAnswer[index]}</div>
            }
            
        </div>
    )
}
    
let comps = [];
props.data.questions.forEach(question =>{comps.push(comp(question,props.data.questions.findIndex(item => item.id == question.id), props.data.status ))})

    return(
        <>
     <div style={{ background:"lightgrey", height:"80vh"}}> 
    <div style={{fontWeight:"bold"}}>{props.selectedQuiz}</div>
    <div className="App-row" style={{width:"100%", background:"lightgrey", height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Name</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.name}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey",height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Number of Questions</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.numberOfQuestions}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey",height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Type</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.type}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey",height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Duration</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.duration}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey",height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Expiry</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.date == "No End Date"? props.data.date : props.data["expiry date"].toDate().toString()}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey",height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Status</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.status}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey",height:"4vh"}}>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Score</div>
       <div className="App-column"style={{width:"50%", marginLeft:"1%",marginTop:"1vh",marginRight:"1%" , background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>{props.data.score}</div>
     </div>
    <div style={{marginTop:"1vh"}}>Questions</div>
    <div style={{background:"lightgrey", height:"45vh",marginBottom:"1vh", borderRadius:"2%/4%", overflow:"scroll", padding:"1vh"}}>
         <div style={{ overflow:"scroll"}}>
        <div className="questions-menu" >
        <ul>
            {comps.map(item =><li>{item}</li>)}
        </ul>
  </div>
  </div>
    </div>
    
        </div> 
        
    
    </>
    )
}