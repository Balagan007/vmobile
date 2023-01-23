import React from 'react';
import './App.css';
import SelectClass from './SelectClass';
import DataService from './DataService';
import {studentDetails} from './dummyData';
import List from 'react-list-select';

export default function QuestionBankPopup(props) {
    const [category, setCategory] = React.useState("All");
    const [numberOfQuestionsSelected , setNumberofQuestionsSelected] = React.useState(0);
    const categoryList = ["All"];
    Object.keys(props.data).map(each =>{
        categoryList.push(each);
    })
    let selectedQuestions = [];
   
    const [searchKey, setSearchKey] = React.useState("");
    const search = (searchList,key) =>{
        let resultList = searchList.filter(each => {
         return each.question.toLowerCase().includes(key.toLowerCase());
        })
        return resultList;
    }
function comp(question) {
    return (
        <div style={{border:"none", textAlign:"left", marginTop:"1%", lineHeight: "200%"}}>
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
        </div>
    )
}
    
   let comps= [];
   if(category == "All") {
       let completeList = []
       Object.keys(props.data).forEach(item => {
           props.data[item].map(question =>{completeList.push(question)})
       });
       if(searchKey != ""){
       search(completeList, searchKey).map(question =>{comps.push(comp(question))});
       } else {
        completeList.map(question =>{comps.push(comp(question))});
       }
   //ques.map(question =>{comps.push(comp(question))});
   } else {
       //ques.filter((item => item.category == category)).map(question =>{comps.push(comp(question))});
       //props.data[category].map(question =>{comps.push(comp(question))});
       if(searchKey != ""){
       search(props.data[category], searchKey).map(question =>{comps.push(comp(question))});
       } else {
        props.data[category].map(question =>{comps.push(comp(question))});
       }
   }
   
 
    const handleSelection = (selected) =>{
        console.log(selected);
        selectedQuestions = selected;
    };
    return(
        <div style={{background:"lightgray", height:"81vh"}}>
        <div className="App-row" style={{maxHeight:"7vh", background:"lightgray"}}>
    <div className="App-column" style={{
        width: "15%" ,marginTop:"1vh", background:"lightgray",display:"flex", justifyContent:"center", alignItems:"center"
      }}>Category</div>
    <div className="App-column" style={{
        width: "35%" , justifyContent:"left", alignItems:"left", background:"lightgray"
      }}>
      <SelectClass setSelectedClass={setCategory} list={categoryList} />
    </div>
    <div className="App-column" style={{
        width: "55%" , justifyContent:"left", alignItems:"left", background:"lightgray", marginTop:"1.5vh"
      }}> Search
      <input style={{ width:"50%", height:"2rem", marginLeft:"5%"}} onChange={(event) => {setSearchKey(event.target.value)}}/>
    </div>
    </div>
    
    
    <div style={{background:"white", height:"60vh", marginLeft:"5%", marginRight:"5%",marginTop:"2vh",marginBottom:"1vh", borderRadius:"2%/4%", overflow:"scroll", padding:"1%"}}>
        <span style={{fontWeight:"bold"}}>Questions <br /> <span style={{fontStyle:"oblique", color:"rgb(30,144,255)", fontWeight:"normal"}}>click to select/unselect</span></span>

        <div style={{maxHeight:"57vh", overflow:"scroll"}}>
        <div className="questions-menu">
        <List
    items={comps}
    multiple={true}
    onChange={(selected => handleSelection(selected))}
  />
  </div>
  </div>
    </div>
    <button style={{width:"25%", padding: "1vh",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none", marginTop:"3vh"}} onClick={()=>{
        if(selectedQuestions.length != 0) {
            let ques = [];
            if(category == "All"){
                Object.keys(props.data).forEach(each =>{
                    props.data[each].map(item => {
                        ques.push(item);
                    })
                })}
                else{
                    props.data[category].map(item => {
                        ques.push(item);
                    }) 
                }
    selectedQuestions.map(index =>{ 
        if(props.list.filter(item =>item.id == ques[index].id).length == 0)
        props.list.push(ques[index])
    }); props.setList(props.list); selectedQuestions = [];} props.handleClose()}}> Add </button>
    </ div>
    )
}