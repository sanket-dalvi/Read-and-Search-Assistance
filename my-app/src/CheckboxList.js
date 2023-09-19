import React, { useState, useEffect } from "react";

function CheckboxList({ terms, checkedTerms, setCheckedTerms, onCheckedTerms }) {

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
          </label>
        </div>
      ))}
    </form>
  );
}

export default CheckboxList;
