import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper } from "../config";

class UserProfileWebComponent extends Component {
  edit_user_profile_details = (user) => {
    this.props.edit_user_profile_details(user);
  };

  render() {
    console.log(this.props.user_profile_data);
    return (
      <React.Fragment>
        <div id="profile" className="tabcontent profilepage_sec show">
          <div className="mycart_details">
            <div className="mycart_header header_prflpage">
              <div className="col-md-12">
                <p>My Profile</p>

                <Link
                  onClick={this.edit_user_profile_details.bind(
                    this,
                    this.props.user_profile_data.user
                  )}
                  to="#"
                  data-toggle="modal"
                  data-target="#userProfileEditModal"
                >
                  <i className="fas fa-edit headricon_edit"></i>
                </Link>
              </div>
            </div>
            <div className="tabcontent_profile">
              <h3>
                <i className="fas fa-user profle_secicon"></i>Personal
                Information
              </h3>
              <ul className="profl_sec_content prfl_2ndrw">
                <li>
                  <span className="labelsec_prfl">NAME</span>
                  <br></br>
                  <p className="txt_prflsc">
                    {this.props.user_profile_data.user.name}
                  </p>
                </li>
                <li>
                  <span className="labelsec_prfl">EMAIL ID</span>
                  <br></br>
                  <p className="txt_prflsc">
                    {this.props.user_profile_data.user.email}
                  </p>
                </li>
              </ul>

              <ul className="profl_sec_content prfl_2ndrw">
                <li>
                  <span className="labelsec_prfl phone_profl">PHONE</span>
                  <br></br>
                  <p className="txt_prflsc">
                    {this.props.user_profile_data.user.phone}
                  </p>
                </li>

                <li>
                  <span className="labelsec_prfl phone_profl">PHONE TYPE</span>
                  <br></br>
                  <p className="txt_prflsc">
                    {this.props.user_profile_data.user.phone_type}
                  </p>
                </li>
              </ul>

              <ul className="profl_sec_content prfl_3rdrw">
                <li className="dob_profl">
                  <span className="labelsec_prfl">D.O.B</span>
                  <br></br>
                  <p className="txt_prflsc">
                    {Helper.get_user_profile_dateformats(
                      this.props.user_profile_data.user.dob
                    )}
                  </p>
                </li>
                <li className="annivrsry_pr">
                  <span className="labelsec_prfl">ANNIVERSARY DATE</span>
                  <br></br>
                  <p className="txt_prflsc">
                    {" "}
                    <text className="text_size">.</text>
                    {Helper.get_user_profile_dateformats(
                      this.props.user_profile_data.user.marriage_anniversary
                    )}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfileWebComponent;
