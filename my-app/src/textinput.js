import React, { useState } from "react";
import "./Box.css";
// import styles from './stylenew.css';


// Custom hook for synchronous color assignment
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


function TextInput({ queryterms, setqueryterms, setcolorMap, brightColors, setbrightColors, closetextinput ,setnewtermsupdate}) {
    const [inputValue, setInputValue] = useState("");
    const assignColor = useColorAssignment(brightColors);

    const handleInputOnChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputOnKeyPress = (e) => {
        setnewtermsupdate(true);
        if (e.key === "Enter") {
            addTerms(inputValue);
        }
    };

    const handleAddButtonClick = () => {
        addTerms(inputValue);
    };

    const handleRemoveTerm = (index) => {
        setqueryterms((prevTerms) => prevTerms.filter((_, i) => i !== index));
    };

    const addTerms = (value) => {
        const newTerms = value
            .split(";")
            .filter((term) => term.trim() !== "")
            .map((term) => term.trim().toLowerCase());

        setqueryterms((prevTerms) => [...prevTerms, ...newTerms]);

        setcolorMap((prevColorMap) => {
            const newColorMap = { ...prevColorMap };

            for (const term of newTerms) {
                if (!newColorMap[term]) {
                    const randomColor = assignColor();
                    if (randomColor) {
                        newColorMap[term] = randomColor;
                    }
                }
            }
            console.log(newColorMap);
            return newColorMap;
        });

        setInputValue("");
        setnewtermsupdate(true);
    };



    return (
        <div className="mac-book-pro142-group9ti">

            <div className="mac-book-pro142-group8ti">

                <div className="mac-book-pro142-innerframeti">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputOnChange}
                        onKeyPress={handleInputOnKeyPress}
                        placeholder="Enter queryterms separated by semicolon"
                        className="input-fieldti"
                    />

                </div>
                <button onClick={handleAddButtonClick} className="add-buttonti">
                    Add
                </button>


            </div>


            <div className="mac-book-pro142-group7-repeat-listti">

                {queryterms.map((term, index) => (
                    <div key={index} className="mac-book-pro142-group7ti">

                        <div key={index} className="termti" >
                            <span>{term}</span>

                            <button
                                onClick={() => handleRemoveTerm(index)}
                                className="remove-buttonti"
                            >
                                x
                            </button>
                        </div>

                    </div>
                ))}
            </div>


            {/* <div className="mac-book-pro142-donebuttonti" onClick={() => closetextinput()}>
                <span className="mac-book-pro142-text12ti">
                    <span>DONE</span>
                </span>
            </div> */}
            <button className="mac-book-pro142-donebuttonti" onClick={() => closetextinput()}>DONE</button>

            <div className="mac-book-pro142-frame2"></div>
        </div>
    );
}

export default TextInput;


