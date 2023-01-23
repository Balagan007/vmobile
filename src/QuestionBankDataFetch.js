import React from 'react';
import QuestionBankPopup from './QuestionBankPopup';
import DataService from './DataService';
import { useStateWithCallbackLazy } from 'use-state-with-callback';




export default function QuestionBankDataFetch(props) {
    const [blogs,setBlogs]=useStateWithCallbackLazy([]);
    console.log("executing");
    const [isLoading, setIsLoading] = React.useState(true);
    let data = [] ;
    React.useEffect(async() => {
         data = await DataService.getQuestionBankData("professor1");
         setBlogs(data, ()=>{
             setIsLoading(false);
         });
         
        
         
         
     }, []);
        return(
            <>
            {!isLoading &&
            <QuestionBankPopup data={blogs} prof="prof 1" list={props.list} setList={props.setList} handleClose={props.handleClose}/>
            }
            </>
        )
    
}