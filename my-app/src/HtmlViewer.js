import React, { useEffect, useState } from "react";
import "./HTMLViewer.css"; 
const HTMLViewer = ({ html }) => {
  const [pageNum, setPageNum] = useState(1); // State to keep track of current page number

  useEffect(() => {
    setPageNum(1);
  }, [html]); // Reset page number whenever the HTML changes

  const goToPrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const goToNextPage = () => {
    const iframe = document.getElementById("viewer-iframe");
    const numPages = iframe.contentWindow.document.querySelectorAll("body > div").length;
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>

      <iframe
        id="viewer-iframe"
        title="HTML Viewer"
        // width="800"
        // height="500"
        // style={{ border: "1px solid black" }}
        srcDoc={html}
        onLoad={() => {
          const iframe = document.getElementById("viewer-iframe");
          const numPages = iframe.contentWindow.document.querySelectorAll("body > div").length;
          if (numPages === 1) {
            setPageNum(1);
          }
        }}
      />
    
    </>
  );
};

export default HTMLViewer;
