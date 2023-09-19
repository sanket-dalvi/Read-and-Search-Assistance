import React from 'react';

const Checkboxes = ({ options, onCheckboxChange }) => {
  const handleCheckboxChange = (event) => {
    const word = event.target.value;
    const isChecked = event.target.checked;
    onCheckboxChange(word, isChecked);
  };

  return (
    <div>
      {options.map((word, index) => (
        <div key={index}>
          <input type="checkbox" id={`checkbox_${index}`} value={word} onChange={handleCheckboxChange} />
          <label htmlFor={`checkbox_${index}`}>{word}</label>
        </div>
      ))}
    </div>
  );
};

export { Checkboxes };
