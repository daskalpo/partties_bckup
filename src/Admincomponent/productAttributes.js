import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { CustomersTable } from "../Admincomponent";
import swal from "sweetalert2";

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_header: "Add Attribute",
      attribute_id: "",
      attribute_name: "",
      attribute_status: 1,
      error_text_attribute_name: false,
      error_text_attribute_status: false,
      continue: false,
    };
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };
  attribute_name(e) {
    this.setState({ attribute_name: e.target.value });
  }
  attribute_status(e) {
    this.setState({ attribute_status: e.target.value });
  }

  clear_attribute_modal = () => {
    this.setState({
      modal_header: "Add Attribute",
      attribute_id: "",
      attribute_name: "",
      attribute_status: 1,
      error_text_attribute_name: false,
      error_text_attribute_status: false,
      continue: false,
    });
  };

  add_product_attribute = () => {
    document.querySelector("#admin_add_product_attribute").click();
    this.setState({ modal_header: "Add Attribute" });
    this.clear_attribute_modal();
  };
  edit_product_attribute = (attribute) => {
    this.clear_attribute_modal();
    this.setState({
      attribute_id: attribute.id,
      attribute_name: attribute.name,
      attribute_status: attribute.status,
      modal_header: "Edit Attribute",
    });
    document.querySelector("#admin_add_product_attribute").click();
  };
  add_edit_product_attribute = () => {
    console.log(this.state.modal_header);
    let attribute = {
      attribute_id: this.state.attribute_id,
      attribute_name: this.state.attribute_name,
      attribute_status: this.state.attribute_status,
    };
    let errorObj = Helper.attribute_validation(attribute);
    this.setState({ error_text_attribute_name: errorObj.attribute_name });
    if (errorObj.continue) {
      let api = Url.admin_product_attribute_add;
      if (this.state.modal_header == "Edit Attribute") {
        api = Url.admin_product_attribute_edit + "/" + attribute.attribute_id;
      }
      Api.admin_product_variation_add_edit(api, attribute).then((res) => {
        let data = JSON.parse(res);
        console.log(data);
        if (data.status == "OK" && data.code == 200) {
          document.querySelector("#product_attribute_close").click();
          this.toast(data.message);
          console.log(this.props);
          this.props.reload_internal_table_onapi("product_attributes");
        }
        if (data.code == "400") {
          this.setState({ error_text_attribute_name: data.data.name });
        }
      });
    }
  };

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
  delete_product_attribute = (attribute) => {
    let forward = confirm("Please confirm attribute delete");
    if (forward == true) {
      let api = Url.admin_product_attribute_delete + "/" + attribute.id;
      Api.admin_product_variation_delete(api, attribute).then((res) => {
        let data = JSON.parse(res);
        if (data.status == "OK" && data.code == 200) {
          this.toast(data.message);
          this.props.reload_internal_table_onapi("product_attributes");
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <React.Fragment
          key={"---------------ADD_EDIT_ATTRIBUTE_MODAL--------------"}
        >
          <div className="modal fade" id="modal-default">
            <div className="modal-dialog">
              <div className="modal-content">
                <div id="section" className="modal-header modal_header_back">
                  <div className="col-4"></div>
                  <div className="col-7">
                    <h5 className="modal-title modal_hea">
                      {this.state.modal_header}
                    </h5>
                  </div>
                  <div className="col-1">
                    <button
                      id="product_attribute_close"
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      type="text"
                      id="exampleInputEmail1"
                      placeholder="Enter Attribute "
                      className={`form-control pro_fon ${
                        this.state.error_text_attribute_name ? "errorval" : ""
                      }`}
                      onChange={this.attribute_name.bind(this)}
                      value={this.state.attribute_name}
                    />{" "}
                    {this.state.error_text_attribute_name && (
                      <span className="errorText">
                        {this.state.error_text_attribute_name}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Status</label>

                    <select
                      value={this.state.attribute_status}
                      onChange={this.attribute_status.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_attribute_status ? "errorval" : ""
                      }`}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {this.state.error_text_attribute_status && (
                      <span className="errorText">
                        {this.state.error_text_attribute_status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="modal-footer modal_header_back">
                  <button
                    onClick={this.add_edit_product_attribute.bind(this)}
                    type="button"
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            id="admin_add_product_attribute"
            type="button"
            className="btn btn-default hidden"
            data-toggle="modal"
            data-target="#modal-default"
          >
            Launch Default Modal
          </button>
        </React.Fragment>
        <React.Fragment
          key={"---------------ATTRIBUTE_CONTENT-----------------"}
        >
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2"></div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Attribute List</h3>
                      <a
                        onClick={this.add_product_attribute.bind(this)}
                        className="btn btn-success btn-sm rightyadmin"
                        href="#admin-panel/products"
                      >
                        <i className="fas fa-plus"></i>Add
                      </a>
                    </div>

                    <div className="card-body">
                      <table
                        id="productAttribute"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Created on</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.admin_product_attribute.map(
                            (attribute, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>
                                <td className="td_particular">
                                  {attribute.name}
                                </td>
                                <td className="td_particular">
                                  {attribute.created_at}
                                </td>
                                <td className="td_particular td_particular_addon">
                                  {attribute.status === 1 && (
                                    <span className="badge badge-success">
                                      Active
                                    </span>
                                  )}
                                  {attribute.status === 0 && (
                                    <span className="badge badge-warning">
                                      Deactive
                                    </span>
                                  )}
                                </td>
                                <td className="td_particular">
                                  <div
                                    onClick={this.edit_product_attribute.bind(
                                      this,
                                      attribute
                                    )}
                                    className="inner"
                                  >
                                    <Link
                                      className="btn btn-info btn-sm"
                                      to="#"
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                      Edit
                                    </Link>
                                  </div>
                                  <div
                                    onClick={this.delete_product_attribute.bind(
                                      this,
                                      attribute
                                    )}
                                    className="inner"
                                  >
                                    <Link
                                      className="btn btn-danger btn-sm"
                                      to="#"
                                    >
                                      <i className="fas fa-trash"></i>
                                      Delete
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default ProductAttributes;
