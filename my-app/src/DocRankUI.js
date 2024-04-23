import React, { useState } from "react";
import "./DocRankUI.css";
import SearchResults from "./SearchResults";
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


function DocRankUI({ results,showthispdf }) {



    return (
        <div className="mac-book-pro142-group9">
            
               {results.length>0 &&
               <SearchResults results={results} showthispdf={showthispdf} />
               } 
        

            {/* <div className="mac-book-pro142-donebutton" onClick={() => closefileinput()}>
                <span className="mac-book-pro142-text12">
                    <span>DONE</span>
                </span>
            </div> */}
            <div className="mac-book-pro142-frame2"></div>
        </div>
    );
}

export default DocRankUI;


