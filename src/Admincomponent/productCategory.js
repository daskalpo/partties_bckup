import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import swal from "sweetalert2";

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_header: "Add Category",
      name: "",
      status: "1",
      category_image_db: "",
      category_image_show: "",

      error_text_name: "",
      category_id: "",
    };
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };
  name(e) {
    this.setState({ name: e.target.value });
  }
  status(e) {
    this.setState({ status: e.target.value });
  }
  add_category = () => {
    this.clear_category_form();
    document.querySelector("#admin_add_category").click();
    this.setState({ modal_header: "Add Category" });
  };
  delete_category = (category_id) => {
    let forward = confirm("Please confirm Category Delete");
    if (forward == true) {
      let api = Url.admin_category_delete + "/" + category_id;
      Api.admin_category_delete(api, category_id).then((res) => {
        let data = JSON.parse(res);
        if (data.status == "OK" && data.code == 200) {
          this.props.reload_internal_table_onapi("product_category");
        }
      });
    }
  };
  edit_category = (category_id) => {
    let api = Url.admin_fetch_category_list + "/" + category_id;
    Api.fetch_category_details(api).then((res) => {
      this.setState({ loader: false });
      let data = JSON.parse(res);

      if (data.code == "200") {
        this.setState({
          modal_header: "Edit Category",
          category_id: data.data.id,
          name: data.data.name,
          status: data.data.status,
          category_image_show: data.data.image,
        });
      }
    });

    document.querySelector("#admin_add_category").click();
  };
  trigget_input_file = () => {
    document.querySelector("#adminCategoryFile").click();
  };
  onCategoryImageChange(e) {
    this.setState({ category_image_db: e.target.files[0] });
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      this.setState({ category_image_show: reader.result });
    };
  }
  add_edit_category = () => {
    let category_data = {
      category_id: this.state.category_id,
      name: this.state.name,
      category_image_db: this.state.category_image_db,
      status: this.state.status,
    };
    let errorObj = Helper.categoryAddValidation(category_data);
    this.setState({
      error_text_name: errorObj.name,
    });

    if (errorObj.continue) {
      let api = "";
      if (category_data.category_id != "") {
        api = Url.admin_category_edit + "/" + category_data.category_id;
      } else {
        api = Url.admin_category_add;
      }

      Api.admin_category_add(api, category_data).then((res) => {
        let data = JSON.parse(res);

        if (data.status == "OK" && data.code == 200) {
          this.toast(data.message);
          this.clear_category_form();
          document.querySelector("#category_model").click();
          this.props.reload_internal_table_onapi("product_category");
        }
        if (data.code == "400") {
          this.setState({
            error_text_name: data.data.name,
            error_text_feature_image: data.data.image,
          });
        }
      });
    }
  };
  clear_category_form = () => {
    this.setState({
      modal_header: "Add Category",
      name: "",
      status: "1",
      category_image_db: "",
      category_image_show: "",

      error_text_name: "",
      category_id: "",
    });
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
  render() {
    return (
      <React.Fragment>
        <React.Fragment
          key={"---------------ADD_EDIT_CATEGORY_MODAL--------------"}
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
                    <label for="exampleInputEmail1">Category Name</label>
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

                  <div className="form-group">
                    <label for="exampleInputEmail1">Category Image</label>
                  </div>
                  <div
                    className={`delete_btn_custmzecake background_colorcustmzecake custom_margin_top1 slide ${
                      this.state.error_text_feature_image ? "errorval" : ""
                    }`}
                  >
                    <input
                      onChange={this.onCategoryImageChange.bind(this)}
                      id="adminCategoryFile"
                      type="file"
                      className="hidden"
                    />
                    {this.state.category_image_show != "" && (
                      <img
                        width="100"
                        height="100"
                        className="product_upload_image"
                        src={this.state.category_image_show}
                      />
                    )}
                    <Link onClick={this.trigget_input_file.bind(this)} to="#">
                      <div className="delete_btn_custmzecake background_colorcustmzecake custom_margin_top1">
                        <i className="fas fa-upload"></i>Upload
                      </div>
                    </Link>
                  </div>
                  {this.state.error_text_feature_image && (
                    <span className="errorText">
                      {this.state.error_text_feature_image}
                    </span>
                  )}
                </div>
                <div className="modal-footer modal_header_back">
                  <button
                    onClick={this.add_edit_category.bind(this)}
                    type="button"
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="category_model"
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
            id="admin_add_category"
            type="button"
            className="btn btn-default hidden"
            data-toggle="modal"
            data-target="#modal-default"
          >
            Launch Default Modal
          </button>
        </React.Fragment>
        <React.Fragment
          key={"---------------Category_CONTENT-----------------"}
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
                      <h3 className="card-title">Category List</h3>
                      <Link
                        to="#"
                        onClick={this.add_category.bind(this)}
                        className="btn btn-success btn-sm rightyadmin"
                        href="#admin-panel/products"
                      >
                        <i className="fas fa-plus"></i>Add
                      </Link>
                    </div>

                    <div className="card-body">
                      <table
                        id="productCategory"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.admin_product_category.map(
                            (category, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>
                                <td>
                                  <img
                                    src={category.image}
                                    className="rounded-circle cutomerPic"
                                  />{" "}
                                  {category.name}
                                </td>
                                <td className="td_particular">
                                  {category.slug}
                                </td>
                                <td className="td_particular td_particular_addon">
                                  {category.status === 1 && (
                                    <span className="badge badge-success">
                                      Active
                                    </span>
                                  )}
                                  {category.status === 0 && (
                                    <span className="badge badge-warning">
                                      Deactive
                                    </span>
                                  )}
                                </td>
                                <td className="td_particular">
                                  <div className="inner">
                                    <Link
                                      onClick={this.edit_category.bind(
                                        this,
                                        category.id
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
                                      onClick={this.delete_category.bind(
                                        this,
                                        category.id
                                      )}
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

export default ProductCategory;
