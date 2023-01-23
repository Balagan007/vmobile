import React from 'react';
import clsx from 'clsx';
import './App.css';
import ApiCalls from './ApiCalls';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';



const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
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
        fontSize: 14,
          color:"#137cbd",

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


export default function CurriculumPopup (props){
    const classes = labelStyle();
    const ButtonStyle = {backgroundColor:"white", display:"inline-block"};
    const [value, setValue] = React.useState("Assigned");

    const getCurriculumProgressForStudent = (className, chapterName) =>{
      let curriculumProgressByStudent = [];
      let chapterScore = props.data.curriculum.chapters[chapterName];
      let chapterScoreForStudent = 0;
      let progress = 0;
      props.data.students[className].forEach(each =>{
        chapterScoreForStudent = each.data.progressScore[chapterName];
        progress = Math.round((chapterScoreForStudent/chapterScore)*100);
        curriculumProgressByStudent.push({"id":each.id , "progress": progress.toString()+"%"})
    })
    return curriculumProgressByStudent;
    }
    let curriculumProgressByStudent = getCurriculumProgressForStudent(props.selectedClass, props.chapter);
  const handleChange = (event) => {
    setValue(event.target.value);
    //call backend api to set the status
  };
    return(
        <>
        <div className="App-row" style={{height: "7%", background:"white"}}> 
            <div className="App-column" style={{width: "40%", fontWeight:"bold",background:"white", marginTop:"2%", textAlign:"left", textTransform:"capitalize"}}>{props.chapter}</div>
            {false && 
            <div className="App-column" style={{width:"70%", background:"white"}}> 
                <FormControl component="status">
                    <RadioGroup aria-label="status" name="status" value={value} onChange={handleChange} row>
                        <FormControlLabel classes={{label:classes.label}} value="Assigned" control={<StyledRadio />} label="Assigned" />
                        <FormControlLabel classes={{label:classes.label}} value="Unassign" control={<StyledRadio />} label="Unassign" />
                    </RadioGroup>
                </FormControl>
            </div>
            }
            
        </div>
    
        <div className="App-row" style={{height: "3%", backgroundColor:"lightgrey" ,margin:"2%", marginRight:"5%"}}> 
                    {props.progress != "0%" ?
                        <div className="App-column" style={{width: props.progress, backgroundColor:"rgb(30,144,255)", flexDirection:"row", overflow:"visible", display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>{props.progress}complete</div>
                        : <div className="App-column" style={{marginLeft:"5%"}}> 0% complete</div>}
                    </div>
                    <div style={{textAlign: "left", color:"rgb(30,144,255)", fontWeight:"bold"}}>Completion by student</div>
                    {curriculumProgressByStudent.map(student =><div className="App-row" style={{height: "10%", border:"none", background:"white"}}>
                    <div className="App-column" style={{width:"30%", backgroundColor:"white" , marginTop: "2%", border:"none"}}>{student.id}
                    </div>
                    <div className="App-column" style={{width:"70%" ,backgroundColor: "white", border:"none"}}>
                    <div className="App-row" style={{height: "35%", backgroundColor:"lightgrey" ,margin:"2%", marginRight:"20%",border:"none"}}> 
                    {student.progress != "0%" ?
                        <div className="App-column" style={{width: student.progress, backgroundColor:"rgb(30,144,255)", flexDirection:"row", overflow:"visible",display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>{student.progress}</div>
                        : <div className="App-column" style={{marginLeft:"5%",display:"flex", justifyContent:"center", alignItems:"center"}}>0%</div>}
                    </div>
                    </div>
                   
                    </div>
                
            )}
                        
                    
                    </>
    )
}