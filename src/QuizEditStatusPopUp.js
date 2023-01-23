import React from 'react';
import './App.css';
import SimpleSelect from './SimpleSelect';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from 'react-list-select';
import QuestionBankPopup from './QuestionBankPopup';
import Popup from './PopUp';
import CreateQuestionPopup from './CreateQuestionPopup';
import EditQuestionPopup from './EditQuestionPopup';
import QuestionBankDataFetch from './QuestionBankDataFetch';
import { useAlert } from 'react-alert';
import DateTimePicker from 'react-datetime-picker';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import CheckBox from './CheckBox';

const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      height:"2vh"
    },
    icon: {
      borderRadius: '50%',
      width: 14,
      height: 14,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: 'rgb(30,144,255)',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 14,
        height: 14,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });

  const labelStyle = makeStyles({
      label: {
        fontSize: "1.8vh",
          color:"rgb(30,144,255)",

      }
  });
  
  // Inspired by blueprintjs
  function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        style={{fontSize: "0.8rem"}}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
function RadioButtons (props) {
    const classes = labelStyle();
    return(
        <FormControl component="status" >
                    <RadioGroup aria-label="status" name={props.name}  value={props.value} onChange={props.handleChange} row style={{width:"100%",maxHeight:"5vh"}}>
                        <FormControlLabel classes={{label:classes.label}} value="Active" style={{width:"27%"}} control={<StyledRadio />} label="Active" />
                        <FormControlLabel classes={{label:classes.label}} value="Completed" style={{width:"40%"}} control={<StyledRadio />} label="Completed" />
                        <FormControlLabel classes={{label:classes.label}} value="ReActivate" style={{width:"25%"}} control={<StyledRadio />} label="ReActivate" />
                    </RadioGroup>
                </FormControl>
    )
}

function DateTimeSelector (props) {
  const classes = labelStyle();
  const [val, setVal] = React.useState(props.datetime[props.entity]);
  const [name, setName] = React.useState("");
  const [quizType, setQuizType] = React.useState("Scheduled");
  const handleTypeChange = (event) => {
    setQuizType(event.target.value);
    if(event.target.value == "Self Paced"){
      props.handleDateTimeChange(null,props.entity)
    }
  }

  const handleNameChange = (event) =>{
    setName(event.target.value);
    console.log(event.target.value);
    props.handleNameChange(event.target.value);
  }
  const date = new Date();
  return(
    <div style={{minWidth:"350px"}}>
      {props.isReassign && 
      <div>
        <div style={{fontStyle:"oblique", fontSize:14,color:"rgb(30,144,255)"}}>Quiz can only be reassigned under a new name</div>
        <span style={{color:"rgb(30,144,255)"}}>Name : </span><input
       style={{alignItems:"left",height:"2rem", width:"80%", border:"0.5px solid rgb(30,144,255)", background:"lightgray"}}
     placeholder={"Name of quiz"} value={name} required onChange={handleNameChange}
    />
      </div>
      }
    <FormControl component="status" style={{background:"white", width:"100%", marginLeft:"5%"}}>
                    <RadioGroup aria-label="status" name="status" value={quizType} onChange={handleTypeChange} row style={{float:"right",marginTop:"2vh", marginBottom:"3vh"}}>
                        <FormControlLabel classes={{label:classes.label}} value="Scheduled" style={{ width:"50%",alignItems:"center"}}control={<StyledRadio />} label="Scheduled" />
                        <FormControlLabel classes={{label:classes.label}} value="Self Paced" control={<StyledRadio />} label="Self Paced" />
                    </RadioGroup>
                </FormControl>
    
    <div style={{height:"25vh", color:"rgb(30,144,255)"}}>Expiry : <DateTimePicker className="datetime" dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy" hourPlaceholder="00" minutePlaceholder="00" disableClock  disabled={(quizType=="Scheduled")? false :true}
    
                              value={val}
                              onChange={(dt) =>{setVal(dt);props.handleDateTimeChange(dt,props.entity)}}
                              /></div>
                              </div>
  )
}
 function QuizDetailsPopUp (props) {
   return(
     <>
     <div style={{minWidth:"500px", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)", fontWeight:"bold"}}>Details</div>
     <div className="App-row" style={{width:"100%", background:"lightgrey"}}>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>Name</div>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>{props.data.name}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey"}}>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>Number of Questions</div>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>{props.data.numberOfQuestions}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey"}}>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>Type</div>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>{props.type}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey"}}>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>Duration</div>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>{props.data.duration}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey"}}>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>Expiry</div>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>{props.expiry}</div>
     </div>
     <div className="App-row" style={{width:"100%", background:"lightgrey"}}>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>Status</div>
       <div className="App-column"style={{width:"50%", margin:"1%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(30,144,255)"}}>{props.status}</div>
     </div>
     </>
   )
 }

