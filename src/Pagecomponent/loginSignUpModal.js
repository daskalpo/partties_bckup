import React from "react";
import { Helper, Api, Url, Global } from "../config";
import { Link, NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

class LoginSignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      dob: "",
      aniversary: "",
      mobileType: "Mobile",
      errorTextName: false,
      errorTextEmail: false,
      errorTextmobile: false,
      errorTextpassword: false,
      errorTextconfirmPassword: false,
      errorTextSecurityKey: false,
      errorTextDob: false,
      errorTextAnniversary: false,
      errorTextmobileType: false,
      continue: false,
      modalType: "",

      loginEmailOrPhone: "",
      loginPassword: "",
      errorTextloginEmailOrPhone: false,

      forgetEmailOrPhone: "",
      errorTextforgetEmailOrPhone: false,
    };
  }

  name(e) {
    this.setState({ name: e.target.value });
  }
  email(e) {
    this.setState({ email: e.target.value });
  }
  mobile(e) {
    if (e.target.value.length < 11) {
      this.setState({ mobile: e.target.value });
    }
  }
  mobileType(e) {
    this.setState({ mobileType: e.target.value });
  }
  dob(e) {
    this.setState({ dob: e.target.value });
  }
  aniversary(e) {
    this.setState({ aniversary: e.target.value });
  }
  password(e) {
    console.log(new Date(e));
    this.setState({ password: e.target.value });
  }
  confirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  loginEmailOrPhone(e) {
    this.setState({ loginEmailOrPhone: e.target.value });
  }
  loginPassword(e) {
    this.setState({ loginPassword: e.target.value });
  }

  forgetEmailOrPhone(e) {
    this.setState({ forgetEmailOrPhone: e.target.value });
  }
  clearLoginSignUpVariables = () => {
    this.setState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      securityKey: "",
      dob: false,
      aniversary: false,
      mobileType: "Mobile",
      errorTextName: false,
      errorTextEmail: false,
      errorTextmobile: false,
      errorTextpassword: false,
      errorTextconfirmPassword: false,
      errorTextSecurityKey: false,
      errorTextdob: false,
      errorTextaniversary: false,
      errorTextmobileType: false,

      loginEmailOrPhone: "",
      loginPassword: "",
      loggedUser: "",
      loginServer: "",
      errorTextloginEmailOrPhone: false,
      errorTextloginPassword: false,
      forgetEmailOrPhone: "",
      errorTextforgetEmailOrPhone: false,
    });
  };

  toggleLogSign = (val) => {
    Helper.toggle_login_signup(val);
    this.clearLoginSignUpVariables();
  };
  ClearLoginSignUpModalValues = () => {
    this.clearLoginSignUpVariables();
  };
  loginContinue = (loginEmail = null, password = null) => {
    let loginData = {
      loginEmailOrPhone:
        loginEmail != null && typeof loginEmail != "object"
          ? loginEmail
          : this.state.loginEmailOrPhone,
      loginPassword: password != null ? password : this.state.loginPassword,
    };
    console.log(loginData);

    let errorObj = Helper.loginValidation(loginData);
    this.setState({
      errorTextloginEmailOrPhone: errorObj.loginEmailOrPhone,
      errorTextloginPassword: errorObj.loginPassword,
    });

    if (errorObj.continue) {
      let api = Url.Login;
      Api.LoginApi(api, loginData).then((res) => {
        let data = JSON.parse(res);

        if (data.status == "OK" && data.code == 200) {
          document.querySelector(".closeLoginSighUpModal").click();
          window.localStorage.setItem("LOGGEDUSER", data.data.name);
          window.localStorage.setItem("ONETIMEADDBULK", 1);
          this.ClearLoginSignUpModalValues();
          this.props.user(data.data.name);
          window.localStorage.setItem(
            "USERTOKKEN",
            JSON.stringify(data.access_token)
          );
          setTimeout(function () {
            window.location.reload();
          }, 250);
        } else if (data.message.status == "FAIL") {
          this.setState({ loginServer: "User Authentication Failed " });
        }
      });
    }
  };

  componentDidMount = () => {};

  enterPressed(type_pressed, event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      if (type_pressed == "login") {
        this.loginContinue();
      }
      if (type_pressed == "signup") {
        this.signUp();
      }
      if (type_pressed == "forgetpassword") {
        this.forgetAccount();
      }
    }
  }

  forgetAccount = () => {
    let account = {
      email: this.state.forgetEmailOrPhone,
    };
    let errorObj = Helper.accountValidation(account);
    this.setState({
      errorTextforgetEmailOrPhone: errorObj.email,
    });
    console.log(errorObj);

    if (errorObj.continue) {
      let api = Url.forgetPasword;

      Api.ForgetPassword(api, account).then((res) => {
        let data = JSON.parse(res);

        if (data.code == 200) {
          document.querySelector(".closeLoginSighUpModal").click();
          this.ClearLoginSignUpModalValues();
          Helper.alert(data.message);
        }
        if (data.code == 400) {
          this.setState({
            errorTextforgetEmailOrPhone: data.data.username,
          });
        }
      });
    }
  };
  signUp = () => {
    let signUpData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      mobileType: this.state.mobileType === "0" ? "" : this.state.mobileType,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      securityKey: this.state.securityKey,
      dob: this.state.dob ? Helper.convert_YMD(this.state.dob) : " ",
      aniversary: this.state.aniversary
        ? Helper.convert_YMD(this.state.aniversary)
        : "",
    };

    let errorObj = Helper.signUpValidation(signUpData);

    this.setState({
      errorTextName: errorObj.name,
      errorTextEmail: errorObj.email,
      errorTextmobile: errorObj.mobile,
      errorTextmobileType: errorObj.mobileType,
      errorTextdob: errorObj.dob,
      errorTextaniversary: errorObj.aniversary,
      errorTextpassword: errorObj.password,
      errorTextconfirmPassword: errorObj.confirmPassword,
    });
    console.log(errorObj);
    if (errorObj.continue) {
      let api = Url.Register;
      Api.RegisterApi(api, signUpData).then((res) => {
        let data = JSON.parse(res);
        console.log(data);

        if (data.status == "OK" && data.code == 200) {
          document.querySelector(".closeLoginSighUpModal").click();
          this.ClearLoginSignUpModalValues();
          Helper.alert("Signed up Succesfully");
          this.loginContinue(signUpData.email, signUpData.password);
        } else {
          this.setState({
            errorTextName: data.data.fullname,
            errorTextEmail: data.data.email,
            errorTextmobile: data.data.phone,
            errorTextmobileType: data.data.phone_type,
            errorTextdob: data.data.dob,
            errorTextaniversary: data.data.anniversary,
            errorTextpassword: data.data.password,
            errorTextconfirmPassword: data.data.password_confirmation,
          });
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="loginSignupModal"
          role="dialog"
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content loginSignupContentWrap">
              <div className="modal-header">
                <button
                  onClick={this.ClearLoginSignUpModalValues.bind(this)}
                  type="button"
                  className="close closeLoginSighUpModal"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h5 className="modal-title">Welcome</h5>
                <p id="modalLgSpTitle" className="modalLgSpTitle"></p>
              </div>
              <div className="modal-body">
                <div className="loginWrap defaultFormWrap">
                  <div id="loginFormWrap" className="loginFormWrap">
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Enter Email or Mobile No.</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "login")}
                        type="text"
                        placeholder="Email or Mobile no."
                        className={`formField ${
                          this.state.errorTextloginEmailOrPhone
                            ? "errorval"
                            : ""
                        }`}
                        onChange={this.loginEmailOrPhone.bind(this)}
                        value={this.state.loginEmailOrPhone}
                      />{" "}
                      {this.state.errorTextloginEmailOrPhone && (
                        <span className="errorText">
                          {this.state.errorTextloginEmailOrPhone}
                        </span>
                      )}
                    </div>
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Enter Password</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "login")}
                        id="loginpass"
                        type="password"
                        placeholder="Enter Password"
                        className={`formField ${
                          this.state.errorTextloginPassword ? "errorval" : ""
                        }`}
                        onChange={this.loginPassword.bind(this)}
                        value={this.state.loginPassword}
                      />{" "}
                      {this.state.errorTextloginPassword && (
                        <span className="errorText">
                          {this.state.errorTextloginPassword}
                        </span>
                      )}
                    </div>
                    <div className="loginServer">{this.state.loginServer}</div>
                    <div className="fieldItem signupMaintainer ">
                      <button
                        onClick={this.loginContinue.bind(this)}
                        className="continueButton defaultButton"
                      >
                        Login
                      </button>
                    </div>
                    <div className="fieldItem signupMaintainer">
                      <p>
                        Don't have an account?&nbsp;&nbsp;
                        <NavLink
                          to="#"
                          onClick={this.toggleLogSign.bind(this, "signup")}
                          className="signupLink"
                        >
                         Sign Up
                        </NavLink>
                      </p>
                      <p>
                        Forget Password&nbsp;&nbsp;
                        <NavLink
                          to="#"
                          onClick={this.toggleLogSign.bind(
                            this,
                            "forgetpassword"
                          )}
                          className="signupLink"
                        >
                          Click here
                        </NavLink>
                      </p>
                    </div>
                  </div>

                  <div id="forgetPassFormWrap" className="loginFormWrap">
                    <Link
                      to="#"
                      onClick={this.toggleLogSign.bind(this, "login")}
                      href="#"
                      className="backtoLogin"
                    >
                      <i className="fas fa-chevron-left"></i>
                      Back
                    </Link>
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Enter Account Email</label>
                      <input
                        onKeyPress={this.enterPressed.bind(
                          this,
                          "forgetpassword"
                        )}
                        type="text"
                        placeholder="Enter Account Email"
                        className={`formField ${
                          this.state.errorTextforgetEmailOrPhone
                            ? "errorval"
                            : ""
                        }`}
                        onChange={this.forgetEmailOrPhone.bind(this)}
                        value={this.state.forgetEmailOrPhone}
                      />{" "}
                      {this.state.errorTextforgetEmailOrPhone && (
                        <span className="errorText">
                          {this.state.errorTextforgetEmailOrPhone}
                        </span>
                      )}
                    </div>
                    <div
                      onClick={this.forgetAccount.bind(this)}
                      className="fieldItem forgot"
                    >
                      <button className="loginButton defaultButton">
                        Submit
                      </button>
                    </div>
                  </div>

                  <div id="signupFormWrap" className="signupFormWrap">
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Name</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "signup")}
                        type="text"
                        placeholder="Enter Name"
                        className={`formField ${
                          this.state.errorTextName ? "errorval" : ""
                        }`}
                        onChange={this.name.bind(this)}
                        value={this.state.name}
                      />{" "}
                      {this.state.errorTextName && (
                        <span className="errorText">
                          {this.state.errorTextName}
                        </span>
                      )}
                    </div>
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Email</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "signup")}
                        type="text"
                        placeholder="Enter Email"
                        className={`formField ${
                          this.state.errorTextEmail ? "errorval" : ""
                        }`}
                        onChange={this.email.bind(this)}
                        value={this.state.email}
                      />{" "}
                      {this.state.errorTextEmail && (
                        <span className="errorText">
                          {this.state.errorTextEmail}
                        </span>
                      )}
                    </div>
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Mobile</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "signup")}
                        type="number"
                        placeholder="Enter Mobile"
                        className={`formField ${
                          this.state.errorTextmobile ? "errorval" : ""
                        }`}
                        onChange={this.mobile.bind(this)}
                        value={this.state.mobile}
                      />{" "}
                      {this.state.errorTextmobile && (
                        <span className="errorText">
                          {this.state.errorTextmobile}
                        </span>
                      )}
                    </div>

                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label htmlFor="select1">Select Phone Type</label>
                      <select
                        value={this.state.mobileType}
                        onChange={this.mobileType.bind(this)}
                        className={`formField selectboxsignup ${
                          this.state.errorTextmobileType
                            ? "errorValidationsignup"
                            : ""
                        }`}
                      >
                        <option value="Mobile">Mobile</option>
                        <option value="Landline">Landline</option>
                      </select>
                      {this.state.errorTextmobileType && (
                        <span className="errorText">
                          {this.state.errorTextmobileType}
                        </span>
                      )}
                    </div>

                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Enter Date of Birth</label>
                      <input
                        value={this.state.dob}
                        onChange={this.dob.bind(this)}
                        placeholder=" Enter Date of Birth"
                        className={`formField ${
                          this.state.errorTextdob ? "errorval" : ""
                        }`}
                        type="date"
                      />
                      {this.state.errorTextdob && (
                        <span className="errorText">
                          {this.state.errorTextdob}
                        </span>
                      )}
                    </div>
                    <div className="fieldItem signupMaintainer">
                      <label>Enter Aniversary Date</label>
                      <input
                        placeholder=" Enter Date of Aniversary"
                        className={`formField ${
                          this.state.errorTextaniversary ? "errorval" : ""
                        }`}
                        value={this.state.aniversary}
                        onChange={this.aniversary.bind(this)}
                        type="date"
                      />
                      {this.state.errorTextaniversary && (
                        <span className="errorText">
                          {this.state.errorTextaniversary}
                        </span>
                      )}
                    </div>

                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Password</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "signup")}
                        type="password"
                        placeholder="Enter Password"
                        className={`formField ${
                          this.state.errorTextpassword ? "errorval" : ""
                        }`}
                        onChange={this.password.bind(this)}
                        value={this.state.password}
                      />{" "}
                      {this.state.errorTextpassword && (
                        <span className="errorText">
                          {this.state.errorTextpassword}
                        </span>
                      )}
                    </div>
                    <div className="fieldItem signupMaintainer">
                      <span className="star">*</span>
                      <label>Confirm Password</label>
                      <input
                        onKeyPress={this.enterPressed.bind(this, "signup")}
                        type="password"
                        placeholder="Enter Confirm Password"
                        className={`formField ${
                          this.state.errorTextconfirmPassword ? "errorval" : ""
                        }`}
                        onChange={this.confirmPassword.bind(this)}
                        value={this.state.confirmPassword}
                      />{" "}
                      {this.state.errorTextconfirmPassword && (
                        <span className="errorText">
                          {this.state.errorTextconfirmPassword}
                        </span>
                      )}
                    </div>
                    <div className="fieldItem signupMaintainer logginButton">
                      <button
                        id="registerUser"
                        className="loginButton defaultButton"
                        onClick={this.signUp.bind(this)}
                      >
                        Sign Up
                      </button>
                    </div>

                    <div className="fieldItem signupMaintainer">
                      <p>
                        Already have an account?&nbsp;&nbsp;
                        <NavLink
                          to="#"
                          id="login"
                          onClick={this.toggleLogSign.bind(this, "login")}
                          className="loginLink"
                        >
                          Login
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LoginSignUpModal;
