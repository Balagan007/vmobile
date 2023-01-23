import React from 'react';
import './App.css';
import SimpleSelect from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import CheckBox from './CheckBox';
import { useAlert } from 'react-alert'

function AddStudent(props) {
    const listAll = [];
    let n = 0;
    props.data.students.map(each =>{
        if(!props.studentList.includes(each.id)){
        n= n+1;
        listAll.push({"id": n,"value":each.id, "isChecked":false});
        }
    })
    
    const [allStudentList, setAllStudentList] = React.useState(listAll);
    const [checked, setChecked] = React.useState(false);

    const handleAllChecked = (event) => {
        console.log(event.target.checked);
        let listOfStudents = allStudentList;
        listOfStudents.forEach(each => each.isChecked = event.target.checked) 
        setAllStudentList(listOfStudents);
        let list = [];
        listOfStudents.forEach(each => {
            if(each.isChecked == true) {
                list.push(each.value)
            }
        })
        props.handleSelection(list);
        console.log(list)
        setChecked(!checked);
      }
    
    const handleCheckChildElement = (event) => {
        let listOfStudents = allStudentList;
        listOfStudents.forEach(each => {
           if (each.value === event.target.value)
           each.isChecked =  event.target.checked
        })
        setAllStudentList(listOfStudents);
        let list = [];
        listOfStudents.forEach(each => {
            if(each.isChecked == true) {
                list.push(each.value)
            }
        });
        props.handleSelection(list);
        console.log(list)
        setChecked(!checked);
        //console.log(studentList);
      }
    const [listOfItems, setListOfItems] = React.useState(props.studentList);
    return (
        <div style={{minWidth:"300px", background:"rgb(30,144,255)",width: "100% !important"}}>
        <CheckBox studentList={allStudentList} handleAllChecked={handleAllChecked} handleCheckChildElement={handleCheckChildElement} checked={checked} />
        </div>
    )
}

export default function ModifyClass(props) {
    const alert = useAlert()
    let classes = props.classList;
    console.log(classes);
    classes = classes.filter(each => each !== "All");
    const [isSelected, setIsSelected] = React.useState(false);
    const[studentList, setStudentList] = React.useState([]);
    const [newStudents, setNewStudents] = React.useState([]);
    const [selectedClass, setSelectedClass] = React.useState("");
    let newList = [];
    const handleSelection = (list) =>{
        setNewStudents(list);
        newList = list;
        console.log(newList);
        console.log(list);
    }
    
      
    return(
        <div style={{background:"lightgrey", height:"80vh"}}>
        <div className="App-row" style={{maxHeight:"75vh", background:"lightgrey", paddingTop:"1vh"}}>
    <div className="App-column" style={{
        width: "30%" ,marginLeft:"2%", marginRight:"4%", marginTop:"0.5vh", color:"white", background:"rgba(30,144,255,0.6)", 
        alignItems:"center", border:"0.5px solid grey", height:"70vh"
      }}><span style={{fontWeight:"bold"}}>Classes</span> 
          {classes.map(each => <button className="student-button" style={{width:"85%", padding:"1vh", marginTop:"1vh"}} onClick={() =>{
              let list =[];
              props.data.studentsByClass[each].map(item =>{
                list.push(item.id);
              })
              setSelectedClass(each);
              setStudentList(list);
              setIsSelected(true);
            
          }}>{each}</button>)}
          
      </div>
    <div className="App-column" style={{
        width: "62%" ,textAlign:"left", marginTop:"0.5vh", marginRight:"2%", background:"white", border:"0.5px solid grey", height:"70vh"
      }}>
          {!isSelected &&
          <div style={{height:"75vh", display:"flex", alignItems:"center", justifyContent:"center", fontStyle:"oblique", color:"rgb(30,144,255)"}}> Select a class to modify</div>
          }
          {isSelected &&
        <>
        <div style={{textAlign:"center", color:"rgb(30,144,255)", fontWeight:"bolder", marginTop:"1vh", textDecoration:"underline", textDecorationStyle:"double", fontSize:14}}>{selectedClass}</div>
            <div style={{width:"95%", textAlign:"right", marginTop:"2vh", marginRight:"5%", height:"5vh"}}>
            <button style={{padding:"1vh", width:"30%",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"none"}} onClick={() =>{
                alert.show(<AddStudent data={props.data} studentList={studentList} handleSelection={handleSelection}/>,{
                    closeCopy:"Cancel",
                     actions:[{
                        copy:"Add",
                        onClick: () =>{
                            console.log(newList);
                        let consolidatedList = studentList.concat(newList);
                        setStudentList(consolidatedList);
                        }
                    }]
                })
            }}>+Add students</button></div>
            <div style={{overflow:"scroll", height:"64vh"}}>
            {studentList.map(each => 
            <div className="App-row" style={{height:"5vh", marginTop:"1vh", marginRight:"2%", marginLeft:"2%", background:"rgba(30,144,255,0.5)", padding:"0.5%"}}>
                <div className="App-column" style={{width:"70%", display:"flex", justifyContent:"center", alignItems:"center",background:"white"}}> {each} </div>
                <div className="App-column" style={{width:"30%", display:"flex", justifyContent:"center", alignItems:"center", background:"white"}}>
                <button style={{width:"50%",float:"right",background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "3px 3px 3px grey",color:"white", border:"none"}} onClick={()=>{
                    let list = studentList;
                    list = list.filter(item => item !== each);
                    setStudentList(list);
                }}>remove</button>
                </div>
            </div>
            )}
            </div>
        </>
        }
      </div>
      </div>
      <div style={{marginTop:"2vh"}}><button style={{padding:"1vh", width:"30%",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"none"}} onClick={async ()=>{
          await DataService.modifyClass(selectedClass, studentList);
          props.setRefresh(!props.refresh);
          alert.show("Successfully updated");
          //setIsSelected(false);
      }}>Save changes</button></div>
      
    </div>
    )
}