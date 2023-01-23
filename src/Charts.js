import React from 'react';
import './App.css';
import Doughnutcharts from './DoughnutChart';

function Charts(props) {
    
  return (
    <div className="App-row" style={{maxHeight:"40vh" }}>
      <div className="Dashboard-charts" style={{marginRight:"11vw",marginLeft:"6vw"}}>
        <div>Curriculum progress</div>
    <div><Doughnutcharts value={props.curriculumProgress}/></div>
    </div>
    <div className="Dashboard-charts" style={{marginRight:"11vw"}}>
        <div>Quiz completion %</div>
    <div><Doughnutcharts value={props.quizCompletion}/></div>
    </div>
    <div className="Dashboard-charts" style={{marginRight:"6vw"}}>
        <div>Exam pass %</div>
    <div><Doughnutcharts value={props.examCompletion}/></div>
    </div>
    </div>
      
  );
}

export default Charts;
