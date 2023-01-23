import React from 'react';
import './App.css';

import DataService from './DataService';

import { useStateWithCallbackLazy } from 'use-state-with-callback';
import QuizEditStatusPopUp from './QuizEditStatusPopUp';



export default function QuizEditStatus(props) {
    const [quizDetais, setQuizDetails] = useStateWithCallbackLazy({});
    const [isQuizLoading, setIsQuizLoading] = React.useState(true);
      const [quizRefresh, setQuizRefresh] = React.useState(false);
      let data = {} ;
      React.useEffect(async() => {
        console.log("loading")
        setIsQuizLoading(true);
           data = await DataService.getQuiz(props.selectedQuiz);
           setQuizDetails(data, ()=>{
               setIsQuizLoading(false);
           });
           
          
           
           
       }, [quizRefresh]);
          return(
              <>
              {!isQuizLoading &&
              <QuizEditStatusPopUp data={quizDetais} selectedQuiz={props.selectedQuiz} setRefresh={props.setRefresh} refresh={props.refresh} setQuizRefresh={setQuizRefresh} quizRefresh={quizRefresh}/>
              }
              </>
          )
      
  }