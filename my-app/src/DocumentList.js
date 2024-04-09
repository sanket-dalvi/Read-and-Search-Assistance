import React from "react";
import "./stylesSR.css";

function SearchResult({ doc }) {

  const title = doc?.document?.title ?? "";
  const url = doc?.document?.url ?? "";


  const handleButtonClick = (url) => {
    // Open URL in a new tab
    window.open(url, '_blank');
  };



  return (
    <div className="search-result">
      <div className="name">{title}</div>
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
          className="opendocbutton"
        >
          show
        </button>
      </div>
    </div>

  );
}


function Fnames({ fname }) {

  return (
    <div className="search-result">
      <div className="name">{fname}</div>
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
    
    </div>

  );
}

export default function DocumentList({ fileNames, documents, handleCheckboxChange }) {
  return (
    <div className="search-results-container">
     
      {  (fileNames.length==0 && documents.length == 0)  && <div className="sciresfilessec">
        <div className="sciresfiles">No Files Present</div>
        {fileNames.map((fname, index) => (
          <Fnames key={index} fname={fname} />
        ))}
      </div>}
      
      {documents.length > 0 && <> <div className="sciresfilessec">
        <div className="sciresfiles">Files From SCIRES</div>
        {documents.map((doc, index) => (
          <SearchResult key={index} doc={doc} />
        ))}
      </div>
        <hr /></>}

      {fileNames.length>0 && <div className="sciresfilessec">
        <div className="sciresfiles">Uploaded Files</div>
        {fileNames.map((fname, index) => (
          <Fnames key={index} fname={fname} />
        ))}
      </div>}
    </div>
  );
}
