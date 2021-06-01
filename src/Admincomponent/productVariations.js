import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import { Link, NavLink } from "react-router-dom";
import swal from "sweetalert2";

class ProductVariations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_header: "Add Variation",
      product_id: "0",
      name: "",
      weight: "",
      price: "",
      unit: "0",
      status: "1",
      error_text_name: "",
      error_text_weight: "",
      error_text_price: "",
      error_text_unit: "",
      error_text_product_id: "",

      admin_product_list: [],
      variation_edit_id: "",
    };
  }
  name(e) {
    this.setState({ name: e.target.value });
  }
  weight(e) {
    this.setState({ weight: e.target.value });
  }
  price(e) {
    this.setState({ price: e.target.value });
  }
  unit(e) {
    this.setState({ unit: e.target.value });
  }
  status(e) {
    this.setState({ status: e.target.value });
  }
  product_id(e) {
    this.setState({ product_id: e.target.value });
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
    this.fetch_product_list();
  };
  fetch_product_list = () => {
    this.setState({ loader: true });
    let api = Url.admin_product_lists_list;
    Api.fetch_product_lists_list(api).then((res) => {
      this.setState({ loader: false });
      let data = JSON.parse(res);
      if (data.code == "200") {
        this.setState({ admin_product_list: data.data });
      }
    });
  };
  add_variation = () => {
    this.clear_variation_form();
    document.querySelector("#admin_add_variation").click();
    this.setState({ modal_header: "Add Variation" });
  };
  edit_variation = (variation) => {
    let api =
      Url.admin_product_variation_fetch +
      "/" +
      variation.product_id +
      "/" +
      variation.id;
    Api.fetch_variation_details(api).then((res) => {
      this.setState({ loader: false });
      let data = JSON.parse(res);
      console.log(data);
      if (data.code == "200") {
        this.setState({
          modal_header: "Edit Variation",
          variation_edit_id: data.data.id,
          product_id: data.data.product_id,
          name: data.data.name,
          weight: data.data.weight,
          price: data.data.price,
          unit: data.data.unit,
          status: data.data.status,
        });
      }
    });

    document.querySelector("#admin_add_variation").click();
    this.setState({ modal_header: "Edit Vatiation" });
  };
  delete_variation = (variation) => {
    let forward = confirm("Please confirm Variation Delete");
    if (forward == true) {
      let api =
        Url.admin_product_variation_delete +
        "/" +
        variation.product_id +
        "/" +
        variation.id;
      Api.admin_variation_delete(api).then((res) => {
        let data = JSON.parse(res);
        if (data.status == "OK" && data.code == 200) {
          this.toast(data.message);
          this.props.reload_internal_table_onapi("product_variations");
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
  clear_variation_form = () => {
    this.setState({
      modal_header: "Add Variation",
      product_id: "0",
      name: "",
      weight: "",
      price: "",
      unit: "0",
      status: "1",
      error_text_name: "",
      error_text_weight: "",
      error_text_price: "",
      error_text_unit: "",
      error_text_product_id: "",
      variation_edit_id: "",
    });
  };
  add_edit_variation = () => {
    let variation_data = {
      product_id: this.state.product_id,
      name: this.state.name,
      weight: this.state.weight,
      unit: this.state.unit,
      price: this.state.price,
      status: this.state.status,
    };
    let errorObj = Helper.VariationAddValidation(variation_data);

    this.setState({
      error_text_name: errorObj.name,
      error_text_weight: errorObj.weight,
      error_text_unit: errorObj.unit,
      error_text_price: errorObj.price,
      error_text_product_id: errorObj.product_id,
    });

    if (errorObj.continue) {
      let api = "";
      console.log(this.state.variation_edit_id);
      if (this.state.variation_edit_id != "") {
        api =
          Url.admin_product_variation_edit +
          "/" +
          variation_data.product_id +
          "/" +
          this.state.variation_edit_id;
      } else {
        api = Url.admin_product_varitions_add;
      }

      Api.admin_variation_add_edit(api, variation_data).then((res) => {
        let data = JSON.parse(res);
        console.log(data);

        if (data.status == "OK" && data.code == 200) {
          this.toast(data.message);
          this.clear_variation_form();
          document.querySelector("#variation_model").click();
          this.props.reload_internal_table_onapi("product_variations");
        }
        if (data.code == "400") {
          this.setState({
            error_text_name: data.data.name,
            error_text_weight: data.data.weight,
            error_text_unit: data.data.unit,
            error_text_price: data.data.price,
          });
        }
      });
    }
  };
  render() {
    var product_list = this.state.admin_product_list.map(function (product) {
      return <option value={product.id}>{product.name}</option>;
    });

    return (
      <React.Fragment>
        <React.Fragment
          key={"---------------ADD_EDIT_VARIATION_MODAL--------------"}
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
                    <label for="exampleInputEmail1">Variation Name</label>
                    <input
                      type="text"
                      placeholder="Enter Name "
                      className={`form-control pro_fon ${
                        this.state.error_text_name ? "errorval" : ""
                      }`}
                      onChange={this.name.bind(this)}
                      value={this.state.name}
                    />{" "}
                    {this.state.error_text_name && (
                      <span className="errorText">
                        {this.state.error_text_name}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Product </label>

                    <select
                      value={this.state.product_id}
                      onChange={this.product_id.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_product_id ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select Product</option>
                      {product_list}
                    </select>
                    {this.state.error_text_product_id && (
                      <span className="errorText">
                        {this.state.error_text_product_id}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Weight</label>
                    <input
                      type="number"
                      placeholder="Enter Weight"
                      className={`form-control pro_fon ${
                        this.state.error_text_weight ? "errorval" : ""
                      }`}
                      onChange={this.weight.bind(this)}
                      value={this.state.weight}
                    />{" "}
                    {this.state.error_text_weight && (
                      <span className="errorText">
                        {this.state.error_text_weight}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Unit </label>
                    <select
                      value={this.state.unit}
                      onChange={this.unit.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_unit ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select Unit</option>
                      <option value="lb">lb</option>
                      <option value="gm">gm</option>
                      <option value="piece">piece</option>
                    </select>
                    {this.state.error_text_unit && (
                      <span className="errorText">
                        {this.state.error_text_unit}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Price</label>
                    <input
                      type="number"
                      placeholder="Enter Product Price "
                      className={`form-control pro_fon ${
                        this.state.error_text_price ? "errorval" : ""
                      }`}
                      onChange={this.price.bind(this)}
                      value={this.state.price}
                    />{" "}
                    {this.state.error_text_price && (
                      <span className="errorText">
                        {this.state.error_text_price}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Status </label>
                    <select
                      value={this.state.status}
                      onChange={this.status.bind(this)}
                      className="form-control pro_fon ${this.state.error_text_type_id"
                    >
                      <option value="1">Active</option>
                      <option value="0">Deactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer modal_header_back">
                  <button
                    onClick={this.add_edit_variation.bind(this)}
                    type="button"
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="variation_model"
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
            id="admin_add_variation"
            type="button"
            className="btn btn-default hidden"
            data-toggle="modal"
            data-target="#modal-default"
          >
            Launch Default Modal
          </button>
        </React.Fragment>
        <React.Fragment
          key={"---------------VARIATION_CONTENT-----------------"}
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
                      <h3 className="card-title">Variation List</h3>
                      <Link
                        to="#"
                        onClick={this.add_variation.bind(this)}
                        className="btn btn-success btn-sm rightyadmin"
                        href="#admin-panel/products"
                      >
                        <i className="fas fa-plus"></i>Add
                      </Link>
                    </div>

                    <div className="card-body">
                      <table
                        id="productVariation"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Price (Rs)</th>
                            <th>Rating</th>

                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.admin_product_variations.map(
                            (variation, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>
                                <td className="td_particular">
                                  {variation.name}
                                </td>
                                <td className="td_particular">
                                  {variation.slug}
                                </td>
                                <td className="td_particular">
                                  {variation.price}
                                </td>
                                <td className="td_particular">
                                  {variation.rating}
                                </td>
                                <td className="td_particular ">
                                  <div className="hu buttonwidth">
                                    <div className="inner">
                                      <Link
                                        onClick={this.edit_variation.bind(
                                          this,
                                          variation
                                        )}
                                        className="btn btn-info btn-sm"
                                        to="#"
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                        Edit
                                      </Link>
                                    </div>
                                    <div className="inner">
                                      <Link
                                        onClick={this.delete_variation.bind(
                                          this,
                                          variation
                                        )}
                                        className="btn btn-danger btn-sm"
                                        to="#"
                                      >
                                        <i className="fas fa-trash"></i>
                                        Delete
                                      </Link>
                                    </div>
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

export default ProductVariations;
