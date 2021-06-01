import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class Footer extends React.Component {
  nevigate = (nav) => {
    Helper.clear_global_search_values_onNavigation();
    this.props.history.push("/" + nav);
  };

  render() {
    return (
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-2 footer-links">
                <h4>About</h4>
                <ul>
                  <li onClick={this.nevigate.bind(this, "about-us")}>
                    <i className="fa fa-chevron-right"></i>
                    <Link to="#">About Us</Link>
                  </li>
                  <li onClick={this.nevigate.bind(this, "contact-us")}>
                    <i className="fa fa-chevron-right"></i>
                    <Link to="#">Contact Us</Link>
                  </li>
                  {/* <li onClick={this.nevigate.bind(this, "career")}>
                    <i className="fa fa-chevron-right"></i>
                    <Link to="#">Career</Link>
                  </li> */}
                  {/* <li onClick={this.nevigate.bind(this, "blog")}>
                    <i className="fa fa-chevron-right"></i>
                    <Link to="#">Blog</Link>
                  </li> */}
                </ul>
              </div>
              <div className="col-md-2 footer-links">
                <h4>Help</h4>
                <ul>
                  <li onClick={this.nevigate.bind(this, "faq")}>
                    <i className="fa fa-chevron-right"></i>
                    <Link to="#">FAQ</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 footer-links">
                <h4>Policy</h4>
                <ul>
                  <li onClick={this.nevigate.bind(this, "term-of-use")}>
                    <i className="fa fa-chevron-right"></i>
                    <Link to="#">Terms of Use</Link>
                  </li>
                </ul>
              </div>

              {/* <div className="col-md-3 footer-contact footer-links">
                <h4></h4>
                <ul>
                  <li>
                    <img
                      src={require("../assets/img/paymentCard.png")}
                      alt="Card"
                    ></img>
                  </li>
                </ul>
                <h4 className="footerH4">Connect with us</h4>
                <div className="socialWrap">
                   <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div> */}

              <div className="col-md-3 footer-contact footer-links">
                <h4>Registered Office</h4>
                <ul>
                  <li>
                    <i className="fa fa-map-marker-alt footerI"></i>
                    <p className="footerPtag">
                      158/6B &amp; Prince Anwar Shah Rd,<br></br>
                      Kolkata - 700045, West Bengal
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-phone footerI"></i>
                    <p className="footerPtag">+91 9123786579</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="whatsapp" >
          
          <a href="https://api.whatsapp.com/send?phone=919123786579" target="_blank">    
            {/* <h5><i class="fa fa-whatsapp" aria-hidden="true"></i></h5> */}
            <img src={require("../assets/img/whatsapp_icon.jpg")} alt="Card" 
                style={{height:"40px", width:"40px"}}/>
          </a>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright
            <strong>Celebration App</strong>. All Rights Reserved
          </div>
        </div>
        <a href="#" className="back-to-top">
          <i className="fa fa-angle-up"></i>
        </a>
      </footer>
    );
  }
}
export default Footer;