export default function QuizEditStatusPopUp(props) {
  console.log("updating");
  const [refreshDatetime, setRefreshDatetime] = React.useState(false);
  //const [reassignName, setReassignName] = React.useState("");
  let reassignName = "";
  
  let save = true;
  const alert = useAlert();
    const classes = labelStyle();
    let quizStatusForClass = {};
    let assignedEntities = Object.keys(props.data.assignedEntities).sort();
    assignedEntities.forEach(item => {
        let status = "";
        let expiry = (props.data["assignedEntities"][item])?(props.data["assignedEntities"][item]).toDate(): null;
        //console.log(expiry, new Date());
        if(expiry == null) {
          status = "Active"
        }
        else if (expiry > new Date()){
            status = "Active"
        } else {
            status = "Completed"
        }
        quizStatusForClass[item] = status;
    });
    let initialQuizStatusForClass = quizStatusForClass;
    let expiryOfQuizesForClass = {};
    Object.keys(props.data["assignedEntities"]).map(each =>{
      expiryOfQuizesForClass[each] =  (props.data["assignedEntities"][each])?(props.data["assignedEntities"][each]).toDate(): null;
    });
    const [datetime, setdatetime] = React.useState(expiryOfQuizesForClass);
    let expiryDate  = null;
    const [value, setValue] = React.useState(quizStatusForClass);
    console.log(quizStatusForClass)
    //console.log(value);
    const [checked, setChecked] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [assignToStudent , setAssignToStudent] = React.useState(false);
    const [assignToClass, setAssignToClass] = React.useState(false);
    
    const handleNameChange = (name) => {
      console.log(name);
      reassignName = name;
      console.log(reassignName);
    }
    const handleExpiryToAssign = (dt, entity) => {
      console.log(dt);
      expiryDate = dt;
      console.log(expiryDate);
    }
    
  const handleChange = (event) => {
      let val = value;
      val[event.target.name] = event.target.value;
    setValue(val);
    setChecked(!checked);
  };
  
  const handleDateTimeChange = (dt, entity) =>{
    let expiryDetails= datetime;
    expiryDetails[entity] = dt;
    setdatetime(expiryDetails);
    setRefreshDatetime(!refreshDatetime);
  }
  const [entityWithoutQuiz, setEntityWithoutQuiz] = React.useState([])
  const [entityToAssign, setEntityToAssign] = React.useState([]);
  React.useEffect(()=>{
    const entityList = [];
    let n = 0;
    entityWithoutQuiz.map(each =>{
        n= n+1;
        entityList.push({"id": n,"value":each, "isChecked":false});
    })
    setEntityToAssign(entityList);
  },[entityWithoutQuiz])
  
    
    
    const [isChecked, setIsChecked] = React.useState(false);

    const handleAllChecked = (event) => {
        console.log(event.target.checked);
        let listOfStudents = entityToAssign;
        listOfStudents.forEach(each => each.isChecked = event.target.checked) 
        setEntityToAssign(listOfStudents);
        setIsChecked(!isChecked);
      }
    
    const handleCheckChildElement = (event) => {
        let listOfStudents = entityToAssign;
        listOfStudents.forEach(each => {
           if (each.value === event.target.value)
           each.isChecked =  event.target.checked
        })
        setEntityToAssign(listOfStudents);
        setIsChecked(!isChecked);
      }

      const [entityWithQuiz, setEntityWithQuiz] = React.useState([])
      const [entityToReassign, setEntityToReassign] = React.useState([]);
      React.useEffect(()=>{
        const entityList = [];
        let n = 0;
        entityWithQuiz.map(each =>{
            n= n+1;
            entityList.push({"id": n,"value":each, "isChecked":false});
        })
        setEntityToReassign(entityList);
      },[entityWithQuiz])
      
        
        
        const [isReassign, setIsReassign] = React.useState(false);
    
        const handleAllCheckedReassign = (event) => {
            console.log(event.target.checked);
            let listOfStudents = entityToReassign;
            listOfStudents.forEach(each => each.isChecked = event.target.checked) 
            setEntityToReassign(listOfStudents);
            setIsChecked(!isChecked);
          }
        
        const handleCheckChildElementReassign = (event) => {
            let listOfStudents = entityToReassign;
            listOfStudents.forEach(each => {
               if (each.value === event.target.value)
               each.isChecked =  event.target.checked
            })
            setEntityToReassign(listOfStudents);
            setIsChecked(!isChecked);
          }
  
    return(
        <>
        
        <div style={{color:"rgb(30,144,255)", fontWeight:"bolder"}}>{props.selectedQuiz}</div>
    
                <div style={{maxHeight:"40vh",minHeight:"20vh", background:"lightgrey", overflow:"scroll", marginTop:"2vh"}}><span style={{color:"white", fontWeight:"bold"}}>Currently assigned to</span>
                {assignedEntities.map(each => <div style={{ justifyContent:"center", alignItems:"center", height:"4vh", margin:"1vh", background:"white"}}>
                <div className="App-row" style={{minWidth:"800px", overflow:"scroll"}}>
                    <div className="App-column" style={{
                        width: "15%", background:"white",display:"flex", justifyContent:"center", alignItems:"center"
                        }}>{each}</div>
                    <div className="App-column" style={{
                        width: "70%" , justifyContent:"left", alignItems:"left", background:"white"
                        }}>
                        <RadioButtons name={each} value={value[each]} handleChange={handleChange} checked={checked}/>
                    </div>
                    <div className="App-column" style={{width:"20%" ,alignItems:"right"}}>
                      <button style={{paddingTop:"1vh", paddingBottom:"1vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"1px solid white"}} onClick={() => {
                        let expiryOfQuiz = (props.data.assignedEntities[each] != null) ?  props.data.assignedEntities[each].toDate().toString() : "No End Date";
                        let type = (expiryOfQuiz == "No End Date")? "Self Paced" : "Scheduled";
                        alert.show(<QuizDetailsPopUp data={props.data} status={value[each]} expiry={expiryOfQuiz} type={type} />)
                      }}>...</button>
                        <button style={{paddingTop:"1vh", float:"right", paddingBottom:"1vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"1px solid white"}} onClick={async ()=>{
                          let expiryDetails= datetime[each];
                          if(initialQuizStatusForClass[each] == value[each]){
                            alert.show("Nothing to update");
                          } else {
                            if(value[each] == "Completed"){
                              await DataService.editQuizStatus(props.selectedQuiz,each, new Date());
                              handleDateTimeChange(new Date(), each);
                              props.setQuizRefresh(!props.quizRefresh);
                              alert.show("Status updated successfully");
                              //props.setRefresh(!props.refresh);
                            } else {
                
                             alert.show(<DateTimeSelector datetime={datetime} handleDateTimeChange={handleDateTimeChange} entity={each} refreshDatetime={refreshDatetime}/>, {
                              closeCopy:"save",
                              onClose: async ()=>{
                                if(save){
                                await DataService.editQuizStatus(props.selectedQuiz,each, datetime[each]);

                                alert.show("Status updated successfully");
                                }
                                save = true;
                                //handleDateTimeChange(datetime[each], each);
                                props.setQuizRefresh(!props.quizRefresh);
                                /*if(value[each] == "ReActivate" || value[each] == "Active" ) {
                                  let statusDetails = value;
                                  if(datetime[each] > new Date()){
                                    statusDetails[each] = "Active";
                                  } else{
                                    statusDetails[each] = "Completed";
                                  }
                                  setValue(statusDetails);
                                }
                                setChecked(!checked);
                                //props.setRefresh(!props.refresh);*/
                               },
                               actions: [
                                {
                                  copy: "cancel",
                                  onClick: ()=> {
                                    /*let status = "";
                                    if(expiryDetails > new Date()){
                                       status = "Active"
                                    } else {
                                      status = "Completed"
                                    }
                                    let statusDetailsOfClass = value;
                                    statusDetailsOfClass[each] = status;
                                   setValue(statusDetailsOfClass);
                                   setChecked(!checked);
                                   handleDateTimeChange(expiryDetails, each);
                                   console.log("date",datetime);*/
                                   save= false;;
                                   //props.setQuizRefresh(!props.quizRefresh);
                                   //setChecked(!checked);
                                 }
                                },
                                
                              ],
                              });
                            }
                          }
                         }}>save change</button>
                    </div>
                </div>
                </div>)}
                </div>
                
                <div style={{margin:"2vh"}}>
                <button style={{width:"25%", padding:"0.8vh", marginRight:"2%",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"none"}} onClick={async ()=>{let result = await DataService.getClassesAndStudentsWithOutQuiz(props.selectedQuiz, assignedEntities);
                  setEntityWithoutQuiz(result.classes);
                  setEntityWithQuiz(result.assignedClasses);
                  setIsReassign(false);
                  console.log(entityWithoutQuiz);
                  setAssignToClass(true);setAssignToStudent(false);}}>Assign to a class</button>
                <button style={{width:"25%", padding:"0.8vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,color:"white", border:"none"}} onClick={async ()=>{let result = await DataService.getClassesAndStudentsWithOutQuiz(props.selectedQuiz, assignedEntities);
                  setEntityWithoutQuiz(result.students);
                  setEntityWithQuiz(result.assignedStudents);
                  setIsReassign(false);
                  setAssignToStudent(true); setAssignToClass(false)}}>Assign to a student</button>
                </div>
                {assignToStudent && <>
                <div className="App-row" style={{height:"42vh"}}>
    <div className="App-column" style={{width:"45%",height:"35vh" ,marginLeft:"2%", marginRight: "1%", padding:"1%",backgroundColor:"rgba(30,144,255,0.7)",overflow:"scroll",border:"0.5px solid grey",
        marginTop:"2vh", marginBottom:"1vh", borderRadius:"5%/2%"}}> <div style={{fontWeight:"bold", color:"white"}}>Student List</div>
        <div style={{marginTop:"1vh", marginBottom:"1vh", background:"white", height:"6vh"}}>
        <button className="assign-reassign-button" style={{background:(isReassign == true) ? "white":"rgb(30,144,255)",color:(isReassign == true) ? "rgb(30,144,255)":"white",padding:"0.8vh", width:"30%",cursor:"pointer", marginTop:"1vh",fontWeight:(isReassign== true)?"normal":"bold",border:"0.5px solid rgb(30,144,255)"}} onClick={() =>{
          setIsReassign(false);
        }} autoFocus>Unassigned</button>
        <button className="assign-reassign-button" style={{background:(isReassign == true) ? "rgb(30,144,255)":"white",color:(isReassign == true) ? "white":"rgb(30,144,255)",padding:"0.8vh", width:"30%",cursor:"pointer", marginTop:"1vh",fontWeight:(isReassign== true)?"bold":"normal",border:"0.5px solid rgb(30,144,255)"}} onClick={() =>{
          setIsReassign(true);
        }}>Assigned</button>
        </div>
        { !isReassign && 
         <CheckBox studentList={entityToAssign} handleAllChecked={handleAllChecked} handleCheckChildElement={handleCheckChildElement} checked={isChecked} />
        }
        { isReassign && 
         <CheckBox studentList={entityToReassign} handleAllChecked={handleAllCheckedReassign} handleCheckChildElement={handleCheckChildElementReassign} checked={isChecked} />
        }
</div>
<div className="App-column" style={{width:"45%",height:"35vh" ,marginLeft:"2%", marginRight: "1%", backgroundColor:"white",overflow:"scroll",padding:"1%",
        marginTop:"2vh", marginBottom:"1vh", borderRadius:"5%/2%", border:"0.5px solid grey"}}>
  <span style={{color:"rgb(30,144,255)", fontWeight:"bold"}}>Selected Students</span>
  {!isReassign && 
  <div>
        {entityToAssign.filter(each => each.isChecked).map(each => <li style={{display:"flex", justifyContent:"center", alignItems:"center", height:"4vh", margin:"1vh", background:"rgb(30,144,255)", color:"white"}}>{each.value}</li>)}
    </div>
  }
  {isReassign && 
  <div>
        {entityToReassign.filter(each => each.isChecked).map(each => <li style={{display:"flex", justifyContent:"center", alignItems:"center", height:"4vh", margin:"1vh",background:"rgb(30,144,255)", color:"white"}}>{each.value}</li>)}
    </div>
  }
    
</div>

</div>
<button style={{float:"right", padding:"1vh", width:"30%",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none"}} onClick={() =>{
  console.log("on click")
  let selectedEntities = [];
  entityToAssign.filter(each => each.isChecked).map(item => selectedEntities.push(item.value));
  let reassignEntities = [];
  entityToReassign.filter(each => each.isChecked).map(item => reassignEntities.push(item.value));
  alert.show(<DateTimeSelector datetime={{"assign":null}} handleDateTimeChange={handleExpiryToAssign} entity="assign" isReassign={isReassign} handleNameChange={handleNameChange} reassignName={reassignName}/>, {
    closeCopy:"cancel",
    actions:[
      {
        copy: "assign",
        onClick : async () =>{
          if(!isReassign){
          console.log(expiryDate)
            await DataService.assignQuiz(props.selectedQuiz, selectedEntities, "student", expiryDate);
            props.setQuizRefresh(!props.quizRefresh);
          } else {
            console.log(reassignName);
            await DataService.reassignQuiz(props.selectedQuiz,reassignName, reassignEntities, "student", expiryDate);
            props.setQuizRefresh(!props.quizRefresh);
          }
          
        }
      }
    ]
  
    })
  
}}>Assign</button>
</>}
{assignToClass && <>
                <div className="App-row" style={{height:"42vh"}}>
    <div className="App-column" style={{width:"45%",height:"35vh" ,marginLeft:"2%", marginRight: "1%", padding:"1%",backgroundColor:"rgba(30,144,255,0.7)",overflow:"scroll",border:"0.5px solid grey",
        marginTop:"2%", marginBottom:"2%", borderRadius:"5%/2%"}}> <div style={{fontWeight:"bold", color:"white"}}>Class List</div>
        <div style={{marginTop:"1vh", marginBottom:"1vh",background:"white", height:"6vh"}}>
        <button className="assign-reassign-button" style={{background:(isReassign == true) ? "white":"rgb(30,144,255)",color:(isReassign == true) ? "rgb(30,144,255)":"white",padding:"0.8vh", width:"30%",cursor:"pointer", marginTop:"1vh",fontWeight:(isReassign== true)?"normal":"bold",border:"0.5px solid rgb(30,144,255)"}} onClick={() =>{
          setIsReassign(false);
        }} autoFocus>Unassigned</button>
        <button className="assign-reassign-button" style={{background:(isReassign == true) ? "rgb(30,144,255)":"white",color:(isReassign == true) ? "white":"rgb(30,144,255)",padding:"0.8vh", width:"30%",cursor:"pointer", marginTop:"1vh",fontWeight:(isReassign== true)?"bold":"normal",border:"0.5px solid rgb(30,144,255)"}} onClick={() =>{
          setIsReassign(true);
        }}>Assigned</button>
        </div>
        { !isReassign && 
         <CheckBox studentList={entityToAssign} handleAllChecked={handleAllChecked} handleCheckChildElement={handleCheckChildElement} checked={isChecked} />
        }
        { isReassign && 
         <CheckBox studentList={entityToReassign} handleAllChecked={handleAllCheckedReassign} handleCheckChildElement={handleCheckChildElementReassign} checked={isChecked} />
        }

         
</div>
<div className="App-column" style={{width:"45%",height:"35vh" ,marginLeft:"2%", marginRight: "1%", backgroundColor:"white",overflow:"scroll",padding:"1%",
        marginTop:"2%", marginBottom:"2%", borderRadius:"5%/2%", border:"0.5px solid grey"}}>
  <span style={{color:"rgb(30,144,255)", fontWeight:"bold"}}>Selected Class</span>
  {!isReassign && 
  <div>
        {entityToAssign.filter(each => each.isChecked).map(each => <li style={{display:"flex", justifyContent:"center", alignItems:"center", height:"4vh", margin:"1vh", background:"rgb(30,144,255)", color:"white"}}>{each.value}</li>)}
    </div>
  }
  {isReassign && 
  <div>
        {entityToReassign.filter(each => each.isChecked).map(each => <li style={{display:"flex", justifyContent:"center", alignItems:"center", height:"4vh", margin:"1vh", background:"rgb(30,144,255)", color:"white"}}>{each.value}</li>)}
    </div>
  }
    
    
</div>

</div>
<button style={{float:"right", padding:"1vh", width:"30%",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none"}} onClick={() =>{
  console.log("on click")
  let selectedEntities = [];
  entityToAssign.filter(each => each.isChecked).map(item => selectedEntities.push(item.value));
  let reassignEntities = [];
  entityToReassign.filter(each => each.isChecked).map(item => reassignEntities.push(item.value));
  alert.show(<DateTimeSelector datetime={{"assign":null}}  handleDateTimeChange={handleExpiryToAssign} entity="assign" isReassign={isReassign} handleNameChange={handleNameChange} reassignName={reassignName}/>, {
    closeCopy:"cancel",
    actions:[
      {
        copy: "assign",
        onClick : async () =>{
          if(!isReassign){
          console.log(expiryDate)
            await DataService.assignQuiz(props.selectedQuiz, selectedEntities, "class", expiryDate);
            props.setQuizRefresh(!props.quizRefresh);
          }else {
            console.log(reassignName)
            await DataService.reassignQuiz(props.selectedQuiz,reassignName, reassignEntities, "class", expiryDate);
            props.setQuizRefresh(!props.quizRefresh);
          }
          
        }
      }
    ]
  
    })
  
}}>Assign</button>

</>}    

        
        </>
    )
}
