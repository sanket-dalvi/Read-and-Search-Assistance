import React, { useState } from "react";
import "./Box.css";

function Box({ queryterms, setqueryterms,setcolorMap }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputOnKeyPress = (e) => {
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
      const newColorMap = {...prevColorMap};
      for (const term of newTerms) {
        if (!newColorMap[term]) {
          // Generate a new random color code for the term
          const colorCode = "#" + Math.floor(Math.random() * 16777215).toString(16);
          newColorMap[term] = colorCode;
        }
      }
      return newColorMap;
    });
  
    setInputValue("");
  };
  
  
  
  return (
    <div className="box">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputOnChange}
          onKeyPress={handleInputOnKeyPress}
          placeholder="Enter queryterms separated by semicolon"
          className="input-field"
        />
        <button onClick={handleAddButtonClick} className="add-button">
          Add
        </button>
      </div>
      <div className="queryterms-container">
        {queryterms.map((term, index) => (
          <div key={index} className="term">
            <span className="term-text">{term}</span>
            <button
              onClick={() => handleRemoveTerm(index)}
              className="remove-button"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Box;
