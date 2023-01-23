import React from 'react';
import './App.css';
import SelectClass from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import AddNewClass from './AddNewClass';
import Popup from './PopUp';
import StudentQuizDetailsPopUp from './StudentQuizDetailsPopUp';
import { useAlert } from 'react-alert'
import ModifyClass from './ModifyClass';

export default function Students(props) {
  const alert = useAlert();
    const ButtonStyle = {backgroundColor:"white", display:"inline-block",color: "rgb(30,144,255)", border:"none", cursor:"pointer"};
    let classList = ["All"];
    props.data.classes.map(each=>{
      classList.push(each.id);
    });
    const [selectedClass, setSelectedClass] = React.useState("All");
    let studentList = [];
    if(selectedClass == "All") {
      let list = [];
      props.data.students.map(each =>{
        list.push(each.id);
      })
      studentList = list;
    } else {
      let list =[];
      props.data.studentsByClass[selectedClass].map(each =>{
        list.push(each.id);
      })
      studentList = list;
    };
    React.useEffect(()=>{
      setSelectedStudent(studentList[0]);
    },[selectedClass]);
    const [selectedStudent, setSelectedStudent] = React.useState(studentList[0]);
    let studentDetails= props.data.students.filter(each => each.id == selectedStudent)[0].data;
    

    const getCurriculumProgressByChapter = (chapterName) =>{
      let total = props.data.curriculum.chapters[chapterName];
      let chaptersCompleted = studentDetails.progressScore[chapterName];
      let curriculumPercentage = Math.round((chaptersCompleted/total)*100);
      return curriculumPercentage;
  }
  let curriculumByChapter = [];

  Object.keys(props.data.curriculum.chapters).map(each =>{
      if(each !== "total"){
      curriculumByChapter.push({"chapter":each , "progress": getCurriculumProgressByChapter(each).toString()+"%"});
      }
  });
    const [isOpen, setIsOpen] = React.useState(false);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
    const [isModifyOpen, setIsModifyOpen] = React.useState(false);
    const toggleModifyPopup = () => {
      setIsModifyOpen(!isModifyOpen);
    };
    const [quizIsOpen, setQuizIsOpen] = React.useState(false);
    const [quizDetails, setQuizDetails] = React.useState();
    const toggleQuizPopup = () => {
      setQuizIsOpen(!quizIsOpen);
    };
    //const [details, setDetails] = React.useState();
    return(
        <>
        <div className="App-row" style={{maxHeight:"8vh"}}>
    <div className="App-column" style={{
        width: "15%" ,display:"flex", justifyContent:"center", alignItems:"center"
      }}>Class name</div>
    <div className="App-column" style={{
        width: "35%" , justifyContent:"left", alignItems:"left"
      }}>
      <SelectClass setSelectedClass={setSelectedClass} list={classList} />
    </div>
    <div className="App-column" style={{
        width: "50%" , justifyContent:"center", alignItems:"center", marginTop:"2vh"
      }}>
      <button style={{width:"40%", padding: "1.5%",borderRadius:"7%/25%", fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none"}} onClick={() =>togglePopup()}>+ Add new class</button>
      <button style={{width:"40%", padding: "1.5%",borderRadius:"7%/25%", fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey", color:"white", border:"none", marginLeft:"3%"}} onClick={() =>toggleModifyPopup()}>Modify class</button>
    </div>
    </div>
    
    <div className="App-row" style={{height:"80vh"}}>
    <div className="App-column" style={{width:"25%",height:"74vh" ,marginLeft:"6.5%", marginRight: "1%", backgroundColor:"rgba(30,144,255,0.5)",
        marginTop:"3vh", marginBottom:"2vh", borderRadius:"5%/2%", paddingTop:"2vh"}}>
        {studentList.map(student => <div><button type="button" className="student-button"  style={{width:"90%", padding: "4%", marginBottom:"1%",marginTop:"0.5vh"}} onClick={()=>{setSelectedStudent(student)}}>{student}</button></div>)}
        </div>
        {true && <>
    <div className="App-column" style={{width: "70%", height:"80vh",marginBottom:"2vh"}}>
      <div style={{fontWeight:"bolder", color:"rgb(30,144,255)",marginTop:"2vh",  fontStretch:"expanded", fontSize:15}}>{selectedStudent}- Report</div>
      <div style={{overflow:"scroll", height:"78vh"}}>
      <div style={{height:"19vh", overflow:"scroll",background:"white",marginLeft:"3%", marginRight: "6%", backgroundColor:"white",
              marginTop:"2vh", marginBottom:"2vh", borderRadius:"3% /10%", padding:"2%"}}>
          <div style={{color:"rgb(30,144,255)", textAlign:"left", marginLeft:"3%", fontWeight:"bold"}}><i>Curriculum Progress</i></div>
            {curriculumByChapter.map(data => <>
              <div className="App-row" style={{height:"4vh", background:"white"}}>
              <div className="App-column" style={{width: "40%", background:"white", marginTop:"0.5%", textAlign:"left", marginLeft:"5%", textTransform:"capitalize",display:"flex", alignItems:"center"}}>{data.chapter}</div>
              <div className="App-column" style={{width: "50%" , background:"white"}}>
                <div className="App-row" style={{height: "2.5vh", backgroundColor:"lightgrey" ,margin:"2%", marginRight:"5%"}}> 
                    {data["progress"] != "0%" ?
                        <div className="App-column" style={{width: data["progress"], backgroundColor:"rgb(30,144,255)", opacity:"0.8",flexDirection:"row", overflow:"visible"}}></div>
                        : <div className="App-column" style={{marginLeft:"5%"}}> </div>}
                    </div>
              </div>
              <div className="App-column" style={{width: "10%", background:"white", textAlign:"left",marginTop:"0.5%",display:"flex", alignItems:"center"}}>
              {data["progress"]}
              </div>
              </div>
              </>
              )}
            
      </div>
      <div style={{height:"19vh",overflow:"scroll", background:"white",marginLeft:"3%", marginRight: "6%", backgroundColor:"white",
        marginTop:"2vh", marginBottom:"2vh", borderRadius:"3% /10%", padding:"2%"}}>
          <div style={{color:"rgb(30,144,255)", textAlign:"left", marginLeft:"3%", fontWeight:"bold"}}><i>Quiz Reports</i></div>
          {studentDetails.quizProgress && <>
          {Object.keys(studentDetails.quizProgress).map(data => <>
              <div className="App-row" style={{height:"20%", background:"white"}}>
              <div className="App-column" style={{width: "100%", background:"white", marginTop:"0.5%", textAlign:"left", marginLeft:"5%"}}>{data} : {studentDetails.quizProgress[data]}</div>
              <span style={{float:"right", marginRight:"5%"}}>
                    
                    <button style={ButtonStyle} onClick={async () => {
                      let details = await DataService.getQuizDetailsForStudent(data, selectedStudent);
                      setQuizDetails(details);
                      console.log(quizDetails);
                      toggleQuizPopup();
                      //alert.show(<StudentQuizDetailsPopUp data={details} />)
                    }}><u>More</u></button>
                    </span>
              
              </div>
              </>
              )}
              </>}
              
        </div>
      <div style={{height:"19vh", background:"white",marginLeft:"3%", marginRight: "6%", backgroundColor:"white",
        marginTop:"2vh", marginBottom:"2vh", borderRadius:"3% /10%", padding:"2%"}}>
          <div style={{color:"rgb(30,144,255)", textAlign:"left", marginLeft:"3%", fontWeight:"bold"}}><i>Exam Reports</i></div>
        </div>
    </div> 
    </div> </>}
    </div>
    {isOpen && <Popup
      content={<AddNewClass prof="prof 1" data={props.data} handleClose={togglePopup} setRefresh={props.setRefresh} refresh={props.refresh}/>}
      handleClose={togglePopup}
    />}
    {quizIsOpen && <Popup
      content={<StudentQuizDetailsPopUp data={quizDetails} />}
      handleClose={toggleQuizPopup}
    />}
    {isModifyOpen && <Popup
    content={<ModifyClass classList={classList} data={props.data} setRefresh={props.setRefresh} refresh={props.refresh}/>}
    handleClose={toggleModifyPopup}
    />}
    </>
    )
}