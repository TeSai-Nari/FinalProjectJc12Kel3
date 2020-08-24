import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="grey lighten-4" className="font-small pt-5 mt-4" >
      <MDBContainer fluid className="text-center text-md-left black-text px-5" style={{height:"50vh", lineHeight:'1.6em'}}>
        <MDBRow className="d-flex justify-content-between">
          <MDBCol md="5">
            <h5 className="title"><strong className="black-text fontlogo p-3 AdiRegu-font">
            Adidas</strong></h5> 
            <p className="p-3">
              Adidas is a multinational corporation, founded and headquartered in Germany, that designs and manufacturers shoes, clothing and accessories. 
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">COMPANY INFO</h5>
            <ul className='text-uppercase' style={{lineHeight:'2.6'}}>
              <li className="list-unstyled ">
                <a href="#!" className="text-dark">About Us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Careers</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Press</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Gift Cards</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">SUPPORT</h5>
            <ul className='text-uppercase' style={{lineHeight:'2.6'}}>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Help</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Return {'&'} Exchange</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Shipping</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-dark">Order Tracker</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 text-dark " style={{backgroundColor:'#fce4ec'}}>
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright: <a className="text-dark" href="/"> www.adidas.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;