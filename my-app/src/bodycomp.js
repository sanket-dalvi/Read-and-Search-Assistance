import React, { useState, useEffect } from "react";

import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';


import userstory from './assets/images/landingpage/userstory.png';

import "./assets/scss/common.scss";
import "./assets/scss/style.scss";



export default function BodyPage({setisonLanding}) {

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);



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

      {/* PagePagination */}
      <div className="landing-page">
      <div className="spacer" id="pagination-component">
        <Container>
          <div className="section functionalities">
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
          </div>

          <div className="section rationale-uses">
            <h4 className="argus-card-title">Rationale and Uses:</h4>
            <p className="argus-list bodyfont">ARGUS helps researchers:</p>
            <ul className="argus-list bodyfont">
              <li>Save significant time and effort in analyzing research articles.</li>
              <li>Eliminate the need for manual data entry, reducing errors and inconsistencies.</li>
              <li>Easily organize and analyze extracted information in forms for further research exploration.</li>
            </ul>
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

          <div className="section benefits">
            <h4 className="argus-card-title">Benefits:</h4>
            <ul className="argus-list bodyfont">
              <li>Increased Efficiency: Speeds up the analysis of research articles by automating tasks like text scanning and data extraction.</li>
              <li>Improved Accuracy: Reduces errors associated with manual data entry.</li>
              <li>Streamlined Data Organization: Extracted information is conveniently organized within forms or chosen output format.</li>
              <li>Focused Research Exploration: Allows researchers to focus on analyzing extracted information rather than spending time on repetitive tasks.</li>
            </ul>
          </div>

          <div className="section future-development">
            <h4 className="argus-card-title">Future Development:</h4>
            <p className="bodyfont">Future iterations of ARGUS could include:</p>
            <ul className="argus-list bodyfont">
              <li>Integration with machine learning for more sophisticated information extraction techniques.</li>
              <li>Support for additional document formats beyond PDFs.</li>
              <li>Enhanced user interface for easier configuration and analysis visualization.</li>
            </ul>
            <p className="bodyfont">By leveraging ARGUS's capabilities, researchers can significantly improve the efficiency and accuracy of their systematic review processes, enabling them to delve deeper into research exploration.</p>
          </div>

          <div className="section future-development">
            <h4 className="argus-card-title">User Journey:</h4>
            <p className="bodyfont"></p>
            <img className = "userstory" src={userstory}></img>
          </div>


        </Container>
      </div>
    </div>

      
    </div>
  );


}