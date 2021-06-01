import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

class Alert extends React.Component {
  close_modal = () => {
    console.log(this.props);
    document.querySelector("#alertClose").click();
    if (this.props.title == "reset") {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="modal hide" id="myModal1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content backgroundcolor_wrap alert_wrap">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  id="alertClose"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body toper">
                <div className="loginWrap defaultFormWrap alert_modalwrap">
                  <div className="loginFormWrap">
                    <p id="text">Are you sure?</p>
                    <ul className="btn_alert">
                      <li>
                        <div className="alert_okbtn">
                          <Link to="#" onClick={this.close_modal.bind(this)}>
                            OK
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="productListWrapper" className="rowTopMargin hidden">
          <div className="container">
            <div className="row">
              <a
                href="#"
                data-toggle="modal"
                id="alertOpen"
                data-target="#myModal1"
              >
                Open to click
              </a>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Alert;
