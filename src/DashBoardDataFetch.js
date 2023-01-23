import React from 'react';
import DashBoard from './DashBoard';
import DataService from './DataService';
import { useStateWithCallbackLazy } from 'use-state-with-callback';




export default function DashBoardDataFetch() {
    const [blogs,setBlogs]=useStateWithCallbackLazy([]);
    console.log("executing");
    const [isLoading, setIsLoading] = React.useState(true);
    let data = [] ;
    React.useEffect(async() => {
         data = await DataService.getDashboardData("professor1");
         setBlogs(data, ()=>{
             setIsLoading(false);
         });
         
        
         
         
     }, []);
     console.log(blogs);
        return(
            <>
            {!isLoading &&
            <DashBoard data={blogs}/>
            }
            </>
        )
    
}