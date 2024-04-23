import React, { useState, useEffect } from "react";

function CheckboxList({ results,currShowing, terms, checkedTerms, setCheckedTerms, onCheckedTerms, colorMap }) {

  useEffect(() => {
    onCheckedTerms(checkedTerms);
  }, [checkedTerms]);

  useEffect(() => {
    console.log(terms);
  }, [terms]);
  const [wordc,setwordc]=useState({});



  
  useEffect(()=>{

    const baseFileName = currShowing.replace(".html", ".pdf");
    let wordCounts = {};
    for (let fileObj of results) {
      if (fileObj.name === baseFileName) {
        
          for (let matchedWord of fileObj.matchedWords) {
              wordCounts[matchedWord.word] = matchedWord.count;
          }
         
      }
     
  }
  console.log("wordCounts");
  console.log(wordCounts);
  setwordc(wordCounts);

  },[currShowing])


  const handleCheckboxChange = (event) => {
    setCheckedTerms({
      ...checkedTerms,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <form>
      {Object.keys(terms).map((term) => (
        <div style={{'font-size':'large'}} key={term}>
          <label>
            <input
              type="checkbox"
              name={term}
              checked={checkedTerms[term] || false}
              onChange={handleCheckboxChange}
            />
            {`${term}    (${wordc[term] || 0})`}
          </label> 
          
          <span style={{ display: 'inline-block', marginLeft: '10px' }}>
            <div
              style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: colorMap[term],
              }}
            >
            </div>
          </span>
        </div>
      ))}
    </form>
  );
}

export default CheckboxList;
