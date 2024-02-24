import React, { useState, useEffect } from "react";

function CheckboxList({ terms, checkedTerms, setCheckedTerms, onCheckedTerms, colorMap }) {

  useEffect(() => {
    onCheckedTerms(checkedTerms);
  }, [checkedTerms]);

  useEffect(() => {
    console.log(terms);
  }, [terms]);


  const handleCheckboxChange = (event) => {
    setCheckedTerms({
      ...checkedTerms,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <form>
      {Object.keys(terms).map((term) => (
        <div key={term}>
          <label>
            <input
              type="checkbox"
              name={term}
              checked={checkedTerms[term] || false}
              onChange={handleCheckboxChange}
            />
            {term}
          </label> <span style={{ display: 'inline-block', marginLeft: '10px' }}>
            <div
              style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: colorMap[term],
              }}
            ></div>
          </span>
        </div>
      ))}
    </form>
  );
}

export default CheckboxList;
