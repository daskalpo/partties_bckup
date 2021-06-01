import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { OptionComponent } from "../Pagecomponent";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      type: "",
      order: "",
      price_show: "",
      product_attribute: [],
    };
  }

  componentDidMount = () => {
    Helper.loadScript();
    this.assign_global_values_to_Search_field();
    this.get_products_attributes();
  };

  get_products_attributes = () => {
    let api = Url.product_attributes;
    Api.get_product_attributes(api).then((res) => {
      let response = JSON.parse(res);
      this.inject_isChecked_into_productAttribute(response.data);
    });
  };

  inject_isChecked_into_productAttribute = (dataObj) => {
    let local_product_attribute = [];
    dataObj.map((attribute) => {
      let single_attribute_object = {
        id: attribute.id,
        name: attribute.name,
        isChecked: false,
      };
      local_product_attribute.push(single_attribute_object);
    });
    console.log(local_product_attribute);
    window.localStorage.setItem(
      "PRODUCT_ATTRIBUTES",
      JSON.stringify(local_product_attribute)
    );
    window.localStorage.setItem(
      "RESET_PRODUCT_ATTRIBUTES",
      JSON.stringify(local_product_attribute)
    );
    this.setState({ product_attribute: local_product_attribute });
  };
  assign_global_values_to_Search_field = () => {
    let price = "";
    let local_price = Global.search_values_obj.price.split(",");
    if (local_price == "") {
      price = "Select price";
    } else {
      price = local_price[0] + " to " + local_price[1];
    }
    this.setState({
      price_show: price,
      type: Global.search_values_obj.type,
      order: Global.search_values_obj.order,
    });
  };

  nevigate = (nav) => {
    Helper.clear_global_search_values_onNavigation();
    this.props.history.push("/" + nav);
  };

  allFieldSearch = () => {
    this.props.refreshProductList();
  };

  price(e) {
    let local_price =
      parseInt(
        document
          .getElementsByClassName("irs-from")[1]
          .innerHTML.replace(" ", "")
      ) +
      "," +
      parseInt(
        document.getElementsByClassName("irs-to")[1].innerHTML.replace(" ", "")
      );
    this.setState({
      price_show:
        parseInt(
          document
            .getElementsByClassName("irs-from")[1]
            .innerHTML.replace(" ", "")
        ) +
        " to " +
        parseInt(
          document
            .getElementsByClassName("irs-to")[1]
            .innerHTML.replace(" ", "")
        ),
    });
    Global.search_values_obj.price = local_price;
    this.setState({ price: local_price });
    this.allFieldSearch();
  }

  type(e) {
    Global.search_values_obj.type = e.target.value;
    this.setState({ type: e.target.value });
    this.allFieldSearch();
  }

  order(e) {
    Global.search_values_obj.order = e.target.value;
    this.setState({ order: e.target.value });
    this.allFieldSearch();
  }

  __store_checked_attributes = (data, checkedstatus) => {
    let local_product_attribute = JSON.parse(
      window.localStorage.getItem("PRODUCT_ATTRIBUTES")
    );
    let temp_local_product_attribute = [];
    local_product_attribute.map((attribute) => {
      if (attribute.id == data.id) {
        attribute.isChecked = checkedstatus;
      }
      checkedstatus;
      temp_local_product_attribute.push(attribute);
    });
    this.setState({ product_attribute: temp_local_product_attribute });
    window.localStorage.setItem(
      "PRODUCT_ATTRIBUTES",
      JSON.stringify(temp_local_product_attribute)
    );
    Global.search_values_obj.type = Helper.filter_checked_attribute(
      temp_local_product_attribute
    );
    this.allFieldSearch();
  };

  render() {
    const divStyle = {
      display: "none",
    };

    const listItems = this.state.product_attribute.map((prod, index) => (
      <OptionComponent
        key={index}
        store_checked_attributes={this.__store_checked_attributes.bind(this)}
        prod={prod}
        title="search"
        history={this.props.history}
      />
    ));

    return (
      <React.Fragment>
        <div className="container filterContainer">
          <div className="row">
            <div className="col-md-12 breadcrumbWrapper">
              <ul className="breadcrumb">
                <li onClick={this.nevigate.bind(this, "home")}>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  {this.props.headerTitle == "ProductLists" && "Cake"}
                  {this.props.headerTitle == "GiftLists" && "Gifts"}
                  {this.props.headerTitle == "PartyItem" && "Party Items"}
                </li>
              </ul>
            </div>

            <div className="col-md-12" id="stickyFilterWrap">
              <div className="filterWrapper">
                <div className="filterItemWrap">
                  <label>Price :</label>
                  <div className="selectBox">
                    <div className="rangeSliderWrap">
                      <Link to="#" className="rangeFilter">
                        <span className="varia">{this.state.price_show}</span>
                        <i className="fa fa-chevron-down"></i>
                      </Link>
                      <div
                        id="rangeBoxWrap"
                        className="rangeBoxWrap custowrap custybosy"
                      >
                        <div className="range-slider">
                          <input type="range" className="js-range-slider" />
                        </div>
                        <div className="filterapplyBtnWrap" style={divStyle}>
                          <Link
                            to="#"
                            id="price"
                            onClick={this.price.bind(this)}
                          >
                            Apply
                          </Link>
                          <Link
                            to="#"
                            id="price_close"
                            className="filterApplyBtn"
                          >
                            Apply
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filterItemWrap">
                  <label>Type :</label>
                  <div className="selectBox">
                    <div id="typeDropdownWrap" className="typeDropdownWrap">
                      <a className="typeFilter">
                        <span className="varia">Select type</span>
                        <i className="fa fa-chevron-down"></i>
                      </a>
                      <div className="typeBoxWrap">
                        <div className="typeFilterListWrap noHeight">
                          {listItems}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filterItemWrap rightItem">
                  <label>Sort by :</label>
                  <div className="selectBox customSelectWrap1">
                    <i className="fa fa-chevron-down rig"></i>
                    <select
                      className="customSelect variass"
                      onChange={this.order.bind(this)}
                      value={this.state.order}
                    >
                      <option value="0">Select Order</option>
                      <option value="low-high">Low to High Price</option>
                      <option value="high-low">High to Low Price</option>
                      <option value="popular">Popularity</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="filter" class="filter_mob">
          <ul class="scroll_mob">
            <li id="categories-menu">
              <Link className="filterModalButton">
                <i class="fas fa-filter"></i>
                <span class="sortbartext">Filter</span>
              </Link>
            </li>
            <li id="categories-menu">
              <Link className="sortbyModalButton">
                <i class="fas fa-sort-amount-up"></i>
                <span class="sortbartext">Sort</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default Search;
