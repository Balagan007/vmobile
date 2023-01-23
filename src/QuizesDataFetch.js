import React from 'react';
import Quizes from './Quizes';
import DataService from './DataService';
import { useStateWithCallbackLazy } from 'use-state-with-callback';




export default function QuizesDataFetch() {
    const [blogs,setBlogs]=useStateWithCallbackLazy([]);
    console.log("executing");
    const [isLoading, setIsLoading] = React.useState(true);
    const [refresh, setRefresh] = React.useState(false);
    let data = [] ;
    React.useEffect(async() => {
         data = await DataService.getQuizesData("professor1");
         setBlogs(data, ()=>{
             setIsLoading(false);
         });
         
        
         
         
     }, [refresh]);
        return(
            <>
            {!isLoading &&
            <Quizes data={blogs} setRefresh={setRefresh} refresh={refresh}/>
            }
            </>
        )
    
}