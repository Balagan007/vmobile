import React from 'react';
import './App.css';
import logo from './Blue on white.png';
import AuthenticationService from './AuthenticationService';


export default function Login (props) {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [login,setLogin] = React.useState({institution:"",user:"",password:""});
    const [validation,setValidation] = React.useState({institution:"",user:"",password:""});

    const validateall=()=>{
        const{institution,user,password}=login
        const validation={institution:"",user:"",password:""}

        let valid=true;

        if(!institution){
            validation.institution="Institution Name is Required"
            valid=false;
        }

        if(!user){
            validation.user="User Name is Required"
            valid=false;
        }

        if(!password){
            validation.password="Password is Required"
            valid=false;
        }

        if(!valid){
            setValidation(validation)
        }
        return valid;
     }

     const validateOne=(e)=>{
        const{name}=e.target
        const value=login
        let msg=""

        if(!login){
            msg="Institution Name is Required"
        }

        if(login && name=="user"){
            msg="User Name is Required"
        }

        if(login && name=="password"){
            msg="Password is Required"
        }
        setValidation({...validation,[name]:msg})
     }

        const goLogin=(e)=>{
            e.preventDefault()

        const valid=validateall()

        if(!valid){
            return false
        }
    }

    const{institution,user,password}=login

    const{
        institution:institutionerr,
        user:usererr,
        password:passworderr
        }=validation

        const toApply=(e)=>{
            setLogin({...login,[e.target.name]:e.target.value})
        }

    return (
        <>
        <div style={{width:"100vw", height:"100vh",background:"lightgray"}}>
            <div style={{width:"100vw", height:"30vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img style={{width:"150px", height:"150px",paddingTop:"6vh"}} src={logo} />
            </div>
        <div style={{width:"100vw", height:"50vh", display:"flex", justifyContent:"center", alignItems:"center", border:"none"}}>
            <div style={{minWidth:"300px", minHeight:"100px",width:"50vw" , height:"60vh",borderRight:"1px solid rgb(30,144,255)",borderLeft:"1px solid rgb(30,144,255)",
            backgroundImage: "linear-gradient(white,white,white,white,white,white,white,white,white,white,white,white,white)",borderRadius:"3px",boxShadow: "10px 10px 5px rgb(30,144,255)"
        }}>
            <div className="App-row" style={{height:"8vh", marginTop:"8vh", background:"white"}}>
                
                <div className="App-column" style={{
                    width: "15vw" ,color:"rgb(0,114,221)", background:"white", display:"flex",
                    justifyContent:"center", alignItems:"center",fontWeight:"bold", marginLeft:"2.5vw"
                }}>Institution</div>
                <div className="App-column" style={{
                    width: "35vw" ,textAlign:"left", background:"white",display:"flex",
                    justifyContent:"center", alignItems:"center"
                }}>
                    <input
                        style={{alignItems:"left",height:"2rem", border:"3px solid rgb(30,144,255)", width:"27vw", background:"white",borderRadius:"5px"}}
                       type="text" name="institution"  placeholder={""} value={login.institution} onChange={(e)=>toApply(e)} onBlur={validateOne}
                    />
                    
                </div>
            </div>
            <div className="error" style={{color:"red"}}>{institutionerr}</div>
            <div className="App-row" style={{height:"8vh",background:"white"}}>
                
                <div className="App-column" style={{
                    width: "15vw" ,color:"rgb(0,114,221)", background:"white", display:"flex",
                    justifyContent:"center", alignItems:"center",fontWeight:"bold", marginLeft:"2.5vw"
                }}>User Name</div>
                <div className="App-column" style={{
                    width: "35vw" ,textAlign:"left", background:"white",display:"flex",
                    justifyContent:"center", alignItems:"center"
                }}>
                    <input
                        style={{alignItems:"left",height:"2rem", border:"3px solid rgb(30,144,255)", width:"27vw", background:"white",borderRadius:"5px"}}
                        placeholder={""} type="text" name="user" value={login.user} onChange={(e)=>toApply(e)} onBlur={validateOne}
                    />
                    
                </div>
            </div>
            <div className="error" style={{color:"red"}}>{usererr}</div>
            <div className="App-row" style={{height:"8vh",background:"white"}}>
                <div className="App-column" style={{
                    width: "15vw" ,color:"rgb(0,114,221)", background:"white", display:"flex",
                    justifyContent:"center", alignItems:"center", fontWeight:"bold",marginLeft:"2.5vw"
                }}>Password</div>
                <div className="App-column" style={{
                    width: "35vw" ,textAlign:"left", background:"white",display:"flex",
                    justifyContent:"center", alignItems:"center"
                }}>
                    <input
                        style={{alignItems:"left",height:"2rem", border:"3px solid rgb(30,144,255)", width:"27vw", background:"white",borderRadius:"5px"}}
                        placeholder={""} type="password" name="password" value={login.password}  onChange={(e)=>toApply(e)} onBlur={validateOne}
                    />
                   
                </div>
            </div>
            <div className="error" style={{color:"red"}}>{passworderr}</div>
            <div style={{color:"red", fontStyle:"oblique"}}>{errorMessage}</div>
            <div style={{height:"17vh",display:"flex",
                    justifyContent:"center", alignItems:"center"}}>
            <button style={{width:"10vw", padding:"0.8vh 0.8vw",fontWeight: "bold", background:"rgb(30,144,255)",cursor:"pointer" ,boxShadow: "10px 10px 5px grey",color:"white", border:"none",borderRadius:"3px"}}
            //  onClick={async () =>{
            //     let user = login.userName.toLowerCase()+"@"+login.institute.toLowerCase()+".com";
            //     let result = await AuthenticationService.signInUser(user, login.password);
            //     if(result !== "success") {
            //             setErrorMessage(result);
            //     } else {
            //         setErrorMessage("");
            //         sessionStorage.setItem('vmobileToken', (login.userName+"@"+login.institute));
            //         props.setUser(login.userName);
            //     }
                
            // }}
            
            onClick={goLogin}
            >Sign In</button>
            </div>
            </div>
            </div>

        </div>
        </>
    )
}