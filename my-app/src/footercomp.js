import React, { useState, useEffect } from "react";


import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';



import "./assets/scss/common.scss";
import "./assets/scss/style.scss";

export default function FooterPage() {

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);



  return (
    <div>


        {/* footer */}

        <div className="footer4 b-t spacer">
            <Container>
                <Row>
                    {/* <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Address</h5>
                        <p>Binghamton, New York</p>
                    </Col> */}
                    {/* <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Phone</h5>
                        <p>Reception :  +205 123 4567 <br />Office :  +207 235 7890</p>
                    </Col> */}
                    {/* <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Email</h5>
                        <p>Office :  <a href="#" className="link">info@wrappixel.com</a> <br />Site :  <a href="#" className="link">wrapkit@wrappixel.com</a></p>
                    </Col> */}
                    <Col lg="5" md="6">
                        <h5 className="m-b-20">Binghamton University. All Rights Reserved.</h5>
                        {/* <div className="round-social light">
                            <a href="#" className="link"><i className="fa fa-facebook"></i></a>
                            <a href="#" className="link"><i className="fa fa-twitter"></i></a>
                            <a href="#" className="link"><i className="fa fa-google-plus"></i></a>
                            <a href="#" className="link"><i className="fa fa-youtube-play"></i></a>
                            <a href="#" className="link"><i className="fa fa-instagram"></i></a>
                        </div> */}
                    </Col>
                </Row>
                <div className="f4-bottom-bar">
                    <Row>
                        <Col md="12">
                            <div className="d-flex font-14 justify-content-between">
                                <div className="m-t-10 m-b-10 copyright">                 
</div>
                              
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
        
        {/* footer */}

    </div>
  );


}