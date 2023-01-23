import React from 'react';
import './App.css';
import SelectClass from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import List from 'react-list-select';
import Popup from './PopUp';
import QuizEditStatus from './QuizEditStatus';
import { useAlert } from 'react-alert'
import QuizPopUpDataFetch from './QuizPopUpDataFetch';
import EditQuiz from './EditQuiz';

export default function Quizes(props) {
    const alert = useAlert();
    const ButtonStyle = {backgroundColor:"white", display:"inline-block",color: "rgb(5, 161, 252)", border:"none"};
    const [isOpen, setIsOpen] = React.useState(false);
    const [isQuizOpen, setIsQuizOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    
    let quizSelected = null;
    const togglePopup = () => {
        setIsOpen(!isOpen);
      };
      const toggleQuizPopup = () => {
        setIsQuizOpen(!isQuizOpen);
      };
      const [isEditQuizOpen, setIsEditQuizOpen] = React.useState(false);
      const toggleEditQuizPopup = () => {
          setIsEditQuizOpen(!isEditQuizOpen);
        };
    let classList = [];
    props.data.classes.map(each=>{
      classList.push(each.id);
    });
    const [selectedClass, setSelectedClass] = React.useState(classList[0]);
    function comp(quiz, status) {
        return (
            <div className="App-row-comp">
                <div className="App-column" style={{width:"50%", background:"none"}}>{quiz}</div>
                <div className="App-column" style={{width:"50%",textAlign:"right", background:"none"}}>{status}</div>
            </div>
        )
    }
    
    let quizForSelectedClass = props.data.classes.filter(each => each.id == selectedClass)[0].data.quiz;
    let quizStatusForClass = [];
    quizForSelectedClass.forEach(item => {
        let status = "";
        let quizDetails = props.data.quizes.filter(each => each.id == item)[0].data["assignedEntities"][selectedClass];
        let expiry = quizDetails ? quizDetails.toDate() : null;
        console.log(expiry, new Date());
        if (expiry == null) {
            status = "Active"
        }
        else if (expiry > new Date()){
            status = "Active"
        } else {
            status = "Completed"
        }
        quizStatusForClass.push({"quiz":item, "status": status});
    });
    const [selectedQuiz, setSelectedQuiz] = React.useState(quizStatusForClass[0].quiz);
    let comps = [];
    quizStatusForClass.map(each => {
        comps.push(comp(each.quiz, each.status))
    });
    

    let quizes = [];
    props.data.quizes.map(quiz =>{
        quizes.push(quiz.id);
    })
    
    return(
        <>{!isEditQuizOpen &&  <>
    <div style={{background:"white", height:"36vh", marginLeft:"10%", marginRight:"10%",marginTop:"3vh",marginBottom:"1vh", borderRadius:"2%/4%", overflow:"scroll", padding:"1%"}}>
        <div style={{color:"rgb(30,144,255)", fontWeight:"bolder", fontSize:15}}>Quiz status</div>
        <div className="App-row" style={{maxHeight:"7vh", background:"white"}}>
    <div className="App-column" style={{
        width: "15%" ,marginTop:"0.5vh", background:"white",display:"flex", justifyContent:"center", alignItems:"center",color:"rgb(30,144,255)"
      }}>Class name</div>
    <div className="App-column" style={{
        width: "35%" , justifyContent:"left", alignItems:"left", background:"white"
      }}>
      <SelectClass  setSelectedClass={setSelectedClass} list={classList}/>
    </div>
    <div className="App-column" style={{
        width: "55%" , justifyContent:"right", alignItems:"right", background:"white", textAlign:"right", marginTop:"1.5vh"
      }}>
      <div style={{float:"right", marginRight:"7%",  width:"50%"}}><button style={{width:"80%", padding: "1vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"none"}} onClick={()=>{if(quizSelected != null){setSelectedQuiz(quizStatusForClass[quizSelected].quiz);togglePopup()}
else{
    alert.show("Select a quiz");
}}} >Edit Status</button></div>
    </div>
    </div>
        <div style={{height:"23vh", overflow:"scroll"}}>
        <div className="context-menu">
        <List
    items={comps}
    multiple={false}
    onChange={(selected) => { console.log(selected);//setSelectedQuiz(quizStatusForClass[selected].quiz);
        quizSelected=selected; }}
  />
  </div>
  </div>
  
  </div>
  <div style={{background:"white", height:"39vh", marginLeft:"10%", marginRight:"10%",marginTop:"2%",marginBottom:"3%", borderRadius:"2%/4%",  padding:"1%"}}>
  <div style={{color:"rgb(30,144,255)", fontWeight:"bolder", fontSize:15}}>List of Quizes</div>
  <div style={{overflow:"scroll", maxHeight:"35vh"}}> 
      {quizes.map(quiz =>
          <div><button className="quizes-button" onClick={()=>{setSelectedQuiz(quiz); toggleQuizPopup()}}>{quiz}</button></div>
      )}
  </div>
    </div>
    {isOpen && <Popup
      content={<QuizEditStatus data={props.data.quizes.filter(item => item.id == selectedQuiz)[0]} selectedQuiz={selectedQuiz} setRefresh={props.setRefresh} refresh={props.refresh}/>}
      handleClose={togglePopup}
    />}
    {isQuizOpen && <Popup
      content={<QuizPopUpDataFetch  selectedQuiz={selectedQuiz} handleClose={toggleQuizPopup} toggleEditQuizPopup={toggleEditQuizPopup} setName={setName}
      setRefresh={props.setRefresh} refresh={props.refresh}/>}
      handleClose={toggleQuizPopup}
    />}
    </>}
    { isEditQuizOpen &&
    <EditQuiz data={props.data.quizes.filter(item => item.id == selectedQuiz)[0]} selectedQuiz={selectedQuiz} name={name} handleClose={toggleEditQuizPopup} setRefresh={props.setRefresh} refresh={props.refresh} toggleQuizPopup={toggleQuizPopup}/>
    }
    </>
    )
}