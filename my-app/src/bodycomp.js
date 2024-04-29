import React, { useState, useEffect } from "react";

import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';


import userstory from './assets/images/landingpage/userstory.png';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

import "./assets/scss/common.scss";
import "./assets/scss/style.scss";
import banner from "./assets/images/landingpage/banner.jpg";

export default function BodyPage({ setisonLanding }) {

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

      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="static-slider-head">
            <Container>
              <Row className="justify-content-center">
                <Col lg="8" md="6" className="align-self-center text-center">
                  <h1 className="title">ARGUS</h1>
                  <h4 className="subtitle font-light">
                    Automated Research Guidance & User Support
                  </h4>
                  <div
                    onClick={() => {
                      setisonLanding(false);
                    }}
                    className="btn btn-md m-t-30 btn-info-gradiant font-14"
                  >
                    Go To Tool
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      {/* banner */}

      <div className="landing-page">
        <div className="spacer" id="pagination-component">
          <Container>
            {/* Additional sections with similar styling */}

            <div className="section future-development" style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '15px' }}>
              <h4 className="argus-card-title" style={{ color: '#4caf50' }}>ARGUS: ARGUS: Drowning in PDFs? ARGUS can help!</h4>
              <ul className="argus-list" style={{ color: '#333' }}>
                <li>Feeling buried under a mountain of research papers? <strong>ARGUS</strong> is your research power tool. Our user-friendly platform streamlines literature reviews by helping you find the most relevant articles fast.  Imagine instantly highlighting key terms, effortlessly navigating complex papers, and diving deeper into your research with intelligent tools. ARGUS automates the time-consuming tasks you dread, empowering you to find, analyze, and understand research like never before.  Explore ARGUS today and unlock a world of effortless discovery!</li>
              </ul>
              <p className="bodyfont" style={{ color: '#333' }}>By leveraging ARGUS's capabilities, researchers can significantly improve the efficiency and accuracy of their systematic review processes.</p>
            </div>

            {/* Additional sections with similar styling */}

            {/* <div className="section user-journey" style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '15px' }}>
              <h4 className="argus-card-title" style={{ color: '#4caf50' }}>User Journey:</h4>
              <p className="bodyfont" style={{ color: '#333' }}>Understanding the user journey is crucial for enhancing ARGUS's usability and effectiveness. Here's a glimpse:</p>
              <img className="userstory" src={userstory} alt="User Journey" style={{ maxWidth: '100%', borderRadius: '10px' }} />
            </div> */}
          </Container>
        </div>
      </div>

      {/* ---- */}





      {/* Benefits */}
      <div className="landing-page">
        <div className="spacer" id="pagination-component">

          <Container>
            <h4 className="argus-card-title">BENEFITS</h4>
            <div className="section functionalities" style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '15px' }}>
              <div>
                <Accordion flush open={open} toggle={toggle}>

                  <AccordionItem>
                    <AccordionHeader targetId="1"> <h3 style={{ color: '#4caf50' }}>Increased Efficiency</h3></AccordionHeader>
                    <AccordionBody accordionId="1">
                      <p className="bodyfont">Stop wasting time wading through irrelevant results. ARGUS uses advanced search to pinpoint the articles that directly address your research question, saving you hours and boosting your efficiency.</p>
                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader targetId="3"> <h3 style={{ color: '#4caf50' }}>Highlight Key Concepts Instantly</h3></AccordionHeader>
                    <AccordionBody accordionId="3">
                    <p className="bodyfont">No more tedious scanning. Highlight your key terms and watch them instantly illuminated throughout the text. Grasp core concepts quickly.</p>
                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader targetId="2"> <h3 style={{ color: '#4caf50' }}>Error-Free Analysis </h3></AccordionHeader>
                    <AccordionBody accordionId="2">
                    <p className="bodyfont">Streamline data organization by highlighting key terms. This ensures you're capturing the right information, promoting improved accuracy for further analysis.</p>
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
          </Container>

        </div>
      </div>

      {/* Benefits */}



      <div className="landing-page">
        <div className="spacer" id="pagination-component">
          <Container>
            {/* <div className="section functionalities">
              <h4 className="argus-card-title">Functionalities:</h4>
              <ul className="argus-list">
                <li className="argus-list-item">
                  <h3>Keyword/Term Input:</h3>
                  <p className="bodyfont">Users can specify keywords or phrases to guide ARGUS's information extraction process. This allows for targeted analysis based on specific research questions. Multiple keywords can be inserted separated by a semi colon ‘;’</p>
                </li>
                <li className="argus-list-item">
                  <h3>Research Article Upload:</h3>
                  <p className="bodyfont">ARGUS supports uploading research articles in PDF format. The application can handle single documents or batches of PDFs for efficient processing.</p>
                </li>
                <li className="argus-list-item">
                  <h3>Text Scanning and Information Extraction:</h3>
                  <p className="bodyfont">ARGUS automatically scans uploaded articles and extracts key information. This extraction can be based on:</p>
                  <ul className="argus-list">
                    <li className="bodyfont">Pre-defined rules: You can set up rules to identify specific sections or patterns within research articles (e.g., title, abstract, methodology).</li>
                    <li className="bodyfont">User-specified parameters: You can define custom parameters for ARGUS to focus on extracting particular information relevant to your research.</li>
                  </ul>
                </li>
                <li className="argus-list-item">
                  <h3>Form Filling:</h3>
                  <p className="bodyfont">The extracted information can be used to populate designated fields within forms (e.g., Google Forms) for efficient data organization and analysis. This reduces the need for manual data entry and streamlines the data collection process.</p>
                </li>
              </ul>
            </div> */}

     
            {/* <div className="section future-development">
              <h4 className="argus-card-title">User Journey:</h4>
              <p className="bodyfont"></p>
              <img className="userstory" src={userstory}></img>
            </div> */}


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
            {/* how to use */}



          </Container>
        </div>
      </div>


    </div>
  );


}