const express = require("express");
const { exec, spawn } = require("child_process");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve the static build of your React app
// Serve the static build of your React app
app.use(express.static(path.join(__dirname, '../../build')));

// ...


const pdfFolderPath = path.join(__dirname, "../../htmls/uploads");
const pdf2htmlExPath = path.join(__dirname, "../../cshell/pdf2htmlEX.exe");

// bkp
// const fpp="D:/Grad/Sem 2/WBINFO/project2/my-app/htmls/uploads";
const fpp=path.join(__dirname, "../../htmls/uploads");
function getPdfFilePaths(folderPath) {
  const files = fs.readdirSync(folderPath);
  const pdfFiles = files.filter(file => path.extname(file) === '.pdf');
  const pdfFilePaths = pdfFiles.map(file => path.join(folderPath, file));
  return pdfFilePaths;
}
app.get("/api/convert-pdf-to-html", (req, res) => {
// app.get("/api/convert-pdf-to-html", (req, res) => {

console.log("fpp :   ",fpp);
  console.log("Received a request to /api/convert-pdf-to-html");

  const folderPath = '.';
  const pdfFilePaths = getPdfFilePaths(fpp);
  console.log(pdfFilePaths);
  const nooffiles=pdfFilePaths.length;
  let  filesprocessed=0;
  res.set('Cache-Control', 'no-store');
  for (let i = 0; i < pdfFilePaths.length; i++) {
    // console.log(pdfFilePaths[i]);
    console.log("currently trying to convert:  "+pdfFilePaths[i]);

    // D:\Grad\Sem 2\Web info ret\project2\my-app\htmls
  // const cmd = `"D:\\Grad\\Sem 2\\WBINFO\\project2\\my-app\\cshell\\pdf2htmlEX.exe" "${pdfFilePaths[i]}"`;
  
  console.log("pdf2htmlExPath     ====  "+pdf2htmlExPath);
  console.log("pdfFilePaths[i]     ====  "+pdfFilePaths[i]);
  const cmd = `"${pdf2htmlExPath}" "${pdfFilePaths[i]}"`;
  // const cmd = `"C:\\pdf2htmlEX\\pdf2htmlEX.exe" "${pdfFilePaths[i]}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {

      console.error(`pdf2htmlEX error: ${error.message}`);
      // return res.status(500).send(`pdf2htmlEX error: ${error.message}`);
    }
    if (stderr) {
      console.error(`pdf2htmlEX stderr: ${stderr}`);
      // return res.status(500).send(`pdf2htmlEX stderr: ${stderr}`);
    }
    filesprocessed=filesprocessed+1;
    if(filesprocessed==nooffiles){
      // moveHtmlFiles();
      res.send("All PDF files converted successfully");
    }
  });
  }

});


// bkp ends


// exper

// function getPdfFilePaths(folderPath) {
//   const files = fs.readdirSync(folderPath);
//   const pdfFiles = files.filter(file => path.extname(file) === '.pdf');
//   const pdfFilePaths = pdfFiles.map(file => path.join(folderPath, file));
//   return pdfFilePaths;
// }

// // app.get("/convert-pdf-to-html/:pdfFolderPath", (req, res) => {
//   app.get("/convert-pdf-to-html", (req, res) => {
//   const pdfFolderPath = req.params.pdfFolderPath;
//   const pdf2htmlEXPath = path.join(__dirname, 'cshell', 'pdf2htmlEX.exe');
//   // console.log("pdf2htmlEXPath000000000000000------" + pdf2htmlEXPath)
//   const pdfFilePaths = getPdfFilePaths(pdfFolderPath);
//   console.log(pdfFilePaths);
//   const nooffiles = pdfFilePaths.length;
//   let filesprocessed = 0;

//   for (let i = 0; i < pdfFilePaths.length; i++) {
//     console.log("currently trying to convert: " + pdfFilePaths[i]);
//     const cmd = `"${pdf2htmlEXPath}" "${pdfFilePaths[i}"`;

//     exec(cmd, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`pdf2htmlEX error: ${error.message}`);
//       }
//       if (stderr) {
//         console.error(`pdf2htmlEX stderr: ${stderr}`);
//       }
//       filesprocessed = filesprocessed + 1;
//       if (filesprocessed == nooffiles) {
//         res.send("All PDF files converted successfully");
//       }
//     });
//   }
// });


// exper ends
const moveHtmlFiles = async () => {
  const sourceDir = "D:/Grad/Sem 2/WBINFO/project2/my-app/htmls/";
  const destDir = "D:/Grad/Sem 2/WBINFO/project2/my-app/public/hms/";
  try {
    // Read all files in source directory
    const files = await fs.promises.readdir(sourceDir);

    // Filter out non-HTML files
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    // Copy each HTML file to destination directory
    await Promise.all(htmlFiles.map(async file => {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      await fs.promises.copyFile(srcPath, destPath);
    }));

    console.log(`Copied ${htmlFiles.length} HTML files successfully!`);
  } catch (error) {
    console.error(`Error copying HTML files: ${error.message}`);
  }
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {

    inddex= file.originalname.lastIndexOf(".");
    namevalue= file.originalname.substring(0,inddex);

    const originalName = namevalue;
    const timestamp = Date.now();
    cb(null, `${originalName}.pdf`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 300000000 }, // 1MB
}).single("myFile");

app.post("/api/upload", (req, res) => {
  console.log("react server url----  "+path.join(__dirname, '../../build'));

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    } else {
      console.log(req.file);
      res.status(200).json({ message: "File uploaded successfully!" });
    }
  });
});


app.get('/api/getFile/:fileName', (req, res) => {

  console.log("react server url----  "+path.join(__dirname, 'my-app/build'));
  const fileName = req.params.fileName;
  // const filePath = "D:/Grad/Sem 2/WBINFO/project2/my-app/htmls/"+fileName;
  const ff="../../htmls/"+fileName;
  const filePath = path.join(__dirname, ff)

  console.log("looking for html at: "+filePath);
  const readStream = fs.createReadStream(filePath);

  let fileData = '';
  readStream.on('data', chunk => {
    fileData += chunk;
  });

  readStream.on('end', () => {
    console.log("succs looking for html at: "+filePath);

    res.send(fileData);
  });

  readStream.on('error', err => {
    console.log("error looking for html at: "+filePath);

    console.error(`Error reading file ${fileName}: ${err.message}`);
    res.status(500).send(`Error reading file ${fileName}: ${err.message}`);
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
