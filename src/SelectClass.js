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
    background:"rgb(30,144,255)"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  outlined:{
    color:"white",
    border:"none",
    "&:hover":{
      background:"none"
    },"&:active":{
      background:"none"
    },"&:focus":{
      background:"none"
    }
  }
}));

export default function SelectClass(props) {
  const classes = useStyles();
  const [classname, setClass] = React.useState(props.list[0]);

  const handleChange = (event) => {
      setClass(event.target.value);
    props.setSelectedClass(event.target.value);
  };

  return (
    <div style={{justifyContent:"left", maxHeight:"10%"}}>
      <FormControl variant="filled" className={classes.formControl} style={{ backgroundColor: "rgb(30,144,255)"}}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          classes={{outlined: classes.outlined}}
          value={classname}
          onChange={handleChange}
          variant="outlined"
          style={{maxHeight:"40px", border:"none", color:"white", background:"rgb(30,144,255)"}}
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
          
        >{props.list.map(item => <MenuItem value={item} >{item}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}