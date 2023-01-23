import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Dashboard from '@material-ui/icons/Dashboard';
import Folder from '@material-ui/icons/Folder';
import Navigator from './Navigator';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MyButton from './DasboardButton';
import purple from "@material-ui/core/colors/purple";
import classNames from "classnames";
import db from './firebase.config';
import DataService from './DataService';
import { useRef } from 'react';
import Login from './Login';
import logo from './Blue on white.png';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

function App() {
  const [selectedButton , setSelectedButton] = React.useState('Dashboard');
  const [style, setStyle] = React.useState({
    "dashboard":{
      "background":"rgb(30,144,255)",
      "color":"white",
      "fontWeight":"bold"
    },
    "students":{
      "background":"white",
      "color":"rgb(30,144,255)",
      "fontWeight":"normal"
    },
    "analytics":{
      "background":"white",
      "color":"rgb(30,144,255)",
      "fontWeight":"normal"
    },
    "quizes":{
      "background":"white",
      "color":"rgb(30,144,255)",
      "fontWeight":"normal"
    },
    "exams":{
      "background":"white",
      "color":"rgb(30,144,255)",
      "fontWeight":"normal"
    },
    "create":{
      "background":"white",
      "color":"rgb(30,144,255)",
      "fontWeight":"normal"
    }
  })
  
  const changeStyle = (button) =>{
    let  currentStyle = style;
    Object.keys(currentStyle).forEach(each =>{
      currentStyle[each].background = "white";
      currentStyle[each].color = "rgb(30,144,255)";
      currentStyle[each].fontWeight = "normal";
    })
    currentStyle[button].background = "rgb(30,144,255)";
    currentStyle[button].color = "white";
    currentStyle[button].fontWeight = "bold";
    setStyle(currentStyle);
  }
const styles =  {
  root: {
    backgroundColor: "white",
    color:"rgb(30,144,255)",
    alignItems:"left",
    textTransform:"capitalize",
    width:"100%",
    justifyContent: "flex-start", 
    paddingBottom: "5%", 
    paddingTop: "5%",
    cursor:"pointer",
    '&:active': {
      fontWeight:"bolder !important",
      color:"rgb(30,144,255) !important",
      backgroundColor:"lightgrey"
    },
    '&:focus': {
      fontWeight:"bolder !important",
      color:"rgb(30,144,255) !important",
      backgroundColor:"lightgrey"
    },
  },
}; 

const DashboardButton = withStyles(styles)(Button);
let quizButton = useRef(null);
const [token , setToken] = React.useState(false);
const getToken = () =>{
  let tokenString = sessionStorage.getItem('vmobileToken');
  return tokenString;
}

const [user, setUser] = React.useState("");

  return (
    
    <div className="App">
      
      {((getToken() != null)) && <>
      <div className="App-row-totalSplit">
        <div className="App-column-menu">
        <div className="App-logo-latest"><img style={{width:"50px", height:"50px"}} src={logo} /></div>
        <div className="App-menu">Menu</div>
        <div>
        <DashboardButton style={{background:style["dashboard"].background, color:style["dashboard"].color, fontWeight:style["dashboard"].fontWeight}} startIcon={<Dashboard/>} onClick={() => {setSelectedButton("Dashboard"); changeStyle("dashboard")}} >Dashboard</DashboardButton>
        <DashboardButton  style={{background:style["students"].background, color:style["students"].color, fontWeight:style["students"].fontWeight}}startIcon={<Folder />} onClick={() => {setSelectedButton("Students");changeStyle("students")}}>Classes/Students</DashboardButton>
        <DashboardButton  style={{background:style["analytics"].background, color:style["analytics"].color, fontWeight:style["analytics"].fontWeight}} startIcon={<Folder />} onClick={() => {setSelectedButton("Analytics");changeStyle("analytics")}}>Analytics</DashboardButton>
        <DashboardButton  style={{background:style["quizes"].background, color:style["quizes"].color, fontWeight:style["quizes"].fontWeight}} startIcon={<Folder />} ref={quizButton} onClick={() => {setSelectedButton("Quizes");changeStyle("quizes")}}>Quizes</DashboardButton>
        <DashboardButton  style={{background:style["exams"].background, color:style["exams"].color, fontWeight:style["exams"].fontWeight}} startIcon={<Folder />} onClick={() => {setSelectedButton("Exams");changeStyle("exams")}}>Exams</DashboardButton>
        <DashboardButton style={{background:style["create"].background, color:style["create"].color, fontWeight:style["create"].fontWeight}} startIcon={<Folder />} onClick={() => {setSelectedButton("Create");changeStyle("create")}}>Create quiz/exam</DashboardButton>
        </div>
        <div className="App-signOut-div">
          <button className="App-signOut-button"
          onClick={() =>{
            sessionStorage.removeItem('vmobileToken');
            window.location.reload();
          }}>Sign Out</button>
        </div>
      </div>
        <div className="App-column-mainDiv">
        <div className="App-row-titleBar" style={{width:"85vw"}}>
        
    <div className="App-column" style={{width:"85vw", textAlign:"right"}}>
      <div className="App-row" style={{height:"100%"}}>
      <div className="App-column" style={{textAlign:"right",color:"rgb(30,144,255)", fontWeight:"bold", width:"85%"}}><PermIdentityIcon style={{width:"35px", height:"35px", background:"lightgray", marginTop:"2vh",color:"gray"}}/></div>
      <div className="App-column" style={{color:"rgb(30,144,255)", fontWeight:"bold", width:"15%", marginRight:"1%", textAlign:"left",marginTop:"2vh", marginLeft:"1%"}}>{getToken().split("@")[0]}<br />{getToken().split("@")[1]}</div>
      </div>
    </div>
    </div>
    <hr style={{border: "1px solid rgb(5, 161, 252)"}}></hr>
    <Navigator  selectedButton={selectedButton} buttonType={quizButton} changeStyle={changeStyle}/>
      </div>
        </div>
        </>}
        {(getToken() == null) && 
      <Login setToken={setToken} setUser={setUser}/>
      }
    </div>
    
    
  );
}

export default App;
