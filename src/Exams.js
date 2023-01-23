import React from 'react';
import './App.css';
import SelectClass from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import List from 'react-list-select';

export default function Exams() {
    const ButtonStyle = {backgroundColor:"white", display:"inline-block",color: "rgb(5, 161, 252)", border:"none"};
    const classList = DataService.getClasses("prof1");
    const [selectedClass, setSelectedClass] = React.useState(classList[0]);
    const studentList = ["student 1", "student 2", "student 3", "student 4", "student 5"];
    const [selectedStudent, setSelectedStudent] = React.useState(studentList[0]);
    let details= studentDetails[selectedClass][selectedStudent];
    function comp(name, email) {
        return (
            <div className="App-row">
                <div className="App-column" style={{width:"50%", background:"none"}}>{name}</div>
                <div className="App-column" style={{width:"50%",textAlign:"right", background:"none"}}>{email}</div>
            </div>
        )
    }
    
    let comps = [
        comp('Current active quiz', 'status: Active'),
        comp('Most recently finished quiz', 'status: Active'),
        comp('Current active quiz', 'status: Active'),
        comp('Current active quiz', 'status: Active'),
        comp('Most recently finished quiz', 'status: Active'),
        comp('Current active quiz', 'status: Active'),
    ];

    let quizes = ["quiz1", "quiz2", "quiz3", "quiz1", "quiz2", "quiz3"];
    
    return(
        <>
        {false && <>
    <div style={{background:"white", maxHeight:"40%", marginLeft:"10%", marginRight:"10%",marginTop:"3%",marginBottom:"1%", borderRadius:"2%/4%", overflow:"scroll", padding:"1%"}}>
        <div>Exam status</div>
        <div className="App-row" style={{maxHeight:"8%", background:"white"}}>
    <div className="App-column" style={{
        width: "15%" ,marginTop:"1.5%", background:"white",display:"flex", justifyContent:"center", alignItems:"center"
      }}>Class name</div>
    <div className="App-column" style={{
        width: "35%" , justifyContent:"left", alignItems:"left", background:"white"
      }}>
      <SelectClass  setSelectedClass={setSelectedClass} list={classList}/>
    </div>
    </div>
    <div style={{background:"white", maxHeight:"40%", marginLeft:"10%", marginRight:"10%",marginTop:"3%",marginBottom:"1%", borderRadius:"2%/4%", overflow:"scroll", padding:"1%"}}>
        
        <div style={{maxHeight:"48%", overflow:"scroll"}}>
        <div className="context-menu">
        <List
    items={comps}
    multiple={false}
    onChange={(selected) => { console.log(selected); }}
  />
  </div>
  </div>
  </div>
  <div style={{float:"right", marginRight:"7%",  width:"20%"}}><button className="Quizes-edit-button" >EDIT STATUS</button></div>
  </div>
  <div style={{background:"white", height:"40%", marginLeft:"10%", marginRight:"10%",marginTop:"2%",marginBottom:"3%", borderRadius:"2%/4%",  padding:"1%"}}>
  <div style={{marginTop:"1%"}}>List of Exams</div>
  <div style={{overflow:"scroll", maxHeight:"80%"}}> 
      {quizes.map(quiz =>
          <div><button className="quizes-button" >{quiz}</button></div>
      )}
  </div>
    </div>
    </>}
    </>
    )
}