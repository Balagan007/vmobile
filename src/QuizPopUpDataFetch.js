import React from 'react';
import './App.css';

import DataService from './DataService';

import { useStateWithCallbackLazy } from 'use-state-with-callback';
import QuizPopUp from './QuizPopUp';



export default function QuizPopUpDataFetch(props) {
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
              <QuizPopUp data={quizDetais} selectedQuiz={props.selectedQuiz} handleClose={props.handleClose} toggleEditQuizPopup={props.toggleEditQuizPopup} setName={props.setName} setQuizRefresh={setQuizRefresh} quizRefresh={quizRefresh}
      setRefresh={props.setRefresh} refresh={props.refresh}/>
              }
              </>
          )
      
  }