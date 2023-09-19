import React from "react";
import "./stylesSR.css";

function SearchResult({ name, score, matchedWords, showthispdf }) {
  function sendname(nn) {
    showthispdf(nn);
  }
  return (
    <div className="search-result">
    <div className="name">{name}
    <div className="score">{score.toFixed(4)}</div>
    </div>
   
    <div className="matched-words">
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
    </div>
    <div>
      <button
        onClick={() => {
          sendname(name);
        }}
        className="add-button"
      >
        show
      </button>
    </div>
  </div>
  
  );
}

export default function SearchResults({ results, showthispdf }) {
  return (
    <div className="search-results-container">
      {results.map((result, index) => (
        <SearchResult key={index} showthispdf={showthispdf} {...result} />
      ))}
    </div>
  );
}
