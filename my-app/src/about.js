import React, { useState, useEffect } from "react";

import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';


import userstory from './assets/images/landingpage/userstory.png';
import architecture from './assets/images/landingpage/architecture.jpg';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

import "./assets/scss/common.scss";
import "./assets/scss/style.scss";

export default function About({ setisonLanding }) {

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      {/* banner */}



      {/* banner */}

      <div className="landing-page">
        <div className="spacer" id="pagination-component">
          <Container>
            {/* Additional sections with similar styling */}

            <div className="section future-development" style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '15px' }}>
              <h4 className="argus-card-title" style={{ color: '#4caf50' }}>ARGUS: ARGUS: Drowning in PDFs? ARGUS can help!</h4>
              <ul className="argus-list" style={{ color: '#333' }}>
                <li>ARGUS, is a software application designed to assist researchers in analyzing retrieved research articles as part of a systematic review process. It automates tedious tasks like reading and scanning text, extracting key information, and populating data into forms, significantly reducing manual effort.</li>
              </ul>
              <p className="bodyfont" style={{ color: '#333' }}>By leveraging ARGUS's capabilities, researchers can significantly improve the efficiency and accuracy of their systematic review processes.</p>
            </div>

    
      <div className="section how-to-use">
        <h4 className="argus-card-title">How-to-Use:</h4>
        <ol className="argus-list bodyfont">
          <li>Define Keywords/Parameters: Specify the keywords or custom parameters for information extraction to guide ARGUS's focus during the analysis.</li>
          <li>Upload Research Articles: Upload your research articles in PDF format (single or batch upload supported).</li>
          <li>Run Analysis: Initiate the analysis process. ARGUS will scan the uploaded articles and extract information based on your defined criteria.</li>
          <li>Review Extracted Data: Review the extracted information within the designated form or output format.</li>
          <li>Refine (Optional): If needed, you can further refine the extraction rules or parameters for more precise results.</li>
        </ol>
      </div>



      {/* ---- */}





      {/* Benefits */}
     
            <h4 className="argus-card-title">BENEFITS</h4>
            <div className="section functionalities" style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '15px' }}>
              <div>
                <Accordion flush open={open} toggle={toggle}>

                  <AccordionItem>
                    <AccordionHeader targetId="1"> <h3 style={{ color: '#4caf50' }}>Increased Efficiency</h3></AccordionHeader>
                    <AccordionBody accordionId="1">
                      <p className="bodyfont">Automates tedious tasks, such as text scanning and data extraction, speeding up research analysis and saving valuable time.</p>
                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader targetId="2"> <h3 style={{ color: '#4caf50' }}>Improved Accuracy</h3></AccordionHeader>
                    <AccordionBody accordionId="2">
                      <p className="bodyfont">Reduces errors associated with manual data entry, ensuring the accuracy and reliability of research findings.</p>
                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader targetId="3"> <h3 style={{ color: '#4caf50' }}>Streamlined Data Organization</h3></AccordionHeader>
                    <AccordionBody accordionId="3">
                      <p className="bodyfont">Automatically organizes extracted information, simplifying data management and enhancing workflow efficiency.</p>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="4"> <h3 style={{ color: '#4caf50' }}>Focused Research Exploration</h3></AccordionHeader>
                    <AccordionBody accordionId="4">
                      <p className="bodyfont">Allows researchers to dedicate more time to analyzing data and gaining insights, leading to more informed decisions and deeper exploration.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
       

      {/* Benefits */}







            <div className="section future-development">
              <h4 className="argus-card-title">System Architecture</h4>
              <p className="bodyfont"></p>
              <img className="userstory" src={architecture}></img>
            </div>

            <div className="section functionalities">

              <h4 className="argus-card-title">Functionalities:</h4>

              <ul className="argus-list addmargin">
                <li className="argus-list-item addmargin">
                  <h3>Keyword/Term Input:</h3>
                  <p className="bodyfont addmargin">Users can specify keywords or phrases to guide ARGUS's information extraction process. This allows for targeted analysis based on specific research questions. Multiple keywords can be inserted separated by a semi colon ‘;’</p>
                </li>
                <li className="argus-list-item addmargin">
                  <h3>Research Article Upload:</h3>
                  <p className="bodyfont addmargin">ARGUS supports uploading research articles in PDF format. The application can handle single documents or batches of PDFs for efficient processing.</p>
                </li>
                <li className="argus-list-item addmargin">
                  <h3>Text Scanning and Information Extraction:</h3>
                  <p className="bodyfont addmargin">ARGUS automatically scans uploaded articles and extracts key information. This extraction can be based on:</p>
                  <ul className="argus-list addmargin">
                    <li className="bodyfont">Pre-defined rules: You can set up rules to identify specific sections or patterns within research articles (e.g., title, abstract, methodology).</li>
                    <li className="bodyfont">User-specified parameters: You can define custom parameters for ARGUS to focus on extracting particular information relevant to your research.</li>
                  </ul>
                </li>
                <li className="argus-list-item addmargin">
                  <h3>Form Filling:</h3>
                  <p className="bodyfont addmargin">The extracted information can be used to populate designated fields within forms (e.g., Google Forms) for efficient data organization and analysis. This reduces the need for manual data entry and streamlines the data collection process.</p>
                </li>
              </ul>

            </div>
            <div className="section future-development">
              <h4 className="argus-card-title">User Journey:</h4>
              <p className="bodyfont"></p>
              <img className="userstory" src={userstory}></img>
            </div>


            <div className="section functionalities">
              <h4 className="argus-card-title">Future Scope: Expanding ARGUS's Capabilities</h4>

              <h5 className="addmargin">ARGUS is constantly evolving to become an even more powerful research assistant. Here's a glimpse into what the future holds</h5>

              <ul className="argus-list addmargin">
                <li className="argus-list-item">
                  <h3>Advanced Ranking Algorithms</h3>
                  <p className="bodyfont addmargin">We are exploring implementing more sophisticated ranking algorithms to prioritize extracted information based on relevance to your specific research question. This will help you quickly identify the most impactful findings within the analyzed documents.</p>
                </li>
                <li className="argus-list-item">
                  <h3>Enhanced Search Capabilities</h3>
                  <p className="bodyfont addmargin">Future iterations of ARGUS will include phrase search functionality, allowing you to search for specific combinations of words or concepts within the uploaded PDFs. This will provide greater flexibility and precision in your research exploration.</p>
                </li>
                <li className="argus-list-item">
                  <h3>Integration with Elastic Search</h3>
                  <p className="bodyfont addmargin">We are investigating the integration of Elastic Search, a powerful search engine technology. This will enable ARGUS to handle massive datasets and facilitate lightning-fast information retrieval, even from large document collections.</p>
              
                </li>
                <li className="argus-list-item">
                  <h3>Machine Learning for Deep Insights</h3>
                  <p className="bodyfont addmargin">A key area of focus is incorporating a machine learning model into ARGUS. This model will be trained to not only extract key information but also answer specific research questions directly from the analyzed documents. Imagine asking ARGUS "What are the main methodologies used in these studies?" and receiving a comprehensive answer based on its analysis.</p>
                </li>
              </ul>
            </div>


            {/* how to use */}


    




          </Container>
        </div>
      </div>


    </div>
  );


}