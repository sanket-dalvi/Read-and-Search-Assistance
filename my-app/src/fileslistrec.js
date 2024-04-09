import React, { useState } from "react";
import "./fileselector.css";
import FileUpload from "./FileUpload";

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


function FileInput({ fileNames, setIsLoading, setFileText, setFileNames, closefileinput }) {



    return (
        // <div className = "contentfs">
        <div className="mac-book-pro142-group9fs">
            

            <button className="mac-book-pro142-donebuttonfs" onClick={() => closefileinput()}>BACK</button>
            <div className="mac-book-pro142-frame2"></div>
        </div>
        // </div>
    );
}

export default FileInput;


