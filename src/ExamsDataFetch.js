import React from 'react';
import Exams from './Exams';
import DataService from './DataService';
import { useStateWithCallbackLazy } from 'use-state-with-callback';




export default function ExamsDataFetch() {
    const [blogs,setBlogs]=useStateWithCallbackLazy([]);
    console.log("executing");
    const [isLoading, setIsLoading] = React.useState(true);
    let data = [] ;
    React.useEffect(async() => {
         data = await DataService.getQuizesData("professor1");
         setBlogs(data, ()=>{
             setIsLoading(false);
         });
         
        
         
         
     }, []);
        return(
            <>
            {!isLoading &&
            <Exams data={blogs}/>
            }
            </>
        )
    
}