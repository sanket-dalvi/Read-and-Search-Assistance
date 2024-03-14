import React, { useEffect, useState } from "react";
import "./HTMLViewer.css"; // Import your CSS file if needed
import htmlpdfviewer from 'html-pdf-viewer';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';


const HTMLViewer = ({ html }) => {

  const [scale, setScale] = useState(1.5); // Initial scale factor

  const [pageNum, setPageNum] = useState(1); // State to keep track of current page number
 
  const handleZoomIn = () => {
    setScale(scale + 0.1); // Increase scale factor by 0.1
  };

  const handleZoomOut = () => {
    if(scale>1.1){
      setScale(scale - 0.1); 
    }
    // Decrease scale factor by 0.1
  };

  useEffect(() => {
    setPageNum(1);

   
  }, [html]); // Reset page number whenever the HTML changes

  const goToPrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const viewPdf = () => {
    return htmlpdfviewer(html, { output: { mode: 'display', container: '#iframeId', height: 800 } });
  }

  const goToNextPage = () => {
    const iframe = document.getElementById("viewer-iframe");
    const numPages = iframe.contentWindow.document.querySelectorAll("body > div").length;
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>
      <div>
      <div>
        {/* <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button> */}

        <button onClick={handleZoomIn}>
  <FontAwesomeIcon icon={faSearchPlus} /> Zoom In
</button>
<button onClick={handleZoomOut}>
  <FontAwesomeIcon icon={faSearchMinus} /> Zoom Out
</button>


      </div>
      <div className="iframe-container">
        <iframe
          id="viewer-iframe"
          title="HTML Viewer"
          srcDoc={html}
          style={{
            transform: `scale(${scale})`, // Dynamically set the scale factor
            transformOrigin: "0 0", // Set the origin of transformation
          }}
        />
      </div>
     
    </div>
    </>
  );
};

export default HTMLViewer;
