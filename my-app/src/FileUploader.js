import React, { useState } from 'react';
// import fs from 'fs';

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  }


  //bkp
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    
  //   const reader = new FileReader();
    
  //   reader.onload = async (event) => {
  //     const fileData = event.target.result;
  //     const fileDataString = fileData.toString();
  //     console.log(fileDataString)
      
  //     const response = await fetch('http://localhost:3001/test', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       mode: 'cors', 
  //       body: JSON.stringify({ test: 'Hello, server!' })
  //     });
  
  //     if (response.ok) {
  //       console.log('Message sent successfully');
  //     } else {
  //       console.error('Failed to send message');
  //     }
  //   };
    
  //   reader.readAsDataURL(file);
    
  //   setFile(null);
  // };

  
  //bkp over


  // import fs from 'fs';
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const fileData = event.target.result;
      const fileDataString = fileData.toString();
      console.log(fileDataString)
  
      const path = "./public/dataaaaaaaaaaaaaaaaaa.txt";
      try {
        localStorage.setItem(path, fileDataString);
        console.log("Data written to localStorage!");
      } catch (e) {
        console.error("Error writing data to localStorage:", e);
      }
    };
  
    reader.readAsText(file);
  
    setFile(null);
  };
  


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   const reader = new FileReader();
  
  //   reader.onload = async (event) => {
  //     const fileData = event.target.result;
  

  //   //   const response = await fetch('http://localhost:3001/save-pdf', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //     body: JSON.stringify({ "data": fileData }),
  //   //   });
  
  //   //   if (response.ok) {
  //   //     console.log('File uploaded successfully');
  //   //   } else {
  //   //     console.error('Failed to upload file');
  //   //   }
  //   // };
  
  //   reader.readAsDataURL(file);
  
  //   setFile(null);
  // };
  
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input type="file" name="file" accept="application/pdf" onChange={handleChange} />
  //     <button type="submit">Upload</button>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file-input">
        <img src="./assets/images/upload.jpg" alt="Upload icon" />
      </label>
      <input id="file-input" type="file" name="file" accept="application/pdf" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
  
}

export default FileUploader;
