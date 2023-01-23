import React from 'react';
import Students from './Students';
import DataService from './DataService';
import { useStateWithCallbackLazy } from 'use-state-with-callback';




export default function StudentsDataFetch() {
    const [blogs,setBlogs]=useStateWithCallbackLazy([]);
    const [refresh, setRefresh] = React.useState(false);
    console.log("executing");
    const [isLoading, setIsLoading] = React.useState(true);
    let data = [] ;
    React.useEffect(async() => {
         data = await DataService.getStudentsData("professor1");
         setBlogs(data, ()=>{
             setIsLoading(false);
         });
         
        
         
         
     }, [refresh]);
        return(
            <>
            {!isLoading &&
            <Students data={blogs} setRefresh={setRefresh} refresh={refresh}/>
            }
            </>
        )
    
}