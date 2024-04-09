import React, { Component } from "react";
import "./style.css"; // import the CSS file with the styles
import * as pdfjsLib from 'pdfjs-dist'
import { pdfjs, Document } from 'react-pdf';
import "./fileselector.css"
// import { Document } from 'react-pdf';
const apiUrl = process.env.REACT_APP_API_URL;
class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      loaded: 0,
      total: 0,
      error: null,
      text: {},
      loadingFiles: false,
      showcompletebutton: false,
    };
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  handleFileChange = async (event) => {
    this.props.setIsLoading(true);
    this.setState({ loadingFiles: true });

    const files = event.target.files;
    const namf = [];
    const textData = {};

    try {
      for (const file of files) {
        const filename = file.name;
        const pdfData = await this.readFileAsync(file);
        const pdfText = await this.extractTextFromPdf(pdfData);

        namf.push(filename);
        textData[filename] = pdfText;
      }

      this.setState({
        files: [...this.state.files, ...files],
        text: { ...this.state.text, ...textData },
        fileNames: namf,


      }, () => {
        this.props.setFileText(this.state.text);
        this.props.setFileNames(this.state.fileNames);
        this.setState({ loadingFiles: false, showcompletebutton: true });
        this.props.setIsLoading(false);
        
      });
    } catch (error) {
      console.error('Error loading files:', error);
      this.setState({ loadingFiles: false });
      this.props.setIsLoading(false);
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

  extractTextFromPdf = async (pdfData) => {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = await page.getTextContent();
      pageText.items.forEach((item) => {

        let spacedText = item.str.replace(/([a-z])([A-Z])/g, '$1 $2');

        spacedText = spacedText + " ";
        text += spacedText;
      });
    }
    console.log("hello  " + text);
    return text.toLowerCase();
  }


  handleUpload = () => {
    this.props.setIsLoading(true);

    const chunkSize = 1000 * 1024 * 1024;
    const { files } = this.state;
    const uploadChunk = (file, start, end) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        const newName = file.name;

        formData.append("myFile", file.slice(start, end), newName);

        fetch(`${apiUrl}/api/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const uploadFile = (file) => {
      const fileSize = file.size;
      const chunks = Math.ceil(fileSize / chunkSize);
      let currentChunk = 0;

      const chunkPromises = [];

      for (let i = 0; i < chunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        chunkPromises.push(uploadChunk(file, start, end));
      }

      return Promise.all(chunkPromises);
    };

    Promise.all(files.map(uploadFile))
      .then(() => {
        this.props.setIsLoading(false);
        this.props.closefileinput();
        alert("files successfully uploaded !");
      })
      .catch((error) => {
        console.error("Error during file uploads:", error);
        this.props.setIsLoading(false);
      });
  };


  render() {
    const { loaded, total, error } = this.state;
    const progress = total === 0 ? 0 : Math.round((loaded / total) * 100);

    return (
      <div>
        <div >

          {!this.state.showcompletebutton ?
            <label htmlFor="file-input" className="file-input-label">
              <div className="filetext" >Click here to Select Files to Upload</div>
              <input id="file-input" type="file" name="file" accept="application/pdf" onChange={this.handleFileChange} multiple className="file-input" />
            </label>
            :
            <>

              {/* {this.state.files && this.state.files.length > 0 ?
                <div className="filetext" >{this.state.files.length} files selected.</div>

                : ''}

              {this.state.files && this.state.files.length > 0 ?

                <div className="selectedfiles">{this.state.fileNames.map((ff) => <div className="filenametext">{ff}</div>)}</div>

                : ''} */}

              {this.state.files && this.state.files.length > 0 &&
                <button disabled={this.state.loadingFiles} onClick={this.handleUpload} className="file-input-label">
                <div className="mac-book-pro141-materialsymbolsupload"></div>
                <div className="filetext" >Click to upload {this.state.files.length} selected papers.</div>
              </button>}
            </>
          }
        </div>
      </div>
    );
  }
}

export default FileUpload;
