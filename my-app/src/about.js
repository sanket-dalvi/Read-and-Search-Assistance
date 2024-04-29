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
                <li>The cornerstone of scientific progress lies in the ability to effectively synthesize existing knowledge. Systematic reviews play a critical role in this process, offering researchers a comprehensive understanding of research within a specific domain. However, the traditional approach to conducting these reviews is often a laborious and error-prone endeavor. Manually sifting through vast collections of research articles, meticulously extracting relevant information, and synthesizing findings consumes significant research time and resources. This time-intensive process can hinder research progress and limit the depth of analysis.</li>
               <br></br>
                <li>
                  Introducing <span className="boldit greenit">ARGUS</span>:<br></br>
                  ARGUS emerges as a software application designed to empower researchers by streamlining the literature review process. It functions as a one-stop solution, offering a suite of functionalities that automate key tasks and enhance information visualization. This user-friendly application aims to revolutionize the way researchers approach literature reviews, allowing them to dedicate more time to critical analysis and discovery.
                </li>
              </ul>
              <br></br>
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

            <h4 className="argus-card-title">Dive Deeper, Faster: Effortless Discovery with ARGUS</h4>
            <div className="section functionalities" style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '15px' }}>
              <div>
                <Accordion flush open={open} toggle={toggle}>

                  <AccordionItem>
                    <AccordionHeader targetId="1"> <h3 style={{ color: '#4caf50' }}>Increased Efficiency- Cut Through the Noise: Find Exactly What You Need </h3></AccordionHeader>
                    <AccordionBody accordionId="1">
                      <p className="bodyfont">No more endless searches or irrelevant results. ARGUS uses advanced search techniques to understand the true meaning behind your research question. It pinpoints the most relevant articles that directly address your specific needs, saving you hours of sifting through irrelevant literature and getting you straight to the research that matters most. This translates to significant gains in efficiency, allowing you to dedicate more time to analyzing and interpreting the information you've found.</p>
                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader targetId="2"> <h3 style={{ color: '#4caf50' }}>Improved Accuracy & Streamlined Data Organization- Focus on the Gems, Not the Gravel: Highlight Key Concepts Instantly</h3></AccordionHeader>
                    <AccordionBody accordionId="2">
                      <p className="bodyfont">Stop wasting time scanning page after page.  With ARGUS, simply define your key research terms and watch them instantly highlighted throughout the article. This allows you to focus on the most important information and quickly grasp the core concepts within each research paper, accelerating your comprehension and saving you valuable time.  Additionally, highlighting ensures you're capturing the right data points, promoting improved accuracy and streamlined data organization for further analysis.</p>
                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader targetId="3"> <h3 style={{ color: '#4caf50' }}>Focused Research Exploration- Effortless Navigation:  Turn Complex Papers into Open Books</h3></AccordionHeader>
                    <AccordionBody accordionId="3">
                      <p className="bodyfont">Ditch the clunky interfaces! Our user-friendly platform is specifically designed for researchers.  Enjoy a smooth and intuitive reading experience, allowing you to navigate complex research articles with ease. Plus, ARGUS offers advanced search functionalities within the articles themselves. This means you can drill down and find specific details with minimal effort, eliminating the frustration of endlessly scrolling through long documents. This effortless navigation empowers you to focus on exploring the research in depth, uncovering valuable insights and propelling your research forward.</p>
                    </AccordionBody>
                  </AccordionItem>
                  {/* <AccordionItem>
                    <AccordionHeader targetId="4"> <h3 style={{ color: '#4caf50' }}>Focused Research Exploration</h3></AccordionHeader>
                    <AccordionBody accordionId="4">
                      <p className="bodyfont">Allows researchers to dedicate more time to analyzing data and gaining insights, leading to more informed decisions and deeper exploration.
                      </p>
                    </AccordionBody>
                  </AccordionItem> */}
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