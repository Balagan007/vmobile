import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "70%",
    display: "flex",
    justifyContent: "left",
    maxHeight: "40px", 
    background:"rgb(30,144,255)",
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));



export default function SimpleSelect(props) {
  const classes = useStyles();
  console.log(props.defaultValue);
  const [classname, setClass] = React.useState(props.defaultValue);
  React.useEffect(()=>{
      setClass(props.list[0]);
      props.setSelectedValue(props.list[0])
    },[props.list]);

  const handleChange = (event) => {
      setClass(event.target.value);
    props.setSelectedValue(event.target.value);
  };

  return (
    <div style={{justifyContent:"left", maxHeight:"10%"}}>
      <FormControl variant="filled" className={classes.formControl} size="small">
        <Select
          id="demo-simple-select-filled"
          value={classname}
          onChange={handleChange}
          variant="outlined"
          style={{maxHeight:"40px", border:"none", color:"white", display:"flex", justifyContent:"center", alignItems:"top", background:"rgb(30,144,255)"}}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
          }}
          
        >
          {props.list.map(item => <MenuItem value={item} >{item}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
  
}