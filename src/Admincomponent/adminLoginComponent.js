import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";

class AdminLoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // admin_login: '9830012345',
      // admin_password: 'arpan.b',
      admin_login: "",
      admin_password: "",
      error_text_admin_login: false,
      error_text_admin_password: false,
    };
  }
  toast = (message) => {
    const Toast = swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", swal.stopTimer);
        toast.addEventListener("mouseleave", swal.resumeTimer);
      },
    });
    Toast.fire({ type: "success", title: message });
  };
  admin_login(e) {
    this.setState({ admin_login: e.target.value });
  }
  admin_password(e) {
    this.setState({ admin_password: e.target.value });
  }

  remember_login = () => {
    window.localStorage.setItem("ADMIN_REMEMBER", 1);
  };
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  admin_login_check = () => {
    let admin_login_data = {
      admin_login: this.state.admin_login,
      admin_password: this.state.admin_password,
    };

    let errorObj = Helper.admin_login_validation(admin_login_data);
    this.setState({
      error_text_admin_login: errorObj.admin_login,
      error_text_admin_password: errorObj.admin_password,
    });

    if (errorObj.continue) {
      let api = Url.admin_login;
      Api.admin_login_api(api, admin_login_data).then((res) => {
        let data = JSON.parse(res);
        console.log(data);
        if (data.code == "200") {
          this.toast("Logged in successfully");
          window.localStorage.setItem("ADMIN_LOGGED_USER", data.data.name);
          window.localStorage.setItem(
            "ADMIN_USER_TOKKEN",
            JSON.stringify(data.access_token)
          );
          document.querySelector("#for_success").click();
          this.props.history.push("/admin-panel/dashboard");
        } else {
          this.toast("Invalid Login Credentials");
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="login-logo">
              <b>Admin</b>
            </div>
            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg">Sign in to start your session</p>

                <div className="input-group mb-3">
                  <input
                    type="email"
                    placeholder="Email or Phone"
                    className={`form-control ${
                      this.state.error_text_admin_login ? "errorval" : ""
                    }`}
                    onChange={this.admin_login.bind(this)}
                    value={this.state.admin_login}
                  />{" "}
                  {/* {this.state.error_text_admin_login && <span className="errorText">
                                        {this.state.error_text_admin_login}
                                    </span>} */}
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`form-control ${
                      this.state.error_text_admin_password ? "errorval" : ""
                    }`}
                    onChange={this.admin_password.bind(this)}
                    value={this.state.admin_password}
                  />{" "}
                  {/* {this.state.error_text_admin_password && <span className="errorText">
                                        {this.state.error_text_admin_password}
                                    </span>} */}
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        onClick={this.remember_login.bind(this)}
                        type="checkbox"
                        id="remember"
                      />
                      <label for="remember">Remember Me</label>
                    </div>
                  </div>
                  <div
                    onClick={this.admin_login_check.bind(this)}
                    className="col-4"
                  >
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
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

export default AdminLoginComponent;
