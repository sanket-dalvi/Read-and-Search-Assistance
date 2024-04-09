// const express = require('express');
// const { spawn } = require('child_process');
// const app = express();

// app.use(express.static('public'));

// const cors = require('cors');
// app.use(cors());


// app.get('/convert-pdf-to-html', (req, res) => {
// //   const pdfFilePath = req.query.pdfFilePath;
//   const pdfFilePath ="C:\\pdf2htmlEX\\sample.pdf";
//     console.log("pdfFilePath  "+pdfFilePath);
//   const cmd = spawn('C:\\pdf2htmlEX\\pdf2htmlEX.exe', [pdfFilePath]);
//   cmd.on('close', (code) => {
//     if (code === 0) {
//       const htmlFilePath = pdfFilePath.replace('.pdf', '.html');
//       res.sendFile("C:\\sample.html");
//     } else {
//       res.status(500).send(`pdf2htmlEX exited with code ${code}`);
//     }
//   });
// });

// app.listen(3001, () => {
//   console.log('Server listening on port 3001');
// });



// iter 1


// const { spawn } = require('child_process');
// const express = require('express');
// const app = express();



// // app.use(express.static('public'));

// const cors = require('cors');
// app.use(cors());


// app.get('/convert-pdf-to-html', (req, res) => {
//   const pdfFilePath = "C:\\pdf2htmlEX\\sample.pdf";
//   console.log("pdfFilePath  "+pdfFilePath);
//   const cmd = spawn('C:\\pdf2htmlEX\\pdf2htmlEX.exe', [pdfFilePath]);

//   let output = '';
//   cmd.stdout.on('data', (data) => {
//     console.log("output  no 1");
//     output += data.toString();
//   });

//   cmd.on('close', (code) => {
//     if (code === 0) {
//       const htmlFilePath = pdfFilePath.replace('.pdf', '.html');
//       console.log("output  "+output);
//       res.send(output); // Send the output as the API response
//     } else {
//         console.log("output  no");
//       res.status(500).send(`pdf2htmlEX exited with code ${code}`);
//     }
//   });
// });

// app.listen(3001, () => {
//   console.log('Server listening on port 3001');
// });


// iter2

const { exec,spawn } = require('child_process');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
const fs = require('fs');
// app.get('/convert-pdf-to-html', (req, res) => {
//     // const pdfFilePath = "C:\\Users\\ashis\\OneDrive\\Desktop\\sample.pdf";
//     const pdfFilePath = "C:\\pdf2htmlEX\\sample.pdf";
    
//     console.log("pdfFilePath  " + pdfFilePath);
//     const cmd = `C:\\pdf2htmlEX\\pdf2htmlEX.exe ${pdfFilePath}`;
//     console.log("CMD  " + cmd);
//     exec(cmd, (error, stdout, stderr) => {

//         const htmlFilePath = pdfFilePath.replace('.pdf', '.html').replace('Desktop\\', 'Desktop\\converted\\');
//         console.log("htmlFilePath  "+htmlFilePath)
//         console.log("stdout  "+stdout)
//         fs.writeFile(htmlFilePath, stdout, (err) => {
//           if (err) {
//             console.error(`Failed to write file: ${err.message}`);
//             return res.status(500).send(`Failed to write file: ${err.message}`);
//           }
//           console.log(`File saved at ${htmlFilePath}`);
//           res.sendFile(htmlFilePath);
//         });


//       if (error) {
//         console.error(`pdf2htmlEX error: ${error.message}`);
//         return res.status(500).send(`pdf2htmlEX error: ${error.message}`);
//       }
//       if (stderr) {
//         console.error(`pdf2htmlEX stderr: ${stderr}`);
//         return res.status(500).send(`pdf2htmlEX stderr: ${stderr}`);
//       }
     
//     });
//   });

// app.get('/convert-pdf-to-html', (req, res) => {
//     const pdfFilePath = "C:\\pdf2htmlEX\\sample.pdf";
    
