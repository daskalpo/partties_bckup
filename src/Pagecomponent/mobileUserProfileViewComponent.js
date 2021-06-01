import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper } from "../config";

class MobileUserProfileViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_pic: "",
    };
  }
  componentDidMount = () => {
    this.setState({
      profile_pic: this.props.user_profile_data.user.profile_picture,
    });
    Helper.loadScript();
  };
  edit_user_profile_details = (user) => {
    this.props.edit_user_profile_details(user);
  };

  render() {
    return (
      <React.Fragment>
        <div className="mobile_content_about_us">
          <div className="mobile_profile_details">
            <img src={require("../assets/img/bg.png")} className="bg_picmob" />
            <div className="container">
              <div className="row">
                <div className="profile_content_txt profile_margin_top_imp_text">
                  <Link
                    to="#"
                    onClick={this.edit_user_profile_details.bind(
                      this,
                      this.props.user_profile_data.user
                    )}
                    data-toggle="modal"
                    data-target="#userProfileEditModal"
                  >
                    <i className="fas fa-pencil-alt edit_profl"></i>
                  </Link>
                  <p>{this.props.user_profile_data.user.name}</p>
                </div>

                <div className="col-md-12">
                  <div className="user_details_wrap">
                    <div className="user_details">
                      <i className="far fa-user"></i>
                      <p>NAME</p>
                      <span className="paddingleft_txtp">
                        {this.props.user_profile_data.user.name}
                      </span>
                    </div>

                    <div className="user_details">
                      <i className="far fa-envelope"></i>
                      <p>EMAIL</p>
                      <span className="paddingleft_txtp">
                        {this.props.user_profile_data.user.email}
                      </span>
                    </div>

                    <div className="user_details">
                      <i className="far fa-user"></i>
                      <p>D.O.B</p>
                      <span className="paddingleft_txtp">
                        {Helper.get_user_profile_dateformats(
                          this.props.user_profile_data.user.dob
                        )}
                      </span>
                    </div>

                    <div className="user_details">
                      <img src={require("../assets/img/phone.png")} />

                      <p>PHONE</p>
                      <span className="paddingleft_txtp">
                        {this.props.user_profile_data.user.phone}
                      </span>
                    </div>
                  </div>

                  <div className="addrssbk_profl">
                    <Link to="#" className="addrsbk_btn">
                      <i className="far fa-address-book"></i>
                      Address Book
                    </Link>
                  </div>

                  <div className="addrssbk_profl chnge_psswrdmob">
                    <Link
                      to="#"
                      className="chngepasswrd_prflmobl"
                      data-toggle="modal"
                      data-target="#myModal_changepasswrd"
                    >
                      Change Password
                    </Link>
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

export default MobileUserProfileViewComponent;
