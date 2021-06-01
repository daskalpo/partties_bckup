import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Link, NavLink } from "react-router-dom";
import { Api, Url, Helper } from "../config";
import {
  UserProfileWebComponent,
  UserAddressComponent,
  MobileUserProfileViewComponent,
  MobileUserAddressComponent,
} from "../Pagecomponent";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // ==============PROFILE VARIABLES==============
      name: "",
      email: "",
      mobile: "",
      dob: "",
      aniversary: "",
      mobileType: "mobile",
      errorTextName: false,
      errorTextEmail: false,
      errorTextmobile: false,
      errorTextSecurityKey: false,
      errorTextDob: false,
      errorTextAnniversary: false,
      errorTextmobileType: false,
      // ==============ADDRESS VARIABLES================
      address_operation: "Add Address",
      address: "",
      address_type: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      selected_user_adress_db_id: "",
      current_selected_address: "",
      errorTextaddress: false,
      errorTextaddress_type: false,
      errorTextphone: false,
      errorTextcity: false,
      errorTextstate: false,
      errorTextpincode: false,
      state_list: "",
      city_list: "",
      country: "101", //india
      state: "41", //west bengal
      city: "5583", //kolkata

      // ===========CHANGE PASSWORD VARIABLES===============
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      error_text_old_password: false,
      error_text_new_password: false,
      error_text_confirm_new_password: false,
      continue: false,
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

  address(e) {
    this.setState({ address: e.target.value });
  }
  address_type(e) {
    this.setState({ address_type: e.target.value });
  }
  phone(e) {
    if (e.target.value.length < 11) {
      this.setState({ phone: e.target.value });
    }
  }
  state_list(e) {
    this.setState({ state: e.target.value });
    this.get_city_list(e.target.value);
  }
  city(e) {
    this.setState({ city: e.target.value });
  }
  pincode(e) {
    if (e.target.value.length < 7) {
      this.setState({ pincode: e.target.value });
    }
  }
  get_city_list = (state_id) => {
    let url = Url.get_city_list + "/" + state_id;
    Api.fetch_city(url).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status === true) {
        this.setState({ city_list: data.data });
      }
    });
  };

  get_state_list = () => {
    let url = Url.get_state_list + "/" + this.state.country;

    Api.fetch_state(url).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status === true) {
        this.setState({ state_list: data.data });
        this.get_city_list(this.state.state);
      }
    });
  };

  clearLoginSignUpVariables = () => {
    this.setState({
      name: "",
      email: "",
      mobile: "",
      dob: false,
      aniversary: false,
      mobileType: "0",
      errorTextName: false,
      errorTextEmail: false,
      errorTextmobile: false,
      errorTextdob: false,
      errorTextaniversary: false,
      errorTextmobileType: false,
    });
  };

  clear_address_values = () => {
    this.setState({
      address: "",
      address_type: "",
      phone: "",
      pincode: "",
      country: 101,
      state: 41,
      city: 5583,

      errorTextaddress: false,
      errorTextaddress_type: false,
      errorTextphone: false,
      errorTextcity: false,
      errorTextstate: false,
      errorTextpincode: false,
    });
  };
  save_user_address = () => {
    let user_address = {
      address: this.state.address,
      address_type: this.state.address_type,
      phone: this.state.phone,
      city: this.state.city,
      state: this.state.state,
      pincode: this.state.pincode,
    };

    let errorObj = Helper.user_address_Validation(user_address);
    console.log(errorObj);

    this.setState({
      errorTextaddress: errorObj.address,
      errorTextaddress_type: errorObj.address_type,
      errorTextphone: errorObj.phone,
      errorTextcity: errorObj.city,
      errorTextstate: errorObj.state,
      errorTextpincode: errorObj.pincode,
    });

    if (errorObj.continue) {
      let api = "";
      console.log(this.state.address_operation);
      if (this.state.address_operation == "Add Address") {
        api = Url.add_user_address;
      }
      if (this.state.address_operation == "Edit Address") {
        api =
          Url.user_address_edit + "/" + this.state.selected_user_adress_db_id;
      }

      Api.user_add_address(api, user_address).then((res) => {
        let data = JSON.parse(res);
        console.log(data);
        if (data.status == "OK" && data.code == 200) {
          Helper.alert(data.message);
          this.props.apibased_user_profile_details_data_update(
            data.data,
            "address"
          );
          document.querySelector("#user_Adddress_modal_closer").click();
          this.clear_address_values();
        } else {
        }
      });
    }
  };

  componentDidMount = () => {
    document.getElementById("user_profile").click();
    this.setState({
      profile_pic: this.props.user_profile_data.user.profile_picture,
    });
    this.get_state_list();
  };
  selectOption = (option) => {
    Helper.user_profile_section_manager(option);
  };

  __edit_user_single_address = (addr, address_operation) => {
    // -----------USER_ADDRESS_MODAL_BOTH-----------
    this.setState({ address_operation: address_operation });
    if (address_operation == "Edit Address") {
      this.setState({
        selected_user_adress_db_id: addr.id,
        address: addr.address,
        address_type: addr.address_type,
        phone: addr.phone,
        pincode: addr.postal_code,
        state: addr.state_id,
        city: addr.city_id,
      });
    }
    console.log(addr);
  };

  __delete_user_single_address = (address) => {
    this.setState({ current_selected_address: address });
    document.getElementById("userarea_confirmattion_modal_button").click();
  };

  delete_user_address = () => {
    let api = Url.user_address_delete;
    Api.user_address_delete(api, this.state.current_selected_address.id).then(
      (res) => {
        let response = JSON.parse(res);
        let data = response.response;
        console.log(data);
        if (data.status === 200) {
          this.props.apibased_user_profile_details_data_update(
            data.address,
            "address"
          );
        }
      }
    );
  };

  confirm_remove_address = () => {
    this.delete_user_address();
    this.cancel_remove_address();
  };
  cancel_remove_address = () => {
    document.getElementById("user_close_confirm_modal").click();
  };
  __edit_user_profile_details = (user) => {
    console.log(user);
    this.setState({
      name: user.name,
      email: user.email,
      mobile: user.phone,
      mobileType: user.phone_type,
      dob: user.dob,
      aniversary: user.marriage_anniversary,
      errorTextName: false,
      errorTextEmail: false,
      errorTextmobile: false,
      errorTextdob: false,
      errorTextaniversary: false,
      errorTextmobileType: false,
    });
    console.log(user);
  };

  save_user_profile_details = () => {
    let saveUserDetails = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      mobileType: this.state.mobileType === "0" ? "" : this.state.mobileType,
      password: "dummytext",
      confirmPassword: "dummytext",
      dob: this.state.dob ? Helper.convert_YMD(this.state.dob) : " ",
      aniversary: this.state.aniversary
        ? Helper.convert_YMD(this.state.aniversary)
        : "",
      profile_picture: this.state.profile_pic,
    };

    let errorObj = Helper.signUpValidation(saveUserDetails);

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

    if (errorObj.continue) {
      let api = Url.user_profile_update;
      Api.user_profile_update(api, saveUserDetails).then((res) => {
        let data = JSON.parse(res);
        console.log(data);

        if (data.status == "OK" && data.code == "200") {
          document.querySelector(".user_profile_modal_both").click();
          this.clearLoginSignUpVariables();
          Helper.alert(data.message);
          this.props.apibased_user_profile_details_data_update(
            data.data,
            "profile"
          );
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

  clear_user_password = () => {
    this.setState({
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      error_text_old_password: false,
      error_text_new_password: false,
      error_text_confirm_new_password: false,
    });
  };

  current_password(e) {
    this.setState({ current_password: e.target.value });
  }
  new_password(e) {
    this.setState({ new_password: e.target.value });
  }
  confirm_new_password(e) {
    this.setState({ confirm_new_password: e.target.value });
  }

  submit_password_change_request = () => {
    let saveUserPassword = {
      current_password: this.state.current_password,
      new_password: this.state.new_password,
      confirm_new_password: this.state.confirm_new_password,
    };

    let errorObj = Helper.passwordChangeValidation(saveUserPassword);
    console.log(errorObj);
    this.setState({
      error_text_current_password: errorObj.current_password,
      error_text_new_password: errorObj.new_password,
      error_text_confirm_new_password: errorObj.confirm_new_password,
    });
    if (errorObj.continue) {
      let url = Url.user_change_password;
      Api.user_change_password(url, saveUserPassword).then((res) => {
        let data = JSON.parse(res);
        console.log(data);

        if (data.status == "OK") {
          document.querySelector("#user_password_modal").click();
          this.clear_user_password();
          Helper.alert(data.message);
        } else {
          this.setState({
            error_text_current_password: data.data.old_password,
            error_text_new_password: data.data.password,
            error_text_confirm_new_password: data.data.confirm_password,
          });
        }
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <React.Fragment key={"---------------ALL_WEB_VIEW------------"}>
          <section
            id="productListWrapper"
            className="rowTopMargin rowTopMargin_remove profile_page_content"
          >
            <div className="web_content_about_us">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="mycart_details">
                      <ul className="profilepage_list">
                        <li>
                          <button
                            id="user_profile"
                            className="tablinks profile_active active"
                            onClick={this.selectOption.bind(this, "profile")}
                          >
                            <i className="fas fa-user"></i>
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            id="user_password"
                            className="tablinks chng_pswrd_active"
                            onClick={this.selectOption.bind(this, "password")}
                          >
                            <i className="fas fa-lock"></i>Change Password
                          </button>
                        </li>
                        <li>
                          <button
                            id="user_address"
                            className="tablinks addrssbk_active"
                            onClick={this.selectOption.bind(this, "address")}
                          >
                            <i className="fas fa-address-book"></i>Address Book
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <UserProfileWebComponent
                      edit_user_profile_details={this.__edit_user_profile_details.bind(
                        this
                      )}
                      user_profile_data={this.props.user_profile_data}
                    />
                    <React.Fragment
                      key={"----------USER_PASSWORD_SECTION-------"}
                    >
                      <div id="password" className="tabcontent profilepage_sec">
                        <div className="mycart_details">
                          <div className="mycart_header">
                            <div className="col-md-12">
                              <p>Change Password</p>
                            </div>
                          </div>
                          <div className="tabcontent_profile changepassword_profl">
                            <div className="form-group party_enquiry_detls prfl_page_input">
                              <label>Current Password</label>
                              <input
                                type="password"
                                placeholder="Enter current password"
                                className={`${
                                  this.state.error_text_current_password
                                    ? "super_error"
                                    : ""
                                }`}
                                onChange={this.current_password.bind(this)}
                                value={this.state.current_password}
                              />{" "}
                              {this.state.error_text_current_password && (
                                <span className="errorText">
                                  {this.state.error_text_current_password}
                                </span>
                              )}
                            </div>

                            <div className="form-group party_enquiry_detls prfl_page_input">
                              <label>New Password</label>
                              <input
                                type="password"
                                placeholder="Enter new password"
                                className={`${
                                  this.state.error_text_new_password
                                    ? "super_error"
                                    : ""
                                }`}
                                onChange={this.new_password.bind(this)}
                                value={this.state.new_password}
                              />{" "}
                              {this.state.error_text_new_password && (
                                <span className="errorText">
                                  {this.state.error_text_new_password}
                                </span>
                              )}
                            </div>

                            <div className="form-group party_enquiry_detls prfl_page_input">
                              <label>Confirm New Password</label>
                              <input
                                type="password"
                                placeholder="Confirm password"
                                className={`${
                                  this.state.error_text_confirm_new_password
                                    ? "super_error"
                                    : ""
                                }`}
                                onChange={this.confirm_new_password.bind(this)}
                                value={this.state.confirm_new_password}
                              />{" "}
                              {this.state.error_text_confirm_new_password && (
                                <span className="errorText">
                                  {this.state.error_text_confirm_new_password}
                                </span>
                              )}
                            </div>
                            <Link
                              onClick={this.submit_password_change_request.bind(
                                this
                              )}
                              to="#"
                            >
                              <div className="place_ordr_btn send_requst_btn profl_save_btn">
                                Send request
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                    <UserAddressComponent
                      edit_user_single_address={this.__edit_user_single_address.bind(
                        this
                      )}
                      delete_user_single_address={this.__delete_user_single_address.bind(
                        this
                      )}
                      user_profile_data={this.props.user_profile_data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <React.Fragment key={"-------MOBILE_VIEW_SCREENS-------"}>
            <MobileUserProfileViewComponent
              edit_user_profile_details={this.__edit_user_profile_details.bind(
                this
              )}
              user_profile_data={this.props.user_profile_data}
            />
            <MobileUserAddressComponent
              delete_user_single_address={this.__delete_user_single_address.bind(
                this
              )}
              edit_user_single_address={this.__edit_user_single_address.bind(
                this
              )}
              user_profile_data={this.props.user_profile_data}
            />
          </React.Fragment>
        </React.Fragment>

        <React.Fragment key={"-----------ALL_MODALS-----------"}>
          <React.Fragment key={"---------BOTH_CONFIRMATION_MODAL---------"}>
            <div
              className="modal"
              id="userarea_confirmattion_modal"
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content backgroundcolor_wrap alert_wrap">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      id="user_close_confirm_modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body toper">
                    <div className="loginWrap defaultFormWrap alert_modalwrap wisth_per">
                      <div className="loginFormWrap">
                        <p id="text">
                          Are you sure you want to remove the address ?
                        </p>

                        <ul className="btn_alert">
                          <li>
                            <div
                              onClick={this.cancel_remove_address.bind(this)}
                              className="alert_cancelbtn maxw"
                            >
                              <Link to="#">Cancel</Link>
                            </div>
                          </li>

                          <li>
                            <div
                              onClick={this.confirm_remove_address.bind(this)}
                              className="alert_okbtn alert_ok"
                            >
                              <Link to="#">Remove</Link>
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
                  <Link
                    className="hidden"
                    to="#"
                    data-toggle="modal"
                    id="userarea_confirmattion_modal_button"
                    data-target="#userarea_confirmattion_modal"
                  >
                    Open to click
                  </Link>
                </div>
              </div>
            </section>
          </React.Fragment>
          <React.Fragment key={"-----------USER_ADDRESS_MODAL_BOTH-----------"}>
            <div className="modal fade" id="myModal_addressprfl" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content loginSignupContentWrap backgroundcolor_wrap address_paymntmodal">
                  <div className="modal-header modal_header_web">
                    <button
                      id="user_Adddress_modal_closer"
                      onClick={this.clear_address_values.bind(this)}
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="modal-title">
                      {this.state.address_operation}
                    </h5>
                  </div>

                  <div className="modal-header backgroundcolor_wrapmoble">
                    <button
                      id="user_Adddress_modal_closer"
                      onClick={this.clear_address_values.bind(this)}
                      type="button"
                      className="close close_moble"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="modal-title">
                      {this.state.address_operation}
                    </h5>
                  </div>
                  <div className="modal-body">
                    <div className="loginWrap defaultFormWrap defaultFormWrap_modify address_paymnt ">
                      <div className="loginFormWrap user_mobile_address_modal">
                        <div className="col-md-12">
                          <div className="fieldItem modify_message_sectn boxshadowfield user_address_textarea_width">
                            <label>Address</label>
                            <textarea
                              rows="4"
                              cols=""
                              placeholder="Enter address"
                              className={`formField addrssfield ${
                                this.state.errorTextaddress ? "errorval" : ""
                              }`}
                              onChange={this.address.bind(this)}
                              value={this.state.address}
                            />{" "}
                            {this.state.errorTextaddress && (
                              <span className="errorText">
                                {this.state.errorTextaddress}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="fieldItem signupMaintainer">
                            <label>Address type</label>
                            <input
                              type="text"
                              placeholder="Enter your address type"
                              className={`formField addrssfield ${
                                this.state.errorTextaddress_type
                                  ? "errorval"
                                  : ""
                              }`}
                              onChange={this.address_type.bind(this)}
                              value={this.state.address_type}
                            />{" "}
                            {this.state.errorTextaddress_type && (
                              <span className="errorText">
                                {this.state.errorTextaddress_type}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="fieldItem signupMaintainer">
                            <label>Phone</label>
                            <input
                              type="number"
                              placeholder="Enter your phone number"
                              className={`formField addrssfield ${
                                this.state.errorTextphone ? "errorval" : ""
                              }`}
                              onChange={this.phone.bind(this)}
                              value={this.state.phone}
                            />{" "}
                            {this.state.errorTextphone && (
                              <span className="errorText">
                                {this.state.errorTextphone}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="fieldItem signupMaintainer ">
                            <label>State</label>
                            <select
                              className="select_optnpaymnt user_profile_Address_select"
                              value={this.state.state}
                              onChange={this.state_list.bind(this)}
                            >
                              {this.state.state_list != "" &&
                                this.state.state_list.map((state, index) => (
                                  <option key={index} value={state.id}>
                                    {state.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="fieldItem signupMaintainer ">
                            <label>City</label>
                            <select
                              className="select_optnpaymnt user_profile_Address_select"
                              value={this.state.city}
                              onChange={this.city.bind(this)}
                            >
                              {this.state.city_list != "" &&
                                this.state.city_list.map((city, index) => (
                                  <option key={index} value={city.id}>
                                    {city.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="fieldItem signupMaintainer">
                            <label>Pincode</label>
                            <input
                              type="number"
                              placeholder="Enter Pincode"
                              className={`formField addrssfield ${
                                this.state.errorTextpincode ? "errorval" : ""
                              }`}
                              onChange={this.pincode.bind(this)}
                              value={this.state.pincode}
                            />{" "}
                            {this.state.errorTextpincode && (
                              <span className="errorText">
                                {this.state.errorTextpincode}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="save_btn_modify address_paymntbtn">
                            <Link
                              to="#"
                              onClick={this.save_user_address.bind(this)}
                            >
                              Save address
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>

          <React.Fragment
            key={
              "-------------------MOBILE_USER_CHANGE_PASSWORD_MODEL--------------------"
            }
          >
            <div
              className="modal fade"
              id="myModal_changepasswrd"
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content loginSignupContentWrap backgroundcolor_wrap">
                  <div className="modal-header modal_header_web">
                    <button
                      id="user_password_modal"
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 clclassass="modal-title">Modify</h5>
                  </div>

                  <div className="modal-header backgroundcolor_wrapmoble">
                    <button
                      type="button"
                      className="close close_moble"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="modal-title">Change Password</h5>
                  </div>
                  <div className="modal-body">
                    <div className="loginWrap defaultFormWrap defaultFormWrap_modify">
                      <div className="loginFormWrap">
                        <div className="col-md-12">
                          <div className="form-group party_enquiry_detls prfl_page_input">
                            <label>Current Password</label>
                            <input
                              type="password"
                              placeholder="Enter current password"
                              className={`${
                                this.state.error_text_current_password
                                  ? "errorval"
                                  : ""
                              }`}
                              onChange={this.current_password.bind(this)}
                              value={this.state.current_password}
                            />{" "}
                            {this.state.error_text_current_password && (
                              <span className="errorText">
                                {this.state.error_text_current_password}
                              </span>
                            )}
                          </div>
                          <div className="form-group party_enquiry_detls prfl_page_input">
                            <label>New Password</label>
                            <input
                              type="password"
                              placeholder="Enter new password"
                              className={`${
                                this.state.error_text_new_password
                                  ? "errorval"
                                  : ""
                              }`}
                              onChange={this.new_password.bind(this)}
                              value={this.state.new_password}
                            />{" "}
                            {this.state.error_text_new_password && (
                              <span className="errorText">
                                {this.state.error_text_new_password}
                              </span>
                            )}
                          </div>
                          <div className="form-group party_enquiry_detls prfl_page_input">
                            <label>Confirm New Password</label>
                            <input
                              type="password"
                              placeholder="Confirm password"
                              className={`${
                                this.state.error_text_confirm_new_password
                                  ? "errorval"
                                  : ""
                              }`}
                              onChange={this.confirm_new_password.bind(this)}
                              value={this.state.confirm_new_password}
                            />{" "}
                            {this.state.error_text_confirm_new_password && (
                              <span className="errorText">
                                {this.state.error_text_confirm_new_password}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <Link
                            onClick={this.submit_password_change_request.bind(
                              this
                            )}
                            to="#"
                          >
                            <div className="place_ordr_btn send_requst_btn profl_save_btn">
                              Send request
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>

          <React.Fragment
            key={
              "-------------------USER_PROFILE_EDIT_MODEL_BOTH--------------------"
            }
          >
            <div className="modal fade" id="userProfileEditModal" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content loginSignupContentWrap backgroundcolor_wrap address_paymntmodal">
                  <div className="modal-header modal_header_web">
                    <button
                      type="button"
                      className="close user_profile_modal_both"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="modal-title">Edit Details</h5>
                  </div>

                  <div className="modal-header backgroundcolor_wrapmoble">
                    <button
                      type="button"
                      className="close close_moble user_profile_modal_both"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="modal-title">Edit Details</h5>
                  </div>
                  <div className="modal-body">
                    <div className="loginWrap defaultFormWrap ">
                      <div className="loginFormWrap user_mobile_address_modal">
                        <div className="fieldItem signupMaintainer user_profile_modal_width">
                          <span className="star">*</span>
                          <label>Name</label>
                          <input
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
                        <div className="fieldItem signupMaintainer user_profile_modal_width">
                          <span className="star">*</span>
                          <label>Email</label>
                          <input
                            readOnly
                            type="text"
                            placeholder="Enter Email"
                            className={`disabled_back formField ${
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
                        <div className="fieldItem signupMaintainer user_profile_modal_width">
                          <span className="star">*</span>
                          <label>Mobile</label>
                          <input
                            readOnly
                            type="number"
                            placeholder="Enter Mobile"
                            className={`disabled_back formField ${
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

                        <div className="fieldItem signupMaintainer user_profile_modal_width">
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
                          <div className="dateickerWidth">
                            <input
                              className={`formField ${
                                this.state.errorTextdob ? "errorval" : ""
                              }`}
                              value={this.state.dob}
                              onChange={this.dob.bind(this)}
                              type="date"
                            />
                          </div>
                          {this.state.errorTextdob && (
                            <span className="errorText">
                              {this.state.errorTextdob}
                            </span>
                          )}
                        </div>
                        <div className="fieldItem signupMaintainer">
                          <label>Enter Aniversary Date</label>
                          <input
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

                        <div
                          onClick={this.save_user_profile_details.bind(this)}
                          className="fieldItem signupMaintainer logginButton user_profile_modal_width"
                        >
                          <button className="loginButton defaultButton">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default ProfileComponent;
