import React, { useState, useEffect } from "react";
// import "./App.css";
import HtmlViewer from "./HtmlViewer";
import CheckboxList from "./CheckboxList";
import FileUpload from "./FileUpload";
import { Provider } from "react-redux";
import store from "./store";
import SearchResults from "./SearchResults";
import Box from "./Box";
import pdfjsLib from "pdfjs-dist";
import axios from "axios";
import Loader from "./Loader";
import styles from './stylenew.css';

import { useLocation } from 'react-router-dom';
import DocumentList from "./DocumentList";
import AddTerm from "./AddTerm";
import TextInput from "./textinput";

import FileInput from "./fileselector";

import DocRankUI from "./DocRankUI";


const apiUrl = process.env.REACT_APP_API_URL;

export default function App() {

  const [pdf, setPdf] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [fileText, setFileText] = React.useState({});
  const [docranks, setDocRanks] = React.useState({});
  const [alldocsready, setAllDocsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currhtml, setcurrhtml] = React.useState("");
  const [queryterms, setqueryterms] = React.useState([]);
  const [fileData, setFileData] = useState("");
  const [querymap, setquerymap] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [colorMap, setcolorMap] = React.useState([]);
  const [showpage, setshowpage] = React.useState(false);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [showDocs, setshowdocs] = useState(false);
  const [allHtmls, setAllHtmls] = useState({});
  const [currShowing, setCurrShowing] = useState("");

  const [oninit, setonint] = useState(true);
  const [onranked, setonranked] = useState(false);

  const [newtermsupdate, setnewtermsupdate] = useState(false);
  const [filesadded, setfilesadded] = useState(false);




  const [showinitbox, setshowinitbox] = useState(true);

  const [showtextinput, setshowtextinput] = useState(false)
  const [showfileselector, setshowfileselector] = useState(false);
  const [docrankscreen, setdocrankscreen] = useState(false);
  const [showrankorpdf, setshowrankorpdf] = useState(true);

  const [enablestartRanking, setenablestartRanking] = useState(false);

  const openinitscreen = () => {
    setonint(true);
    setonranked(false);
    setshowinitbox(true);
    setshowtextinput(false);
    setshowfileselector(false);
    setdocrankscreen(false);
    setshowrankorpdf(false);
  }

  const opentermeditor = () => {
    setshowinitbox(false);
    setshowtextinput(true);
    setshowfileselector(false);
    setdocrankscreen(false);
    setshowrankorpdf(false);
  }
  const openfileuploader = () => {
    setshowinitbox(false);
    setshowtextinput(false);
    setshowfileselector(true);
    setdocrankscreen(false);
    setshowrankorpdf(false);
  }
  const openrankeddocs = () => {
    setonint(false);
    setonranked(true);
    setshowinitbox(false);
    setshowtextinput(false);
    setshowfileselector(false);
    setdocrankscreen(true);
    setshowrankorpdf(true);
  }
  const openshowpdffile = () => {
    setonint(false);
    setonranked(false);
    setshowinitbox(false);
    setshowtextinput(false);
    setshowfileselector(false);
    setdocrankscreen(true);
    setshowrankorpdf(false);
  }

  const reloadPage = () => {
    window.location.reload(true); // true indicates a hard reload
  };

  useEffect(() => {
    console.log("currShowing");
    console.log(currShowing);
  }, [currShowing])

  useEffect(() => {
    console.log("fileNames");
    console.log(fileNames);


    if (queryterms.length > 0 && filesadded) {
      setenablestartRanking(true);
    }

  }, [querymap, queryterms, fileNames, filesadded])




  // const [file, setFile] = useState(null);

  // const handleChange = (event) => {
  //   setFile(event.target.files[0]);
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const reader = new FileReader();

  //   reader.onload = async (event) => {
  //     const fileData = event.target.result;
  //     const fileDataString = fileData.toString();
  //     console.log(fileDataString)

  //     const path = "./public/dataaaaaaaaaaaaaaaaaa.txt";
  //     try {
  //       localStorage.setItem(path, fileDataString);
  //       console.log("Data written to localStorage!");
  //     } catch (e) {
  //       console.error("Error writing data to localStorage:", e);
  //     }
  //   };

  //   reader.readAsText(file);

  //   setFile(null);
  // };



  const closefileinput = () => {
    setfilesadded(true);

    oninit ? openinitscreen() :
      onranked ? openrankeddocs() : openshowpdffile();


  }


  const movetorankscreen = () => {
    setshowinitbox(false);
    setshowfileselector(false);
    setshowtextinput(false);
    setdocrankscreen(true);
  }
  const generateUniqueHighlightColors = () => {
    const result = [];
    const hues = [0, 45, 90, 135, 180, 225, 270, 315]; // More diverse hues
    const saturation = 70; // Fixed saturation for better consistency

    for (let hue of hues) {
      for (let lightness = 60; lightness <= 90; lightness += 10) {
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Use HSL color model for bright and light colors
        result.push(color);
      }
    }

    return result;
  };
  // const generateUniqueHighlightColors = () => {
  //   const result = [];
  //   const hues = [0, 60, 120, 180, 240, 300]; // More diverse hues
  //   const saturations = [50, 70, 90]; // Different saturation levels for variation

  //   for (let hue of hues) {
  //     for (let saturation of saturations) {
  //       const lightness = Math.floor(Math.random() * 30) + 60; // Random lightness between 60 and 90
  //       const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Use HSL color model for bright and light colors
  //       result.push(color);
  //     }
  //   }

  //   return result;
  // };


  // const brightColors = generateUniqueHighlightColors();

  const [brightColors, setbrightColors] = useState(generateUniqueHighlightColors());

  const colorObject = {};

  brightColors.forEach(color => {
    colorObject[color] = false;
  });



  const [documents, setDocuments] = useState(
    []
  );


  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const param1Value = queryParams.get('param1');
    const param2Value = queryParams.get('param2');

    console.log("---------onsole.log(param1Value)")
    console.log(param1Value)
    console.log("---------onsole.log(param1Value)")
    console.log(param2Value)
    setParam1(param1Value);
    setParam2(param2Value);


  }, []);


  const openReactAppInNewWindow = () => {
    const url = 'http://sysrev2.cs.binghamton.edu/dart';
    const jsonString = JSON.stringify([{
      "resultId": 1971,
      "document": {
        "title": "Distributional Reinforcement Learning in the Brain.",
        "articleDate": "2020 Dec",
        "authorNames": [
          "Lowet AS",
          "Zheng Q",
          "Matias S",
          "Drugowitsch J",
          "Uchida N"
        ],
        "affiliationCountry": null,
        "publicationName": "distributional reinforcement learning in the brain",
        "issn": "0166-2236",
        "affiliationNames": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33092893"
      },
      "priority": 0,
      "datasource": "PUBMED"
    },
    {
      "resultId": 1972,
      "document": {
        "title": "Reinforcement Distributional Learning in the Brain.",
        "articleDate": "2020 Dec",
        "authorNames": [
          "Lowet AS",
          "Zheng Q",
          "Matias S",
          "Drugowitsch J",
          "Uchida N"
        ],
        "affiliationCountry": null,
        "publicationName": "distributional reinforcement learning in the brain",
        "issn": "0166-2236",
        "affiliationNames": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33092893"
      },
      "priority": 0,
      "datasource": "PUBMED"
    },
    {
      "resultId": 1973,
      "document": {
        "title": "Learning Distributional Reinforcement in the Brain.",
        "articleDate": "2020 Dec",
        "authorNames": [
          "Lowet AS",
          "Zheng Q",
          "Matias S",
          "Drugowitsch J",
          "Uchida N"
        ],
        "affiliationCountry": null,
        "publicationName": "distributional reinforcement learning in the brain",
        "issn": "0166-2236",
        "affiliationNames": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33092893"
      },
      "priority": 0,
      "datasource": "PUBMED"
    },
    {
      "resultId": 1974,
      "document": {
        "title": "Brain Distributional Learning in the Reinforcement.",
        "articleDate": "2020 Dec",
        "authorNames": [
          "Lowet AS",
          "Zheng Q",
          "Matias S",
          "Drugowitsch J",
          "Uchida N"
        ],
        "affiliationCountry": null,
        "publicationName": "distributional reinforcement learning in the brain",
        "issn": "0166-2236",
        "affiliationNames": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33092893"
      },
      "priority": 0,
      "datasource": "PUBMED"
    }]





    );
    const queryParams = `json=${encodeURIComponent(jsonString)}`;
    const finalUrl = `${url}?${queryParams}`;
    const newWindow = window.open(finalUrl, '_blank', 'width=800,height=600');

    if (newWindow) {
      // Optional: Add any additional logic if needed, such as handling popup blockers
    } else {
      // Handle case where the new window could not be opened, e.g., due to popup blockers
      console.error('Failed to open new window');
    }
  };


  const [htmls, setHtmls] = React.useState("");

  const [checkedTerms, setCheckedTerms] = useState({});


  const onMount = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const pdfUrlParam = queryParams.get("pdf_urls");

    const jsonDataParam = queryParams.get("json");

    if (jsonDataParam) {
      try {
        const jsonData = JSON.parse(decodeURIComponent(jsonDataParam));

        setDocuments(jsonData)
        console.log('Received JSON data:', jsonData);
        // Continue with your logic to process the received JSON data
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
    }


    console.log("data in api", jsonDataParam);

  };

  const downloadPdfFromUrl = async (pdfUrl) => {
    try {

      console.log("downloading" + pdfUrl)
      // const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
      // const pdfData = response.data;
      // // Here, you can save the PDF data or perform any necessary processing.
      return pdfUrl;
    } catch (error) {
      console.error("Error downloading PDF from URL:", pdfUrl, error);
      return null;
    }
  };


  useEffect(() => {
    onMount();
  }, []); // Call onMount when the component mounts


  const handleCheckedTerms = (checkedTerms) => {
    console.log("Checked terms:", checkedTerms);
    const trueTerms = Object.keys(checkedTerms).filter(
      (term) => checkedTerms[term]
    );

    const falseTerms = Object.keys(checkedTerms).filter(
      (term) => !checkedTerms[term]
    );

    // const colorMap = colormap;

    // let htmltemp = htmls;
    let htmltemp = allHtmls[currShowing];

    // for (let i = 0; i < falseTerms.length; i++) {
    //   const backgroundStyle = `background-color: white;`;




    //   htmltemp = htmltemp.replace(
    //     new RegExp(falseTerms[i], "gi"),
    //     `<span style="${backgroundStyle}">${falseTerms[i]}</span>`
    //   );
    // }

    for (let i = 0; i < trueTerms.length; i++) {
      const backgroundColor = colorMap[trueTerms[i]];
      const backgroundStyle = checkedTerms[trueTerms[i]]
        ? `
          background-color: ${backgroundColor};
          border-radius: 3px; /* Rounded corners */
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3); /* Drop shadow */
          padding: 2px 4px; /* Padding for better spacing */
          color: white; /* Text color on highlighted background */
          pointer-events: none;
        `
        : `background-color: white;`;

      const re = new RegExp(`>${trueTerms[i]}<`, "gi");
      htmltemp = htmltemp.replace(re, (match) => {
        return match.replace(/<span name = "highlightedtextdebug" style="[^"]*">(.*?)<\/span>/gi, "$1");
      });

      // htmltemp = htmltemp.replace(
      //   new RegExp(`>[^<]*(${trueTerms[i]})[^<]*<`, "gi"),
      //   (match) => {
      //     return match.replace(
      //       new RegExp(`(${trueTerms[i]})`, "gi"),
      //       `<span style="${backgroundStyle}">$1</span>`
      //     );
      //   }
      // );

      const iframe = document.getElementById('viewer-iframe');


      iframe.contentWindow.handleClick = function (event, term) {
        event.preventDefault(); // Prevent default behavior of clicking on the span tag
        const targetId = term;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Scroll to the target element within the iframe
          targetElement.scrollIntoView();
        }
      };

      // const stylePattern = /<style[^>]*>.*?<\/style>/gs;

      // // Match and replace the style attribute
      // htmltemp = htmltemp.replace(stylePattern, (match) => {

      //     // Remove or modify the style for #page-container here
      //     return match.replace(/#page-container/g, '#mo-page-container');
      // });

      // const originalSubstring = "#page-container{bottom:0;right:0;overflow:auto}";
      // const replacementSubstring = "#page-container{bottom:0;overflow:auto}";

      // htmltemp = htmltemp.replace(originalSubstring, replacementSubstring);



      htmltemp = htmltemp.replace(
        new RegExp(`(?<![\\w</])(${trueTerms[i]})(?![\\w/>:=])`, "gi"),


        // new RegExp(`(?<=^|>)[^<]*(?<![:=])(${trueTerms[i]})(?![^<]*<|[:=])`, "gi"),



        (match, word, index) => {

          const sentence = htmltemp.substring(index - 15, index + 20);
          console.log("Sentence:", sentence);
          console.log("printing index", index);
          const bodyStartIndex = htmltemp.indexOf('<body');
          const bodyEndIndex = htmltemp.indexOf('</body>');

          if (bodyStartIndex > index || bodyEndIndex < index) {
            return match;
          }


          const lastopen = htmltemp.substring(bodyStartIndex, index).lastIndexOf("<");
          const lastclosed = htmltemp.substring(bodyStartIndex, index).lastIndexOf(">");
          const firstopen = htmltemp.substring(index, bodyEndIndex).indexOf("<");
          const firstclose = htmltemp.substring(index, bodyEndIndex).indexOf(">");

          console.log("lastopen words----", lastopen);
          console.log("lastclosed words----", lastclosed);
          console.log("firstopen words----", firstopen);
          console.log("firstclose words----", firstclose);

          if (lastopen > lastclosed || firstopen > firstclose) {
            return match;
          }

          console.log("matched words----", match)

          return match.replace(
            new RegExp(`(?<![\\w</])(${trueTerms[i]})(?![\\w/>:=])`, "gi"),
            // new RegExp(`(?<=[>])(\\b${trueTerms[i]}\\b)(?![^<]*<)`, "gi"),
            // new RegExp(`(?<=^|>)[^<]*(?<![:=])(${trueTerms[i]})(?![^<]*<|[:=])`, "gi"),

            `<span style="${backgroundStyle}" >$1</span>`
            // `<span style="${backgroundStyle}" >$1</span>`
            // `<span style="${backgroundStyle}" pointer-events: none;>$1</span>`
            // <span style="${backgroundStyle}; pointer-events: auto;" onclick="window.location.href = 'http://sysrev2.cs.binghamton.edu:3001/#pf1'">$1</span>

          );
        }
      );

      // htmltemp = htmltemp.replace(
      //   new RegExp(`([^<>]*>)?([^<]*(${trueTerms[i]})([^<]*<)?[^<>]*)`, "gi"),
      //   (match, before, term, after) => {
      //     return `${before}<span style="${backgroundStyle}">${term}</span>${after}`;
      //   }
      // );


    }

    setHtmls(htmltemp);
  };




  function updateTermObject() {
    setquerymap((prevQueryMap) => {
      const updatedQueryMap = { ...prevQueryMap };
      // Add new terms to the querymap with default value false
      queryterms.forEach((term) => {
        if (!updatedQueryMap[term]) {
          updatedQueryMap[term] = false;
        }
      });
      // Remove terms from the querymap that are missing from queryterms
      Object.keys(updatedQueryMap).forEach((term) => {
        if (!queryterms.includes(term)) {
          delete updatedQueryMap[term];
        }
      });
      return updatedQueryMap;
    });
  }

  useEffect(() => {
    updateTermObject();
  }, [queryterms]);

  async function showPdf(fnamme) {
    try {
      fnamme = fnamme.replace("pdf", "html");
      const path = fnamme;

      fetch(path)
        .then((response) => response.text())
        .then((html) => {
          html = html.replace(/<span class="_ _\d+"><\/span>/g, "");

          setHtmls(html);
        });
    } catch (error) {
      console.log("file not found");
    }
  }

  // const convertPDFToHTML = async () => {
  //   console.log("name of all files--=-=-=-=-",fileNames);
  //   let pdfFilePath = "./sample.pdf";
  //   try {
  //     const response = await fetch(
  //       `${apiUrl}/api/convert-pdf-to-html?_=${new Date().getTime()}`,
  //       { timeout: 10000 }
  //     );
  //     return await response.text();
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Failed to convert PDF to HTML");
  //   }
  // };

  const convertPDFToHTML = async () => {
    console.log("name of all files--=-=-=-=-", fileNames);
    let pdfFilePath = "./sample.pdf";
    try {
      const response = await fetch(
        `${apiUrl}/api/convert-pdf-to-html`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fileNames })
        }
      );
      return await response.text();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to convert PDF to HTML");
    }
  };


  const startconversion = async () => {

    if (!enablestartRanking) {
      alert("Please upload documents and add search terms!");
      return;
    }

    setnewtermsupdate(false);
    setIsLoading(true);
    await convertPDFToHTML()
      .then((html) => {
        // alert("yes");
        setFileText(cleanTexts(fileText));
        const resultsdemo = rankTextscos(queryterms, fileText);

        console.log(queryterms);
        // console.log(fileText);
        console.log("xxxxxx the results doc" + JSON.stringify(resultsdemo));
        setAllDocsReady(true);
        setDocRanks(resultsdemo);
        console.log(resultsdemo);
        // getAllHTML();
        handleFetchFile();
        setIsLoading(false);
        openrankeddocs();
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  function rerankjacc() {
    setIsLoading(true);
    const resultsdemo = rankTextsjacc(queryterms, fileText);
    openReactAppInNewWindow()
    console.log(queryterms);
    console.log(fileText);
    console.log("xxxxxx the results doc" + JSON.stringify(resultsdemo));
    setAllDocsReady(true);
    setDocRanks(resultsdemo);
    setIsLoading(false);
  }


  function setshowingdocs() {
    setshowdocs(!showDocs)
  }


  function rerankbm25() {
    setIsLoading(true);
    const resultsdemo = rankTextsbm25(queryterms, fileText);

    console.log(queryterms);
    console.log(fileText);
    console.log("xxxxxx the results doc" + JSON.stringify(resultsdemo));
    setAllDocsReady(true);
    setDocRanks(resultsdemo);
    setIsLoading(false);
  }

  function rerankcoss() {
    setIsLoading(true);
    const resultsdemo = rankTextscos(queryterms, fileText);

    console.log(queryterms);
    console.log(fileText);
    console.log("xxxxxx the results doc" + JSON.stringify(resultsdemo));
    setAllDocsReady(true);
    setDocRanks(resultsdemo);
    setIsLoading(false);
  }

  function cleanTexts(obj) {
    const cleanObj = {};
    const regex = /[^a-zA-Z0-9 ]/g; // Regex to match non-alphanumeric characters
    for (const [key, value] of Object.entries(obj)) {
      const cleanText = value.replace(regex, " "); // Replace non-alphanumeric characters with spaces
      cleanObj[key] = cleanText.trim(); // Trim leading and trailing spaces and add to new object
    }
    return cleanObj;
  }




  async function renderPage() {
    setPageRendering(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      console.log("page lenght", pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setImages(imagesList);
    setPageRendering(false);
  }

  useEffect(() => {
    pdf && renderPage();
  }, [pdf, currentPage]);

  function rankTextsbm25(terms, texts) {
    const docVectors = {}; // stores the term frequency vectors for each document
    const docs = Object.keys(texts); // get an array of the document names
    const wordSet = new Set(terms); // create a set of the terms to use for matching

    // calculate the inverse document frequency for each term
    const idf = {};
    docs.forEach((doc) => {
      const words = new Set(texts[doc].toLowerCase().match(/\b\w+\b/g)); // split the text into words and convert to a set
      words.forEach((word) => {
        if (idf[word]) {
          idf[word]++;
        } else {
          idf[word] = 1;
        }
      });
    });
    Object.keys(idf).forEach((term) => {
      idf[term] = Math.log(docs.length / idf[term]);
    });

    // iterate over each document to calculate the term frequency vector
    docs.forEach((doc) => {
      const words = texts[doc].toLowerCase().match(/\b\w+\b/g); // split the text into words
      const tf = {}; // stores the term frequency for each word
      words.forEach((word) => {
        if (tf[word]) {
          tf[word]++;
        } else {
          tf[word] = 1;
        }
      });
      // store the vector and the word count for the document
      docVectors[doc] = { vector: tf, wordCount: words.length };
    });

    // calculate the Okapi BM25 score for each document
    const results = docs.map((doc) => {
      const { vector: docVector, wordCount } = docVectors[doc];
      let score = 0;
      const matchedWords = [];
      terms.forEach((term) => {
        if (docVector[term]) {
          const tf = docVector[term];
          const k1 = 1.2;
          const b = 0.75;
          const avgDocLength =
            docs.reduce((sum, doc) => {
              return sum + docVectors[doc].wordCount;
            }, 0) / docs.length;
          const idfScore = idf[term];
          const docLengthNorm = 1 - b + b * (wordCount / avgDocLength);
          const tfScore = ((k1 + 1) * tf) / (k1 * docLengthNorm + tf);
          score += idfScore * tfScore;
          matchedWords.push({ word: term, count: docVector[term] });
        }
      });
      return {
        name: doc,
        score: score,
        matchedWords: matchedWords,
      };
    });

    results.sort((a, b) => {
      return b.score - a.score;
    });

    return results;
  }

  function rankTextsjacc(terms, texts) {
    const docVectors = {}; // stores the term frequency vectors for each document
    const docs = Object.keys(texts); // get an array of the document names
    const wordSet = new Set(terms); // create a set of the terms to use for matching

    // iterate over each document to calculate the term frequency vector
    docs.forEach((doc) => {
      const words = texts[doc].toLowerCase().match(/\b\w+\b/g); // split the text into words
      const tf = {}; // stores the term frequency for each word
      words.forEach((word) => {
        if (tf[word]) {
          tf[word]++;
        } else {
          tf[word] = 1;
        }
      });
      // store the vector and the word count for the document
      docVectors[doc] = { vector: tf, wordCount: words.length };
    });

    // calculate the Jaccard similarity between the term frequency vectors and the query vector
    const queryVector = {};
    terms.forEach((term) => {
      queryVector[term] = 1;
    });

    const results = docs.map((doc) => {
      const { vector: docVector, wordCount } = docVectors[doc];
      const intersection = {};
      let intersectionSize = 0;
      let unionSize = wordCount;
      Object.keys(queryVector).forEach((term) => {
        if (docVector[term]) {
          intersection[term] = docVector[term];
          intersectionSize += docVector[term];
        } else {
          unionSize += 1;
        }
      });

      const jaccardSimilarity = intersectionSize / unionSize;

      const matchedWords = Object.keys(intersection).map((word) => {
        return { word: word, count: intersection[word] };
      });

      return {
        name: doc,
        score: jaccardSimilarity,
        matchedWords: matchedWords,
      };
    });

    results.sort((a, b) => {
      return b.score - a.score;
    });

    return results;
  }

  function rankTextscos(terms, texts) {
    const docVectors = {}; // stores the term frequency vectors for each document
    const docs = Object.keys(texts); // get an array of the document names
    const wordSet = new Set(terms); // create a set of the terms to use for matching
    console.log("----docs in ranking");

    console.log(texts);
    // iterate over each document to calculate the term frequency vector
    docs.forEach((doc) => {
      const words = texts[doc].toLowerCase().match(/\b\w+\b/g); // split the text into words
      console.log("--------");
      console.log(words);
      console.log("--------");
      const tf = {}; // stores the term frequency for each word
      var maxFreq = 0; // stores the highest frequency of any word in the document
      words.forEach((word) => {
        if (tf[word]) {
          tf[word]++;
        } else {
          tf[word] = 1;
        }
        maxFreq = Math.max(maxFreq, tf[word]);
      });
      // normalize the term frequency vector by dividing each frequency by the max frequency
      const docVector = {};
      Object.keys(tf).forEach((word) => {
        docVector[word] = tf[word];
      });
      docVectors[doc] = { vector: docVector, wordCount: words.length }; // store the vector and the word count for the document
    });

    // calculate the cosine similarity between the term frequency vectors and the query vector
    const queryVector = {};
    terms.forEach((term) => {
      queryVector[term] = 1;
    });
    const results = docs.map((doc) => {
      const { vector: docVector, wordCount } = docVectors[doc];
      const dotProduct = Object.keys(queryVector).reduce((sum, term) => {
        if (docVector[term]) {
          return sum + queryVector[term] * docVector[term];
        } else {
          return sum;
        }
      }, 0);
      const queryMagnitude = Math.sqrt(
        Object.keys(queryVector).reduce((sum, term) => {
          return sum + queryVector[term] * queryVector[term];
        }, 0)
      );
      const docMagnitude = Math.sqrt(
        Object.keys(docVector).reduce((sum, term) => {
          return sum + docVector[term] * docVector[term];
        }, 0)
      );
      const cosineSimilarity = dotProduct / (queryMagnitude * docMagnitude);
      // find the words in the text that match the query terms and calculate their frequency in the document
      // find the words in the text that match the query terms and calculate their frequency in the document
      const matchedWords = Object.keys(docVector)
        .filter((word) => {
          return wordSet.has(word);
        })
        .map((word) => {
          return { word: word, count: docVector[word] }; // use the frequency directly
        });

      return {
        name: doc,
        score: cosineSimilarity,
        matchedWords: matchedWords,
      };
    });

    results.sort((a, b) => {
      return b.score - a.score;
    });
    setAllDocsReady(true);
    return results;
  }

  // const handleFetchFile = async (fileName) => {
  //   try {
  //     const response = await axios.get(
  //       `${apiUrl}/api/getFile/${fileName}`
  //     );
  //     console.group("found html file " + response.data);
  //     setHtmls(response.data);
  //   } catch (error) {
  //     console.error(`Error fetching file ${fileName}: ${error.message}`);
  //   }
  // };

  const handleFetchFile = async (fileName = "") => {
    console.log("handleFetchFile called")

    if (fileName != "" && allHtmls.hasOwnProperty(fileName)) {
      setHtmls(allHtmls[fileName]);
      return;
    }
    try {
      const promises = fileNames.map(async (fn) => {
        fn = fn.replace("pdf", "html");
        const response = await axios.get(`${apiUrl}/api/getFile/${fn}`);
        let hml = response.data;
        const originalSubstring = "#page-container{bottom:0;right:0;overflow:auto}";
        const replacementSubstring = "#page-container{bottom:0;overflow:auto}";

        hml = hml.replace(originalSubstring, replacementSubstring);


        return { [fn]: hml }; // Return an object with file name as key and file content as value
      });

      const filesData = await Promise.all(promises);

      // Combine file data into a single object
      const filesObject = filesData.reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setAllHtmls(filesObject)
      if (fileName != "") {
        setHtmls(filesObject[fileName]);
      }

    } catch (error) {
      console.error(`Error fetching files: ${error.message}`);
    }
  };


  function showranks() {
    setshowrankorpdf(true)
    setshowpage(false);
  }
  function showthispdf(fnamme) {
    setshowpage(true);
    openshowpdffile();
    // setshowrankorpdf(false);
    fnamme = fnamme.replace("pdf", "html");
    setCurrShowing(fnamme);
    handleFetchFile(fnamme);
  }

  return (
    <Provider store={store}>
      {/* <div className="container">
        <div className="first-row">
          <div className="header">
            <h2>PaperRank</h2>
            <h5>"Accelerate Your Research"</h5>

          </div>

          <div className="queryupload">
            <Loader isLoading={isLoading} />
            <div class="section">
              <div class="container-fluid">
                <div class="row">
                  <div class="q col-sm-6">
                    <h4>Query</h4>
                    <Box queryterms={queryterms} brightColors={brightColors} setbrightColors={setbrightColors} setcolorMap={setcolorMap} setqueryterms={setqueryterms} />
                  </div>
                  <div class="f col-sm-6">
                    <h4>File Upload</h4>
                    <i class="fa-solid fa-cloud-arrow-up"></i> <FileUpload setIsLoading={setIsLoading} setFileText={setFileText} setFileNames={setFileNames} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div class="row">
              <div id="pdf-contents">
                <div id="pdf-meta">
                  <div id="pdf-buttons">
                    <div class="terms col-sm-1"></div>
                    <div class="terms col-sm-2">
                      <button onClick={startconversion}>Start Ranking</button>
                    </div>

                    <div class="terms col-sm-2">
                      <button onClick={rerankcoss}>Start cosine ranking</button>
                    </div>

                    <div class="terms col-sm-2">
                      <button onClick={rerankjacc}>Start jaccard ranking</button>
                    </div>

                 

                    {documents.length > 0 && <div class="terms col-sm-2">
                      <button onClick={() => { setshowingdocs() }}>Show docs</button>
                    </div>}

                    <div class="terms col-sm-2">
                      <button onClick={showranks}>{"< Back to document ranks"}</button>
                    </div>
                    <div class="terms col-sm-1"></div>


                  </div>

                  <div></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="second-row">
          <div className="afterupload">
            <div class="p row">
              <div class="first-column">



                {(documents.length > 0) && showDocs ? (<div id="pdf-main-container">

                  <DocumentList handleCheckboxChange={() => { console.log("hc---") }} documents={documents} />

                </div>)

                  :


                  (showpage ?

                    <div id="pdf-main-container">

                      <HtmlViewer html={htmls} />

                    </div>
                    // )
                    :
                    alldocsready ? (
                      <div id="pdf-main-container"> <div>
                        <SearchResults results={docranks} showthispdf={showthispdf} />
                      </div></div>
                    ) : (
                      ""
                    )
                  )}
              </div>
              <div className="second-column">
                <div class="terms col-sm-3">

                  <h1>Terms</h1>
                  <CheckboxList
                    terms={querymap}
                    colorMap={colorMap}
                    checkedTerms={checkedTerms}
                    setCheckedTerms={setCheckedTerms}
                    onCheckedTerms={handleCheckedTerms}
                  />
                </div>


              </div>
            </div>



          </div>

        </div>
      </div> */}
      {/* <div class="fotter">
      </div> */}

      {/* new ui */}

      <div className="app-container">
        <Loader isLoading={isLoading} />

        <div className="mac-book-pro141-container">
          <div className="mac-book-pro141-mac-book-pro141">
            <div className="mac-book-pro141-frame1">
             
              <span className="mac-book-pro141-text">
                <span>  <span className="appnametext">DART</span> : Document Analysis and Research Tool</span>
              </span>
           
              {/* <img
                src="./assets/images/external/ictwotonereadmore2380-sg1m.svg"
                alt="ictwotonereadmore2380"
                className="mac-book-pro141-ictwotonereadmore"
              /> */}
              <div className="mac-book-pro141-iconparkoutlinemoreapp">
                <div className="mac-book-pro141-group">
                  {/* <img
                    src="./assets/images/external/vector2392-vwv.svg"
                    alt="Vector2392"
                    className="mac-book-pro141-vector"
                  /> */}
                  {/* <img
                    src="/assets/images/external/vector2393-328f.svg"
                    alt="Vector2393"
                    className="mac-book-pro141-vector1"
                  /> */}

                </div>
              </div>
            </div>


            <div className="bodycontainer1">

            {showDocs ? (
                  <div className="showdocsdiv">
                    <div id="showdocdivs">
                      <DocumentList setshowdocs={setshowdocs} fileNames={fileNames} handleCheckboxChange={() => { console.log("hc---") }} documents={documents} />

                    </div>
                  </div>
                ) : ''}

              {showinitbox && !showtextinput && !showfileselector && (documents.length>0 || fileNames.length>0) && <div class="filelistbutdiv">
                              <button className="filelistbut" onClick={() => { setshowdocs(!showDocs) }}>{!showDocs ? "Open Files List" : "Close File List"}</button>
                            </div> 
              }

              {showinitbox && !showtextinput && !showfileselector ?
                // {true ?


                <div className="positioningrelative">

                
                  <div className="mac-book-pro141-initcomp">



                    <div className="mac-book-pro141-searchboxmain">

                      <button onClick={openfileuploader} className="mac-book-pro141-rectangle22">
                        <div className="mac-book-pro141-materialsymbolsupload"></div>

                        <div className="mac-book-pro141-text02">
                          <span>UPLOAD PAPERS</span>
                        </div>
                      </button>




                    </div>





                    <div className="mac-book-pro141-searchboxmain2">

                      <button onClick={opentermeditor} className="mac-book-pro141-rectangle22">
                        <div className="mac-book-pro141-materialsymbolsupload"></div>

                        <div className="mac-book-pro141-text02">
                          <span>ADD SEARCH TERMS</span>
                        </div>
                      </button>
                    </div>


                    <button onClick={startconversion} className="mac-book-pro141-startbutton">

                      <div className="mac-book-pro141-text16">
                        <span>Start Ranking</span>
                      </div>

                    </button>




                  </div>
                </div> : ''}


              {showfileselector ?
                <FileInput fileNames={fileNames} setIsLoading={setIsLoading} setFileText={setFileText} setFileNames={setFileNames} closefileinput={closefileinput} />
                : ''}

              {showtextinput ?
                <TextInput setnewtermsupdate={setnewtermsupdate} queryterms={queryterms} brightColors={brightColors} setbrightColors={setbrightColors} setcolorMap={setcolorMap} setqueryterms={setqueryterms} closetextinput={closefileinput} />
                : ''}

              {docrankscreen ? <>

                <div className="menubuttons">
                  <div class="terms cs1"></div>
                  <div class="terms cs2">
                    {
                      newtermsupdate ? <button className="menubutton2-alert" onClick={startconversion}>Update Ranks</button>
                        : <button className="menubutton2" onClick={startconversion}>Re-Rank Documents</button>

                    }
                  </div>
                  <div class="terms cs2">
                    <button className="menubutton2" onClick={opentermeditor}>EDIT TERMS</button>
                  </div>

                  {/* <div class="terms cs2">
                    <button className="menubutton2" onClick={opentermeditor}>Uploaded Files</button>
                  </div> */}

                 {/* {documents.length>0  &&  */}
                 <div class="terms cs2">
                    <button className="menubutton2" onClick={() => { setshowdocs(!showDocs) }}>{!showDocs ? "Open Files List":"Close File List"}</button>
                  </div>
                   {/* } */}

                  {/* <div class="terms cs2">
                    <button className="menubutton2" onClick={rerankjacc}>test new tab</button>
                  </div> */}


                  <div class="terms cs2">
                    <button className="menubuttonreset" onClick={reloadPage}>Start Again</button>
                  </div>

                  <div class="terms cs2">
                    <button className="menubuttonreset"  onClick={openfileuploader} >Upload docs</button>
                  </div>

                 
                  {/* {documents.length > 0 && <div class="terms col-sm-2">
                    <button onClick={() => { fileuploader }}>Show docs</button>
                  </div>} */}

                  {!showrankorpdf &&
                    <div class="terms cs2">
                      <button className="menubutton2" onClick={openrankeddocs}>SHOW RANKS</button>
                    </div>}
                  <div class="terms cs1"></div>

                </div>

               
                {showrankorpdf ?

                  <DocRankUI results={docranks} showthispdf={showthispdf} />

                  : <><div id="pdf-main-container">

                    <HtmlViewer html={htmls} />
                  </div>
                    <div class="terms col-sm-3">

                      <h1>Terms</h1>
                      <CheckboxList
                        currShowing={currShowing}
                        results={docranks}
                        terms={querymap}
                        colorMap={colorMap}
                        checkedTerms={checkedTerms}
                        setCheckedTerms={setCheckedTerms}
                        onCheckedTerms={handleCheckedTerms}
                      />
                    </div></>
                }
              </>
                : ''}
            </div>

            {/* component 1 upload and input screen ---- */}
          </div>
        </div>
      </div>
    </Provider>
  );
}
