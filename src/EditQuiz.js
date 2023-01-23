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

const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      height:"3vh"
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
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
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
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
  function Duration (props) {
    const [val, setVal] = React.useState(props.duration);
    const alert = useAlert();
    return (
      <div style={{background:"lightgray", height:"5vh"}}>Duration : <input
                          style={{alignItems:"left",height:"3vh", border:"none", width:"50%", borderRadius:"2%/25%", marginTop:"1vh"}}
                        placeholder={"Duration in minutes"} required value={val} onChange={(event)=>{
                          const re = /^[0-9\b]+$/;
                          if (event.target.value === '' || re.test(event.target.value)) {
                            setVal(event.target.value);
                            props.setDuration(event.target.value);
                            props.setIsDurationSet(true);

                            //props.toggleDurationSet(event.target.value);
                          } else {
                            alert.show("Please enter a valid number"+ props.duration, {
                              onClose:()=>{
                                setVal(null);
                                props.setDuration(null);
                                props.setIsDurationSet(false);
                              }
                            });
                          }
                        }}
                       /></div>
    )
  }

export default function EditQuiz(props) {
  const alert = useAlert();
    const classes = labelStyle();
    const [value, setValue] = React.useState("quiz");
    const [type, setType] = React.useState("evaluated");
    const categoryList = ["Lungs", "Cardiac", "others"];
    const [category, setSelectedCategory] = React.useState("");
    const [duration,setDuration] = React.useState(props.data.data.duration);
    const [isDurationSet, setIsDurationSet] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = React.useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
    const[qusetionToEdit , setQuestionToEdit] = React.useState({});
    const [errorMessage , setErrorMessage] = React.useState("");
    let initialName = props.name;
    const [name, setName] = React.useState(props.name);

    let ques = props.data.data.questions;
    const [list, setList] = React.useState(ques);

    const [categories, setCategories] = React.useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    //call backend api to set the status
  };
  const handleChangeQuiz = (event) => {
    setType(event.target.value);
    //call backend api to set the status
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const toggleCreateQuestionPopup = () => {
    setIsCreatePopupOpen(!isCreatePopupOpen);
  };
  const toggleEditQuestionPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
  };
  const handleRemove = (question) =>{
    const newList = list.filter(item => item.id !== question.id);
    setList(newList);
  };
  let toggle = false;
  function comp(question) {
    return (
        <div style={{border:"0.5px solid grey", textAlign:"left", marginLeft:"5%", padding:"3%", marginTop:"1%", borderRadius:"2%/10%",  lineHeight: "200%", background:"lightgray"}}>
            <div style={{textAlign:"right", color:"rgb(30,144,255)"}}>{question.category}</div>
            <div>
            Question: {question.question}
            </div>
            <div style={{marginLeft:"10%"}}>
            <div>A.{question.choice1}</div>
            <div>B.{question.choice2}</div>
            <div>C.{question.choice3}</div>
            <div>D.{question.choice4}</div>
            </div>
            <div style={{display: "flex",justifyContent: "flex-end"}}>
            <button style={{margin:"1%", width:"10%",background:"rgb(30,144,255)",color:"white",border:"none", padding:"0.8vh", cursor:"pointer"}} onClick={()=>{handleRemove(question)}}>Remove</button>
            <button style={{margin:"1%", width:"10%",background:"rgb(30,144,255)",color:"white",border:"none",padding:"0.8vh", cursor:"pointer"}} onClick={()=>{setQuestionToEdit(question);toggleEditQuestionPopup()}}>Edit</button>
            </div>
        </div>
    )
}


    return(
        <>
        <div className="App-row" style={{maxHeight:"8%"}}>
    <div className="App-column" style={{
        width: "40%" , textAlign:"right", marginRight:"4%", marginTop:"0.5%", color:"rgb(0,114,221)"
      }}>Name</div>
    <div className="App-column" style={{
        width: "60%" ,textAlign:"left"
      }}>
      <input
       style={{alignItems:"left",height:"2rem", border:"none", width:"50%", borderRadius:"2%/25%"}}
     placeholder={"Name of quiz or exam"} required value={name} onChange={(event)=>{setName(event.target.value)}}
    />
    </div>
    </div>
    <div style={{color:"red"}}>{errorMessage}</div>
    <div style={{maxHeight:"10vh"}}>
    <div style={{maxHeight:"5vh"}}>
    <FormControl component="status" style={{width:"70%", float:"right"}}>
                    <RadioGroup aria-label="status" name="status" value={value} onChange={handleChange} row style={{width:"80%", marginTop:"2%",maxHeight:"5%"}}>
                        <FormControlLabel classes={{label:classes.label}} value="quiz" style={{width:"50%", alignItems:"left",maxHeight:"5%"}}control={<StyledRadio />} label="Quiz" />
                        <FormControlLabel classes={{label:classes.label}} value="exam" control={<StyledRadio />} label="Exam" />
                    </RadioGroup>
                </FormControl>
                </div>
                {value=="quiz1" &&
                <div style={{maxHeight:"5%"}}>
                <FormControl component="status" style={{width:"70%", float:"right", maxHeight:"5%"}}>
                    <RadioGroup aria-label="status" name="status" value={type} onChange={handleChangeQuiz} row style={{width:"80%", marginTop:"1%",float:"right",maxHeight:"5%"}}>
                        <FormControlLabel classes={{label:classes.label}} value="evaluated" style={{width:"50%", alignItems:"left",maxHeight:"1%"}} control={<StyledRadio />} label="Evaluated" />
                        <FormControlLabel classes={{label:classes.label}} value="selftest" control={<StyledRadio />} label="SelfTest" />
                    </RadioGroup>
                </FormControl>
    </div>
                }
                </div>
                <div style={{background:"white", height:"60vh", marginTop:"17vh", marginRight:"5%", marginLeft:"5%"}}>
                    <div style={{height:"5vh"}}>
                    <div style={{float:"right", width:"40%"}}>
                <button style={{width:"45%", padding: "0.5vh", background:"rgb(30,144,255)", color:"white", border:"none", marginTop:"1vh", fontWeight:"bold", cursor:"pointer"}} onClick={async () =>{
                  //let categoriesFromDb = await DataService.getCategories();
                  //setCategories(categoriesFromDb);
                  togglePopup()}}>Question Bank</button>
                <button style={{width:"45%", padding: "0.5vh", background:"rgb(30,144,255)", color:"white", border:"none", marginLeft:"2%", marginTop:"1vh", fontWeight:"bold", cursor:"pointer"}} onClick={async () =>{
                  let categoriesFromDb = await DataService.getCategories();
                  setCategories(categoriesFromDb);
                  toggleCreateQuestionPopup()}}>Add new Question</button>
                </div>
                </div>
                <div style={{display:"float",alignItems:"center", justifyContent:"center", height:"3vh", fontWeight:"bold", color:"rgb(5, 161, 252)"}}>Questions</div>
                <div  style={{height:"52vh",background:"white", width:"95%"}}>
                    <div  style={{height:"43vh", overflow:"scroll", background:"white"}}>
                    {list.length != 0 &&
                        <ul>
                            {list.map(item =><li>{comp(item)}</li>)}
                        </ul>
                      }
                      {list.length == 0 && 
                      <div  style={{height:"44vh", display:"flex", justifyContent:"center", alignItems:"center", background:"white", width:"100%", fontStyle:"oblique", color:"grey"}} >No Questions </div>
                      }
                    </div>
                </div>
                <div style={{background:"white", height:"8vh"}}>
                <button style={{float:"right", margin:"1vh", width:"20%", padding:"0.5%",background:"rgb(30,144,255)", color:"white", border:"none", fontWeight:"bold", cursor:"pointer"}} onClick={async ()=>{
                    if(name == ""){setErrorMessage("*Name is required")}else{
                        setErrorMessage("");
                        if(list.length == 0) {
                          alert.show("Please add questions..")
                        } else {
                      if(value == "quiz"){
                        if(isDurationSet) {
                          
                          let exist = "";
                          if(name == initialName){
                            exist = "Does not exist";
                          } else {
                          exist = await DataService.getQuiz(name);
                          }
                          if(exist == "Does not exist") {
                            await DataService.createQuiz(name, parseInt(duration), list);
                            if((initialName != "") && (name != initialName) ) {
                              await DataService.deleteQuiz(initialName);
                            }
                            props.setRefresh(!props.refresh);
                            props.handleClose();
                          } else {
                            alert.show("Quiz already exists. Please use a different name");
                          }
                          
                        } else {
                          alert.show("Please add quiz duration..")
                        }
                      } else {
                        props.setRefresh(!props.refresh);
                            props.handleClose();
                      }
                    };
                  }
                    
                    //props.setRefresh(!props.refresh);
                }}>Save Changes</button>
                <button style={{float:"right", margin:"1vh", width:"20%", padding:"0.5%",background:"rgb(30,144,255)", color:"white", border:"none", fontWeight:"bold", cursor:"pointer"}} onClick={()=>{
                  setList(ques);
                  props.setRefresh(!props.refresh);
                  props.toggleQuizPopup();
                  props.handleClose();
                  }}>Cancel</button>
                  <div className="App-row" style={{background:"white"}}>
                <div className="App-column" style={{width:"50%", marginLeft:"2%"}}><Duration duration={duration} setDuration={setDuration} isDurationSet={isDurationSet} setIsDurationSet={setIsDurationSet} /></div>
                <div className="App-column" style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30%", background:"white",color:"rgb(5, 161, 252)"}}>Number of questions : {list.length}</div>
                </div>
                </div>
                </div>
                {isOpen && <Popup
      content={<QuestionBankDataFetch prof="prof 1" list={list} setList={setList} handleClose={togglePopup}/>}
      handleClose={togglePopup}
    />}
    {isCreatePopupOpen && <Popup
      content={<CreateQuestionPopup prof="prof 1" list={list} setList={setList} categories={categories}  handleClose={toggleCreateQuestionPopup}/>}
      handleClose={toggleCreateQuestionPopup}
    />}
    {isEditPopupOpen && <Popup
      content={<EditQuestionPopup prof="prof 1" question={qusetionToEdit} list={list} setList={setList} categories={categories}  handleClose={toggleEditQuestionPopup}/>}
      handleClose={toggleEditQuestionPopup}
    />}
        
        </>
    )
}