//     console.log("pdfFilePath  " + pdfFilePath);
//     const cmd = `C:\\pdf2htmlEX\\pdf2htmlEX.exe ${pdfFilePath}`;
//     console.log("CMD  " + cmd);
//     exec(cmd, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`pdf2htmlEX error: ${error.message}`);
//         return res.status(500).send(`pdf2htmlEX error: ${error.message}`);
//       }
//       if (stderr) {
//         console.error(`pdf2htmlEX stderr: ${stderr}`);
//         // return res.status(500).send(`pdf2htmlEX stderr: ${stderr}`);
//       }
  
//       const htmlFilePath = pdfFilePath.replace('.pdf', '.html').replace('Desktop\\', 'Desktop\\converted\\');
//       console.log("htmlFilePath  "+htmlFilePath)
//       console.log("stdout  "+stdout)
//       fs.writeFile(htmlFilePath, stdout, (err) => {
//         if (err) {
//           console.error(`Failed to write file: ${err.message}`);
//           return res.status(500).send(`Failed to write file: ${err.message}`);
//         }
//         console.log(`File saved at ${htmlFilePath}`);
//         res.sendFile(htmlFilePath);
//       });
//     });
//   });
  
//   app.get('/convert-pdf-to-html', (req, res) => {

            
//         const pdfFilePath = 'C:\\pdf2htmlEX\\sample.pdf';
//         const htmlFilePath = 'C:\\pdf2htmlEX\\sample.html';

//         const cmd = spawn('C:\\pdf2htmlEX\\pdf2htmlEX.exe', [pdfFilePath]);

//         let stdout = '';
//         let stderr = '';

//         cmd.stdout.on('data', (data) => {
//             console.log('data  '+data);
//         stdout += data.toString();
//         });

//         cmd.stderr.on('data', (data) => {
//             console.log(' stderr data  '+data);
//         stderr += data.toString();
//         });

//         cmd.on('close', (code) => {
//         if (code === 0) {
//             fs.writeFileSync(htmlFilePath, stdout);
//             console.log('PDF converted successfully');
//             console.log('HTML output:', stdout);
//             // write the HTML output to a file
            
//         } else {
//             console.error(`pdf2htmlEX exited with code ${code}`);
//             console.error('stderr:', stderr);
//         }
//         });


    // const pdfFilePath = "C:\\pdf2htmlEX\\sample.pdf";
  


    // const cmd = spawn('C:\\pdf2htmlEX\\pdf2htmlEX.exe', [pdfFilePath]);
    // cmd.on('close', (code) => {
    //   if (code === 0) {
    //     // const htmlFilePath = pdfFilePath.replace('.pdf', '.html');
    //     const htmlFilePath = pdfFilePath.replace('.pdf', '.html').replace('Desktop\\', 'Desktop\\converted\\');
    //     console.log("htmlFilePath  "+htmlFilePath)
    //     // console.log("stdout  "+stdout)
      
    //   } else {
    //     console.log("stdout  ")
    //     res.status(500).send(`pdf2htmlEX exited with code ${code}`);
    //   }
    // });


    // console.log("pdfFilePath  " + pdfFilePath);
    // const cmd = `C:\\pdf2htmlEX\\pdf2htmlEX.exe ${pdfFilePath} 2>&1`;
    // console.log("CMD  " + cmd);
    // exec(cmd, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`pdf2htmlEX error: ${error.message}`);
    //     return res.status(500).send(`pdf2htmlEX error: ${error.message}`);
    //   }
    //   if (stderr) {
    //     console.error(`pdf2htmlEX stderr: ${stderr}`);
    //     // return res.status(500).send(`pdf2htmlEX stderr: ${stderr}`);
    //   }
  
    //   const htmlFilePath = pdfFilePath.replace('.pdf', '.html').replace('Desktop\\', 'Desktop\\converted\\');
    //   console.log("htmlFilePath  "+htmlFilePath)
    //   console.log("stdout  "+stdout)
    //   fs.writeFile(htmlFilePath, stdout, (err) => {
    //     if (err) {
    //       console.error(`Failed to write file: ${err.message}`);
    //       return res.status(500).send(`Failed to write file: ${err.message}`);
    //     }
    //     console.log(`File saved at ${htmlFilePath}`);
    //     res.sendFile(htmlFilePath);
    //   });
    // });
//   });
  


//   const { exec } = require('child_process');

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



  

  
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
