import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import swal from "sweetalert2";
import { CustomersTable } from "../Admincomponent";
import { each } from "jquery";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_header: "Add Product",
      product_name: "",
      category_id: "0",
      vendor_id: "0",
      tax_id: "0",
      description: "",
      additional_description: "",
      type_id: "0",
      delivery_time: "",
      weight: "",
      price: "",
      unit: "0",
      status: "1",
      attribute_id: [],
      attribute_id_val: [],
      product_feature_image: "",
      product_feature_image_db: "",
      product_slider_image_db: [],
      product_slider_image_show: [],
      three_field: true,
      counter: 0,

      error_text_product_name: "",
      error_text_category_id: "",
      error_text_vendor_id: "",
      error_text_tax_id: "",
      error_text_description: "",
      error_text_additional_description: "",
      error_text_type_id: "",
      error_text_delivery_time: "",
      error_text_weight: "",
      error_text_price: "",
      error_text_unit: "",
      error_text_feature_image: "",

      vendor_list: [],
      category_list: [],
      tax_list: [],
      attribute_list: [],
      product_id: "",
    };
  }
  componentDidMount = () => {
    Helper.loadScript("admin");

    this.fetch_vendor_list_dropdown();
    this.fetch_category_list_dropdown();
    this.fetch_tax_dropdown();
    this.fetch_attribute_dropdown();
  };

  delete_slider = (slider) => {
    if (slider.source == "db" && slider.product_id != "") {
      let api =
        Url.admin_slider_delete + "/" + slider.product_id + "/" + slider.id;
      Api.slider_delete_api(api).then((res) => {
        let data = JSON.parse(res);

        if (data.status == "OK") {
          this.update_show_status(slider);
        }
      });
    }

    if (slider.source == "local" && slider.product_id == "") {
      let all_local_product_slider_image_show = this.state
        .product_slider_image_show;
      let all_local_product_slider_image_db = this.state
        .product_slider_image_db;

      let local_product_slider_image_show = [];
      let local_product_slider_image_db = [];

      all_local_product_slider_image_show.map((img) => {
        if (
          slider.product_id == "" &&
          slider.id == img.id &&
          slider.source == "local"
        ) {
        } else {
          local_product_slider_image_show.push(img);
        }
      });
      this.setState({
        product_slider_image_show: local_product_slider_image_show,
      });

      all_local_product_slider_image_db.map((img) => {
        if (
          slider.product_id == "" &&
          slider.id == img.id &&
          slider.source == "local"
        ) {
          let count = this.state.counter;
          count = count = 1;
          this.setState({ counter: count });
        } else {
          local_product_slider_image_db.push(img);
        }
      });

      this.setState({
        product_slider_image_db: local_product_slider_image_db,
      });
    }
  };
  update_show_status = (slider) => {
    console.log(slider);
    let all_local_product_slider_image_show = this.state
      .product_slider_image_show;
    let local_product_slider_image_show = [];

    all_local_product_slider_image_show.map((img) => {
      console.log(img);
      if (slider.id == img.id && slider.source == "db") {
        let obj = {
          id: img.id,
          product_id: img.product_id,
          source: "db",
          image_path: img.image_path,
          show: false,
        };
        local_product_slider_image_show.push(obj);
      } else {
        local_product_slider_image_show.push(img);
      }
    });

    this.setState({
      product_slider_image_show: local_product_slider_image_show,
    });
  };
  product_name(e) {
    this.setState({ product_name: e.target.value });
  }
  category_id(e) {
    this.setState({ category_id: e.target.value });
  }
  vendor_id(e) {
    this.setState({ vendor_id: e.target.value });
  }
  tax_id(e) {
    this.setState({ tax_id: e.target.value });
  }
  description(e) {
    this.setState({ description: e.target.value });
  }
  additional_description(e) {
    this.setState({ additional_description: e.target.value });
  }
  type_id(e) {
    this.setState({ type_id: e.target.value });
  }
  delivery_time(e) {
    this.setState({ delivery_time: e.target.value });
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
  attribute(e) {
    let local_attribute_list = [];
    let show_attr = [];
    this.state.attribute_list.map((attribute) => {
      if (attribute.id == e.target.value) {
        let single_attribute_object = {
          id: attribute.id,
          name: attribute.name,
          isChecked: !attribute.isChecked,
        };
        local_attribute_list.push(single_attribute_object);
      } else {
        local_attribute_list.push(attribute);
      }
    });
    this.setState({ attribute_list: local_attribute_list });

    local_attribute_list.map((attribute) => {
      if (attribute.isChecked == true) {
        show_attr.push(attribute.id);
      }
    });

    this.setState({ attribute_id_val: show_attr, attribute: show_attr });
  }
  add_product = () => {
    this.clear_product_form();

    document.querySelector("#admin_add_product").click();
    this.setState({ modal_header: "Add Product" });
  };
  delete_product = (product_id) => {
    let forward = confirm("Please confirm Product Delete");
    if (forward == true) {
      let api = Url.admin_product_delete + "/" + product_id;
      Api.admin_product_delete(api, product_id).then((res) => {
        let data = JSON.parse(res);
        this.toast(data.message)
        if (data.status == "OK" && data.code == 200) {
          this.props.reload_internal_table_onapi("product_list");
        }
        // else if(data.status == "FAIL" && data.code == 400){
        //   this.toast(data.message)
        // }
      });
    }
  };
  edit_product = (product_id) => {
    this.clear_product_form();
    let api = Url.admin_fetch_product_list + "/" + product_id;
    Api.fetch_product_details(api).then((res) => {
      this.setState({ loader: false });
      let data = JSON.parse(res);
      console.log(data);
      if (data.code == "200") {
        this.setState({
          modal_header: "Edit Product",
          product_id: data.data.id,
          product_name: data.data.name,
          category_id: data.data.category_id,
          vendor_id: data.data.vendor_id,
          tax_id: data.data.tax_category_id,
          description: data.data.description,
          status:data.data.status,
          additional_description: data.data.addintional_info,
          type_id: data.data.type,
          delivery_time: data.data.deliverable_hours,
          product_feature_image: data.data.image[0].image_path,
          product_feature_image_db: "",
          product_slider_image_show: [],
          product_slider_image_db: [],
          three_field: false,
        });
        let local_attr = [];
        data.data.attribuites.map((attr) => {
          local_attr.push(attr.id);
        });
        this.setState({
          attribute_id_val: local_attr,
          attribute: local_attr,
        });
        let local_product_slider_image_show = [];
        let local_slide = Helper.convert_object_to_array(
          data.data.slider_images
        );
        local_slide.map((img) => {
          let db_img = {
            id: img.id,
            product_id: data.data.id,
            source: "db",
            image_path: img.image_path,
            show: true,
          };
          local_product_slider_image_show.push(db_img);
        });
        this.setState({
          product_slider_image_show: local_product_slider_image_show,
        });
        console.log(this.state.product_slider_image_show);
      }
    });

    document.querySelector("#admin_add_product").click();
    this.setState({ modal_header: "Edit Product" });
  };

  onProductImageChangeFeature(e) {
    this.setState({ product_feature_image_db: e.target.files[0] });
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      this.setState({ product_feature_image: reader.result });
    };
  }

  onProductImageChangeSlider(e) {
    let count = this.state.counter + 1;
    let all_value_product_slider_image_db = [];
    all_value_product_slider_image_db = this.state.product_slider_image_db;
    let local_product_slider_image_db = {
      id: count,
      product_id: "",
      source: "local",
      image_path: e.target.files[0],
    };
    all_value_product_slider_image_db.push(local_product_slider_image_db);
    this.setState({
      product_slider_image_db: all_value_product_slider_image_db,
    });

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      let all_value_product_slider_image_show = [];
      all_value_product_slider_image_show = this.state
        .product_slider_image_show;
      let local_product_slider_image_db = {
        id: count,
        product_id: "",
        source: "local",
        image_path: reader.result,
        show: true,
      };
      all_value_product_slider_image_show.push(local_product_slider_image_db);

      this.setState({
        product_slider_image_show: all_value_product_slider_image_show,
      });
    };
    this.setState({ counter: count });
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

  add_edit_product = () => {
    let product_data = {
      product_id: this.state.product_id,
      product_name: this.state.product_name,
      category_id: this.state.category_id,
      vendor_id: this.state.vendor_id,
      tax_id: this.state.tax_id,
      description: this.state.description,
      additional_description: this.state.additional_description,
      type_id: this.state.type_id,
      delivery_time: this.state.delivery_time,
      weight: this.state.weight,
      unit: this.state.unit,
      price: this.state.price,
      product_feature_image_db: this.state.product_feature_image_db,
      product_slider_image_db: this.state.product_slider_image_db,
      status: this.state.status,
      attribute_id: this.state.attribute_id_val,
    };
    console.log(product_data);
    let errorObj = [];
    if (product_data.product_id != "") {
      errorObj = Helper.productAddValidationedit(product_data);
    } else {
      errorObj = Helper.productAddValidation(product_data);
    }

    this.setState({
      error_text_product_name: errorObj.product_name,
      error_text_category_id: errorObj.category_id,
      error_text_vendor_id: errorObj.vendor_id,
      error_text_tax_id: errorObj.tax_id,
      error_text_description: errorObj.description,
      error_text_additional_description: errorObj.additional_description,
      error_text_type_id: errorObj.type_id,
      error_text_delivery_time: errorObj.delivery_time,
      error_text_weight: errorObj.weight,
      error_text_unit: errorObj.unit,
      error_text_price: errorObj.price,
      error_text_attribute: errorObj.attribute_id,
      // error_text_feature_image:errorObj.product_slider_image_db
    });

    if (errorObj.continue) {
      let api = "";
      if (product_data.product_id != "") {
        api = Url.admin_product_edit + "/" + product_data.product_id;
      } else {
        api = Url.admin_product_add;
      }

      Api.admin_product_add(api, product_data).then((res) => {
        let data = JSON.parse(res);
        console.log(data);

        if (data.status == "OK" && data.code == 200) {
          this.toast(data.message);
          this.clear_product_form();
          document.querySelector("#product_model").click();
          this.props.reload_internal_table_onapi("product_list");
        } else {
          this.setState({
            error_text_product_name: data.data.name,
            error_text_category_id: data.data.category_id,
            error_text_vendor_id: data.data.vendor_id,
            error_text_tax_id: data.data.tax_category_id,
            error_text_description: data.data.description,
            error_text_additional_description: data.data.addintional_info,
            error_text_type_id: data.data.type_id,
            error_text_delivery_time: data.data.deliverable_hours,
            error_text_weight: data.data.weight,
            error_text_unit: data.data.unit,
            error_text_price: data.data.price,
            error_text_feature_image: data.data.feature_image,
          });
        }
      });
    }
  };
  clear_product_form = () => {
    this.setState({
      modal_header: "Add Product",
      product_name: "",
      category_id: "0",
      vendor_id: "0",
      tax_id: "0",
      description: "",
      additional_description: "",
      type_id: "0",
      delivery_time: "",
      product_feature_image: "",
      product_feature_image_db: "",
      weight: "",
      price: "",
      unit: "0",
      product_slider_image_db: [],
      product_slider_image_show: [],
      three_field: true,

      error_text_product_name: "",
      error_text_category_id: "",
      error_text_vendor_id: "",
      error_text_tax_id: "",
      error_text_description: "",
      error_text_additional_description: "",
      error_text_type_id: "",
      error_text_delivery_time: "",
      error_text_weight: "",
      error_text_price: "",
      error_text_feature_image: "",
      attribute_id_val: [],
      error_text_unit: "",
      product_id: "",
      error_text_attribute: "",
    });
  };
  fetch_vendor_list_dropdown = () => {
    let api = Url.admin_vendor_list;
    Api.fetch_vendor_list(api).then((res) => {
      let data = JSON.parse(res);
      data = data.response;
      if (data.status == "200") {
        this.setState({ vendor_list: data.users });
      }
    });
  };

  fetch_category_list_dropdown = () => {
    let api = Url.admin_product_categories_list;
    Api.fetch_product_category_list(api).then((res) => {
      let data = JSON.parse(res);
      if (data.code == "200") {
        this.setState({ category_list: data.data });
      }
    });
  };

  fetch_tax_dropdown = () => {
    let api = Url.admin_tax_list;
    Api.fetch_tax_list(api).then((res) => {
      let data = JSON.parse(res);
      if (data.code == "200") {
        this.setState({ tax_list: data.data });
      }
    });
  };
  fetch_attribute_dropdown = () => {
    let api = Url.admin_product_attributes_list;
    Api.fetch_product_attributes_list(api).then((res) => {
      let data = JSON.parse(res);
      if (data.code == "200") {
        let local_attribute = [];
        data.data.map((attribute) => {
          let single_attribute_object = {
            id: attribute.id,
            name: attribute.name,
            isChecked: false,
          };
          local_attribute.push(single_attribute_object);
        });
        this.setState({ attribute_list: local_attribute });
      }
    });
  };
  trigget_input_file = (upload_type) => {
    if (upload_type == "feature") {
      document.querySelector("#adminProductFileFeature").click();
    }
    if (upload_type == "slider") {
      document.querySelector("#adminProductFileSlider").click();
    }
  };


  checkImagePath=(image) => {
    let temp_image = ''
    image.map(img=>{
      try{
        temp_image = image[0].image_path
      }catch(e){
        temp_image = Global.placeholder_admin_cake_image
      }
    })
    return temp_image
  }

  render() {
    var vendors = this.state.vendor_list.map(function (vendor) {
      return <option value={vendor.id}>{vendor.name}</option>;
    });

    var category = this.state.category_list.map(function (category) {
      return <option value={category.id}>{category.name}</option>;
    });

    var tax = this.state.tax_list.map(function (tax) {
      return <option value={tax.id}>{tax.amount}</option>;
    });
    var attribute = this.state.attribute_list.map(function (attr) {
      return <option value={attr.id}>{attr.name}</option>;
    });

    return (
      <React.Fragment>
        <React.Fragment
          key={"---------------ADD_EDIT_PRODUCT_MODAL--------------"}
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
                    <label for="exampleInputEmail1">Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter Name "
                      className={`form-control pro_fon ${
                        this.state.error_text_product_name ? "errorval" : ""
                      }`}
                      onChange={this.product_name.bind(this)}
                      value={this.state.product_name}
                    />{" "}
                    {this.state.error_text_product_name && (
                      <span className="errorText">
                        {this.state.error_text_product_name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Category </label>

                    <select
                      value={this.state.category_id}
                      onChange={this.category_id.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_category_id ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select Category</option>
                      {category}
                    </select>
                    {this.state.error_text_category_id && (
                      <span className="errorText">
                        {this.state.error_text_category_id}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Tax </label>

                    <select
                      value={this.state.tax_id}
                      onChange={this.tax_id.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_tax_id ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select Tax</option>
                      {tax}
                    </select>
                    {this.state.error_text_tax_id && (
                      <span className="errorText">
                        {this.state.error_text_tax_id}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Vendor</label>
                    <select
                      value={this.state.vendor_id}
                      onChange={this.vendor_id.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_vendor_id ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select Vendor</option>
                      {vendors}
                    </select>
                    {this.state.error_text_vendor_id && (
                      <span className="errorText">
                        {this.state.error_text_vendor_id}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea
                      type="text"
                      placeholder="Enter Description "
                      className={`form-control pro_fon ${
                        this.state.error_text_description ? "errorval" : ""
                      }`}
                      onChange={this.description.bind(this)}
                      value={this.state.description}
                    />{" "}
                    {this.state.error_text_description && (
                      <span className="errorText">
                        {this.state.error_text_description}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">
                      Additional Information
                    </label>
                    <textarea
                      type="text"
                      placeholder="Enter Description "
                      className={`form-control pro_fon ${
                        this.state.error_text_additional_description
                          ? "errorval"
                          : ""
                      }`}
                      onChange={this.additional_description.bind(this)}
                      value={this.state.additional_description}
                    />{" "}
                    {this.state.error_text_additional_description && (
                      <span className="errorText">
                        {this.state.error_text_additional_description}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Type </label>
                    <select
                      value={this.state.type_id}
                      onChange={this.type_id.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_type_id ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select Type</option>
                      <option value="cake">cake</option>
                      <option value="gift">gift</option>
                      <option value="party-items">party-items</option>
                    </select>
                    {this.state.error_text_type_id && (
                      <span className="errorText">
                        {this.state.error_text_type_id}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Attribute </label>
                    <select
                      multiple={true}
                      value={this.state.attribute}
                      onChange={this.attribute.bind(this)}
                      className={`form-control pro_fon ${
                        this.state.error_text_attribute ? "errorval" : ""
                      }`}
                    >
                      <option value="0">Select attribute</option>
                      {attribute}
                    </select>
                    {this.state.error_text_attribute && (
                      <span className="errorText">
                        {this.state.error_text_attribute}
                      </span>
                    )}
                  </div>
                  {this.state.three_field == true && (
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
                  )}

                  {this.state.three_field == true && (
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
                  )}

                  {this.state.three_field == true && (
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
                  )}
                  <div className="form-group">
                    <label for="exampleInputEmail1">Delivery Time</label>
                    <input
                      type="number"
                      placeholder="Enter Delivery Time "
                      className={`form-control pro_fon ${
                        this.state.error_text_delivery_time ? "errorval" : ""
                      }`}
                      onChange={this.delivery_time.bind(this)}
                      value={this.state.delivery_time}
                    />{" "}
                    {this.state.error_text_delivery_time && (
                      <span className="errorText">
                        {this.state.error_text_delivery_time}
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
                    <h5 class="modal-title modal_hea img_make_Center">
                      Add Product Images
                    </h5>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Feature Image</label>
                  </div>
                  <div
                    className={`delete_btn_custmzecake background_colorcustmzecake custom_margin_top1 slide ${
                      this.state.error_text_feature_image ? "errorval" : ""
                    }`}
                  >
                    <input
                      onChange={this.onProductImageChangeFeature.bind(this)}
                      id="adminProductFileFeature"
                      type="file"
                      className="hidden"
                    />
                    {this.state.product_feature_image != "" && (
                      <img
                        width="100"
                        height="100"
                        className="product_upload_image"
                        src={this.state.product_feature_image}
                      />
                    )}
                    <Link
                      onClick={this.trigget_input_file.bind(this, "feature")}
                      to="#"
                    >
                      <div className="delete_btn_custmzecake background_colorcustmzecake custom_margin_top1">
                        <i className="fas fa-upload"></i>Upload
                      </div>
                    </Link>
                  </div>
                  <div className="form-group y">
                    <label for="exampleInputEmail1">Slider Image</label>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.onProductImageChangeSlider.bind(this)}
                      id="adminProductFileSlider"
                      type="file"
                      className="hidden"
                    />
                    {this.state.product_slider_image_show.map(
                      (slider, index) => (
                        <span
                          className={`${
                            slider.show ? "span_margin" : "hidden"
                          }`}
                        >
                          <img
                            width="100"
                            height="100"
                            className="product_upload_image"
                            src={slider.image_path}
                          />
                          <i
                            onClick={this.delete_slider.bind(this, slider)}
                            class="fas fa-trash slider_delete"
                          ></i>
                        </span>
                      )
                    )}
                    <Link
                      onClick={this.trigget_input_file.bind(this, "slider")}
                      to="#"
                    >
                      <div className="delete_btn_custmzecake background_colorcustmzecake custom_margin_top1 slide ${this.state.error_text_delivery_time">
                        <i className="fas fa-upload"></i>Upload
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="modal-footer modal_header_back">
                  <button
                    onClick={this.add_edit_product.bind(this)}
                    type="button"
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="product_model"
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
            id="admin_add_product"
            type="button"
            className="btn btn-default hidden"
            data-toggle="modal"
            data-target="#modal-default"
          >
            Launch Default Modal
          </button>
        </React.Fragment>
        <React.Fragment key={"---------------PRODUCT_CONTENT-----------------"}>
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
                      <h3 className="card-title">Product List</h3>
                      <Link
                        to="#"
                        onClick={this.add_product.bind(this)}
                        className="btn btn-success btn-sm rightyadmin"
                        href="#admin-panel/products"
                      >
                        <i className="fas fa-plus"></i>Add
                      </Link>
                    </div>

                    <div className="card-body">
                      <table
                        id="productList"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Vendor</th>
                            <th>Delivery Time</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.admin_product_list.map(
                            (product, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>
                                <td>
                                  <img
                                    src={this.checkImagePath(product.image)}
                                    className="rounded-circle cutomerPic"
                                  />{" "}
                                  {product.name}
                                </td>

                                <td className="td_particular">
                                  {product.type}
                                </td>
                                <td className="td_particular">
                                  {product.category.name}
                                </td>
                                <td className="td_particular">
                                  {product.vendor.name}
                                </td>
                                <td className="td_particular">
                                  {product.deliverable_hours}
                                </td>
                                <td className="td_particular">
                                  {product.status == "1" && (
                                    <span className="badge badge-success">
                                      Active
                                    </span>
                                  )}
                                  {product.status == "0" && (
                                    <span className="badge badge-warning">
                                      Deactive
                                    </span>
                                  )}
                                </td>
                                <td className="td_particular">
                                  <div className="hu buttonwidth">
                                    <div className="inner">
                                      <Link
                                        onClick={this.edit_product.bind(
                                          this,
                                          product.id
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
                                        onClick={this.delete_product.bind(
                                          this,
                                          product.id
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

export default ProductList;
