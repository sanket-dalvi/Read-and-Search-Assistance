import React, { useState } from "react";
import "./Box.css";



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


function Box({ queryterms, setqueryterms,setcolorMap,brightColors, setbrightColors }) {
  const [inputValue, setInputValue] = useState("");
  const assignColor = useColorAssignment(brightColors);

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
