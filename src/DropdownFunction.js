import React from 'react';
import './App.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropdownFunction() {
    return(
        <>
        <DropdownButton id="dropdown-basic-button" title="Class name">
            <div><Dropdown.Item eventKey="class 1">class 1</Dropdown.Item></div>
            <div><Dropdown.Item eventKey="class 2">class 2</Dropdown.Item></div>
            <div><Dropdown.Item eventKey="class 3">class 3</Dropdown.Item></div>
</DropdownButton>
        </>
    )
}
export default DropdownFunction;