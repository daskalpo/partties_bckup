import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { OptionComponent } from "../Pagecomponent";

class GiftSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      order: "",
      price_show: "",
    };
  }

  componentDidMount = () => {
    Helper.loadScript();
    this.assign_global_values_to_Search_field();
  };

  assign_global_values_to_Search_field = () => {
    let price = "";
    let local_price = Global.gift_search_values_obj.price.split(",");
    if (local_price == "") {
      price = "Select price";
    } else {
      price = local_price[0] + " to " + local_price[1];
    }
    this.setState({
      price_show: price,
      order: Global.gift_search_values_obj.order,
    });
  };

  nevigate = (nav) => {
    Helper.clear_global_search_values_onNavigation();
    this.props.history.push("/" + nav);
  };

  allFieldSearch = () => {
    this.props.refreshGiftList();
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
    Global.gift_search_values_obj.price = local_price;
    this.setState({ price: local_price });
    this.allFieldSearch();
  }

  order(e) {
    Global.gift_search_values_obj.order = e.target.value;
    this.setState({ order: e.target.value });
    this.allFieldSearch();
  }

  __store_checked_attributes = (data, checkedstatus) => {
    this.allFieldSearch();
  };

  render() {
    const divStyle = {
      display: "none",
    };

    return (
      <React.Fragment>
        <div className="container filterContainer">
          <div className="row">
            <div className="col-md-12 breadcrumbWrapper">
              <ul className="breadcrumb">
                <li onClick={this.nevigate.bind(this, "home")}>
                  <Link to="#">Home</Link>
                </li>
                <li> Gifts</li>
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
export default GiftSearch;
