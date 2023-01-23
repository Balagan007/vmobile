import React from 'react';
import './App.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Popup from './PopUp';
import CurriculumPopup from './CurriculumPopup';

export default function Curriculum (props){
    const ButtonStyle = {backgroundColor:"white", display:"inline-block", textTransform:"lowercase",display:'flex' ,justifyContent:'center', color:"rgb(30,144,255)"};
    const [isOpen, setIsOpen] = React.useState(false);
    const [chapter, setChapter] = React.useState('');

    const getCurriculumProgressByChapter = (className , chapterName) =>{
        let total = props.data.curriculum.chapters[chapterName];
        let numberOfStudents = 0;
        let chaptersCompleted = 0;
        props.data.students[className].forEach(each =>{
            chaptersCompleted = chaptersCompleted + each.data.progressScore[chapterName];
            numberOfStudents = numberOfStudents + 1;
        })
        let curriculumPercentage = Math.round((chaptersCompleted/(total*numberOfStudents))*100);
        return curriculumPercentage;
    }
    let curriculumByChapter = [];
    const curriculumChapters = ["fundamentals", "cardiac", "lungs", "vascular"];
    curriculumChapters.map(each =>{
        if(each !== "total"){
        curriculumByChapter.push({"chapter":each ,"status":"Assigned", "progress": getCurriculumProgressByChapter(props.selectedClass, each).toString()+"%"});
        }
    });

    
 
  const togglePopup = (chapter) => {
    setIsOpen(!isOpen);
    setChapter(chapter);
  }

    return(
        <div className="App-row" style={{height:"48vh"}}>
            <div className="App-column" style={{width:"43%", marginLeft:"6vw", marginRight: "1vw", backgroundColor:"white",
        marginTop:"1vh", marginBottom:"2vh", borderRadius:"5%"}}>
                <div style={{padding:"2vh 2vw", color: "rgb(30,144,255)", textAlign:"left", fontWeight:"bold"}}>Classname : {props.selectedClass} - Curriculum</div>
                {curriculumByChapter.map(chapters =><div>
                    <div style={{textAlign:"left", marginLeft:"1vw", textTransform:"capitalize"}}><span>{chapters.chapter}  </span> 
                <span style={{float:"right", marginRight:"1vw"}}>
                    
                    <Button style={ButtonStyle} startIcon={<AddCircleIcon style={{ color: "rgb(30,144,255)"}}/>} onClick={() =>togglePopup(chapters.chapter)}>more</Button>
                    </span>
                    </div>
                    <div className="App-row" style={{height: "2vh", backgroundColor:"lightgrey" ,margin:"1vh 1vw", marginRight:"8vw"}}> 
                    {chapters.progress != "0%" ?
                        <div className="App-column" style={{width: chapters.progress, backgroundColor:"rgb(30,144,255)", flexDirection:"row", overflow:"visible", color:"white",textAlign:"left"}}>{chapters.progress}complete</div>
                        : <div className="App-column"> 0% complete</div>}
                    </div>
                    <hr />
                    </div>
                
            )}
            </div>
            <div className="App-column" style={{width:"44%" ,marginTop:"1vh", marginRight:"6vw"}}>
                <div style={{minHeight:"22vh", backgroundColor:"white", marginLeft: "1vw",
            marginBottom:"1vh", borderRadius:"4% / 10%"}}>
                   <div style={{padding:"2vh 2vw", color: "rgb(30,144,255)", textAlign:"left", fontWeight:"bold"}}>Classname : {props.selectedClass} - Current Quiz Analysis</div> 
                   <div style={{textAlign: "left", marginLeft:"2vw"}}>Completion %: <br /> Pass %: <br />Average Score: <br />No: of failed students: </div>
                </div>
                <div style={{minHeight:"22vh", backgroundColor:"white", marginLeft: "1vw",
            marginBottom:"2vh",borderRadius:"4% / 10%"}}>
                <div style={{padding:"2vh 2vw", color: "rgb(30,144,255)", textAlign:"left", fontWeight:"bold"}}>Classname : {props.selectedClass} - Current Exam Analysis</div> 
                   <div style={{textAlign: "left", marginLeft:"2vw"}}>Completion %: <br /> Pass %: <br />Average Score: <br />No: of failed students: </div>
                </div>
            </div>
            {isOpen && <Popup
      content={<CurriculumPopup selectedClass={props.selectedClass} chapter={chapter} data={props.data} progress={curriculumByChapter.filter(each => each.chapter == chapter)[0].progress}/>}
      handleClose={togglePopup}
    />}
        </div>
    )
}