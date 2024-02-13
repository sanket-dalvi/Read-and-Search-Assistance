import React from "react";
import "./stylesSR.css";

function SearchResult({ name, url, isRanking }) {


  const handleButtonClick = (url) => {
    // Open URL in a new tab
    window.open(url, '_blank');
  };



  return (
    <div className="search-result">
    <div className="name">{name}</div>
    {/* <div className="score"> */}
    {/* </div> */}
   
    {/* <div className="matched-words">
      {matchedWords.length > 0 && (
        <div className="matched-words-container">
          <div className="matched-words-title">Matched Words:</div>
          <div className="matched-words-scroll">
            {matchedWords.map((word) => (
              <div className="matched-word" key={word["word"]}>
                {word["word"]} {word["count"]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>*/}
    <div>
      <button
        onClick={() => {
          handleButtonClick(url);
        }}
        className="add-button"
      >
        show
      </button>
    </div> 
  </div>
  
  );
}

export default function DocumentList({ documents, handleCheckboxChange }) {
  return (
    <div className="search-results-container">
      {documents.map((doc, index) => (
        <SearchResult key={index} {...doc} />
      ))}
    </div>
  );
}
