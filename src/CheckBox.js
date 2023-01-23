import React from 'react'

export const CheckBox = props => {
    
    console.log("executing")
    return (
        <>
        <div style={{display:"flex", justifyContent:"center",alignItems:"center" }}><input type="checkbox" onClick={props.handleAllChecked}  value="checkedall" /> <span style={{color:"white"}}>Check / Uncheck All</span></div>
        <ul>
        {
          props.studentList.map(student => <><li><div style={{display:"flex", justifyContent:"left",alignItems:"center" ,border:"0.5px solid grey", margin:"1%", height:"5vh", background:"white", paddingLeft:"35%"}}><input
          key={student.id}
          onClick={props.handleCheckChildElement}
          type="checkbox"
          checked = {student.isChecked}
          value={student.value}
        />{" "}
        {student.value} </div></li></>
            
      )
        }
        </ul>
        </>
    )
}

export default CheckBox;