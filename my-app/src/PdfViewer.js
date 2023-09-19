import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
  const [checkedWords, setCheckedWords] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState('');

  const handleCheckboxChange = (word, isChecked) => {
    if (isChecked) {
      setCheckedWords([...checkedWords, word]);
    } else {
      setCheckedWords(checkedWords.filter((w) => w !== word));
    }
  };

  const renderHighlightedText = (text) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (checkedWords.includes(word)) {
        return (
          <span key={index} style={{ backgroundColor: getRandomColor(), color: 'white' }}>
            {`${word} `}
          </span>
        );
      } else {
        return <span key={index}>{`${word} `}</span>;
      }
    });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderTextLayer = ({ textLayerDiv, textContent }) => {
    const { items } = textContent;
    const text = items.map((item) => item.str).join(' ');
  
    textLayerDiv.innerHTML = '';
    const container = document.createElement('div');
    const words = text.split(' ');
    let wordIndex = 0;
  
    words.forEach((word) => {
      const wordDiv = document.createElement('span');
      wordDiv.innerText = word + ' ';
  
      if (checkedWords.includes(word)) {
        wordDiv.style.backgroundColor = getRandomColor();
        wordDiv.style.color = 'white';
      }
  
      container.appendChild(wordDiv);
      wordIndex += word.length + 1;
    });
  
    textLayerDiv.appendChild(container);
  };

  return (
    <>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <div>
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={renderTextLayer}
            />
          ))}
        </div>
        <div>
          <Checkboxes onCheckboxChange={handleCheckboxChange} />
        </div>
      </Document>
    </>
  );
};

const Checkboxes = ({ onCheckboxChange }) => {
  const checkboxOptions = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];

  const handleCheckbox = (event) => {
    const word = event.target.name;
    const isChecked = event.target.checked;
    onCheckboxChange(word, isChecked);
  };

  return (
    <div>
      {checkboxOptions.map((option) => (
        <label key={option}>
          <input type="checkbox" name={option} onChange={handleCheckbox} />
          {option}
        </label>
      ))}
    </div>
  );
};

export default PdfViewer;
