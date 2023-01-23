import React from 'react';
import './App.css';
import SimpleSelect from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import CheckBox from './CheckBox';
import { useAlert } from 'react-alert'



export default function AddNewClass(props) {
    const alert = useAlert()
    const [name, setName] = React.useState("");
    const list = [];
    let n = 0;
    props.data.students.map(each =>{
        n= n+1;
        list.push({"id": n,"value":each.id, "isChecked":false});
    })
    
    const [studentList, setStudentList] = React.useState(list);
    const [checked, setChecked] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");

    const handleAllChecked = (event) => {
        console.log(event.target.checked);
        let listOfStudents = studentList;
        listOfStudents.forEach(each => each.isChecked = event.target.checked) 
        setStudentList(listOfStudents);
        setChecked(!checked);
      }
    
    const handleCheckChildElement = (event) => {
        let listOfStudents = studentList;
        listOfStudents.forEach(each => {
           if (each.value === event.target.value)
           each.isChecked =  event.target.checked
        })
        setStudentList(listOfStudents);
        setChecked(!checked);
        console.log(studentList);
      }
      
      
    return(
        <div style={{background:"lightgrey"}}>
        <div className="App-row" style={{maxHeight:"8vh", background:"lightgrey"}}>
    <div className="App-column" style={{
        width: "20%" , marginRight:"4%", marginTop:"0.5vh", color:"rgb(30,144,255)",fontWeight:"bold", background:"lightgrey", display:"flex", justifyContent:"center", alignItems:"center",textAlign:"right"
      }}>Name<span style={{color:"red", fontStyle:"oblique"}}>{errorText}</span></div>
    <div className="App-column" style={{
        width: "60%" ,textAlign:"left", background:"lightgrey"
      }}>
      <input
       style={{alignItems:"left",height:"2rem", border:"none", width:"50%",  background:"white",marginTop:"1vh"}}
     placeholder={"Name of class"} required onChange={(event)=>{setName(event.target.value)}}
    /> 
    </div>
    </div>
    <div className="App-row" style={{height:"68vh"}}>
    <div className="App-column" style={{width:"45%",height:"62vh" ,marginLeft:"2%", marginRight: "1%", padding:"1%",backgroundColor:"rgba(30,144,255,0.5)",overflow:"scroll",border:"0.5px solid grey",
        marginTop:"2vh", marginBottom:"1vh", borderRadius:"5%/2%"}}> <div style={{fontWeight:"bold", color: "white"}}>Student List</div>
        
    <CheckBox studentList={studentList} handleAllChecked={handleAllChecked} handleCheckChildElement={handleCheckChildElement} checked={checked} />
{console.log(studentList)}
</div>
<div className="App-column" style={{width:"45%",height:"62vh" ,marginLeft:"2%", marginRight: "1%", backgroundColor:"white",overflow:"scroll",padding:"1%",
        marginTop:"2vh", marginBottom:"1vh", borderRadius:"5%/2%", border:"0.5px solid grey"}}>
  <span style={{color:"black", fontWeight:"bold"}}>Selected Students</span><div>
        {studentList.filter(each => each.isChecked == true).map(each => <li style={{display:"flex", justifyContent:"center", alignItems:"center", height:"4vh", margin:"1vh", background:"rgb(30,144,255)", color:"white"}}>{each.value}</li>)}
    </div>
    
</div>

</div>
<div style={{width:"100%",height:"6vh" ,background:"lightgrey"}}>
<button style={{ padding:"1vh", width:"30%",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"none"}} onClick={async ()=>{
    if (name != "") {
    let selectedStudents = [];
    studentList.filter(each => each.isChecked == true).map(each => {selectedStudents.push(each.value)});
    if (selectedStudents.length == 0) {
        alert.show("Please select students", {
            closeCopy:"OK"
        })
    } else {
    let classExists = await DataService.getClass(name);
    if(classExists == "exist"){
        alert.show("Class name already exist. Please give a different name.")
    } else {
    let result = await DataService.postCreateClassData(name,selectedStudents);
    if(result == "error"){
        alert.error("Error occured ! Please try again after some time",{
        closeCopy:"close"
    })
    } else{
        alert.success("Class successfully created", {
            closeCopy:"close",
            onClose: () => {props.handleClose();props.setRefresh(!props.refresh);}
        })
    }} 
    setErrorText("");
}
} else {
        setErrorText("*");
        alert.error("Please provide a name!!", {
            closeCopy:"OK"
        })
    }
}}>Create Class</button>
</div>
    </div>
    )
}