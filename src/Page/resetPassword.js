import React, { Component } from "react";
import {
  HeaderTopBar,
  OffersAndUpdates,
  Footer,
  LoginSignUpModal,
  ResetProfilePassword,
  Alert,
} from "../Pagecomponent";
import { Link, NavLink } from "react-router-dom";
import { Api, Url, Helper, Global } from "../config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: this.props.match.params.authToken,
      account_email: "",
      password: "",
      confirm_password: "",

      error_password: "",
      error_confirm_password: "",
    };
  }
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.get_token_details();
  };
  get_token_details = () => {
    let api = Url.TokenDetails + "/" + this.state.authToken;

    Api.token_details(api).then((res) => {
      let data = JSON.parse(res);
      console.log(data);
      if (data.status == "OK") {
        console.log(data.data.email);
        this.setState({ account_email: data.data.email });
      }
    });
  };

  password(e) {
    this.setState({ password: e.target.value });
  }
  confirm_password(e) {
    this.setState({ confirm_password: e.target.value });
  }
  save_new_password = () => {
    let resetData = {
      token: this.state.authToken,
      username: this.state.account_email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
    };
    let errorObj = Helper.resetValidation(resetData);
    this.setState({
      error_password: errorObj.password,
      error_confirm_password: errorObj.confirm_password,
    });

    console.log(errorObj);
    if (errorObj.continue) {
      let api = Url.resetPassword + "/" + this.state.authToken;
      Api.ResetPasswordApi(api, resetData).then((res) => {
        let data = JSON.parse(res);
        console.log(data);

        if (data.status == "OK" && data.code == 200) {
          Helper.alert(data.message);
        } else {
          Helper.alert(data.message);
          this.setState({
            error_password: data.data.password,
            error_confirm_password: data.data.confirm_password,
          });
        }
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="ResetPassword"
          history={this.props.history}
          user={"dummy"}
        />
        <Alert  history={this.props.history} title={"reset"}/>
        <header id="header">
          <div className="headerTopBar"></div>
        </header>

        <main id="main" className="defaultPageWrapper_new main_paddingsec">
          <section id="productListWrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <div className="mycart_details">
                    <div className="mycart_header">
                      <div className="col-md-12">
                        <p>Reset Password</p>
                      </div>
                    </div>
                    <div className="cart_details_padding partyenqury_content">
                      <div className="form-group party_enquiry_detls input_man">
                        <label>Enter Account Email</label>
                        <span>
                          <input
                            type="text"
                            className="passwrd_input"
                            value={this.state.account_email}
                          />
                        </span>
                      </div>

                      <div className="form-group party_enquiry_detls input_man">
                        <label>Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className={`passwrd_input ${
                            this.state.error_password ? "errorval" : ""
                          }`}
                          onChange={this.password.bind(this)}
                          value={this.state.password}
                        />

                        {this.state.error_password && (
                          <span className="errorText">
                            {this.state.error_password}
                          </span>
                        )}
                      </div>

                      <div className="form-group party_enquiry_detls input_man">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Confirm password"
                          className={`passwrd_input ${
                            this.state.error_confirm_password ? "errorval" : ""
                          }`}
                          onChange={this.confirm_password.bind(this)}
                          value={this.state.confirm_password}
                        />
                        {this.state.error_confirm_password && (
                          <span className="errorText">
                            {this.state.error_confirm_password}
                          </span>
                        )}
                      </div>

                      <div className="send_requst">
                        <Link onClick={this.save_new_password.bind(this)} to="#">
                          <div className="place_ordr_btn send_requst_btn">
                            Send request
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Profile;
