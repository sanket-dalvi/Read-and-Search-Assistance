const { exec,spawn } = require('child_process');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
const fs = require('fs');

const multer = require('multer');
const fs = require('fs');
const path = require('path');



app.get('/convert-pdf-to-html', (req, res) => {
  

  const pdfFilePath = 'D:\\sample2.pdf';
  const cmd = `C:\\pdf2htmlEX\\pdf2htmlEX.exe ${pdfFilePath}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`pdf2htmlEX error: ${error.message}`);
      return res.status(500).send(`pdf2htmlEX error: ${error.message}`);
    }
    if (stderr) {
      console.error(`pdf2htmlEX stderr: ${stderr}`);
      return res.status(500).send(`pdf2htmlEX stderr: ${stderr}`);
    }

    const htmlFilePath = pdfFilePath.replace('.pdf', '.html');
    console.log(`File saved at ${htmlFilePath}`);
    res.sendFile(htmlFilePath);
  });
});


// app.get('/save-pdf-to-html', (req, res) => {

//   const pdfFilePath = 'D:\\sample2.pdf';
//   const cmd = `C:\\pdf2htmlEX\\pdf2htmlEX.exe ${pdfFilePath}`;



// });



const upload = multer({
  dest: "C:/pdf2htmlEX/", // Directory to save uploaded files
});



const cors = require('cors');
app.use(cors());
const fs = require('fs');

app.post('/save-pdf',(req, res) => {
  const pdfFilePath = req.file.path;
  const htmlFilePath = path.join(__dirname, 'public', 'samplesaved.html');

  fs.writeFile("C:\\pdf2htmlEX\\", req.file.buffer, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('File saved successfully');
      res.sendStatus(200);
    }
  });
});



app.post('/upload-pdf', upload.single('pdfFile'), (req, res) => {
  const pdfFilePath = req.file.path;

  // Write the uploaded file to a directory
  const targetFilePath = path.join(__dirname, 'public', req.file.originalname);
  fs.writeFile(targetFilePath, req.file.buffer, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('File saved successfully');
      res.sendStatus(200);
    }
  });
});

  

  
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
