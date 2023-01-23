import React from 'react';
import './App.css';
import SimpleSelect from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';

export default function Analytics() {
    const ButtonStyle = {backgroundColor:"white", display:"inline-block",color: "rgb(5, 161, 252)", border:"none"};
    const classList = DataService.getClasses("prof1");
    const [selectedClass, setSelectedClass] = React.useState(classList[0]);
    const studentList = ["student 1", "student 2", "student 3", "student 4", "student 5"];
    const [selectedStudent, setSelectedStudent] = React.useState(studentList[0]);
    let details= studentDetails[selectedClass][selectedStudent];
    return(
        <>
        {false && <>
        <div className="App-row" style={{maxHeight:"8%"}}>
    <div className="App-column" style={{
        width: "15%" ,marginTop:"1.5%"
      }}>Class name</div>
    <div className="App-column" style={{
        width: "35%" , justifyContent:"left", alignItems:"left"
      }}>
      <SimpleSelect  setSelectedClass={setSelectedClass} list={classList}/>
    </div>
    </div>
    
    <div style={{display:"flex", marginTop:"5%",justifyContent:"left", marginLeft:"10%"}}>
      <button className="Analytics-button" style={{padding:"0.8%", width:"10%", border:"1px solid grey",borderTop:"none",borderLeft:"none",boxShadow:"0  -3px 3px grey"}} autoFocus>Curriculum</button>
      <button className="Analytics-button" style={{padding:"0.8%", width:"10%", border:"1px solid grey", borderBottom: "1px solid grey",borderTop:"none", boxShadow:"0  -3px 3px grey"}}>Quizes</button>
      <button className="Analytics-button" style={{padding:"0.8%", width:"10%", border:"1px solid grey",borderTop:"none",borderRight:"none", boxShadow:"0  -3px 3px grey"}}>Exams</button>
    </div>
    <div style={{background:"white", height:"65%", marginLeft:"5%", marginRight:"5%", borderRadius:"2%/4%"}}></div>
    </>}
    </>
    )
}