import React, { Component } from "react";
import "./style.css"; // import the CSS file with the styles
import * as pdfjsLib from 'pdfjs-dist'
import { pdfjs, Document } from 'react-pdf';
// import { Document } from 'react-pdf';
const apiUrl = process.env.REACT_APP_API_URL;
class FileUpload extends Component {
  constructor(props) {
    super(props);
    // setFileNames
    this.state = {
      files: [],
      loaded: 0,
      total: 0,
      error: null,
      text: {},
    };
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  handleFileChange = async (event) => {
    const files = event.target.files;
    const namf = [];
  
    for (const file of files) {
      const filename = file.name;
      const pdfData = await this.readFileAsync(file);
      const pdfText = await this.extractTextFromPdf(pdfData);
  
      namf.push(filename);
  
      this.setState((prevState) => ({
        files: [...prevState.files, file],
        text: {
          ...prevState.text,
          [filename]: pdfText
        }
      }), () => {
        this.props.setFileText(this.state.text);
        this.props.setFileNames(namf);
      });
    }
  };
  
  readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(new Uint8Array(reader.result));
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsArrayBuffer(file);
    });
  };

  
  
  // handleFileChange = (event) => {

  //   let namf=[];
  //   const files = event.target.files;
  //   console.log("files being text processed----");
  //   console.log(files);
  //   this.setState({
  //         files: [...this.state.files, ...files],
  //       },()=>{

  //         Array.from(files).forEach((file) => {
  //           let filename=file.name;
  //           const reader = new FileReader();
  //           reader.onload = async () => {
  //             const pdfData = new Uint8Array(reader.result);
  //             const pdfText = await this.extractTextFromPdf(pdfData);
  //             namf.push(filename);
  //             this.setState({
  //               text: {
  //                 ...this.state.text,
  //                 [filename]: pdfText
  //               }
  //             },()=>{
  //               console.log("post set state----");
  //               console.log(this.state.text);
  //               this.props.setFileText(this.state.text);
  //               this.props.setFileNames(namf);
              
  //             });
  //           };
      
  //           reader.readAsArrayBuffer(file);
  //         });


  //       });


    


  // };

  extractTextFromPdf = async (pdfData) => {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = await page.getTextContent();
      pageText.items.forEach((item) => {
        // Replace any occurrences of connected words with spaced words
        let spacedText = item.str.replace(/([a-z])([A-Z])/g, '$1 $2');
        // console.log("hello  "+spacedText);
        spacedText=spacedText+" ";
        text += spacedText;
      });
    }
    console.log("hello  "+text);
    return text.toLowerCase();
  }
  

  handleUpload = () => {
    this.props.setIsLoading(true)
    const chunkSize = 300 * 1024 * 1024; // 10MB

    const { files } = this.state;
    let currentFile = 0;

    const uploadNextFile = () => {
      if (currentFile < files.length) {
        const file = files[currentFile];
      //  alert(file.name);
        const fileSize = file.size;
        const chunks = Math.ceil(fileSize / chunkSize);
        let currentChunk = 0;

        const uploadChunk = (start, end) => {
          const formData = new FormData();
          const newName = file.name;
        

          formData.append("myFile", file.slice(start, end), newName);
          // fetch("http://localhost:3001/api/upload", {
          fetch(`${apiUrl}/api/upload`, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              currentChunk++;
              this.setState({
                loaded: currentFile * chunkSize + currentChunk * chunkSize,
                total: files.reduce((acc, file) => acc + file.size, 0),
              });
              if (currentChunk < chunks) {
                uploadChunk(
                  currentChunk * chunkSize,
                  (currentChunk + 1) * chunkSize
                );
              } else {
                
                currentFile++;
                if(currentFile == files.length-1){
                  console.log("all uploaded-------");
                  this.props.setIsLoading(false)
              }
                uploadNextFile();

              }
            })
            .catch((error) => {
              this.setState({
                error: error.message,
              });
            });
        };

        uploadChunk(0, chunkSize);
      }
    };
   
    uploadNextFile();
  };

  render() {
    const { loaded, total, error } = this.state;
    const progress = total === 0 ? 0 : Math.round((loaded / total) * 100);

    return (
      <div className="upload-container"> {/* add the main container class */}
        <input type="file" onChange={this.handleFileChange} multiple />
        <button onClick={this.handleUpload}>Upload</button>
        {progress > 0 && <div>{progress}% uploaded</div>}
        {error && <div>{error}</div>}
      </div>
    );
  }
}

export default FileUpload;
