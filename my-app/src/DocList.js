import React, { useEffect, useState } from "react";
import "./HTMLViewer.css"; 
import htmlpdfviewer from 'html-pdf-viewer';
import Button from 'react-bootstrap/Button';


const DocList = ( { documents, handleCheckboxChange }) => {
  return (
    <div>
      <h2>List of Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={doc.isRanking}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocList;
