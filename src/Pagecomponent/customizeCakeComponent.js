import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Global, Helper, Url, Api } from "../config";

class CustomizeCakeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      custom_image: "",
      custom_image_db: "",
      customised_description: "",
      errorText_customised_description: "",
      custom: false,
    };
  }

  onFileChange = (event) => {
    let file = event.target.files[0];
    this.setState({ custom_image_db: file, custom: true });
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.props.update_user_custom_image(reader.result);
    };
  };

  customised_description(e) {
    this.setState({ customised_description: e.target.value });
  }
  trigget_input_file = () => {
    document.querySelector("#myFile").click();
  };

  clear_values = () => {
    this.setState({
      errorText_customised_description: false,
      customised_description: "",
      custom_image_db:'',
      custom:false
    });
  };
  remove_input_file = () => {
    this.props.update_user_custom_image(this.props.base_image);
    this.setState({ custom: false, custom_image_db: "" });
  };
  submit_customised_cake = () => {
    let customisedCake = {
      name: "Custom",
      cake_image: this.state.custom == false ? this.props.base_image : "",
      custom_image: this.state.custom == true ? this.state.custom_image_db : "",
      description: this.state.customised_description,
      addintional_info: "Additional Info",
      custom: this.state.custom,
    };

    let errorObj = Helper.customisedCakeValidation(customisedCake);
    this.setState({ errorText_customised_description: errorObj.description });
    if( this.props.base_image == '' && this.state.custom_image_db == ''){
      Helper.alert("Please Upload your Custom Cake Image");
      return false;
    }

    if (errorObj.continue) {
      let api = Url.custom_cake;
      Api.custom_cake(api, customisedCake).then((res) => {
        let data = JSON.parse(res);
        if (data.code === "200") {
          Helper.alert(data.message);
          this.props.update_user_custom_image(this.props.base_image);
          this.clear_values();
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <section id="productListWrapper" className="rowTopMargin">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mycart_details">
                  <div className="mycart_header">
                    <div className="col-md-12">
                      <p>Custom Cake</p>
                    </div>
                  </div>
                  <div className="cart_details_padding partyenqury_content upload_detls_custmzecake">
                    <p className="subhead_customzecake">
                      Order your custom cake in just 3 steps!
                    </p>
                    <form action="/action_page.php">
                      <label>Upload the picture of the cake</label>
                      <div className="upload_files">
                        <input
                          className="hidden"
                          onChange={this.onFileChange.bind(this)}
                          type="file"
                          id="myFile"
                          name="filename"
                        />
                        <div className="icon_upload">
                          <img
                            className="custom_max_width"
                            src={this.props.custom_image}
                          />
                        </div>
                      </div>
                    </form>
                    <ul className="btn_custmzecake">
                      <li>
                        <Link
                          onClick={this.trigget_input_file.bind(this)}
                          to="#"
                        >
                          <div className="delete_btn_custmzecake background_colorcustmzecake custom_margin_top1">
                            <i className="fas fa-upload"></i>Upload
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={this.remove_input_file.bind(this)}
                          to="#"
                        >
                          <div className="delete_btn_custmzecake custom_margin_top">
                            <i className="fas fa-trash"></i>Remove
                          </div>
                        </Link>
                      </li>
                    </ul>
                    <div className="form-group upload_detls_custmzecake customze_cake customised_display_block">
                      <label>Add description</label>
                      <textarea
                        cols="50"
                        rows="6"
                        placeholder="Add your description here...."
                        className={`customised_width formField addrssfield ${
                          this.state.errorText_customised_description
                            ? "errorval"
                            : ""
                        }`}
                        onChange={this.customised_description.bind(this)}
                        value={this.state.customised_description}
                      />{" "}
                      {this.state.errorText_customised_description && (
                        <span className="errorText customised_display_block customised_margin">
                          {this.state.errorText_customised_description}
                        </span>
                      )}
                    </div>
                    <p className="footr_cuscake">
                      One of our representative will get back to you with
                      additional<br></br>information.
                    </p>
                    <div className="send_requst margin_custmzecake">
                      <Link
                        onClick={this.submit_customised_cake.bind(this)}
                        to="#"
                      >
                        <div className="place_ordr_btn send_requst_btn">
                          Submit
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default CustomizeCakeComponent;
