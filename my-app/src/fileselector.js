import React, { useState } from "react";
import "./fileselector.css";
import FileUpload from "./FileUpload";
import {
    NavbarBrand,
    Navbar,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse,
    Modal,
    ModalBody
  } from "reactstrap";



const useColorAssignment = (initialColors) => {
    const [colors, setColors] = useState(initialColors);


    const assignColor = () => {
        if (colors.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];
        setColors((prevColors) => prevColors.filter((c, index) => index !== randomIndex));

        return color;
    };

    return assignColor;
};


function FileInput({ fileNames, setshowfileselector,showfileselector,setIsLoading, setFileText, setFileNames, closefileinput }) {

    const toggle=()=>{
        setshowfileselector(false)

    }
    

    return (
        // <div className = "contentfs">

        <div className="mac-book-pro142-group9fs">
        {/* <Modal isOpen={showfileselector} toggle={toggle.bind(null)} > */}
    
            <FileUpload setIsLoading={setIsLoading} setFileText={setFileText} closefileinput={closefileinput} setFileNames={setFileNames} />


            <button className="mac-book-pro142-donebuttonfs" onClick={() => closefileinput()}>BACK</button>
            <div className="mac-book-pro142-frame2"></div>
           
        {/* </Modal> */}
        </div>
     
    );
}

export default FileInput;


