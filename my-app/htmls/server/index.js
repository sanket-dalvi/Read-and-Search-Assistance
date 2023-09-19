const express = require("express");
const { exec, spawn } = require("child_process");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
// D:\Grad\Sem 2\Web info ret\Team 8\project2\my-app\package.json
const app = express();

app.use(bodyParser.json());
app.use(cors());


const fpp="D:/Grad/Sem 2/Web info ret/Team 8/project2/my-app/htmls/uploads";
function getPdfFilePaths(folderPath) {
  const files = fs.readdirSync(folderPath);
  const pdfFiles = files.filter(file => path.extname(file) === '.pdf');
  const pdfFilePaths = pdfFiles.map(file => path.join(folderPath, file));
  return pdfFilePaths;
}

app.get("/convert-pdf-to-html", (req, res) => {
  const folderPath = '.';
  const pdfFilePaths = getPdfFilePaths(fpp);
  console.log(pdfFilePaths);
  const nooffiles=pdfFilePaths.length;
  let  filesprocessed=0;
  
  for (let i = 0; i < pdfFilePaths.length; i++) {
    // console.log(pdfFilePaths[i]);
    console.log("currently trying to convert:  "+pdfFilePaths[i]);

    // D:\Grad\Sem 2\Web info ret\project2\my-app\htmls
  const cmd = `"D:\\Grad\\Sem 2\\Web info ret\\Team 8\\project2\\my-app\\cshell\\pdf2htmlEX.exe" "${pdfFilePaths[i]}"`;

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

const moveHtmlFiles = async () => {
  const sourceDir = "D:/Grad/Sem 2/Web info ret/Team 8/project2/my-app/htmls/";
  const destDir = "D:/Grad/Sem 2/Web info ret/Team 8/project2/my-app/public/hms/";
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
  const fileName = req.params.fileName;
  const filePath = "D:/Grad/Sem 2/Web info ret/Team 8/project2/my-app/htmls/"+fileName;
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



app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
